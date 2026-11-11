import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedStudios } from "@/lib/api";
import StudioCard from "@/components/Studios/StudioCard";

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="relative bg-film-black py-20 lg:py-28 border-b border-border-subtle overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,79,38,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="relative text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="absolute -top-8 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 font-extrabold text-6xl sm:text-8xl md:text-9xl text-text-primary/10 select-none pointer-events-none tracking-widest uppercase">
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
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      </div>
    </section>
  );
}
