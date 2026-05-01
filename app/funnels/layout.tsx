import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Growth Solutions & High-Performance Funnels | First Option",
  description: "Manage and monitor your high-performance conversion funnels. Each page is engineered for maximum ROI and deep engagement.",
  alternates: {
    canonical: "/funnels",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
