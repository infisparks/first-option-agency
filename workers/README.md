# Cloudflare Workers for First Option Agency

This directory contains production-ready Cloudflare Workers for **Razorpay Payment / Webhooks** and **Meta WhatsApp Cloud API Proxy**.

---

## 1. WhatsApp Cloud API Worker (`whatsapp-proxy-worker.js`)
**Worker Endpoint**: `https://whatappapi.infisparks.workers.dev/`

Proxies Meta WhatsApp Cloud API requests with CORS headers, formatting dynamic template parameters for both candidate confirmation and admin alerts.

### Supported Templates & Variable Mappings:

#### A. Candidate Confirmation (`internship_application_received`) - 3 Variables:
- `{{1}}` : **Candidate Name** (e.g. `Rahul Sharma`)
- `{{2}}` : **Custom Program Title** (e.g. `Women's Internship Drive` / `Sales Consultant Program` / `Internship Program` / `Paid Internship Program`)
- `{{3}}` : **Application ID** (e.g. `FOA-WOMEN-2026-1234`)

#### B. Admin Lead Alert (`internship_admin_lead_alert`) - 7 Variables:
- `{{1}}` : **Candidate Name**
- `{{2}}` : **Candidate Email**
- `{{3}}` : **Candidate Phone**
- `{{4}}` : **City**
- `{{5}}` : **Application ID**
- `{{6}}` : **Portal Link** (`https://firstoptionagency.com/admin`)
- `{{7}}` : **Applied For / Program Title** (e.g. `Sales Consultant Program`, `Women's Internship Drive`, `Internship Program`, `Paid Internship Program`)

### 4 Form Titles Configured:
1. **Sales Consultant**: `"Sales Consultant Program"` (`app/sales-consultant`)
2. **Women's Internship**: `"Women's Internship Drive"` (`app/internship` - default / `?type=women`)
3. **Common Internship**: `"Internship Program"` (`app/internship?type=common`)
4. **Paid Internship**: `"Paid Internship Program"` (`app/internship?payment` / `?type=amount`)

---

## 2. Razorpay & Firebase Webhook Worker (`razorpay-payment-worker.js`)

Handles Razorpay orders and webhooks, writing verified payment records directly to Firebase Realtime Database.

### Endpoints:
- `POST /create-order`: Generates Razorpay Order for ₹5,000 (includes `programTitle` in order `notes`).
- `POST /webhook`: Verifies HMAC SHA-256 signature from Razorpay and automatically flags `paymentStatus: "Paid"` in Firebase RTDB.
- `GET /health`: Health check endpoint.

---

## Deployment Instructions

### Option A: Quick Edit via Cloudflare Dashboard
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) -> **Workers & Pages**.
2. Select your worker (`whatappapi` or `first-option-razorpay-worker`).
3. Click **Edit Code** (Quick Edit) -> Paste the respective worker script (`whatsapp-proxy-worker.js` or `razorpay-payment-worker.js`) -> Click **Deploy**.

### Option B: Deploy via Wrangler CLI
```bash
cd workers
npx wrangler deploy --name whatappapi whatsapp-proxy-worker.js
npx wrangler deploy --name first-option-razorpay-worker razorpay-payment-worker.js
```
