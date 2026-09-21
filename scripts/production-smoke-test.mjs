/**
 * Automated Production Smoke Test Suite for Baxtiyor Healthcare Website V2
 *
 * Can be run against local or remote environments:
 *   node scripts/production-smoke-test.mjs
 *   node scripts/production-smoke-test.mjs --url=https://baxtiyorhealthcare.com
 */

import http from 'http';
import https from 'https';

const args = process.argv.slice(2);
let targetUrl = 'http://localhost:3006';

for (const arg of args) {
  if (arg.startsWith('--url=')) {
    targetUrl = arg.replace('--url=', '').trim();
  }
}

function requestUrl(fullUrl, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = fullUrl.startsWith('https://');
    const client = isHttps ? https : http;

    const start = Date.now();
    const req = client.request(fullUrl, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          durationMs: Date.now() - start,
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

async function runSmokeTests() {
  console.log(`\n======================================================`);
  console.log(`🚀 BAXTIYOR HEALTHCARE V2 — PRODUCTION SMOKE TEST SUITE`);
  console.log(`Target URL: ${targetUrl}`);
  console.log(`Timestamp:  ${new Date().toISOString()}`);
  console.log(`======================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName} ${details ? `(${details})` : ''}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
      failed++;
    }
  }

  try {
    // 1. Healthcheck Endpoint
    console.log(`-- 1. Testing System Health & Diagnostics --`);
    const healthRes = await requestUrl(`${targetUrl}/api/health`);
    assert(healthRes.status === 200, 'Healthcheck HTTP 200', `${healthRes.durationMs}ms`);
    try {
      const healthData = JSON.parse(healthRes.body);
      assert(healthData.status === 'healthy', 'Healthcheck Payload Status == "healthy"');
      assert(healthData.storage === 'writable', 'Storage Subsystem Writable');
      assert(healthData.version === '2.0.0', 'Platform Version == 2.0.0');
    } catch (e) {
      assert(false, 'Healthcheck JSON Parse', e.message);
    }

    // 2. Robots.txt
    console.log(`\n-- 2. Testing Robots & Crawl Directives --`);
    const robotsRes = await requestUrl(`${targetUrl}/robots.txt`);
    assert(robotsRes.status === 200, 'Robots.txt HTTP 200');
    assert(robotsRes.body.includes('Sitemap:'), 'Robots.txt Links to Sitemap');

    // 3. XML Sitemap
    console.log(`\n-- 3. Testing Dynamic XML Sitemap --`);
    const sitemapRes = await requestUrl(`${targetUrl}/sitemap.xml`);
    assert(sitemapRes.status === 200, 'Sitemap.xml HTTP 200');
    assert(sitemapRes.body.includes('<urlset'), 'Sitemap Contains Valid XML urlset');
    assert(sitemapRes.body.includes('/en/treatments/kidney-transplant-india'), 'Sitemap Indexes Treatment Pages');

    // 4. English Homepage
    console.log(`\n-- 4. Testing Core Homepage (English) --`);
    const enHomeRes = await requestUrl(`${targetUrl}/en`);
    assert(enHomeRes.status === 200, 'English Homepage HTTP 200', `${enHomeRes.durationMs}ms`);
    assert(enHomeRes.body.includes('Baxtiyor Healthcare'), 'English Home Contains Brand Name');
    assert(enHomeRes.body.includes('lang="en"'), 'English Home Contains lang="en"');

    // 5. Arabic Homepage (RTL)
    console.log(`\n-- 5. Testing Arabic Localized Homepage (RTL) --`);
    const arHomeRes = await requestUrl(`${targetUrl}/ar`);
    assert(arHomeRes.status === 200, 'Arabic Homepage HTTP 200', `${arHomeRes.durationMs}ms`);
    assert(arHomeRes.body.includes('dir="rtl"'), 'Arabic Home Renders dir="rtl" Attribute');
    assert(arHomeRes.body.includes('lang="ar"'), 'Arabic Home Contains lang="ar"');

    // 6. Security Headers Verification
    console.log(`\n-- 6. Testing Production Security Headers --`);
    const headers = enHomeRes.headers;
    assert(headers['x-frame-options'] === 'DENY', 'X-Frame-Options: DENY');
    assert(headers['x-content-type-options'] === 'nosniff', 'X-Content-Type-Options: nosniff');
    assert(!!headers['permissions-policy'], 'Permissions-Policy Header Configured');
    assert(!!headers['strict-transport-security'], 'Strict-Transport-Security Header Configured');

    // 7. Clinical Treatment & Cost Detail Pages
    console.log(`\n-- 7. Testing Clinical & Cost Detail Pages --`);
    const kidneyRes = await requestUrl(`${targetUrl}/en/treatments/kidney-transplant-india`);
    assert(kidneyRes.status === 200, 'Kidney Transplant Page HTTP 200');
    assert(kidneyRes.body.includes('Kidney Transplant'), 'Treatment Detail Contains Medical Title');

    const costRes = await requestUrl(`${targetUrl}/en/treatment-cost/kidney-transplant-india`);
    assert(costRes.status === 200, 'Kidney Transplant Cost Page HTTP 200');
    assert(costRes.body.includes('USD') || costRes.body.includes('Cost in India'), 'Cost Page Contains Pricing Breakdown');

    // 8. Lead Intake API Functionality
    console.log(`\n-- 8. Testing Lead Intake API (/api/leads) --`);
    const leadBody = JSON.stringify({
      name: 'Production Smoke Tester',
      whatsapp: '+919999999999',
      country: 'Oman',
      treatment: 'kidney-transplant-india',
      relationship: 'self',
      language: 'en',
      report_uploaded: true,
      uploaded_file_count: 2,
    });

    const leadRes = await requestUrl(`${targetUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(leadBody),
      },
      body: leadBody,
    });

    assert(leadRes.status === 200, 'Lead Submission HTTP 200', `${leadRes.durationMs}ms`);
    try {
      const leadData = JSON.parse(leadRes.body);
      assert(leadData.success === true, 'Lead Submission Success Flag');
      assert(leadData.score === 'HIGH', 'Intent Score Properly Evaluated as HIGH');
      assert(!!leadData.lead_id, `Lead ID Generated (${leadData.lead_id})`);
    } catch (e) {
      assert(false, 'Lead Response JSON Parse', e.message);
    }

    // 9. Error Recovery 404
    console.log(`\n-- 9. Testing Localized 404 Error Recovery --`);
    const notFoundRes = await requestUrl(`${targetUrl}/en/non-existent-page-recovery-test`);
    assert(notFoundRes.status === 404, '404 Recovery HTTP 404');
    assert(notFoundRes.body.includes('Page Not Found') || notFoundRes.body.includes('not be found'), '404 Body Displays Patient Recovery UI');

  } catch (err) {
    console.error(`💥 Fatal Test Runner Exception:`, err.message);
    failed++;
  }

  console.log(`\n======================================================`);
  console.log(`TOTAL CHECKS: ${passed + failed}`);
  console.log(`PASSED:       ${passed}`);
  console.log(`FAILED:       ${failed}`);
  console.log(`FINAL RESULT: ${failed === 0 ? '🟢 ALL SMOKE TESTS PASSED (PRODUCTION READY)' : '🔴 SMOKE TESTS FAILED'}`);
  console.log(`======================================================\n`);

  process.exit(failed === 0 ? 0 : 1);
}

runSmokeTests();
