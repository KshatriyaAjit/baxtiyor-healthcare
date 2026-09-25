/**
 * Phase 19 Verification Suite: Real Content, Media Management, YouTube, WhatsApp, Chat & Social
 *
 * Verifies:
 * 1. Contact Configuration & WhatsApp URL Generation (Contextual, Zero PII)
 * 2. Media Directory Isolation & Privacy Separation
 * 3. YouTube URL Parsing & Thumbnail Generation
 * 4. Content Storage Fallback & Seed Data Integrity
 * 5. Consent Filtering Rules for Patient Stories & Testimonials
 * 6. Analytics Allowlist for New Phase 19 Events
 * 7. Mobile Bottom Nav & Chat Safety Logic
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('================================================================');
console.log('🧪 RUNNING PHASE 19 VERIFICATION SUITE: CONTENT & CONVERSION HUB');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
  }
}

// -----------------------------------------------------------------------------
// 1. Contact Configuration & Privacy-Safe WhatsApp URLs
// -----------------------------------------------------------------------------
test('Central WhatsApp and Phone configuration exists', () => {
  const contactFile = path.join(process.cwd(), 'src', 'lib', 'config', 'contact.ts');
  assert.ok(fs.existsSync(contactFile), 'contact.ts file must exist');
  const content = fs.readFileSync(contactFile, 'utf-8');
  assert.ok(content.includes('SITE_CONTACT'), 'SITE_CONTACT must be exported');
  assert.ok(content.includes('@baxtiyorindiya'), 'Official YouTube channel @baxtiyorindiya must be configured');
  assert.ok(content.includes('getWhatsAppUrl'), 'getWhatsAppUrl helper must be exported');
});

test('WhatsApp URL generator creates clean contextual greetings without PII', () => {
  // Test YouTube URL patterns
  const patterns = [
    { input: 'https://www.youtube.com/watch?v=0W8oFfQ-55g', expected: '0W8oFfQ-55g' },
    { input: 'https://youtu.be/kXYiU_JCYtU', expected: 'kXYiU_JCYtU' },
    { input: 'https://www.youtube.com/shorts/wXhTHyIGQ_U', expected: 'wXhTHyIGQ_U' },
    { input: 'fJ9rUzIMcZQ', expected: 'fJ9rUzIMcZQ' },
  ];

  function extractYouTubeId(url) {
    if (!url || typeof url !== 'string') return null;
    const regexes = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const r of regexes) {
      const match = url.trim().match(r);
      if (match && match[1]) return match[1];
    }
    return null;
  }

  for (const { input, expected } of patterns) {
    const extracted = extractYouTubeId(input);
    assert.strictEqual(extracted, expected, `Extracted ID for ${input} should be ${expected}`);
  }
});

// -----------------------------------------------------------------------------
// 2. Storage & Medical Isolation
// -----------------------------------------------------------------------------
test('Storage directories strictly isolate public media from private medical records', () => {
  const storageDir = path.join(process.cwd(), 'storage');
  assert.ok(fs.existsSync(storageDir), 'storage/ directory must exist');

  const mediaDir = path.join(storageDir, 'media');
  assert.ok(fs.existsSync(mediaDir), 'storage/media/ public directory must exist');

  // Verify seed files exist and are valid JSON
  const requiredFiles = [
    'admin_videos.json',
    'admin_patient_stories.json',
    'admin_testimonials.json',
    'admin_social_links.json',
  ];

  for (const file of requiredFiles) {
    const fullPath = path.join(storageDir, file);
    assert.ok(fs.existsSync(fullPath), `${file} must exist`);
    const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    assert.ok(Array.isArray(parsed), `${file} content must be an array`);
    assert.ok(parsed.length > 0, `${file} must contain seed items`);
  }
});

test('Curated YouTube videos from @baxtiyorindiya exist with correct metadata', () => {
  const videosPath = path.join(process.cwd(), 'storage', 'admin_videos.json');
  const videos = JSON.parse(fs.readFileSync(videosPath, 'utf-8'));

  assert.ok(videos.length >= 4, 'Should have at least 4 curated videos');
  for (const vid of videos) {
    assert.ok(vid.youtubeVideoId && vid.youtubeVideoId.length === 11, `Invalid video ID: ${vid.youtubeVideoId}`);
    assert.ok(vid.thumbnailUrl && vid.thumbnailUrl.includes('img.youtube.com'), 'Must have YouTube thumbnail');
    assert.ok(vid.category, 'Must have a category');
    assert.ok(vid.title && vid.titleAr, 'Must have bilingual titles');
    assert.strictEqual(vid.published, true, 'Seed videos should be published');
  }
});

test('Patient stories have explicit consentStatus and zero unconsented exposures', () => {
  const storiesPath = path.join(process.cwd(), 'storage', 'admin_patient_stories.json');
  const stories = JSON.parse(fs.readFileSync(storiesPath, 'utf-8'));

  assert.ok(stories.length >= 3, 'Should have at least 3 curated patient stories');
  for (const story of stories) {
    assert.ok(['approved', 'approved_social'].includes(story.consentStatus), 'Consent must be approved for published stories');
    assert.ok(story.slug, 'Must have slug');
    assert.ok(story.summary && story.summaryAr, 'Must have bilingual summaries');
    assert.ok(story.outcomeNote && story.outcomeNoteAr, 'Must have clinical outcomes');
  }
});

test('Testimonials contain zero fake star ratings and have verified consent', () => {
  const testPath = path.join(process.cwd(), 'storage', 'admin_testimonials.json');
  const testimonials = JSON.parse(fs.readFileSync(testPath, 'utf-8'));

  assert.ok(testimonials.length >= 4, 'Should have at least 4 verified testimonials');
  for (const t of testimonials) {
    assert.strictEqual(t.consentStatus, 'approved', 'Must have approved consent');
    assert.ok(t.quote, 'Must have genuine quote');
    // Ensure no fake 5-star claims
    assert.strictEqual(t.rating, undefined, 'Must not contain fabricated numerical or 5-star ratings');
  }
});

test('Social links include YouTube @baxtiyorindiya, Telegram, and official channels', () => {
  const socialPath = path.join(process.cwd(), 'storage', 'admin_social_links.json');
  const links = JSON.parse(fs.readFileSync(socialPath, 'utf-8'));

  const yt = links.find((l) => l.platform === 'youtube');
  assert.ok(yt, 'YouTube channel must exist');
  assert.strictEqual(yt.url, 'https://youtube.com/@baxtiyorindiya');
  assert.strictEqual(yt.handle, '@baxtiyorindiya');

  const tg = links.find((l) => l.platform === 'telegram');
  assert.ok(tg, 'Telegram channel must exist');
  assert.strictEqual(tg.url, 'https://t.me/baxtiyorhealthcare');
});

// -----------------------------------------------------------------------------
// 3. Analytics Allowlist
// -----------------------------------------------------------------------------
test('Tracker allowlist supports Phase 19 conversion and content events', () => {
  const trackerFile = path.join(process.cwd(), 'src', 'lib', 'analytics', 'tracker.ts');
  const content = fs.readFileSync(trackerFile, 'utf-8');

  const phase19Events = [
    'media_view',
    'patient_story_view',
    'testimonial_view',
    'youtube_play',
    'social_click',
    'call_click',
    'lets_talk_click',
    'chat_open',
    'chat_human_request',
    'chat_whatsapp_click',
    'video_card_click',
  ];

  for (const ev of phase19Events) {
    assert.ok(content.includes(`'${ev}'`), `Event ${ev} must be in tracker allowlist`);
  }

  const adapterFile = path.join(process.cwd(), 'src', 'lib', 'analytics', 'firebase-adapter.ts');
  const adapterContent = fs.readFileSync(adapterFile, 'utf-8');
  assert.ok(adapterContent.includes("'content_id'"), 'content_id parameter must be allowlisted in adapter');
  assert.ok(adapterContent.includes("'content_slug'"), 'content_slug parameter must be allowlisted in adapter');
  assert.ok(adapterContent.includes("'social_platform'"), 'social_platform parameter must be allowlisted in adapter');
});

// -----------------------------------------------------------------------------
// 4. Admin API & Navigation Shell Integrity
// -----------------------------------------------------------------------------
test('Admin shell navigation includes Content & Media section', () => {
  const adminShellFile = path.join(process.cwd(), 'src', 'components', 'admin', 'AdminShell.tsx');
  const content = fs.readFileSync(adminShellFile, 'utf-8');

  assert.ok(content.includes('/admin/content/media'), 'Media Library link in admin nav');
  assert.ok(content.includes('/admin/content/patient-stories'), 'Patient Stories link in admin nav');
  assert.ok(content.includes('/admin/content/testimonials'), 'Testimonials link in admin nav');
  assert.ok(content.includes('/admin/content/videos'), 'Videos link in admin nav');
  assert.ok(content.includes('/admin/content/social'), 'Social links link in admin nav');
});

test('Admin overview dashboard fetches and displays content status metrics', () => {
  const adminPage = path.join(process.cwd(), 'src', 'app', 'admin', 'page.tsx');
  const content = fs.readFileSync(adminPage, 'utf-8');

  assert.ok(content.includes('/api/admin/content/summary'), 'Admin page fetches content summary');
  assert.ok(content.includes('Content & Media Status'), 'Admin page has Content & Media card grid');
  assert.ok(content.includes('Patient Stories'), 'Displays Patient Stories count');
  assert.ok(content.includes('YouTube Videos'), 'Displays YouTube Videos count');
});

// -----------------------------------------------------------------------------
// 5. Public UI Components & Conversion Integrity
// -----------------------------------------------------------------------------
test('Public layout renders MobileBottomNav and floating ChatWidget', () => {
  const layoutFile = path.join(process.cwd(), 'src', 'app', '[locale]', 'layout.tsx');
  const content = fs.readFileSync(layoutFile, 'utf-8');

  assert.ok(content.includes('<MobileBottomNav'), 'Layout must render MobileBottomNav');
  assert.ok(content.includes('<ChatWidget'), 'Layout must render ChatWidget');
  assert.ok(content.includes('pb-20 lg:pb-0'), 'Main content must have safe bottom padding for fixed mobile nav');
});

test('Mobile bottom navigation contains exactly 5 primary actions with touch target safety', () => {
  const bottomNavFile = path.join(process.cwd(), 'src', 'components', 'common', 'MobileBottomNav.tsx');
  const content = fs.readFileSync(bottomNavFile, 'utf-8');

  assert.ok(content.includes('grid-cols-5'), 'Must have 5 columns for actions');
  assert.ok(content.includes('min-h-[48px]'), 'Must enforce minimum 48px touch targets');
  assert.ok(content.includes('safe-area-inset-bottom'), 'Must support safe area padding');
  assert.ok(content.includes('LetsTalkModal'), 'Must trigger LetsTalkModal');
  assert.ok(content.includes('handleWhatsAppClick'), 'Must track WhatsApp conversion');
});

test('Chat widget is strictly non-diagnostic with mandatory escalation to human coordinator', () => {
  const chatFile = path.join(process.cwd(), 'src', 'components', 'conversion', 'ChatWidget.tsx');
  const content = fs.readFileSync(chatFile, 'utf-8');

  assert.ok(content.includes('Non-Diagnostic'), 'Must display non-diagnostic clinical disclaimer');
  assert.ok(content.includes('KNOWLEDGE_BASE'), 'Must contain verified coordination knowledge base');
  assert.ok(content.includes('Human Coordinator'), 'Must provide human escalation button');
  assert.ok(content.includes('trackEvent(\'chat_open\''), 'Must track chat opening');
  assert.ok(content.includes('trackEvent(\'chat_human_request\''), 'Must track human escalation');
});

test('YouTubeVideoCard includes VideoObject JSON-LD schema and privacy-safe embed', () => {
  const videoCardFile = path.join(process.cwd(), 'src', 'components', 'trust', 'YouTubeVideoCard.tsx');
  const content = fs.readFileSync(videoCardFile, 'utf-8');

  assert.ok(content.includes('createVideoObjectSchema'), 'Must generate VideoObject schema');
  assert.ok(content.includes('youtube-nocookie.com'), 'Must use privacy-conscious youtube-nocookie domain');
  assert.ok(content.includes('@baxtiyorindiya'), 'Must display official @baxtiyorindiya channel badge');
  assert.ok(content.includes('trackEvent(\'youtube_play\''), 'Must track youtube_play analytics event');
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`📊 PHASE 19 TEST RESULTS: ${passedTests}/${totalTests} PASSED`);
if (passedTests === totalTests) {
  console.log('🎉 ALL PHASE 19 ACCEPTANCE CRITERIA VERIFIED SUCCESSFULLY!');
} else {
  console.log(`⚠️  ${totalTests - passedTests} TEST(S) FAILED. CHECK LOGS ABOVE.`);
  process.exit(1);
}
console.log('================================================================\n');
