"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Star,
  Trash2,
  ArrowRight,
  Loader2,
  BookmarkCheck,
  RotateCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { WishlistItem } from "@/Types";
import { removeFromWishlist, getMyWishlist } from "@/lib/api";
import { GetTokenFormClient } from "@/lib/gettokenformClient";

interface WishlistClientProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  initialWishlist: WishlistItem[];
}

export default function WishlistClient({
  user,
  initialWishlist,
}: WishlistClientProps) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlist);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (!user?.email) return;
    setIsSyncing(true);
    try {
      const token = await GetTokenFormClient();
      const items = await getMyWishlist(user.email, token);
      setWishlist(items);
      toast.success("Wishlist synchronized");
    } catch {
      toast.error("Failed to sync wishlist");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRemove = async (id: string, title: string) => {
    setRemovingId(id);
    try {
      const token = await GetTokenFormClient();
      const result = await removeFromWishlist(id, token);
      if (result.success) {
        setWishlist((prev) => prev.filter((item) => item._id !== id && item.studioId !== id));
        toast.success(`"${title}" removed from wishlist`);
      } else {
        toast.error(result.message || "Failed to remove from wishlist");
      }
    } catch {
      toast.error("An error occurred while removing the item");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Production stages and creative studios you have saved for future shoots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-border-subtle flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer disabled:opacity-50"
            title="Sync wishlist"
          >
            <RotateCw className={`w-3.5 h-3.5 text-brand-orange ${isSyncing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>

          <div className="px-4 py-2 rounded-2xl bg-surface-1 border border-border-subtle flex items-center gap-2 font-mono text-xs">
            <BookmarkCheck className="w-4 h-4 text-brand-orange" />
            <span className="text-text-muted">Saved:</span>
            <span className="font-bold text-text-primary">{wishlist.length} Studios</span>
          </div>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="my-12 p-12 rounded-3xl bg-surface-1 border border-border-subtle text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-text-secondary max-w-sm">
            You haven&apos;t saved any creative studios yet. Explore available spaces
            and click the heart icon to save them for easy access.
          </p>
          <Link
            href="/studios"
            className="mt-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs transition-all shadow-md shadow-brand-orange/20"
          >
            Explore Studios Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <article
              key={item._id}
              className="group rounded-3xl bg-surface-1 border border-border-subtle hover:border-brand-orange/30 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-film-black/90 via-transparent to-film-black/30" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-semibold text-brand-orange uppercase">
                    {item.category}
                  </span>

                  <button
                    type="button"
                    disabled={removingId === item._id}
                    onClick={() => handleRemove(item._id, item.title)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-rose-400 hover:text-rose-300 transition-colors cursor-pointer disabled:opacity-50"
                    title="Remove from wishlist"
                  >
                    {removingId === item._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>

                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-film-black/85 backdrop-blur-md border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
                    <span className="font-mono text-xs font-bold text-text-primary">
                      {item.rating || 5.0}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <h3 className="font-bold text-base text-text-primary group-hover:text-brand-orange transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>

                  <div className="mt-2 font-mono text-sm font-bold text-brand-orange">
                    ${item.hourlyRate}
                    <span className="text-xs text-text-muted font-normal"> / hour</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/studios/${item.studioId}`}
                  className="w-full py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
