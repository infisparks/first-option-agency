import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/app/constants/services";
import Navbar from "@/app/components/Navbar";
import ContactFooter from "@/app/components/ContactFooter";
import ServiceContent from "./ServiceContent";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | First Option Agency`,
    description: service.fullDesc,
    keywords: `${service.mainKeyword}, marketing services, global`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.fullDesc,
            "provider": {
              "@type": "ProfessionalService",
              "name": "First Option Agency",
              "url": "https://firstoptionagency.com"
            },
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Performance Marketing Services",
              "itemListElement": service.benefits.map((benefit, i) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": benefit
                }
              }))
            }
          }),
        }}
      />
      <Navbar />
      <main style={{ background: "#F5F6F8", minHeight: "100vh", paddingTop: "clamp(120px, 15vw, 160px)", paddingBottom: "100px" }}>
        <ServiceContent service={service} />
      </main>
      <ContactFooter />
    </>
  );
}
