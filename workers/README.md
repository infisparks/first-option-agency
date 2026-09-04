# Cloudflare Worker for Razorpay & Firebase Webhook

This Cloudflare Worker handles Razorpay payments and webhooks without requiring any server-side backend in Next.js, keeping your Next.js application 100% static.

## Features
1. **Order Creation (`POST /create-order`)**: Generates an official Razorpay order for ₹5,000 using your live API keys.
2. **Webhook Receiver (`POST /webhook`)**: Verifies HMAC SHA-256 signatures from Razorpay and updates the candidate's application in Firebase Realtime Database (`https://firstoptioncom-a0713-default-rtdb.firebaseio.com/internship_applications/{applicationId}.json`) directly via REST API.
3. **CORS Enabled**: Accepts requests from `firstoptionagency.com` and `localhost`.

---

## Deployment Options

### Option A: Via Cloudflare Dashboard (Quickest - 2 Minutes)
1. Go to **Cloudflare Dashboard** -> **Workers & Pages** -> **Create Application** -> **Create Worker**.
2. Name it (e.g. `first-option-razorpay-worker`) and click **Deploy**.
3. Click **Edit Code** (Quick Edit) and paste the complete content of `razorpay-payment-worker.js`.
4. Click **Deploy**.
5. Copy your worker URL (e.g. `https://first-option-razorpay-worker.<subdomain>.workers.dev`).

### Option B: Via Wrangler CLI
Run from the `workers` directory:
```bash
npx wrangler login
npx wrangler deploy
```

---

## Setting Up Razorpay Webhook
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Go to **Settings** -> **Webhooks** -> **Add New Webhook**.
3. Set **Webhook URL** to: `https://<YOUR_WORKER_URL>/webhook`
4. Set **Secret** to: `XtzQBL84oexfAFHDPOHSrXc4`
5. Select Active Events:
   - `payment.captured`
   - `order.paid`
   - `payment.failed`
6. Click **Save**.

Now, whenever a candidate pays ₹5,000 via Razorpay, the webhook will automatically verify the payment and flag the record as `Paid` in Firebase Realtime Database!
