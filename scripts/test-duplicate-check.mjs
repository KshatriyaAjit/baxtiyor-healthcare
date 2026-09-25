/**
 * Regression Test Suite: Homepage Duplication Check & Media/YouTube Verification
 * Baxtiyor Healthcare - Phase 19B
 */

import http from 'http';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

function get(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    http
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        });
      })
      .on('error', reject);
  });
}

function getRenderedDomHtml(html) {
  // Remove script tags which contain Next.js RSC flight payload serialized strings
  let dom = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Normalize HTML entities
  dom = dom
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  return dom;
}

function countOccurrences(text, searchTerm) {
  if (!text || !searchTerm) return 0;
  let count = 0;
  let pos = text.indexOf(searchTerm);
  while (pos !== -1) {
    count++;
    pos = text.indexOf(searchTerm, pos + searchTerm.length);
  }
  return count;
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('=== Running Phase 19B Duplication & Media Regression Suite ===');
  console.log(`Target: ${BASE_URL}\n`);

  // 1. English Homepage Duplication Checks
  console.log('--- 1. Testing /en Homepage (No Duplication) ---');
  try {
    const enRes = await get('/en');
    assert(enRes.status === 200, 'HTTP 200 on /en');

    const mainTagCount = countOccurrences(enRes.body, '<main id="main-content"');
    assert(mainTagCount === 1, `<main id="main-content"> occurs exactly 1 time in HTML document (found: ${mainTagCount})`);

    const enDom = getRenderedDomHtml(enRes.body);

    const enHeadings = [
      { name: 'Hero Headline', text: 'Your Medical Treatment in India, Personally Guided' },
      { name: 'Why Baxtiyor', text: 'Why International Patients Choose Baxtiyor' },
      { name: 'Key Specialties', text: 'Key Medical Specialties' },
      { name: 'Selected Hospitals', text: 'Selected Hospitals in Delhi NCR' },
      { name: 'Indicative Costs', text: 'Indicative Treatment Costs in India' },
      { name: 'Patient Stories', text: 'Real International Patient Stories' },
      { name: 'Media Gallery', text: 'Real Patient Journeys Media Gallery' },
      { name: 'YouTube Showcase', text: 'Watch on YouTube: Hospital Tours & Doctor Discussions' },
      { name: 'Country Pathways', text: 'Tailored Care by Country of Residence' },
      { name: 'FAQs', text: 'Frequently Asked Questions' },
      { name: 'Final CTA', text: 'Begin Your Medical Journey with Personal Specialist Guidance' },
    ];

    for (const heading of enHeadings) {
      const count = countOccurrences(enDom, heading.text);
      assert(count === 1, `"${heading.name}" occurs exactly 1 time in rendered DOM (found: ${count})`);
    }

    // Verify official YouTube channel link is present
    assert(enDom.includes('https://youtube.com/@baxtiyorindiya'), 'Official YouTube channel link present on /en');
  } catch (err) {
    console.error('Failed fetching /en:', err.message);
    failed++;
  }

  // 2. Arabic Homepage Duplication Checks
  console.log('\n--- 2. Testing /ar Homepage (No Duplication) ---');
  try {
    const arRes = await get('/ar');
    assert(arRes.status === 200, 'HTTP 200 on /ar');

    const mainTagCountAr = countOccurrences(arRes.body, '<main id="main-content"');
    assert(mainTagCountAr === 1, `<main id="main-content"> occurs exactly 1 time in HTML document on /ar (found: ${mainTagCountAr})`);

    const arDom = getRenderedDomHtml(arRes.body);

    const arHeadings = [
      { name: 'Hero Headline (AR)', text: 'علاجك الطبي في الهند، بتوجيه شخصي موثوق' },
      { name: 'Why Baxtiyor (AR)', text: 'لماذا يختار المرضى بختيار للرعاية الصحية؟' },
      { name: 'Key Specialties (AR)', text: 'التخصصات الطبية الرئيسية' },
      { name: 'Selected Hospitals (AR)', text: 'مستشفيات رائدة معتمدة في دلهي وجورجاون' },
      { name: 'Indicative Costs (AR)', text: 'تكاليف تقريبية لأهم الإجراءات الجراحية في الهند' },
      { name: 'Patient Stories (AR)', text: 'تجارب واقعية لمرضانا الدوليين' },
      { name: 'Media Gallery (AR)', text: 'معرض رحلات ورعاية مرضانا الدوليين' },
      { name: 'YouTube Showcase (AR)', text: 'شاهد بالفيديو: جولات المستشفيات والمقابلات الطبية' },
      { name: 'Country Pathways (AR)', text: 'مسارات الرعاية المخصصة حسب دولة الإقامة' },
      { name: 'FAQs (AR)', text: 'الأسئلة الشائعة حول العلاج في الهند' },
      { name: 'Final CTA (AR)', text: 'ابدأ رحلة علاجك بثقة وتوجيه شخصي مستمر' },
    ];

    for (const heading of arHeadings) {
      const count = countOccurrences(arDom, heading.text);
      assert(count === 1, `"${heading.name}" occurs exactly 1 time in rendered DOM on /ar (found: ${count})`);
    }

    assert(arDom.includes('https://youtube.com/@baxtiyorindiya'), 'Official YouTube channel link present on /ar');
  } catch (err) {
    console.error('Failed fetching /ar:', err.message);
    failed++;
  }

  // 3. Media Serving & Privacy Isolation Checks
  console.log('\n--- 3. Testing Local Media API & Isolation ---');
  try {
    const mediaRes = await get('/api/media/patient-stories/media-1790291551173-d701b.jpeg');
    assert(mediaRes.status === 200, 'Existing public media item returns HTTP 200');
    assert(
      mediaRes.headers['content-type'] === 'image/jpeg',
      `Correct Content-Type: ${mediaRes.headers['content-type']}`
    );
    assert(
      mediaRes.headers['cache-control'] && mediaRes.headers['cache-control'].includes('public'),
      'Cache-Control headers present on media response'
    );

    // Invalid category rejection
    const invalidCatRes = await get('/api/media/invalid-cat/image.jpg');
    assert(invalidCatRes.status === 400, 'Invalid media category rejected with HTTP 400');

    // Missing file returns 404
    const notFoundRes = await get('/api/media/patient-stories/non-existent-image.jpg');
    assert(notFoundRes.status === 404, 'Missing media file returns HTTP 404');
  } catch (err) {
    console.error('Failed media tests:', err.message);
    failed++;
  }

  // 4. Patient Stories Page Video & Media Showcase
  console.log('\n--- 4. Testing /en/patient-stories Video Showcase ---');
  try {
    const psRes = await get('/en/patient-stories');
    assert(psRes.status === 200, 'HTTP 200 on /en/patient-stories');
    assert(
      psRes.body.includes('Official YouTube Video Showcase') ||
        psRes.body.includes('https://youtube.com/@baxtiyorindiya'),
      'YouTube video section visible on /en/patient-stories'
    );
    assert(
      psRes.body.includes('Real Patient Journeys Media Gallery'),
      'Media Gallery visible on /en/patient-stories'
    );
  } catch (err) {
    console.error('Failed patient stories test:', err.message);
    failed++;
  }

  console.log(`\n======================================================`);
  console.log(`Summary: ${passed} passed, ${failed} failed`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
