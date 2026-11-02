import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { getFeaturedStudios } from "@/lib/api";
import { connection } from "next/server";

export default async function FeaturedStudios() {
  await connection();
  const studios = await getFeaturedStudios();

  return (
    <section className="relative bg-film-black py-20 lg:py-28 border-b border-border-subtle overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,79,38,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        
        <div className="relative text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="absolute -top-8 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 font-extrabold text-6xl sm:text-8xl md:text-9xl text-white/[0.04] select-none pointer-events-none tracking-widest uppercase">
            FEATURED
          </span>

          <span className="relative z-10 font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-brand-orange uppercase">
            ———— // TOP PICKS ————
          </span>

          <h2 className="relative z-10 font-extrabold tracking-tight text-text-primary text-3xl sm:text-4xl lg:text-5xl mt-3 leading-tight">
            Featured{" "}
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#F17332] to-brand-amber">
              Production Studios
            </span>
          </h2>

          <p className="relative z-10 text-text-secondary text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Explore top-rated spaces handpicked for structured productions, episodic shoots, global campaigns, and commercial drops.
          </p>

          <div className="mt-5 relative z-10">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-brand-orange hover:text-brand-amber transition-colors uppercase tracking-wider font-semibold"
            >
              <span>View All Studios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="group h-full bg-surface-1/90 hover:bg-surface-2/95 border border-border-subtle hover:border-brand-orange/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-2">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-film-black/90 via-film-black/20 to-transparent" />

                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                    {studio.category}
                  </div>

                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 text-brand-amber font-mono text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
                    <span>{studio.rating}</span>
                    <span className="text-[10px] text-text-muted">({studio.shootsCompleted})</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="font-bold text-lg sm:text-xl text-text-primary group-hover:text-brand-orange transition-colors line-clamp-1">
                    {studio.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-text-muted mt-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span className="line-clamp-1">{studio.location}</span>
                  </div>

                  {studio.features && studio.features.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-4">
                      {studio.features.slice(0, 3).map((feat, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-surface-2/80 border border-border-subtle text-[11px] font-mono text-text-secondary"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <div className="flex items-center justify-between pb-3.5 border-b border-border-subtle/50 font-mono">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-brand-orange">
                      ${studio.hourlyRate}
                    </span>
                    <span className="text-xs text-text-muted"> / hr</span>
                  </div>
                  {studio.securityDeposit && (
                    <div className="text-[11px] text-text-muted">
                      ${studio.securityDeposit} DEPOSIT
                    </div>
                  )}
                </div>

                <Link
                  href={`/studios/${studio._id}`}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs sm:text-sm text-text-primary bg-surface-2 hover:bg-gradient-to-r hover:from-brand-orange hover:to-brand-amber hover:text-white border border-border-subtle hover:border-transparent transition-all shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}