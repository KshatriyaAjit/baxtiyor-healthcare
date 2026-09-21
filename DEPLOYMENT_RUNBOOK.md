# Deployment Runbook: Baxtiyor Healthcare Website V2

**Document Version:** 2.0.0  
**Target Platform:** Next.js 15 App Router  
**Target Domain:** `https://baxtiyorhealthcare.com`  
**Primary Tech Stack:** Node.js v20+ / v22+, TypeScript, Tailwind CSS, Lucide React  

---

## 1. Pre-Deployment Verification Checklist

Before deploying to production, verify:
- [x] Clean production build: `npm run build` exits with code 0 (107/107 static pages generated).
- [x] Zero TypeScript or ESLint errors.
- [x] Security headers enabled in `next.config.js` (HSTS, CSP, X-Frame-Options, Permissions-Policy).
- [x] Sliding-window rate limiting active on `/api/leads` and `/api/upload`.
- [x] Storage directory (`/storage/reports`) writable on host filesystem.
- [x] Bilingual routes verified (`/en` and `/ar` with native RTL).
- [x] Zero-leak telemetry active (no patient medical reports or notes in analytics).

---

## 2. Deployment Options

### Option A: Vercel (Recommended for Next.js App Router)
1. **Repository Linkage:**
   - Connect the repository to your Vercel organization.
   - Framework preset: **Next.js**.
   - Root directory: `./`.
2. **Environment Variables:**
   - In Vercel Project Settings > Environment Variables, configure:
     - `NEXT_PUBLIC_SITE_URL`: `https://baxtiyorhealthcare.com`
     - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: `G-XXXXXXXXXX` (if active)
     - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `919999999999`
3. **Build & Output Settings:**
   - Build Command: `next build` (or `npm run build`)
   - Output Directory: `.next`
   - Node.js Version: `20.x` or `22.x`
4. **Custom Domain & SSL:**
   - Add `baxtiyorhealthcare.com` and `www.baxtiyorhealthcare.com`.
   - Vercel automatically issues and renews Let's Encrypt SSL certificates.

---

### Option B: Linux VPS / Dedicated Server with PM2 & Nginx

#### 1. Server Prerequisites
```bash
# Update and install Node.js 20 or 22 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx certbot python3-certbot-nginx

# Install PM2 process manager
sudo npm install -g pm2
```

#### 2. Project Setup on Server
```bash
cd /var/www/
git clone <repo-url> baxtiyor-healthcare
cd baxtiyor-healthcare

# Install dependencies
npm ci

# Configure production environment variables
cp .env.production.example .env.production
# (Edit .env.production with your real production values)

# Build the project
npm run build

# Start using PM2
pm2 start npm --name "baxtiyor-v2" -- start -- -p 3000
pm2 save
pm2 startup
```

#### 3. Nginx Reverse Proxy Configuration
Create `/etc/nginx/sites-available/baxtiyorhealthcare.com`:

```nginx
server {
    server_name baxtiyorhealthcare.com www.baxtiyorhealthcare.com;

    # Client body size limit for medical report uploads (15MB + buffer)
    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static asset caching
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Enable site and issue SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/baxtiyorhealthcare.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d baxtiyorhealthcare.com -d www.baxtiyorhealthcare.com
```

---

## 3. Post-Deployment Verification & Smoke Testing

Immediately after DNS propagation:
1. **Healthcheck Probe:**
   ```bash
   curl -I https://baxtiyorhealthcare.com/api/health
   # Expected: HTTP 200 OK, Content-Type: application/json
   ```
2. **Execute Automated Smoke Test:**
   ```bash
   node scripts/production-smoke-test.mjs --url=https://baxtiyorhealthcare.com
   ```
3. **Verify Header Security:**
   ```bash
   curl -I https://baxtiyorhealthcare.com/en
   # Check presence of Strict-Transport-Security, X-Frame-Options, Permissions-Policy
   ```

---

## 4. Search Engine Sitemap & Indexing Submission

Submit the dynamic XML sitemap to search engines:

1. **Google Search Console (GSC):**
   - Add property: `https://baxtiyorhealthcare.com` (Domain or URL Prefix).
   - Go to **Sitemaps** in the left sidebar.
   - Submit: `https://baxtiyorhealthcare.com/sitemap.xml`.
   - Verify that all 107 URLs are discovered.

2. **Bing Webmaster Tools:**
   - Import verification from Google Search Console.
   - Submit sitemap: `https://baxtiyorhealthcare.com/sitemap.xml`.

3. **Yandex Webmaster (Crucial for CIS & Central Asian Visibility):**
   - Add site: `baxtiyorhealthcare.com`.
   - Add sitemap: `https://baxtiyorhealthcare.com/sitemap.xml`.

---

## 5. Ongoing Monitoring & Incident Response

- **Uptime Monitoring:** Configure an external uptime checker (e.g. UptimeRobot or Better Uptime) targeting `https://baxtiyorhealthcare.com/api/health` with a 2-minute interval.
- **Log Inspection (PM2):** `pm2 logs baxtiyor-v2`
- **Leads Storage Backup:** Schedule a nightly backup cron job for `/var/www/baxtiyor-healthcare/storage/` to an encrypted, isolated private backup repository.

