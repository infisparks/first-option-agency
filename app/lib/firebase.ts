import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, set, update, serverTimestamp } from "firebase/database";
import { getAuth } from "firebase/auth";

// Exact Firebase project configuration for firstoptioncom-a0713 (Realtime Database & Auth Only)
export const firebaseConfig = {
  apiKey: "AIzaSyCp1PU9Pl5HuznN37TjswOcSl6sOr7tKIQ",
  authDomain: "firstoptioncom-a0713.firebaseapp.com",
  databaseURL: "https://firstoptioncom-a0713-default-rtdb.firebaseio.com",
  projectId: "firstoptioncom-a0713",
  storageBucket: "firstoptioncom-a0713.firebasestorage.app",
  messagingSenderId: "174016670608",
  appId: "1:174016670608:web:1d22233f32cbd46cc16115",
};

// Admin UID constant
export const ADMIN_UID = "5ekfOeEqIgZXqpPW7kH2v6Top5y1";

// Singleton App Instance
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const rtdb = getDatabase(app);
export const auth = getAuth(app);

export interface InternshipApplicationPayload {
  applicationId: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  city: string;
  gender?: string;
  isFemaleConfirmed?: boolean;
  qualification: string;
  passingYear: string;
  skills: string[];
  aboutYourself: string;
  resumeUrl: string;
  submittedAt: string;
  // Lead type & Payment fields
  type?: string;
  status?: string;
  leadType?: "women" | "common" | "amount" | "seat-confirmation" | string;
  programTitle?: string;
  paymentStatus?: "Paid" | "Free" | "Unpaid" | "Pending" | string;
  amountPaid?: number;
  paymentId?: string;
  orderId?: string;
  paidAt?: string;
  slotDate?: string;
  slotDateKey?: string;
  slotTime?: string;
  slotDateTime?: string;
  mentorName?: string;
  currentTechnology?: string;
  isSeatConfirmedCheckbox?: boolean;
  isDuplicateSubmission?: boolean;
  previousApplicationId?: string;
  submissionCount?: number;
}

/**
 * Saves internship application directly to Firebase Realtime Database.
 */
export async function saveApplicationToRealtimeDb(
  data: InternshipApplicationPayload
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const appRef = ref(rtdb, `internship_applications/${data.applicationId}`);
    await set(appRef, {
      ...data,
      type: data.type || data.leadType || "internship",
      status: data.status || "submit",
      createdAt: serverTimestamp(),
    });

    return { success: true, id: data.applicationId };
  } catch (err: any) {
    console.warn("Realtime DB save error:", err?.message || err);
    return { success: false, id: data.applicationId, error: err?.message };
  }
}

/**
 * Books a 10-minute mentor slot in Realtime DB (both under internship_applications and mentor_slots index).
 * Performs atomic collision check to guarantee no two candidates can book the same slot.
 * If the same candidate books again, keeps both bookings active and marks the new one as a repeat/double booking.
 */
export async function bookMentorSlotInRealtimeDb(
  data: InternshipApplicationPayload & { slotDateKey?: string }
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const dateKey = data.slotDateKey || data.slotDate || "";
    const sanitizedDate = dateKey.replace(/[^a-zA-Z0-9_-]/g, "_");
    const sanitizedTime = (data.slotTime || "").replace(/[^a-zA-Z0-9_-]/g, "_");

    const { get } = await import("firebase/database");

    // 1. Collision check on mentor_slots index
    if (sanitizedDate && sanitizedTime) {
      const slotRef = ref(rtdb, `mentor_slots/faiz_sir/${sanitizedDate}/${sanitizedTime}`);
      const existingSlotSnap = await get(slotRef);
      if (existingSlotSnap.exists()) {
        return {
          success: false,
          id: data.applicationId,
          error: "This slot has already been booked. Please choose another available slot.",
        };
      }
    }

    // 2. Check if candidate previously booked (enforcing 1 mentorship session per candidate)
    const cleanPhone = (data.phone || "").replace(/\D/g, "");
    const allAppsRef = ref(rtdb, "internship_applications");
    const allAppsSnap = await get(allAppsRef);

    if (allAppsSnap.exists()) {
      const apps = Object.values(allAppsSnap.val()) as InternshipApplicationPayload[];

      // Check if candidate already has an existing mentorship slot booking
      const existingUserSlotApp = apps.find(
        (a) =>
          (a.phone || "").replace(/\D/g, "").slice(-10) === cleanPhone.slice(-10) &&
          cleanPhone.length >= 10 &&
          (a.leadType === "10-min-slots" ||
            a.type === "10-min-slots" ||
            (typeof a.applicationId === "string" && a.applicationId.startsWith("FOA-SLOT-")) ||
            Boolean(a.slotDate && a.slotTime))
      );

      if (existingUserSlotApp) {
        return {
          success: false,
          id: data.applicationId,
          error: "ALREADY_BOOKED",
          existingBooking: existingUserSlotApp,
        } as any;
      }

      // Check slot collision (same slot date & time)
      const alreadyBooked = apps.some(
        (a) =>
          (a.slotDateKey === dateKey ||
            a.slotDate === data.slotDate ||
            a.slotDate === dateKey ||
            (a.slotDateTime && a.slotDateTime.includes(dateKey))) &&
          a.slotTime &&
          a.slotTime.trim().toLowerCase() === (data.slotTime || "").trim().toLowerCase()
      );

      if (alreadyBooked) {
        return {
          success: false,
          id: data.applicationId,
          error: "This slot has already been booked. Please choose another available slot.",
        };
      }
    }

    // 3. Save main application record
    const appRef = ref(rtdb, `internship_applications/${data.applicationId}`);
    await set(appRef, {
      ...data,
      type: "10-min-slots",
      leadType: "10-min-slots",
      status: data.status || "submit",
      createdAt: serverTimestamp(),
    });

    // 4. Mark slot as booked in mentor_slots index (under both dateKey and formatted slotDate)
    if (sanitizedDate && sanitizedTime) {
      const slotRef = ref(rtdb, `mentor_slots/faiz_sir/${sanitizedDate}/${sanitizedTime}`);
      await set(slotRef, {
        applicationId: data.applicationId,
        studentName: data.fullName,
        phone: data.phone,
        countryCode: data.countryCode || "+91",
        currentTechnology: data.currentTechnology || "",
        slotDateKey: dateKey,
        slotDate: data.slotDate,
        slotTime: data.slotTime,
        isDuplicateSubmission: Boolean(data.isDuplicateSubmission),
        bookedAt: serverTimestamp(),
      });

      if (data.slotDate && data.slotDate !== dateKey) {
        const altSanitizedDate = data.slotDate.replace(/[^a-zA-Z0-9_-]/g, "_");
        const altSlotRef = ref(rtdb, `mentor_slots/faiz_sir/${altSanitizedDate}/${sanitizedTime}`);
        await set(altSlotRef, {
          applicationId: data.applicationId,
          studentName: data.fullName,
          slotDate: data.slotDate,
          slotTime: data.slotTime,
          isDuplicateSubmission: Boolean(data.isDuplicateSubmission),
          bookedAt: serverTimestamp(),
        });
      }
    }

    return { success: true, id: data.applicationId };
  } catch (err: any) {
    console.warn("Realtime DB Mentor Slot save error:", err?.message || err);
    return { success: false, id: data.applicationId, error: err?.message };
  }
}

/**
 * Fetches all booked slot keys for Faiz Sir on a given date (checking both index and applications).
 */
export async function fetchBookedMentorSlots(
  dateKey: string,
  displayDate?: string
): Promise<string[]> {
  try {
    const bookedSet = new Set<string>();
    const { get } = await import("firebase/database");

    // 1. Check mentor_slots index for dateKey
    const sanitizedDate = dateKey.replace(/[^a-zA-Z0-9_-]/g, "_");
    const dateSlotsRef = ref(rtdb, `mentor_slots/faiz_sir/${sanitizedDate}`);
    const snapshot = await get(dateSlotsRef);
    if (snapshot.exists()) {
      const val = snapshot.val();
      Object.keys(val).forEach((k) => {
        if (val[k]?.slotTime) bookedSet.add(val[k].slotTime.trim());
      });
    }

    // 2. Check mentor_slots index for displayDate if provided
    if (displayDate) {
      const sanitizedAltDate = displayDate.replace(/[^a-zA-Z0-9_-]/g, "_");
      const altDateSlotsRef = ref(rtdb, `mentor_slots/faiz_sir/${sanitizedAltDate}`);
      const altSnap = await get(altDateSlotsRef);
      if (altSnap.exists()) {
        const altVal = altSnap.val();
        Object.keys(altVal).forEach((k) => {
          if (altVal[k]?.slotTime) bookedSet.add(altVal[k].slotTime.trim());
        });
      }
    }

    // 3. Check internship_applications collection for any matching date bookings
    const appsRef = ref(rtdb, "internship_applications");
    const appsSnap = await get(appsRef);
    if (appsSnap.exists()) {
      const apps = Object.values(appsSnap.val()) as any[];
      apps.forEach((a) => {
        const matchesDate =
          a.slotDateKey === dateKey ||
          a.slotDate === dateKey ||
          (displayDate && a.slotDate === displayDate) ||
          (a.slotDateTime && a.slotDateTime.includes(dateKey));

        if (matchesDate && a.slotTime) {
          bookedSet.add(a.slotTime.trim());
        }
      });
    }

    return Array.from(bookedSet);
  } catch (err) {
    console.warn("Error fetching booked slots:", err);
    return [];
  }
}

/**
 * Checks if a candidate with the given phone number already has an existing booked mentorship session.
 */
export async function checkExistingMentorBooking(
  phone: string
): Promise<InternshipApplicationPayload | null> {
  try {
    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (cleanPhone.length < 10) return null;

    const { get } = await import("firebase/database");
    const allAppsRef = ref(rtdb, "internship_applications");
    const allAppsSnap = await get(allAppsRef);

    if (allAppsSnap.exists()) {
      const apps = Object.values(allAppsSnap.val()) as InternshipApplicationPayload[];
      const existing = apps.find(
        (a) =>
          (a.phone || "").replace(/\D/g, "").slice(-10) === cleanPhone.slice(-10) &&
          (a.leadType === "10-min-slots" ||
            a.type === "10-min-slots" ||
            (typeof a.applicationId === "string" && a.applicationId.startsWith("FOA-SLOT-")) ||
            Boolean(a.slotDate && a.slotTime))
      );
      return existing || null;
    }
    return null;
  } catch (err) {
    console.warn("Error checking existing mentor booking:", err);
    return null;
  }
}

/**
 * Updates an existing internship application directly in Firebase Realtime Database.
 */
export async function updateApplicationInRealtimeDb(
  applicationId: string,
  partialData: Partial<InternshipApplicationPayload>
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const appRef = ref(rtdb, `internship_applications/${applicationId}`);
    await update(appRef, {
      ...partialData,
      updatedAt: serverTimestamp(),
    });

    return { success: true, id: applicationId };
  } catch (err: any) {
    console.warn("Realtime DB update error:", err?.message || err);
    return { success: false, id: applicationId, error: err?.message };
  }
}

export interface SalesConsultantApplicationPayload {
  applicationId: string;
  fullName: string;
  phone: string;
  countryCode: string;
  city: string;
  email: string;
  age: string;
  programTitle?: string;
  type?: string;
  status?: string;
  // Sales Experience
  hasSalesExperience: boolean;
  salesExperienceDetails?: string;
  hasAgencyOrCommissionSales: boolean;
  productsSoldBefore: string;
  // Quick Sales Test
  expensiveObjectionHandling: string;
  whyGoodAtSales: string;
  submittedAt: string;
}

/**
 * Saves Sales Consultant application directly to Firebase Realtime Database.
 */
export async function saveSalesConsultantApplicationToRealtimeDb(
  data: SalesConsultantApplicationPayload
): Promise<{ success: boolean; id: string; error?: string }> {
  try {
    const appRef = ref(rtdb, `sales_consultant_applications/${data.applicationId}`);
    await set(appRef, {
      ...data,
      type: data.type || "sales-consultant",
      status: data.status || "submit",
      createdAt: serverTimestamp(),
    });

    return { success: true, id: data.applicationId };
  } catch (err: any) {
    console.warn("Realtime DB save error for Sales Consultant:", err?.message || err);
    return { success: false, id: data.applicationId, error: err?.message };
  }
}

export default app;
