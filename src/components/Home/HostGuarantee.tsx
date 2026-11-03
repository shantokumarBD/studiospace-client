import { ShieldCheck, BadgeCheck, Lock, Headphones, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function HostGuarantee() {
  return (
    <section className="py-16 sm:py-24 bg-film-black relative overflow-hidden border-t border-border-subtle/60">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="relative text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="absolute -top-8 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 font-extrabold text-6xl sm:text-8xl md:text-9xl text-text-primary/10 select-none pointer-events-none tracking-widest uppercase">
            SECURITY
          </span>

          <span className="relative z-10 font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
            ———— // PLATFORM ASSURANCES ————
          </span>

          <h2 className="relative z-10 font-extrabold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl mt-3 leading-tight">
            Host Guarantee &{" "}
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
              Creator Support
            </span>
          </h2>

          <p className="relative z-10 text-text-secondary text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Every booking on StudioSpace is backed by institutional legal safeguards, verified profiles, and live on-set support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

          <div className="lg:col-span-7 rounded-2xl bg-surface-1 border border-border-subtle p-6 sm:p-7 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-orange/15 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-orange shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider">
                  TIER-1 UNDERWRITTEN
                </span>
              </div>

              <div className="mb-4">
                <span className="font-mono text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber tracking-tight">
                  $1,000,000
                </span>
                <h3 className="text-base sm:text-lg font-bold text-text-primary mt-1">
                  Liability & Property Damage Protection
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mt-1 leading-relaxed">
                  Every confirmed reservation automatically includes commercial property damage coverage and third-party liability with zero host deductible.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle/60 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-text-secondary font-medium">Facility Damage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-text-secondary font-medium">Zero Deductible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-text-secondary font-medium">Injury Protection</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-surface-1 border border-border-subtle p-6 sm:p-7 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-amber shadow-md">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-bold text-text-muted px-2.5 py-0.5 rounded-full bg-surface-2 border border-border-subtle uppercase tracking-wider">
                  KYC VERIFIED
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1">
                100% Verified Production Profiles
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4">
                No anonymous bookings. Directors, photographers, and sound engineers undergo biometric ID verification and portfolio auditing before booking.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-surface-2/60 border border-border-subtle/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-film-black bg-brand-orange/20 text-brand-orange font-mono text-[9px] font-bold flex items-center justify-center">
                    DP
                  </div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-film-black bg-brand-amber/20 text-brand-amber font-mono text-[9px] font-bold flex items-center justify-center">
                    PH
                  </div>
                  <div className="inline-block h-6 w-6 rounded-full ring-2 ring-film-black bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold flex items-center justify-center">
                    AE
                  </div>
                </div>
                <span className="text-xs font-mono text-text-primary font-bold">
                  4,200+ Verified
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                ID APPROVED
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-surface-1 border border-border-subtle p-6 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-orange shadow-sm">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] font-bold text-brand-orange px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 uppercase tracking-wider">
                  STRIPE ESCROW
                </span>
              </div>

              <h3 className="text-base font-bold text-text-primary mb-1">
                Equipment Safety & Deposit Escrow
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                Security deposits are locked in an encrypted vault and automatically refunded upon zero-damage wrap.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-border-subtle/50 flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted">Settlement</span>
              <span className="text-emerald-400 font-bold">Automated & Safe</span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-surface-1 border border-border-subtle p-6 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-amber shadow-sm">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider">
                  24/7 DISPATCH
                </span>
              </div>

              <h3 className="text-base font-bold text-text-primary mb-1">
                24/7 Live Concierge & Host Support
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                Dedicated on-call production specialists to resolve load-in delays, overtime, and technical emergencies.
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-border-subtle/50 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Clock className="w-3.5 h-3.5 text-brand-amber" />
                <span>Response SLA</span>
              </div>
              <span className="text-brand-amber font-bold">&lt; 3 Minutes</span>
            </div>
          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1 border border-border-subtle p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-text-primary">
              Have an idle studio? Monetize safely with $1M coverage.
            </h4>
            <p className="text-text-secondary text-xs mt-0.5">
              Join 400+ protected stages and daylight lofts earning passive income on StudioSpace.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-md hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>List Your Space</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
