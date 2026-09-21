/**
 * Historical Lead Migration Tool: storage/leads.json -> Cloud Firestore
 *
 * Usage:
 *   node scripts/migrate-leads-to-firestore.mjs --dry-run
 *   node scripts/migrate-leads-to-firestore.mjs
 *
 * CRITICAL SAFETY RULES:
 * 1. Always creates a timestamped backup before migration.
 * 2. Validates schema before attempting any writes.
 * 3. Uses { merge: true } to prevent accidental data overwrites or duplicate entries.
 * 4. NEVER deletes the original local storage/leads.json source file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const isDryRun = process.argv.includes('--dry-run');

async function runMigration() {
  console.log(`\n======================================================================`);
  console.log(`🔄 BAXTIYOR HEALTHCARE V2 — HISTORICAL LEAD MIGRATION TOOL`);
  console.log(`Mode:       ${isDryRun ? 'DRY-RUN (Simulated, no remote writes)' : 'LIVE MIGRATION'}`);
  console.log(`Timestamp:  ${new Date().toISOString()}`);
  console.log(`======================================================================\n`);

  const storageDir = path.join(projectRoot, 'storage');
  const leadsFile = path.join(storageDir, 'leads.json');

  if (!fs.existsSync(leadsFile)) {
    console.log(`ℹ️ No local storage/leads.json file found. Zero historical records to migrate.`);
    process.exit(0);
  }

  let rawData;
  try {
    rawData = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
  } catch (err) {
    console.error(`❌ Failed to read or parse storage/leads.json: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(rawData)) {
    console.error(`❌ Expected JSON array in storage/leads.json, got: ${typeof rawData}`);
    process.exit(1);
  }

  console.log(`📦 Loaded ${rawData.length} historical records from storage/leads.json`);

  // Step 1: Create Backup
  const backupTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(storageDir, `leads.json.bak-${backupTimestamp}`);
  fs.copyFileSync(leadsFile, backupPath);
  console.log(`🛡️ Created safe backup at: ${backupPath}\n`);

  // Step 2: Validate Schema
  let validRecords = [];
  let invalidRecords = [];

  for (const item of rawData) {
    if (!item.lead_id || !item.name || !item.whatsapp) {
      invalidRecords.push({ item, reason: 'Missing lead_id, name, or whatsapp' });
      continue;
    }

    const cleanRecord = {
      lead_id: String(item.lead_id),
      name: String(item.name).trim(),
      whatsapp: String(item.whatsapp).trim(),
      email: item.email ? String(item.email).trim() : '',
      country: item.country ? String(item.country) : 'Unspecified',
      treatment: item.treatment ? String(item.treatment) : 'General Consultation',
      relationship: item.relationship ? String(item.relationship) : 'self',
      language: item.language === 'ar' ? 'ar' : 'en',
      landing_page: item.landing_page || '',
      utm_source: item.utm_source || '',
      utm_medium: item.utm_medium || '',
      utm_campaign: item.utm_campaign || '',
      report_uploaded: Boolean(item.report_uploaded),
      uploaded_file_count: Number(item.uploaded_file_count) || 0,
      score: ['HIGH', 'MEDIUM', 'LOW'].includes(item.score) ? item.score : 'LOW',
      status: item.status || 'NEW',
      created_at: item.created_at || new Date().toISOString(),
      updated_at: item.updated_at || new Date().toISOString(),
      migrated_at: new Date().toISOString(),
      storage_target: 'firestore',
    };

    validRecords.push(cleanRecord);
  }

  console.log(`🔍 Validation Results:`);
  console.log(`  - Valid records ready:   ${validRecords.length}`);
  console.log(`  - Invalid/skipped:       ${invalidRecords.length}`);

  if (isDryRun) {
    console.log(`\n✅ DRY-RUN COMPLETED SUCCESSFULLY.`);
    console.log(`Simulated migration of ${validRecords.length} leads. No remote changes made.`);
    process.exit(0);
  }

  // Step 3: Connect to Firebase Admin (Live Mode)
  let admin;
  try {
    admin = await import('firebase-admin');
  } catch (err) {
    console.error(`❌ firebase-admin is not installed: ${err.message}`);
    process.exit(1);
  }

  let db = null;
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'baxtiyor-healthcare';

    if (serviceAccountKey) {
      const certObj = serviceAccountKey.trim().startsWith('{')
        ? JSON.parse(serviceAccountKey)
        : JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf-8'));

      admin.default.initializeApp({
        credential: admin.default.credential.cert(certObj),
        projectId,
      });
      db = admin.default.firestore();
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      admin.default.initializeApp({
        credential: admin.default.credential.applicationDefault(),
        projectId,
      });
      db = admin.default.firestore();
    } else {
      console.warn(`⚠️ No FIREBASE_SERVICE_ACCOUNT_KEY or GOOGLE_APPLICATION_CREDENTIALS found in environment.`);
      console.warn(`Cannot connect to remote Firestore without credentials.`);
      console.log(`Your records remain safely preserved in: ${leadsFile}`);
      console.log(`To execute live migration, provide FIREBASE_SERVICE_ACCOUNT_KEY or run in Google Cloud environment.`);
      process.exit(0);
    }
  } catch (err) {
    console.error(`❌ Failed to initialize Firebase Admin: ${err.message}`);
    process.exit(1);
  }

  if (!db) {
    console.error(`❌ Firestore database not initialized.`);
    process.exit(1);
  }

  console.log(`\n🚀 Migrating ${validRecords.length} records into Firestore collection 'leads'...`);
  let written = 0;
  for (const lead of validRecords) {
    try {
      await db.collection('leads').doc(lead.lead_id).set(lead, { merge: true });
      written++;
      if (written % 10 === 0 || written === validRecords.length) {
        console.log(`  Processed ${written} / ${validRecords.length} leads...`);
      }
    } catch (writeErr) {
      console.error(`  ❌ Error writing lead ${lead.lead_id}: ${writeErr.message}`);
    }
  }

  console.log(`\n======================================================================`);
  console.log(`🎉 MIGRATION SUMMARY:`);
  console.log(`Total Inspected: ${rawData.length}`);
  console.log(`Successfully Migrated: ${written}`);
  console.log(`Local Backup Retained: ${backupPath}`);
  console.log(`Original Local File:   Preserved intact`);
  console.log(`======================================================================\n`);
}

runMigration();

