"use client";

import Link from "next/link";
import { ArrowUpRight, Camera, Film, Mic, Music, Palette } from "lucide-react";

const categories = [
  {
    id: "01",
    title: "Photo Studios",
    subtitle: "Daylight Lofts & Cyc Walls",
    price: "From $75/hr",
    icon: Camera,
    color: "#38BDF8",
    hoverBorder: "hover:border-[#38BDF8]/60",
    hoverGlow: "hover:shadow-[0_15px_30px_rgba(56,189,248,0.15)]",
    link: "/studios?category=Photo Studios",
  },
  {
    id: "02",
    title: "Sound Stages",
    subtitle: "Cinema Stages & Lighting Grids",
    price: "From $140/hr",
    icon: Film,
    color: "#E04F26",
    hoverBorder: "hover:border-brand-orange/60",
    hoverGlow: "hover:shadow-[0_15px_30px_rgba(224,79,38,0.2)]",
    link: "/studios?category=Sound Stages",
  },
  {
    id: "03",
    title: "Podcast Rooms",
    subtitle: "4K Multi-Cam & Audio Lounges",
    price: "From $65/hr",
    icon: Mic,
    color: "#A855F7",
    hoverBorder: "hover:border-[#A855F7]/60",
    hoverGlow: "hover:shadow-[0_15px_30px_rgba(168,85,247,0.18)]",
    link: "/studios?category=Podcast Rooms",
  },
  {
    id: "04",
    title: "Music Suites",
    subtitle: "Recording & Sound Control Rooms",
    price: "From $80/hr",
    icon: Music,
    color: "#22C55E",
    hoverBorder: "hover:border-[#22C55E]/60",
    hoverGlow: "hover:shadow-[0_15px_30px_rgba(34,197,94,0.15)]",
    link: "/studios?category=Music Suites",
  },
  {
    id: "05",
    title: "Art Workshops",
    subtitle: "Creative Lofts & Rehearsal Halls",
    price: "From $50/hr",
    icon: Palette,
    color: "#F59E0B",
    hoverBorder: "hover:border-brand-amber/60",
    hoverGlow: "hover:shadow-[0_15px_30px_rgba(245,158,11,0.18)]",
    link: "/studios?category=Art Workshops",
  },
];

export default function CategorySection() {
  return (
    <section className="relative bg-film-black py-16 sm:py-20 lg:py-24 border-b border-border-subtle overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(224,79,38,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="relative text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="absolute -top-8 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 font-extrabold text-6xl sm:text-8xl md:text-9xl text-text-primary/10 select-none pointer-events-none tracking-widest uppercase">
            STUDIOS
          </span>

          <span className="relative z-10 font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
            ———— // STUDIO CATEGORIES ————
          </span>

          <h2 className="relative z-10 font-extrabold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl mt-3 leading-tight">
            Browse by{" "}
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
              Studio Categories
            </span>
          </h2>

          <p className="relative z-10 text-text-secondary text-sm sm:text-base mt-3 max-w-lg mx-auto leading-relaxed">
            Find the right space for your next creative shoot, live podcast, or production session.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.link}
                className={`group relative h-full bg-surface-1/90 hover:bg-surface-2/95 border border-border-subtle ${cat.hoverBorder} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg ${cat.hoverGlow}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-text-primary group-hover:bg-surface-3 transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                      {cat.id} // TYPE
                    </span>
                    <h3 className="font-bold text-lg text-text-primary mt-1 group-hover:text-brand-orange transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-text-secondary text-xs mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3.5 border-t border-border-subtle/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted">Starting</span>
                  <span className="font-bold" style={{ color: cat.color }}>
                    {cat.price}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}