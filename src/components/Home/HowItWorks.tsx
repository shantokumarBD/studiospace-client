import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "STEP 01",
    phase: "Phase 01 // Scouting",
    accentColor: "text-[#818CF8]",
    titleAccent: "Discover & Filter",
    titleMain: "Calibrated Studios",
    description: "Scout verified sound stages, daylight lofts, and podcast rooms tailored to your production gear and crew capacity.",
    badgeBg: "bg-[#6366F1]",
    badgeText: "text-white",
    hoverBorder: "hover:border-[#6366F1]/50",
    hoverGlow: "hover:shadow-[0_15px_35px_rgba(99,102,241,0.15)]",
    tag: "Verified Locations",
  },
  {
    step: "STEP 02",
    phase: "Phase 02 // Scheduling",
    accentColor: "text-[#38BDF8]",
    titleAccent: "Select Shoot Hours &",
    titleMain: "Live Calendar",
    description: "Choose production dates with real-time hourly slots, synchronized host availability, and zero scheduling conflicts.",
    badgeBg: "bg-[#0284C7]",
    badgeText: "text-white",
    hoverBorder: "hover:border-[#38BDF8]/50",
    hoverGlow: "hover:shadow-[0_15px_35px_rgba(56,189,248,0.15)]",
    tag: "Real-time Availability",
  },
  {
    step: "STEP 03",
    phase: "Phase 03 // Reservation",
    accentColor: "text-brand-orange",
    titleAccent: "Book Instantly with",
    titleMain: "Transparent Rates",
    description: "Lock in your workspace instantly with clear hourly rates, deposit breakdown clarity, and fast reservation confirmation.",
    badgeBg: "bg-brand-orange",
    badgeText: "text-white",
    hoverBorder: "hover:border-brand-orange/50",
    hoverGlow: "hover:shadow-[0_15px_35px_rgba(224,79,38,0.18)]",
    tag: "Instant Confirmation",
  },
  {
    step: "STEP 04",
    phase: "Phase 04 // Production",
    accentColor: "text-[#A3E635]",
    titleAccent: "Roll Cameras &",
    titleMain: "Create Productions",
    description: "Arrive on stage, plug into calibrated power grids, and execute your creative vision with dedicated on-site host support.",
    badgeBg: "bg-[#84CC16]",
    badgeText: "text-slate-950",
    hoverBorder: "hover:border-[#84CC16]/50",
    hoverGlow: "hover:shadow-[0_15px_35px_rgba(132,204,22,0.15)]",
    tag: "On-Site Host Support",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 relative bg-film-black py-20 lg:py-28 border-b border-border-subtle overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(224,79,38,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="relative text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="absolute -top-8 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 font-extrabold text-6xl sm:text-8xl md:text-9xl text-white/[0.04] select-none pointer-events-none tracking-widest uppercase">
            WORKFLOW
          </span>

          <span className="relative z-10 font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
            ———— // PRODUCTION PIPELINE ————
          </span>

          <h2 className="relative z-10 font-extrabold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl mt-3 leading-tight">
            How Booking{" "}
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
              Works for Creators
            </span>
          </h2>

          <p className="relative z-10 text-text-secondary text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            From scouting calibrated spaces to final wrap-up, our streamlined workflow gets your creative production rolling in minutes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {["01 Scout Space", "02 Select Slots", "03 Instant Lock", "04 Shoot & Wrap"].map((label, i) => (
            <div key={label} className="inline-flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-surface-1 border border-border-subtle text-text-secondary">
                {label}
              </span>
              {i < 3 && <span className="text-text-muted text-xs sm:text-sm font-mono">→</span>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {steps.map((step) => (
            <Card
              key={step.step}
              className={`flex flex-row p-0 py-0 gap-0 bg-surface-1/95 hover:bg-surface-2 border-border-subtle ${step.hoverBorder} ${step.hoverGlow} rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 relative group`}
            >
              <div className={`w-11 sm:w-14 shrink-0 ${step.badgeBg} ${step.badgeText} flex items-center justify-center font-mono font-bold text-xs uppercase tracking-widest`}>
                <span className="[writing-mode:vertical-rl] rotate-180">
                  {step.step}
                </span>
              </div>

              <CardContent className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-text-muted uppercase tracking-widest block mb-2">
                    {step.phase}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                    <span className={`${step.accentColor} block`}>{step.titleAccent}</span>
                    <span className="text-text-primary block mt-0.5">{step.titleMain}</span>
                  </h3>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mt-3">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-text-muted group-hover:text-text-secondary transition-colors">
                    {step.tag}
                  </span>
                  <span className={`font-mono text-xs font-bold ${step.accentColor}`}>
                    {step.step}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 sm:pr-6 rounded-3xl sm:rounded-full bg-surface-1 border border-border-subtle shadow-xl">
            <div className="flex items-center gap-3 px-4 py-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-text-secondary">
                Over <strong className="text-text-primary">1,200+ productions</strong> booked this month
              </span>
            </div>
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(224,79,38,0.35)]"
            >
              <span>Explore Studios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}