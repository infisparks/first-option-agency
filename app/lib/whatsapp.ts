/**
 * WhatsApp Notification Helper using Cloudflare Worker Proxy
 * Worker URL: https://whatappapi.infisparks.workers.dev/
 */

export const WHATSAPP_WORKER_URL = "https://whatappapi.infisparks.workers.dev/";

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

// 4 Form Program Titles
export const PROGRAM_TITLES = {
  SALES: "Sales Consultant Program",
  WOMEN: "Women's Internship Drive",
  COMMON: "Internship Program",
  PAID: "Paid Internship Program",
} as const;

export type ProgramTitleType =
  | "Sales Consultant Program"
  | "Women's Internship Drive"
  | "Internship Program"
  | "Paid Internship Program"
  | string;

export const DEFAULT_PORTAL_LINK = "https://firstoptionagency.com/admin";

export interface SendWhatsAppMessageParams {
  to: string;
  templateName: string;
  languageCode?: string;
  parameters?: (string | number)[];
}

/**
 * Sends a templated WhatsApp message via Cloudflare Worker Proxy
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

    const result = await response.json().catch(() => ({ success: response.ok }));
    return result;
  } catch (error) {
    console.warn(`WhatsApp notification error for ${to}:`, error);
    return { success: false, error };
  }
}

export interface ApplicationNotificationParams {
  candidatePhone: string;
  candidateName: string;
  applicationId: string;
  candidateEmail: string;
  city: string;
  programTitle: ProgramTitleType;
  portalLink?: string;
}

/**
 * Sends candidate confirmation and notifies ALL 3 admin WhatsApp numbers
 * with dynamic custom title based on the form (Sales, Women, Common, Paid)
 */
export async function triggerApplicationWhatsAppNotifications({
  candidatePhone,
  candidateName,
  applicationId,
  candidateEmail,
  city,
  programTitle,
  portalLink = DEFAULT_PORTAL_LINK,
}: ApplicationNotificationParams) {
  const promises: Promise<any>[] = [];

  // Clean candidate phone number
  let cleanCandidatePhone = candidatePhone.toString().replace(/\D/g, "");
  if (cleanCandidatePhone.length === 10) {
    cleanCandidatePhone = "91" + cleanCandidatePhone;
  }

  // 1. Send confirmation message to candidate
  // Template: internship_application_received
  // Variables:
  // {{1}} = Candidate Name
  // {{2}} = Program Title (e.g. "Women's Internship Drive" / "Sales Consultant Program" / "Internship Program" / "Paid Internship Program")
  // {{3}} = Application ID (e.g. "FOA-INT-2026-1234")
  if (cleanCandidatePhone) {
    promises.push(
      sendWhatsAppTemplate({
        to: cleanCandidatePhone,
        templateName: WHATSAPP_TEMPLATES.CANDIDATE_CONFIRMATION,
        languageCode: "en",
        parameters: [candidateName, programTitle, applicationId],
      })
    );
  }

  // 2. Send instant lead alert to all 3 Admin numbers
  // Template: internship_admin_lead_alert
  // Variables:
  // {{1}} = Name
  // {{2}} = Email
  // {{3}} = Phone
  // {{4}} = City
  // {{5}} = Application ID
  // {{6}} = Portal Link
  // {{7}} = Applied For (Program Title)
  ADMIN_WHATSAPP_NUMBERS.forEach((adminPhone) => {
    promises.push(
      sendWhatsAppTemplate({
        to: adminPhone,
        templateName: WHATSAPP_TEMPLATES.ADMIN_LEAD_ALERT,
        languageCode: "en",
        parameters: [
          candidateName,
          candidateEmail || "N/A",
          cleanCandidatePhone || candidatePhone,
          city || "N/A",
          applicationId,
          portalLink,
          programTitle,
        ],
      })
    );
  });

  try {
    const results = await Promise.allSettled(promises);
    return results;
  } catch (e) {
    console.warn("WhatsApp batch notification error:", e);
  }
}

/**
 * Helper for Internship Form (Women, Common, or Paid)
 */
export async function triggerInternshipWhatsAppNotifications(
  params: Omit<ApplicationNotificationParams, "programTitle"> & {
    programTitle?: ProgramTitleType;
    mode?: "women" | "common" | "amount";
  }
) {
  let title = params.programTitle;
  if (!title) {
    if (params.mode === "amount") {
      title = PROGRAM_TITLES.PAID;
    } else if (params.mode === "common") {
      title = PROGRAM_TITLES.COMMON;
    } else {
      title = PROGRAM_TITLES.WOMEN;
    }
  }

  return triggerApplicationWhatsAppNotifications({
    ...params,
    programTitle: title,
  });
}

/**
 * Helper for Sales Consultant Form
 */
export async function triggerSalesConsultantWhatsAppNotifications(
  params: Omit<ApplicationNotificationParams, "programTitle"> & {
    programTitle?: ProgramTitleType;
  }
) {
  return triggerApplicationWhatsAppNotifications({
    ...params,
    programTitle: params.programTitle || PROGRAM_TITLES.SALES,
  });
}
