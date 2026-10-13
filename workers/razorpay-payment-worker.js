/**
 * Cloudflare Worker for Razorpay Payment & Webhook Management
 * First Option Agency - Internship Program
 *
 * Supported Endpoints:
 * 1. POST /create-order  -> Creates a secure Razorpay Order for ₹5,000
 * 2. POST /webhook       -> Receives Razorpay webhook, validates signature, & updates Firebase RTDB
 * 3. GET  /health        -> Health check endpoint
 */

// Configuration defaults (can also be configured via Cloudflare Worker environment variables)
const RAZORPAY_KEY_ID = "rzp_live_TXvv4nCnkVjFWm";
const RAZORPAY_KEY_SECRET = "XtzQBL84oexfAFHDPOHSrXc4";
const FIREBASE_RTDB_URL = "https://firstoptioncom-a0713-default-rtdb.firebaseio.com";
const WEBHOOK_SECRET = "XtzQBL84oexfAFHDPOHSrXc4"; // Razorpay Webhook Secret

// Standard CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature, Authorization",
};

/**
 * Verify Razorpay Webhook HMAC SHA256 Signature using Web Crypto API
 */
async function verifyRazorpaySignature(bodyText, signature, secret) {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const messageData = encoder.encode(bodyText);
    const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, messageData);

    // Convert ArrayBuffer to Hex String
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return computedSignature.toLowerCase() === (signature || "").toLowerCase();
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    // Use environment variables if set in Cloudflare Dashboard, else fallback to constants
    const keyId = env?.RAZORPAY_KEY_ID || RAZORPAY_KEY_ID;
    const keySecret = env?.RAZORPAY_KEY_SECRET || RAZORPAY_KEY_SECRET;
    const rtdbUrl = env?.FIREBASE_RTDB_URL || FIREBASE_RTDB_URL;
    const webhookSecret = env?.WEBHOOK_SECRET || WEBHOOK_SECRET;

    // ─────────────────────────────────────────────────────────────
    // 1. GET / or /health -> Status Check
    // ─────────────────────────────────────────────────────────────
    if (request.method === "GET" && (pathname === "/" || pathname === "/health")) {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "First Option Agency - Razorpay Payment Worker",
          timestamp: new Date().toISOString(),
          endpoints: [
            "POST /create-order",
            "POST /webhook",
          ],
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // 2. POST /create-order -> Create Razorpay Order for ₹5,000
    // ─────────────────────────────────────────────────────────────
    if (request.method === "POST" && pathname === "/create-order") {
      try {
        const body = await request.json().catch(() => ({}));
        const applicationId = body.applicationId || `FOA-INT-${Date.now()}`;
        const amountInRupees = 5000;
        const amountInPaise = amountInRupees * 100; // 500000

        // Razorpay Basic Auth Header
        const basicAuth = btoa(`${keyId}:${keySecret}`);

        const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: "INR",
            receipt: `rcpt_${applicationId.slice(-10)}`,
            notes: {
              applicationId: applicationId,
              fullName: body.fullName || "",
              email: body.email || "",
              phone: body.phone || "",
              programTitle: body.programTitle || "Paid Internship Program",
              leadType: body.leadType || "amount",
            },
          }),
        });

        const orderData = await razorpayResponse.json();

        if (!razorpayResponse.ok) {
          return new Response(
            JSON.stringify({
              success: false,
              error: orderData.error?.description || "Failed to create Razorpay order",
            }),
            {
              status: razorpayResponse.status,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify({
            success: true,
            orderId: orderData.id,
            amount: orderData.amount,
            currency: orderData.currency,
            keyId: keyId,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ success: false, error: err.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. POST /webhook -> Razorpay Webhook Handler
    // ─────────────────────────────────────────────────────────────
    if (request.method === "POST" && pathname === "/webhook") {
      try {
        const signature = request.headers.get("X-Razorpay-Signature");
        const bodyText = await request.text();

        // Validate webhook signature
        if (signature) {
          const isValid = await verifyRazorpaySignature(bodyText, signature, webhookSecret);
          if (!isValid) {
            return new Response(
              JSON.stringify({ error: "Invalid Razorpay Webhook Signature" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
        }

        const webhookEvent = JSON.parse(bodyText);
        const eventType = webhookEvent.event;

        // Process successful payment events
        if (eventType === "payment.captured" || eventType === "order.paid") {
          const paymentEntity = webhookEvent.payload?.payment?.entity;
          const orderEntity = webhookEvent.payload?.order?.entity;

          const paymentId = paymentEntity?.id || "";
          const orderId = paymentEntity?.order_id || orderEntity?.id || "";
          const notes = paymentEntity?.notes || orderEntity?.notes || {};
          const applicationId = notes.applicationId;
          const programTitle = notes.programTitle || "Paid Internship Program";

          if (applicationId) {
            // Update Firebase Realtime Database record directly via REST API
            const updateUrl = `${rtdbUrl}/internship_applications/${applicationId}.json`;

            await fetch(updateUrl, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentStatus: "Paid",
                paymentId: paymentId,
                orderId: orderId,
                amountPaid: 5000,
                programTitle: programTitle,
                paidAt: new Date().toISOString(),
                webhookVerified: true,
              }),
            });
          }
        }

        return new Response(JSON.stringify({ status: "ok", received: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Webhook processing error:", err);
        return new Response(
          JSON.stringify({ status: "error", message: err.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // 404 for other endpoints
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
};
