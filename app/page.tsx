import Image from "next/image";
import { BenefitsSection } from "@/components/landing/layout/sections/benefits";
import { FeaturesSection } from "@/components/landing/layout/sections/features";
import { HeroSection } from "@/components/landing/layout/sections/hero";
import { ServicesSection } from "@/components/landing/layout/sections/services";
import LandingNavbar from "@/components/landing/layout/LandingNavbar"
export default function Home() {
  return (
    <main className="bg-[#111111] flex min-h-screen flex-col items-center justify-between">
      <LandingNavbar />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
    </main>
  );
}
