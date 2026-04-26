"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";

const Features = dynamic(() => import("./components/Features"), { ssr: true });
const Industries = dynamic(() => import("./components/Industries"), { ssr: true });
const HowItWorks = dynamic(() => import("./components/HowItWorks"), { ssr: true });
const ContactFooter = dynamic(() => import("./components/ContactFooter"), { ssr: true });
const BookDemoModal = dynamic(() => import("./components/BookDemoModal"), { ssr: false });
const GoToTop = dynamic(() => import("./components/GoToTop"), { ssr: false });

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <main>
        <HeroSection onBookDemo={() => setDemoOpen(true)} />
        <Features />
        <Industries />
        <HowItWorks />
        <ContactFooter />
      </main>
      <BookDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <GoToTop />
    </>
  );
}
