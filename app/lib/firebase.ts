import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, set, serverTimestamp } from "firebase/database";
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
  gender: string;
  isFemaleConfirmed: boolean;
  qualification: string;
  passingYear: string;
  skills: string[];
  aboutYourself: string;
  resumeUrl: string;
  submittedAt: string;
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
      status: "new",
      createdAt: serverTimestamp(),
    });

    return { success: true, id: data.applicationId };
  } catch (err: any) {
    console.warn("Realtime DB save error:", err?.message || err);
    return { success: false, id: data.applicationId, error: err?.message };
  }
}

export default app;
