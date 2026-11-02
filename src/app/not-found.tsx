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
    <div className="relative min-h-screen bg-film-black flex flex-col justify-between p-4 sm:p-8 overflow-hidden select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(224,79,38,0.16)_0%,transparent_70%)] pointer-events-none" />

      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
        <Logo size="sm" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1/90 border border-border-subtle font-mono text-[11px] font-semibold text-text-muted">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          <span>ERROR CODE: 404 // SCENE_MISSING</span>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col items-center text-center py-8">

        <div className="relative mb-8 group cursor-default">
          <div className="relative w-72 sm:w-96 rounded-2xl bg-surface-1 border border-border-subtle p-3 shadow-2xl overflow-hidden transition-transform duration-300 group-hover:scale-102">

            <div className="relative w-full h-10 mb-2 rounded-lg overflow-hidden border border-border-subtle bg-film-black">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "repeating-linear-gradient(-45deg, #ffffff 0, #ffffff 18px, #E04F26 18px, #E04F26 36px)",
                }}
              />
              <div className="absolute top-1 left-2 w-2.5 h-2.5 rounded-full bg-surface-1 border border-white/40 shadow-xs" />
            </div>

            <div className="rounded-xl bg-film-black/90 border border-border-subtle p-3 font-mono text-left flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-border-subtle">
                <span className="text-text-muted">PROD. TITLE</span>
                <span className="text-text-primary font-bold">STUDIOSPACE // MASTER REEL</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center py-1 border-b border-border-subtle">
                <div className="border-r border-border-subtle/60 pr-1">
                  <span className="text-[9px] text-text-muted block">SCENE</span>
                  <span className="text-base sm:text-lg font-black text-brand-orange">404</span>
                </div>
                <div className="border-r border-border-subtle/60 pr-1">
                  <span className="text-[9px] text-text-muted block">TAKE</span>
                  <span className="text-base sm:text-lg font-black text-text-primary">VOID</span>
                </div>
                <div>
                  <span className="text-[9px] text-text-muted block">STATUS</span>
                  <span className="text-xs sm:text-sm font-bold text-brand-amber">MISSING</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[9px] text-text-muted">
                <div>DIRECTOR: <strong className="text-text-secondary">ANONYMOUS</strong></div>
                <div className="text-right">STAGE REF: <strong className="text-text-secondary">0x404_NULL</strong></div>
              </div>

              <div className="text-[9px] text-text-muted flex items-center gap-1.5 pt-1 border-t border-border-subtle/40">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>AUDIO CH1/CH2: NC-25 MUTED (NO SIGNAL)</span>
              </div>
            </div>

          </div>

          <span className="block text-center font-mono text-[10px] text-text-muted mt-2 tracking-widest uppercase">
            CLICK SLATE TO ACTION
          </span>
        </div>

        <div className="font-mono text-xs font-semibold text-brand-orange uppercase tracking-widest mb-1.5">
          SOUNDSTAGE TELEMETRY
        </div>

        <h1 className="text-7xl sm:text-9xl font-black text-text-primary tracking-tighter leading-none mb-3">
          404
        </h1>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-3">
          Scene Not Found. <span className="text-brand-orange">Cut to Wrap.</span>
        </h2>

        <p className="text-text-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
          The production soundstage, reservation link, or call sheet you&apos;re seeking was struck from the master schedule or never made it out of pre-production.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-8">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface-1 border border-border-subtle font-mono text-xs text-left">
            <AlertTriangle className="w-4 h-4 text-brand-orange shrink-0" />
            <div>
              <span className="text-[10px] text-text-muted block">LOOKUP STATUS</span>
              <span className="font-semibold text-text-primary text-[11px]">STAGE_ID UNRESOLVED</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface-1 border border-border-subtle font-mono text-xs text-left">
            <EyeOff className="w-4 h-4 text-brand-amber shrink-0" />
            <div>
              <span className="text-[10px] text-text-muted block">FEED STATUS</span>
              <span className="font-semibold text-text-primary text-[11px]">OPTICAL CARRIER DARK</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface-1 border border-border-subtle font-mono text-xs text-left">
            <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-text-muted block">SYSTEM RECOVERY</span>
              <span className="font-semibold text-emerald-400 text-[11px]">READY FOR REDIRECT</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/studios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-sm font-bold shadow-[0_0_28px_rgba(224,79,38,0.4)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>Return to Floor Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-border-subtle font-mono text-sm font-semibold text-text-primary transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-brand-amber" />
            <span>Explore Available Stages</span>
          </Link>
        </div>

      </main>

      <footer className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-3 pt-6 border-t border-border-subtle/50 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-text-muted">
          <span className="text-text-secondary font-semibold">QUICK DISPATCH:</span>
          <Link href="/studios" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Search className="w-3 h-3" />
            <span>Search Studios</span>
          </Link>
          <span>•</span>
          <Link href="/how-it-works" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Production Workflow</span>
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Headphones className="w-3 h-3" />
            <span>Stage Concierge</span>
          </Link>
          <span>•</span>
          <Link href="/studios" className="hover:text-brand-orange transition-colors inline-flex items-center gap-1">
            <Sliders className="w-3 h-3" />
            <span>Grip & Lighting Kits</span>
          </Link>
        </div>

        <div className="font-mono text-[10px] text-text-muted/60 tracking-widest uppercase">
          SESSION: STAGE_MONITOR_ONLINE · NODE: LAX-STUDIO-ALPHA · STATUS: READY
        </div>
      </footer>
    </div>
  );
}

