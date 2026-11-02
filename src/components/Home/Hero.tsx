"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Star, PlusCircle, CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-film-black py-10 sm:py-16 lg:py-20 border-b border-border-subtle min-h-[calc(100vh-80px)] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(224,79,38,0.12)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute -right-40 top-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-amber/10 blur-[100px] sm:blur-[130px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            <span className="font-mono text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.22em] text-brand-orange uppercase">
              ———— // STUDIO BOOKING PLATFORM ————
            </span>

            <h1 className="font-extrabold tracking-tight text-text-primary leading-[0.95] sm:leading-[0.92] text-4xl xs:text-5xl sm:text-6xl md:text-7xl xl:text-[6.5rem]">
              CALIBRATED
              <br />
              SPACES FOR
              <br />
              <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber drop-shadow-[0_4px_25px_rgba(224,79,38,0.4)]">
                Film &amp; Sound.
              </span>
            </h1>

            <div className="w-[50px] sm:w-[60px] h-[2px] bg-gradient-to-r from-brand-orange to-brand-amber my-0.5" />

            <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-[480px] leading-relaxed">
              Discover verified photography lofts, soundproof film stages, and
              podcast rooms with clear hourly pricing and instant booking.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1 w-full sm:w-auto">
              <Link
                href="/studios"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-brand-orange to-brand-amber brand-glow hover:brand-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explore Studios
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="/add-studio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-text-primary bg-surface-2/70 backdrop-blur-md border border-border-subtle hover:bg-surface-3 hover:border-brand-orange/40 transition-all"
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-amber" />
                Host Your Space
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface-1 border border-border-subtle">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-orange shadow-[0_0_8px_#E04F26]" />
                <span className="font-mono text-xs sm:text-sm font-medium text-text-primary">
                  500+ Studios
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface-1 border border-border-subtle">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-amber shadow-[0_0_8px_#F59E0B]" />
                <span className="font-mono text-xs sm:text-sm font-medium text-text-primary">
                  120+ Cities
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface-1 border border-border-subtle">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-amber fill-brand-amber" />
                <span className="font-mono text-xs sm:text-sm font-medium text-text-primary">
                  4.9★ Rated
                </span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono tracking-wider">
              {heroSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => swiperInstance?.slideToLoop(idx)}
                  className={`pb-1 transition-all cursor-pointer text-[11px] sm:text-xs ${
                    activeIndex === idx
                      ? "text-brand-orange font-bold border-b-2 border-brand-orange scale-105"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {s.id} · {s.category}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-center w-full">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
              {isMounted ? (
                <Swiper
                  modules={[Autoplay, EffectFade]}
                  effect="fade"
                  speed={800}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="w-full aspect-[4/5] !overflow-visible mb-14 sm:mb-16"
                >
                  {heroSlides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-border-subtle shadow-2xl bg-surface-1 group">
                        <img
                          src={slide.image}
                          alt={slide.studioName}
                          className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-film-black via-transparent to-transparent opacity-85" />

                        <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-film-black/85 backdrop-blur-md border border-white/10">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22C55E] animate-pulse" />
                          <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-text-primary uppercase">
                            {slide.badge}
                          </span>
                        </div>
                      </div>

                      <div className="absolute -bottom-6 sm:-bottom-8 left-2 right-2 sm:left-auto sm:-left-10 lg:-left-14 sm:w-[360px] md:w-[380px] bg-surface-1/95 backdrop-blur-2xl border border-border-subtle rounded-2xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] -rotate-1 sm:-rotate-4 sm:hover:rotate-0 transition-all duration-300 z-20">
                        <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22C55E]" />
                            <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#22C55E]">
                              ● Available Today
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-brand-amber">
                            <Star className="w-3.5 h-3.5 fill-brand-amber" />
                            <span className="font-mono text-xs font-bold text-text-primary">
                              {slide.rating}
                            </span>
                            <span className="text-text-muted text-[10px] sm:text-[11px] font-mono">
                              ({slide.shoots})
                            </span>
                          </div>
                        </div>

                        <div className="pt-2.5">
                          <h4 className="font-bold text-sm sm:text-base text-text-primary line-clamp-1">
                            {slide.studioName}
                          </h4>
                          <p className="text-xs text-brand-amber mt-0.5">
                            {slide.location}
                          </p>
                          <p className="text-[11px] text-text-secondary mt-1 flex items-center gap-1 line-clamp-1">
                            <CheckCircle2 className="w-3 h-3 text-[#22C55E] shrink-0" />
                            {slide.feature}
                          </p>
                        </div>

                        <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-border-subtle/50">
                          <div>
                            <span className="font-mono text-lg sm:text-xl font-bold text-brand-orange">
                              {slide.rate}
                            </span>
                            <span className="font-mono text-[11px] sm:text-xs text-text-secondary">
                              {" "}
                              / hour
                            </span>
                          </div>
                          <Link
                            href="/studios"
                            className="inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-brand-amber shadow-[0_0_15px_rgba(224,79,38,0.4)] hover:opacity-95 transition-all"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-border-subtle shadow-2xl bg-surface-1 mb-14 sm:mb-16">
                  <img
                    src={heroSlides[0].image}
                    alt={heroSlides[0].studioName}
                    className="w-full h-full object-cover filter brightness-90"
                  />
                </div>
              )}
            </div>

            <div className="mt-2 sm:mt-4 flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="text-brand-orange">↓</span> 500+ Verified Spaces Online
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}