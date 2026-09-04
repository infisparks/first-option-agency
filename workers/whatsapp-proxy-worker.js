/**
 * Cloudflare Worker for Meta WhatsApp Cloud API Proxy
 * Handles Dynamic Template Messaging for First Option Agency
 * 
 * Supports:
 * - Template: `internship_application_received` (Candidate Confirmation with 3 params: [Name, ProgramTitle, ApplicationId])
 * - Template: `internship_admin_lead_alert` (Admin Alert with 7 params: [Name, Email, Phone, City, ApplicationId, PortalLink, ProgramTitle])
 * - 4 Program Titles:
 *   1. "Sales Consultant Program"
 *   2. "Women's Internship Drive"
 *   3. "Internship Program"
 *   4. "Paid Internship Program"
 */

// Default Configuration (Can be overridden via Cloudflare Environment Variables)
const WHATSAPP_ACCESS_TOKEN = "YOUR_META_WHATSAPP_SYSTEM_USER_ACCESS_TOKEN";
const WHATSAPP_PHONE_NUMBER_ID = "1033400892429925"; // From Meta WhatsApp Business Manager
const GRAPH_API_VERSION = "v21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
};

export default {
  async fetch(request, env) {
    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);
    const pathname = url.pathname;

    // 2. Health Check
    if (request.method === "GET" && (pathname === "/" || pathname === "/health")) {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "First Option Agency - WhatsApp Cloud API Worker",
          timestamp: new Date().toISOString(),
          templatesSupported: [
            "internship_application_received",
            "internship_admin_lead_alert",
          ],
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 3. POST / (Send WhatsApp Template Message)
    if (request.method === "POST") {
      try {
        const body = await request.json().catch(() => ({}));
        const { to, templateName, languageCode = "en", parameters = [] } = body;

        if (!to || !templateName) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Missing required fields: 'to' and 'templateName' are required.",
            }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        // Clean recipient phone number (strip spaces, symbols, ensure clean digits)
        let cleanPhone = String(to).replace(/\D/g, "");
        if (cleanPhone.length === 10) {
          cleanPhone = "91" + cleanPhone;
        }

        const token = env?.WHATSAPP_ACCESS_TOKEN || WHATSAPP_ACCESS_TOKEN;
        const phoneId = env?.WHATSAPP_PHONE_NUMBER_ID || WHATSAPP_PHONE_NUMBER_ID;

        // Build Meta WhatsApp Graph API Payload with dynamic body parameters
        const metaPayload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanPhone,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: languageCode || "en",
            },
            components:
              parameters && Array.isArray(parameters) && parameters.length > 0
                ? [
                    {
                      type: "body",
                      parameters: parameters.map((val) => ({
                        type: "text",
                        text: String(val ?? ""),
                      })),
                    },
                  ]
                : [],
          },
        };

        const metaResponse = await fetch(
          `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneId}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(metaPayload),
          }
        );

        const metaData = await metaResponse.json();

        return new Response(
          JSON.stringify({
            success: metaResponse.ok,
            status: metaResponse.status,
            data: metaData,
          }),
          {
            status: metaResponse.status,
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

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
};
