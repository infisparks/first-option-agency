/**
 * WhatsApp Notification Helper using Cloudflare Worker Proxy
 * Worker URL: https://whatappapi.infisparks.workers.dev/
 */

const WHATSAPP_WORKER_URL = "https://whatappapi.infisparks.workers.dev/";

// Admin WhatsApp notification numbers to receive real-time lead alerts
export const ADMIN_WHATSAPP_NUMBERS = [
  "919958399157",
  "918329494445",
  "918108821353",
];

// Template Names configured for Meta WhatsApp Cloud API (Utility category)
export const WHATSAPP_TEMPLATES = {
  CANDIDATE_CONFIRMATION: "internship_application_received",
  ADMIN_LEAD_ALERT: "internship_admin_lead_alert",
};

interface SendWhatsAppMessageParams {
  to: string;
  templateName: string;
  languageCode?: string;
  parameters?: (string | number)[];
}

/**
 * Sends a templated WhatsApp message via Cloudflare Worker
 */
export async function sendWhatsAppTemplate({
  to,
  templateName,
  languageCode = "en",
  parameters = [],
}: SendWhatsAppMessageParams) {
  try {
    // Ensure clean digits format (e.g. 919876543210)
    let cleanPhone = to.toString().replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone;
    }

    const response = await fetch(WHATSAPP_WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: cleanPhone,
        templateName,
        languageCode,
        parameters,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.warn(`WhatsApp notification error for ${to}:`, error);
    return { success: false, error };
  }
}

/**
 * Sends candidate confirmation and notifies ALL 3 admin WhatsApp numbers
 */
export async function triggerInternshipWhatsAppNotifications({
  candidatePhone,
  candidateName,
  applicationId,
  candidateEmail,
  city,
}: {
  candidatePhone: string;
  candidateName: string;
  applicationId: string;
  candidateEmail: string;
  city: string;
}) {
  const promises: Promise<any>[] = [];

  // 1. Send confirmation message to the applying candidate
  if (candidatePhone) {
    promises.push(
      sendWhatsAppTemplate({
        to: candidatePhone,
        templateName: WHATSAPP_TEMPLATES.CANDIDATE_CONFIRMATION,
        languageCode: "en",
        parameters: [candidateName, applicationId],
      })
    );
  }

  // 2. Send instant lead alert to all 3 Admin numbers
  ADMIN_WHATSAPP_NUMBERS.forEach((adminPhone) => {
    promises.push(
      sendWhatsAppTemplate({
        to: adminPhone,
        templateName: WHATSAPP_TEMPLATES.ADMIN_LEAD_ALERT,
        languageCode: "en",
        parameters: [candidateName, candidateEmail, candidatePhone, city, applicationId],
      })
    );
  });

  // Execute all message dispatches in parallel
  try {
    await Promise.allSettled(promises);
  } catch (e) {
    console.warn("WhatsApp batch notification error:", e);
  }
}

/**
 * Sends Sales Consultant application alerts to candidate & all 3 admin WhatsApp numbers
 */
export async function triggerSalesConsultantWhatsAppNotifications({
  candidatePhone,
  candidateName,
  applicationId,
  candidateEmail,
  city,
}: {
  candidatePhone: string;
  candidateName: string;
  applicationId: string;
  candidateEmail: string;
  city: string;
}) {
  const promises: Promise<any>[] = [];

  // 1. Send confirmation message to the applying candidate
  if (candidatePhone) {
    promises.push(
      sendWhatsAppTemplate({
        to: candidatePhone,
        templateName: WHATSAPP_TEMPLATES.CANDIDATE_CONFIRMATION,
        languageCode: "en",
        parameters: [candidateName, applicationId],
      })
    );
  }

  // 2. Send instant lead alert to all 3 Admin numbers
  ADMIN_WHATSAPP_NUMBERS.forEach((adminPhone) => {
    promises.push(
      sendWhatsAppTemplate({
        to: adminPhone,
        templateName: WHATSAPP_TEMPLATES.ADMIN_LEAD_ALERT,
        languageCode: "en",
        parameters: [candidateName, candidateEmail, candidatePhone, city, applicationId],
      })
    );
  });

  try {
    await Promise.allSettled(promises);
  } catch (e) {
    console.warn("Sales WhatsApp notification error:", e);
  }
}

