"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, PlusCircle, CheckCircle2 } from "lucide-react";

const heroSlides = [
  {
    id: "01",
    badge: "Hollywood Stage Volume",
    studioName: "Horizon Stage 4 Cinema Volume",
    location: "Silver Lake, Los Angeles, CA",
    feature: "Motorized Grid · Cine Dolly Tracks · Drive-In Ramp",
    rate: "$180",
    rating: "5.0",
    shoots: "84 shoots",
    category: "Sound Stage",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "02",
    badge: "Cinema Production Stage",
    studioName: "Apex Daylight Cyc Wall Loft",
    location: "SoHo, Manhattan, NY",
    feature: "ARRI Camera Ready · 18ft Daylight Grid · HMU Vanity",
    rate: "$95",
    rating: "4.98",
    shoots: "42 shoots",
    category: "Photo Studio",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "03",
    badge: "Multi-Cam Live Podcast",
    studioName: "The Neon Foundry Broadcast Lounge",
    location: "Greenpoint, Brooklyn, NY",
    feature: "4x Shure SM7B Mics · 4K Blackmagic PTZ · Acoustic Slats",
    rate: "$85",
    rating: "4.96",
    shoots: "57 shoots",
    category: "Podcast Room",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1400&q=85",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-film-black py-12 lg:py-20 border-b border-border-subtle min-h-[calc(100vh-80px)] flex items-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(224,79,38,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute -right-40 top-1/4 w-[500px] h-[500px] bg-brand-amber/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
   
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-[0.22em] text-brand-orange uppercase">
              ———— // STUDIO BOOKING PLATFORM ————
            </span>

            <h1 className="font-extrabold tracking-tight text-text-primary leading-[0.92] text-5xl sm:text-7xl xl:text-[6.8rem]">
              CALIBRATED
              <br />
              SPACES FOR
              <br />
              <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber drop-shadow-[0_4px_25px_rgba(224,79,38,0.4)]">
                Film &amp; Sound.
              </span>
            </h1>

 
            <div className="w-[60px] h-[2px] bg-gradient-to-r from-brand-orange to-brand-amber my-1" />


            <p className="text-text-secondary text-base md:text-lg max-w-[460px] leading-relaxed">
              Discover verified photography lofts, soundproof film stages, and
              podcast rooms with clear hourly pricing and instant booking.
            </p>


            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-brand-orange to-brand-amber brand-glow hover:brand-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explore Studios
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-text-primary bg-surface-2/70 backdrop-blur-md border border-border-subtle hover:bg-surface-3 hover:border-brand-orange/40 transition-all"
              >
                <PlusCircle className="w-5 h-5 text-brand-amber" />
                Host Your Space
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border-subtle">
                <span className="w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_8px_#E04F26]" />
                <span className="font-mono text-xs md:text-sm font-medium text-text-primary">
                  500+ Studios
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border-subtle">
                <span className="w-2 h-2 rounded-full bg-brand-amber shadow-[0_0_8px_#F59E0B]" />
                <span className="font-mono text-xs md:text-sm font-medium text-text-primary">
                  120+ Cities
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border-subtle">
                <Star className="w-3.5 h-3.5 text-brand-amber fill-brand-amber" />
                <span className="font-mono text-xs md:text-sm font-medium text-text-primary">
                  4.9★ Rated
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs font-mono tracking-wider">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`pb-1 transition-all cursor-pointer ${
                    currentSlide === idx
                      ? "text-brand-orange font-bold border-b-2 border-brand-orange scale-110"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {s.id} · {s.category}
                </button>
              ))}
            </div>
          </div>


          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center">

            <div className="relative w-full max-w-[480px] aspect-[4/5] mb-12 sm:mb-14">
              {heroSlides.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-900 ease-out ${
                      isActive
                        ? "opacity-100 scale-100 z-10 pointer-events-auto"
                        : "opacity-0 scale-[0.98] z-0 pointer-events-none"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border-subtle shadow-2xl bg-surface-1 group">
                      <img
                        src={slide.image}
                        alt={slide.studioName}
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-film-black via-transparent to-transparent opacity-80" />


                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                        <span className="font-mono text-[11px] font-semibold tracking-wider text-text-primary uppercase">
                          {slide.badge}
                        </span>
                      </div>
                    </div>


                    <div className="absolute -bottom-8 -left-4 sm:-left-8 right-4 sm:right-auto sm:w-[360px] bg-surface-1/95 backdrop-blur-2xl border border-border-subtle rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] -rotate-3 hover:rotate-0 transition-transform duration-300">
                      <div className="flex items-center justify-between pb-2.5 border-b border-border-subtle">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                          <span className="font-mono text-xs font-semibold text-[#22C55E]">
                            ● Available Today
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-brand-amber">
                          <Star className="w-3.5 h-3.5 fill-brand-amber" />
                          <span className="font-mono text-xs font-bold text-text-primary">
                            {slide.rating}
                          </span>
                          <span className="text-text-muted text-[11px] font-mono">
                            ({slide.shoots})
                          </span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <h4 className="font-bold text-base text-text-primary">
                          {slide.studioName}
                        </h4>
                        <p className="text-xs text-brand-amber mt-0.5">
                          {slide.location}
                        </p>
                        <p className="text-[11px] text-text-secondary mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#22C55E] shrink-0" />
                          {slide.feature}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-border-subtle/50">
                        <div>
                          <span className="font-mono text-xl font-bold text-brand-orange">
                            {slide.rate}
                          </span>
                          <span className="font-mono text-xs text-text-secondary">
                            {" "}
                            / hour
                          </span>
                        </div>
                        <Link
                          href="/studios"
                          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_15px_rgba(224,79,38,0.4)] hover:opacity-95 transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="text-brand-orange">↓</span> 500+ Verified Spaces
              Online
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}