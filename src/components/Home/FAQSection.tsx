"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const categories = ["All Questions", "Booking & Hours", "Stage & Gear", "Host & Safety"];

const faqs = [
  {
    id: "faq-1",
    category: "Booking & Hours",
    num: "01",
    question: "What happens if our production runs past the booked shoot hours?",
    answer: "You can request an overtime extension directly through StudioSpace during your session. If the host does not have a back-to-back reservation, additional shoot hours are billed at the studio's regular hourly rate with transparent billing.",
  },
  {
    id: "faq-2",
    category: "Host & Safety",
    num: "02",
    question: "How does the security deposit and equipment insurance operate?",
    answer: "Security deposits are pre-authorized 24 hours prior to call time and automatically released within 48 hours post-wrap. Furthermore, every verified booking is backed by our comprehensive $1,000,000 stage damage liability policy.",
  },
  {
    id: "faq-3",
    category: "Stage & Gear",
    num: "03",
    question: "Can we bring our own cinema camera packages, lighting rigs, and catering?",
    answer: "Yes, external cinema equipment, generator trucks, and craft services are welcomed across all daylight lofts and sound stages. High-amperage 3-phase cam-lok power tie-ins are prepared by the host upon advance request.",
  },
  {
    id: "faq-4",
    category: "Booking & Hours",
    num: "04",
    question: "What is the cancellation and schedule change policy?",
    answer: "Full refunds are guaranteed for cancellations submitted 72 hours before session start. Rescheduling is completely free with mutual host agreement, ensuring production timelines stay flexible.",
  },
  {
    id: "faq-5",
    category: "Host & Safety",
    num: "05",
    question: "How do creative space owners list and monetize their studios?",
    answer: "Studio owners and stage operators can submit their space details with photos, power capacity, and hourly pricing. Our production vetting team inspects and approves listings within 12 business hours.",
  },
  {
    id: "faq-6",
    category: "Stage & Gear",
    num: "06",
    question: "Are sound stages calibrated for sync dialogue recording?",
    answer: "All listings classified as Sound Stages or Podcast Rooms feature verified STC acoustic isolation ratings and background noise decibel testing, guaranteeing clean dialogue capture without exterior bleed.",
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("All Questions");

  const filteredFaqs = activeCategory === "All Questions"
    ? faqs
    : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section className="relative bg-film-black py-20 lg:py-28 border-b border-border-subtle overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,79,38,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative mb-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
                ———— // PRODUCTION HELP DESK ————
              </span>

              <h2 className="font-extrabold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl mt-3 leading-tight">
                Frequently Asked{" "}
                <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
                  Questions
                </span>
              </h2>

              <p className="text-text-secondary text-sm sm:text-base mt-3 leading-relaxed">
                Everything you need to know about booking calibrated stages, security deposits, overtime rates, and creator protection.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-brand-orange text-white shadow-[0_0_15px_rgba(224,79,38,0.35)]"
                      : "bg-surface-1 hover:bg-surface-2 text-text-secondary border border-border-subtle"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="bg-surface-1/90 border border-border-subtle rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-text-primary">Still have questions?</h4>
                  <p className="text-xs text-text-secondary">Talk to our live studio dispatch</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5">
                Our on-site staging coordinators are available 24/7 to resolve technical spec inquiries and power tie-ins.
              </p>
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-brand-orange hover:text-brand-amber transition-colors uppercase tracking-wider"
              >
                <span>Browse Calibrated Stages</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion className="w-full flex flex-col gap-3.5">
              {filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-surface-1/90 hover:bg-surface-2/95 border border-border-subtle hover:border-brand-orange/40 rounded-2xl sm:rounded-3xl px-6 sm:px-7 transition-all duration-300 shadow-lg not-last:border-b-border-subtle"
                >
                  <AccordionTrigger className="py-5 font-bold text-text-primary hover:no-underline text-base sm:text-lg flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center text-left pr-4">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-brand-orange mr-3 shrink-0">
                        {faq.num}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-text-secondary text-sm sm:text-base leading-relaxed pb-5 pt-1 border-t border-border-subtle/50 mt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>

      </div>
    </section>
  );
}