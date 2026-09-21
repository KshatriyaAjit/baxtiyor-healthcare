/**
 * Automated Route & API Verification Script for Baxtiyor Healthcare V2
 */

import http from 'http';

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES_TO_TEST = [
  { path: '/en', expectedStatus: 200, label: 'English Homepage' },
  { path: '/ar', expectedStatus: 200, label: 'Arabic Homepage (RTL)' },
  { path: '/robots.txt', expectedStatus: 200, label: 'Robots.txt' },
  { path: '/sitemap.xml', expectedStatus: 200, label: 'XML Sitemap' },
  { path: '/en/treatments', expectedStatus: 200, label: 'Treatments Directory (EN)' },
  { path: '/ar/treatments', expectedStatus: 200, label: 'Treatments Directory (AR)' },
  { path: '/en/treatments/kidney-transplant-india', expectedStatus: 200, label: 'Kidney Transplant (EN)' },
  { path: '/ar/treatments/kidney-transplant-india', expectedStatus: 200, label: 'Kidney Transplant (AR)' },
  { path: '/en/hospitals', expectedStatus: 200, label: 'Hospitals Directory (EN)' },
  { path: '/en/hospitals/fortis-memorial-research-institute', expectedStatus: 200, label: 'Fortis Hospital (EN)' },
  { path: '/en/doctors', expectedStatus: 200, label: 'Doctors Directory (EN)' },
  { path: '/en/doctors/senior-kidney-transplant-specialist', expectedStatus: 200, label: 'Doctor Profile (EN)' },
  { path: '/en/treatment-cost', expectedStatus: 200, label: 'Treatment Cost Hub (EN)' },
  { path: '/en/treatment-cost/kidney-transplant-india', expectedStatus: 200, label: 'Cost Detail (EN)' },
  { path: '/en/countries', expectedStatus: 200, label: 'Country Pathways Hub (EN)' },
  { path: '/en/countries/uzbekistan', expectedStatus: 200, label: 'Uzbekistan Pathway (EN)' },
  { path: '/ar/countries/oman', expectedStatus: 200, label: 'Oman Pathway (AR)' },
  { path: '/en/patient-stories', expectedStatus: 200, label: 'Patient Stories Hub (EN)' },
  { path: '/ar/patient-stories', expectedStatus: 200, label: 'Patient Stories Hub (AR)' },
  { path: '/en/why-baxtiyor', expectedStatus: 200, label: 'Why Baxtiyor & Team (EN)' },
  { path: '/en/contact', expectedStatus: 200, label: 'Contact Coordination Desk (EN)' },
  { path: '/en/faq', expectedStatus: 200, label: 'FAQ Hub (EN)' },
  { path: '/en/privacy-policy', expectedStatus: 200, label: 'Privacy Policy (EN)' },
  { path: '/en/non-existent-test-404', expectedStatus: 404, label: 'Localized 404 Recovery' },
];

function fetchUrl(url, options = {}) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          durationMs: Date.now() - start,
          byteLength: Buffer.byteLength(data),
          headers: res.headers,
          body: data,
        });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function run() {
  console.log(`\n🔍 Starting Baxtiyor Healthcare V2 Verification on port ${PORT}...\n`);

  let passed = 0;
  let failed = 0;

  for (const route of ROUTES_TO_TEST) {
    try {
      const res = await fetchUrl(`${BASE_URL}${route.path}`);
      const isExpected = res.status === route.expectedStatus;
      if (isExpected) {
        console.log(`✅ [${res.status}] ${route.label.padEnd(32)} ${route.path.padEnd(45)} (${res.durationMs}ms, ${res.byteLength} bytes)`);
        passed++;
      } else {
        console.error(`❌ [GOT ${res.status}, EXPECTED ${route.expectedStatus}] ${route.label} at ${route.path}`);
        failed++;
      }
    } catch (err) {
      console.error(`💥 [ERROR] Failed to fetch ${route.path}:`, err.message);
      failed++;
    }
  }

  // Test Lead API
  console.log(`\n📋 Testing Lead Intake API (/api/leads)...`);
  try {
    const leadPayload = JSON.stringify({
      name: 'Verification Bot',
      whatsapp: '+919999999999',
      treatment: 'kidney-transplant-india',
      country: 'Uzbekistan',
      relationship: 'self',
      language: 'en',
      report_uploaded: true,
      uploaded_file_count: 1,
    });

    const leadRes = await fetchUrl(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(leadPayload),
      },
      body: leadPayload,
    });

    if (leadRes.status === 200) {
      const json = JSON.parse(leadRes.body);
      console.log(`✅ Lead API: HTTP 200 OK | Lead ID: ${json.lead_id} | Intent Score: ${json.score}`);
      passed++;
    } else {
      console.error(`❌ Lead API: Got status ${leadRes.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`💥 Lead API Test Failed:`, err.message);
    failed++;
  }

  console.log(`\n========================================`);
  console.log(`Total Checks: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

run();

