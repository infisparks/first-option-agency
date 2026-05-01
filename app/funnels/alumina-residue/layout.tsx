import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "High Alumina Residue Oxide Powder - First Option Industrial",
  description: "Bulk supply of High Alumina Residue Oxide Powder for Cement & Steel industries. Lab-tested quality, direct source, zero middlemen.",
  alternates: {
    canonical: "/funnels/alumina-residue",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
