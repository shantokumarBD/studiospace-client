import CategorySection from '@/components/Home/CategorySection'
import FeaturedStudios from '@/components/Home/FeaturedStudios'
import Hero from '@/components/Home/Hero'
import React, { Suspense } from "react";
import HowItWorks from '../components/Home/HowItWorks';
import FAQSection from '@/components/Home/FAQSection';

const page = () => {
  return (
    <div>
      <main>
        <Hero></Hero>
        <CategorySection></CategorySection>
        <Suspense fallback={<div className="text-center py-20 font-mono text-text-muted">Loading studios...</div>}>
          <FeaturedStudios />
        </Suspense>
        <HowItWorks></HowItWorks>
        <FAQSection></FAQSection>
      </main>
    </div>
  )
}

export default page