import { Suspense } from "react";
import { Metadata } from "next";
import UnifiedAdminClient from "./UnifiedAdminClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Master Admin Dashboard | First Option Agency",
  description: "Unified admin portal for Internship & Sales Consultant applications.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MasterAdminPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F5F6F8",
          }}
        >
          <Loader2 size={32} className="animate-spin text-[#7C3AED]" />
        </div>
      }
    >
      <UnifiedAdminClient />
    </Suspense>
  );
}
