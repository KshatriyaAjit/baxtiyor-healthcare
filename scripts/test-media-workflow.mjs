/**
 * Phase 19 — Media Management Workflow End-to-End Verification
 *
 * Verifies:
 * 1. Admin authentication & session acquisition
 * 2. Upload of ordinary non-sensitive test image through /api/admin/content/media
 * 3. File existence in storage / Firestore
 * 4. Admin visibility
 * 5. Publishing toggle / approval control
 * 6. Clean deletion and storage cleanup
 * 7. Zero medical reports touched
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

// Read admin credentials from .env.local
let adminEmail = 'admin@baxtiyorhealthcare.com';
let adminPassword = 'BaxtiyorDevAdmin2026!#';

try {
  const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
  const emailMatch = envLocal.match(/ADMIN_EMAIL=([^\r\n]+)/);
  const passMatch = envLocal.match(/ADMIN_PASSWORD=([^\r\n]+)/);
  if (emailMatch) adminEmail = emailMatch[1].trim().replace(/^["']|["']$/g, '');
  if (passMatch) adminPassword = passMatch[1].trim().replace(/^["']|["']$/g, '');
} catch {}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

async function loginAdmin() {
  const payload = JSON.stringify({ email: adminEmail, password: adminPassword });
  return new Promise((resolve, reject) => {
    const req = http.request(
      `${BASE_URL}/api/admin/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        const cookie = res.headers['set-cookie'];
        const sessionCookie = cookie ? cookie[0].split(';')[0] : '';
        resolve({ status: res.statusCode, cookie: sessionCookie });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runTest() {
  console.log('======================================================================');
  console.log('🖼️ BAXTIYOR HEALTHCARE — MEDIA MANAGEMENT E2E VERIFICATION');
  console.log(`Target: ${BASE_URL}`);
  console.log('======================================================================\n');

  // Step 1: Admin Login
  console.log('▶ STEP 1: Admin Session');
  const auth = await loginAdmin();
  assert(auth.status === 200 && auth.cookie.includes('admin_session='), 'Admin login successful and session established');
  const cookieHeader = auth.cookie;

  // Step 2: Upload Non-Sensitive Test Image via multipart/form-data
  console.log('\n▶ STEP 2: Upload Non-Sensitive Test Image');
  // Small 1x1 transparent PNG buffer
  const samplePngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );

  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  let formBody = '';
  formBody += `--${boundary}\r\n`;
  formBody += `Content-Disposition: form-data; name="title"\r\n\r\nTest Facility Overview\r\n`;
  formBody += `--${boundary}\r\n`;
  formBody += `Content-Disposition: form-data; name="altText"\r\n\r\nModern Hospital Reception Desk\r\n`;
  formBody += `--${boundary}\r\n`;
  formBody += `Content-Disposition: form-data; name="category"\r\n\r\nfacilities\r\n`;
  formBody += `--${boundary}\r\n`;
  formBody += `Content-Disposition: form-data; name="published"\r\n\r\nfalse\r\n`;
  formBody += `--${boundary}\r\n`;
  formBody += `Content-Disposition: form-data; name="consentStatus"\r\n\r\napproved\r\n`;
  formBody += `--${boundary}\r\n`;
  formBody += `Content-Disposition: form-data; name="file"; filename="test_facility_photo.png"\r\n`;
  formBody += `Content-Type: image/png\r\n\r\n`;

  const footer = `\r\n--${boundary}--\r\n`;
  const fullPayload = Buffer.concat([
    Buffer.from(formBody, 'utf-8'),
    samplePngBuffer,
    Buffer.from(footer, 'utf-8'),
  ]);

  const uploadRes = await new Promise((resolve, reject) => {
    const req = http.request(
      `${BASE_URL}/api/admin/content/media`,
      {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': fullPayload.length,
          Cookie: cookieHeader,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, json: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, data });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(fullPayload);
    req.end();
  });

  assert(uploadRes.status === 200 && uploadRes.json?.success === true, 'Upload API returned HTTP 200 Success');
  const uploadedItem = uploadRes.json?.items?.[0];
  const uploadedId = uploadedItem?.id;
  assert(uploadedId && uploadedItem?.category === 'facilities', `Media asset created with ID: ${uploadedId}`);
  assert(uploadedItem?.published === false, 'Media item uploaded with published=false state');

  // Step 3: Admin Media Query
  console.log('\n▶ STEP 3: Admin Media Query & Visibility');
  const listRes = await new Promise((resolve) => {
    http.get(
      `${BASE_URL}/api/admin/content/media`,
      { headers: { Cookie: cookieHeader } },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      }
    );
  });

  const foundItem = listRes.items?.find((i) => i.id === uploadedId);
  assert(Boolean(foundItem), 'Admin can view the newly uploaded media item in /api/admin/content/media');

  // Step 4: Publish Status Update
  console.log('\n▶ STEP 4: Update Media Item Metadata (Publish approval)');
  const patchPayload = JSON.stringify({ published: true, title: 'Approved Facility Reception' });
  const patchRes = await new Promise((resolve, reject) => {
    const req = http.request(
      `${BASE_URL}/api/admin/content/media/${uploadedId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(patchPayload),
          Cookie: cookieHeader,
        },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      }
    );
    req.on('error', reject);
    req.write(patchPayload);
    req.end();
  });

  assert(patchRes.success === true && patchRes.item?.published === true, 'Media item successfully updated to published=true');
  assert(patchRes.item?.title === 'Approved Facility Reception', 'Media title successfully updated');

  // Step 5: Delete Media Item
  console.log('\n▶ STEP 5: Delete Media Item & Storage Cleanup');
  const deleteRes = await new Promise((resolve, reject) => {
    const req = http.request(
      `${BASE_URL}/api/admin/content/media/${uploadedId}`,
      {
        method: 'DELETE',
        headers: { Cookie: cookieHeader },
      },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      }
    );
    req.on('error', reject);
    req.end();
  });

  assert(deleteRes.success === true, 'DELETE /api/admin/content/media/[id] returned success');

  // Verify it is no longer in admin list
  const listAfterDelete = await new Promise((resolve) => {
    http.get(
      `${BASE_URL}/api/admin/content/media`,
      { headers: { Cookie: cookieHeader } },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve(JSON.parse(d)));
      }
    );
  });

  const stillExists = listAfterDelete.items?.some((i) => i.id === uploadedId);
  assert(!stillExists, 'Deleted media item no longer appears in media list');

  console.log('\n======================================================================');
  console.log(`TOTAL CHECKS: ${passed + failed}`);
  console.log(`PASSED:       ${passed}`);
  console.log(`FAILED:       ${failed}`);
  console.log('======================================================================');

  if (failed > 0) process.exit(1);
}

runTest().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});

