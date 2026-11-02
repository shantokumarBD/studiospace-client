import CategorySection from "@/components/Home/CategorySection";
import FeaturedStudios from "@/components/Home/FeaturedStudios";
import Hero from "@/components/Home/Hero";
import React, { Suspense } from "react";
import HowItWorks from "@/components/Home/HowItWorks";
import HostGuarantee from "@/components/Home/HostGuarantee";
import ModernLoader from "@/components/Shared/ModernLoader";

export default function HomePage() {
  return (
    <div>
      <main>
        <Hero />
        <CategorySection />
        <Suspense
          fallback={
            <ModernLoader
              size="lg"
              text="Loading Featured Studios..."
              subtext="TOP RATED PRODUCTION STAGES"
            />
          }
        >
          <FeaturedStudios />
        </Suspense>
        <HowItWorks />
        <HostGuarantee />
      </main>
    </div>
  );
}
