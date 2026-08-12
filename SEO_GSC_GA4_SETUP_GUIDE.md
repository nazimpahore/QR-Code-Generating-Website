# Comprehensive Google Search Console & Google Analytics (GA4) Setup Guide for QRcraft

This step-by-step guide explains how to connect your QR Code Generator website (**QRcraft**) to **Google Search Console** and **Google Analytics 4 (GA4)** as soon as your custom domain goes live.

---

## Part 1: Setting Up Google Search Console (GSC)

Google Search Console allows you to monitor search engine rankings, track organic search queries, submit your sitemap, and ensure Googlebot crawls all your pages.

### Step 1: Add Your Domain Property
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your Google account.
3. Click **"Add Property"**.
4. Select the **Domain** option (Recommended) and enter your domain name (e.g., `qrcraft.app`).

### Step 2: Verify Domain Ownership via DNS
1. Google will provide a unique **TXT record** string (e.g., `google-site-verification=abc123xyz...`).
2. Log into your domain registrar (e.g., Namecheap, Cloudflare, GoDaddy, Vercel, Netlify).
3. Navigate to **DNS Management / DNS Records**.
4. Add a new record:
   - **Type:** `TXT`
   - **Name / Host:** `@` (or leave blank depending on your host)
   - **Value:** Paste the Google verification string.
5. Save the DNS record and return to Google Search Console.
6. Click **Verify**. (If verification fails, wait 2–5 minutes for DNS propagation and retry).

### Step 3: Submit Your XML Sitemap
1. Once verified, open the left sidebar menu in Search Console and click **Sitemaps**.
2. Under "Add a new sitemap", enter: `sitemap.xml`.
3. Click **Submit**.
4. Google will index your homepage (`/`), saved QR page (`/#saved`), about page (`/#about`), and contact page (`/#contact`) along with multi-language `hreflang` variants.

---

## Part 2: Setting Up Google Analytics 4 (GA4)

Google Analytics 4 tracks user traffic, bounce rate, device usage, QR generation event counts, and geographical location.

### Step 1: Create a GA4 Account & Property
1. Go to [Google Analytics](https://analytics.google.com/).
2. Click **Admin** (gear icon) -> **Create Account**.
3. Set your account name (e.g., `QRcraft`).
4. Set up your Property Name (e.g., `QRcraft Website`) and choose your reporting time zone and currency.

### Step 2: Create a Web Data Stream
1. Choose **Web** as the platform.
2. Enter your Website URL (e.g., `https://qrcraft.app`) and Stream Name (e.g., `QRcraft Web Stream`).
3. Click **Create Stream**.
4. Copy your unique **Measurement ID** (format: `G-XXXXXXXXXX`).

### Step 3: Add GA4 Tracking Script to `index.html`
1. Open `index.html` in your project.
2. Add the Google Tag script inside the `<head>` section just above `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    send_page_view: true
  });
</script>
```
*(Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID).*

---

## Part 3: HTTPS & SSL Setup

Google uses HTTPS as a core ranking signal.
1. When deploying to modern hosting platforms (Vercel, Netlify, Cloudflare Pages, AWS Amplify), SSL certificates are provisioned automatically via **Let's Encrypt** for free.
2. Ensure **Enforce HTTPS / Always Use HTTPS** is enabled in your hosting settings so HTTP requests redirect (301) to HTTPS.

---

## Part 4: Testing Your SEO Setup

Once live, verify your setup using these official Google tools:

1. **Rich Results Test**: Test your JSON-LD Schema markup at [Google Rich Results Test](https://search.google.com/test/rich-results).
2. **PageSpeed Insights**: Verify performance and Core Web Vitals (LCP, FID/INP, CLS) at [Google PageSpeed Insights](https://pagespeed.web.dev/).
3. **Mobile-Friendly Test**: Confirm mobile responsiveness.
