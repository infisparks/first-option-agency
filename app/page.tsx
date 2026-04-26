"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Industries from "./components/Industries";
import HowItWorks from "./components/HowItWorks";
import ContactFooter from "./components/ContactFooter";
import BookDemoModal from "./components/BookDemoModal";
import GoToTop from "./components/GoToTop";

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
