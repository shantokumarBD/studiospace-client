"use client";

import Link from "next/link";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";
import { Studio } from "@/Types";

interface StudioCardProps {
  studio: Studio;
  isSaved?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export default function StudioCard({ studio, isSaved, onToggleWishlist }: StudioCardProps) {
  return (
    <article className="group rounded-3xl bg-surface-1/90 hover:bg-surface-2/95 border border-border-subtle hover:border-brand-orange/40 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <img
            src={studio.image}
            alt={studio.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-film-black/90 via-transparent to-film-black/30" />

          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-[11px] font-semibold text-text-primary uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            <span>{studio.category}</span>
          </div>

          <button
            onClick={() => onToggleWishlist && onToggleWishlist(studio._id)}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-secondary hover:text-brand-orange transition-colors cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-brand-orange text-brand-orange" : ""}`} />
          </button>

          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-film-black/85 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-400">
              {studio.availability || "Available Tomorrow"}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-film-black/85 backdrop-blur-md border border-white/10">
            <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
            <span className="font-mono text-xs font-bold text-text-primary">{studio.rating}</span>
            <span className="text-[10px] text-text-muted">({studio.shootsCompleted || 32})</span>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-3">
          <h2 className="font-bold text-base sm:text-lg text-text-primary group-hover:text-brand-orange transition-colors line-clamp-1">
            {studio.title}
          </h2>

          <div className="flex items-center gap-2 text-xs text-text-secondary flex-wrap">
            <span className="inline-flex items-center gap-1 text-text-secondary">
              <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span>{studio.location}</span>
            </span>
            <span>•</span>
            <span className="font-mono text-text-primary">{studio.sqft || 4500} sq ft</span>
            <span>•</span>
            <span>Max {studio.maxCapacity || 30} crew</span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {studio.features && studio.features.slice(0, 4).map((spec) => (
              <span
                key={spec}
                className="px-2.5 py-0.5 rounded-md bg-surface-2 border border-border-subtle font-mono text-[10px] text-text-secondary"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-border-subtle/50 bg-surface-2/30">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-text-primary">
              ${studio.hourlyRate}
            </span>
            <span className="font-mono text-xs text-text-secondary">/ hr</span>
          </div>
          <span className="font-mono text-[10px] text-text-muted block">
            ${studio.securityDeposit || 250} deposit
          </span>
        </div>

        <Link
          href={`/studios/${studio._id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-2 hover:bg-gradient-to-r hover:from-brand-orange hover:to-brand-amber text-text-primary hover:text-white font-mono text-xs font-semibold border border-border-subtle hover:border-transparent transition-all shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}