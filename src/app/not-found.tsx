"use client";

import Link from "next/link";
import {
  ArrowRight,
  Compass,
  AlertTriangle,
  EyeOff,
  Radio,
  Search,
  Calendar,
  Headphones,
  Sliders,
} from "lucide-react";
import Logo from "@/components/Shared/Logo";

export default function NotFound() {
  return (
    <div className="relative min-h-screen lg:h-screen lg:overflow-hidden bg-film-black flex flex-col justify-between p-4 sm:p-6 select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(224,79,38,0.14)_0%,transparent_70%)] pointer-events-none" />

      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between">
        <Logo size="sm" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-1/90 border border-border-subtle font-mono text-[10px] font-semibold text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
          <span>ERROR CODE: 404 // SCENE_MISSING</span>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-2xl mx-auto my-auto flex flex-col items-center text-center py-4 sm:py-6">
        <div className="relative mb-5 group cursor-default">
          <div className="relative w-64 sm:w-72 rounded-2xl bg-surface-1 border border-border-subtle p-2.5 shadow-2xl overflow-hidden transition-transform duration-300 group-hover:scale-102">
            <div className="relative w-full h-8 mb-2 rounded-lg overflow-hidden border border-border-subtle bg-film-black">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 14px, #E04F26 14px, #E04F26 28px)",
                }}
              />
              <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-surface-1 border border-white/40 shadow-xs" />
            </div>

            <div className="rounded-xl bg-film-black/90 border border-border-subtle p-2.5 font-mono text-left flex flex-col gap-2">
              <div className="flex items-center justify-between text-[9px] pb-1 border-b border-border-subtle">
                <span className="text-text-muted">PROD. TITLE</span>
                <span className="text-text-primary font-bold">STUDIOSPACE // MASTER REEL</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center py-1 border-b border-border-subtle">
                <div className="border-r border-border-subtle/60 pr-1">
                  <span className="text-[8px] text-text-muted block">SCENE</span>
                  <span className="text-sm sm:text-base font-black text-brand-orange">404</span>
                </div>
                <div className="border-r border-border-subtle/60 pr-1">
                  <span className="text-[8px] text-text-muted block">TAKE</span>
                  <span className="text-sm sm:text-base font-black text-text-primary">VOID</span>
                </div>
                <div>
                  <span className="text-[8px] text-text-muted block">STATUS</span>
                  <span className="text-[11px] sm:text-xs font-bold text-brand-amber">MISSING</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[8.5px] text-text-muted">
                <div>DIRECTOR: <strong className="text-text-secondary">ANONYMOUS</strong></div>
                <div className="text-right">STAGE REF: <strong className="text-text-secondary">0x404_NULL</strong></div>
              </div>

              <div className="text-[8.5px] text-text-muted flex items-center gap-1.5 pt-1 border-t border-border-subtle/40">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>AUDIO CH1/CH2: NC-25 MUTED (NO SIGNAL)</span>
              </div>
            </div>
          </div>

          <span className="block text-center font-mono text-[9px] text-text-muted mt-1.5 tracking-widest uppercase">
            CLICK SLATE TO ACTION
          </span>
        </div>

        <div className="font-mono text-[10px] sm:text-xs font-semibold text-brand-orange uppercase tracking-widest mb-1">
          SOUNDSTAGE TELEMETRY
        </div>

        <h1 className="text-5xl sm:text-7xl font-black text-text-primary tracking-tighter leading-none mb-2">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight mb-2">
          Scene Not Found. <span className="text-brand-orange">Cut to Wrap.</span>
        </h2>

        <p className="text-text-secondary text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-5">
          The production soundstage, reservation link, or call sheet you&apos;re seeking was struck from the master schedule or never made it out of pre-production.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-xl mb-6">
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-1 border border-border-subtle font-mono text-left">
            <AlertTriangle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <div>
              <span className="text-[9px] text-text-muted block">LOOKUP STATUS</span>
              <span className="font-semibold text-text-primary text-[10.5px]">STAGE_ID UNRESOLVED</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-1 border border-border-subtle font-mono text-left">
            <EyeOff className="w-3.5 h-3.5 text-brand-amber shrink-0" />
            <div>
              <span className="text-[9px] text-text-muted block">FEED STATUS</span>
              <span className="font-semibold text-text-primary text-[10.5px]">OPTICAL CARRIER DARK</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-1 border border-border-subtle font-mono text-left">
            <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[9px] text-text-muted block">SYSTEM RECOVERY</span>
              <span className="font-semibold text-emerald-400 text-[10.5px]">READY FOR REDIRECT</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/studios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-[0_0_24px_rgba(224,79,38,0.35)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>Return to Floor Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-border-subtle font-mono text-xs font-semibold text-text-primary transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-brand-amber" />
            <span>Explore Available Stages</span>
          </Link>
        </div>
      </main>

      <footer className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-2 pt-4 border-t border-border-subtle/50 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-text-muted">
          <span className="text-text-secondary font-semibold">QUICK DISPATCH:</span>
          <Link href="/studios" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Search className="w-3 h-3" />
            <span>Search Studios</span>
          </Link>
          <span>•</span>
          <Link href="/studios" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>My Call Sheets</span>
          </Link>
          <span>•</span>
          <Link href="/studios" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Headphones className="w-3 h-3" />
            <span>Stage Concierge</span>
          </Link>
          <span>•</span>
          <Link href="/studios" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Sliders className="w-3 h-3" />
            <span>Grip & Lighting Kits</span>
          </Link>
        </div>

        <div className="font-mono text-[9px] text-text-muted/60 tracking-widest uppercase">
          SESSION: STAGE_MONITOR_ONLINE · NODE: LAX-STUDIO-ALPHA · STATUS: READY
        </div>
      </footer>
    </div>
  );
}
