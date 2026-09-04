import { Suspense } from "react";
import { Metadata } from "next";
import UnifiedAdminClient from "@/app/admin/UnifiedAdminClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sales Consultant Admin | First Option Agency",
  description: "Sales Consultant applications admin management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SalesConsultantAdminPage() {
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
      <UnifiedAdminClient initialTab="sales" />
    </Suspense>
  );
}
