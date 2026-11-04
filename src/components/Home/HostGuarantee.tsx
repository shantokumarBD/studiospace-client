import { ShieldCheck, BadgeCheck, Lock, Headphones, CheckCircle2, ArrowRight, Clock, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HostGuarantee() {
  return (
    <section className="py-16 sm:py-24 bg-film-black relative overflow-hidden border-t border-border-subtle/60">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-brand-orange/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="relative text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="absolute -top-8 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 font-extrabold text-6xl sm:text-8xl md:text-9xl text-text-primary/10 select-none pointer-events-none tracking-widest uppercase">
            SECURITY
          </span>

          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>PLATFORM ASSURANCES</span>
          </div>

          <h2 className="relative z-10 font-extrabold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl mt-1 leading-tight">
            Host Guarantee &{" "}
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
              Creator Support
            </span>
          </h2>

          <p className="relative z-10 text-text-secondary text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Every booking on StudioSpace is backed by institutional legal safeguards, verified profiles, and live on-set support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

          <div className="lg:col-span-7 rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-8 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-56 h-56 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-orange/15 transition-all" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange/15 to-brand-amber/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange shadow-inner">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border-emerald-500/20 uppercase tracking-wider h-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>TIER-1 UNDERWRITTEN</span>
                </Badge>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber tracking-tight">
                    $1,000,000
                  </span>
                  <span className="font-mono text-xs font-semibold text-text-muted uppercase">
                    Coverage Cap
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mt-2">
                  Comprehensive Stage & Property Protection
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Every confirmed reservation automatically includes commercial property damage coverage, equipment protection, and third-party liability with zero host deductible.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-2/60 border border-border-subtle/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-text-primary font-medium">Facility Damage</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-2/60 border border-border-subtle/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-text-primary font-medium">Zero Deductible</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-2/60 border border-border-subtle/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-text-primary font-medium">Injury Safeguards</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-8 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-amber/15 to-brand-orange/10 border border-brand-amber/30 flex items-center justify-center text-brand-amber shadow-inner">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-brand-amber px-3 py-1 rounded-full bg-brand-amber/10 border-brand-amber/20 uppercase tracking-wider h-auto">
                  <Sparkles className="w-3 h-3" />
                  <span>KYC VERIFIED</span>
                </Badge>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">
                100% Verified Production Profiles
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-6">
                No anonymous bookings. Directors, photographers, and audio engineers undergo biometric government ID verification and portfolio auditing before stepping onto any stage.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <Avatar size="sm" className="size-8 ring-2 ring-surface-1 border-0">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Producer"
                    />
                    <AvatarFallback className="text-[10px]">PR</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" className="size-8 ring-2 ring-surface-1 border-0">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                      alt="Director"
                    />
                    <AvatarFallback className="text-[10px]">DR</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm" className="size-8 ring-2 ring-surface-1 border-0">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                      alt="Cinematographer"
                    />
                    <AvatarFallback className="text-[10px]">DP</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-text-primary">
                    4,200+ Verified
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    Vetted Creators
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider shrink-0 h-auto">
                <CheckCircle2 className="w-3 h-3" />
                <span>ID APPROVED</span>
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-7 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-orange shadow-sm">
                  <Lock className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="font-mono text-[10px] font-bold text-brand-orange px-3 py-1 rounded-full bg-brand-orange/10 border-brand-orange/20 uppercase tracking-wider h-auto">
                  STRIPE ESCROW
                </Badge>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1.5">
                Equipment Safety & Deposit Escrow
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                Security deposits are locked in an encrypted vault and automatically refunded within 24 hours of a verified zero-damage wrap.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted">Settlement Protocol</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Automated & Encrypted</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-7 flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 shadow-xl group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-amber shadow-sm">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider">
                  24/7 ON-CALL
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1.5">
                24/7 Live Concierge & Dispatch Support
              </h3>

              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                Dedicated on-call production specialists to resolve load-in delays, emergency hold extensions, and technical stage questions.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-text-muted">
                <Clock className="w-3.5 h-3.5 text-brand-amber" />
                <span>Response SLA</span>
              </div>
              <span className="text-brand-amber font-bold">&lt; 3 Minutes Response</span>
            </div>
          </div>

        </div>

        <div className="mt-8 rounded-3xl bg-gradient-to-r from-surface-1 via-surface-2 to-surface-1 border border-border-subtle p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xl">
          <div className="max-w-xl text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold text-text-primary tracking-tight">
              Have an idle studio? Monetize safely with $1M coverage.
            </h4>
            <p className="text-text-secondary text-xs sm:text-sm mt-1">
              Join 400+ protected stages, soundproof suites, and daylight lofts earning passive income on StudioSpace.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-lg shadow-brand-orange/20 hover:opacity-90 transition-all cursor-pointer"
          >
            <span>List Your Space</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
