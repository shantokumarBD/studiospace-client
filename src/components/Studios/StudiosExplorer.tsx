"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import toast from "react-hot-toast";
import { Studio, FilterState } from "@/Types";
import { useSession } from "@/lib/auth-client";
import { addToWishlist, removeFromWishlist } from "@/lib/api";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import StudioCard from "./StudioCard";
import StudioFilter from "./StudioFilter";
import Pagination from "@/components/Shared/Pagination";

interface StudiosExplorerProps {
  initialStudios: Studio[];
  initialWishlistIds?: string[];
}

export default function StudiosExplorer({
  initialStudios,
  initialWishlistIds = [],
}: StudiosExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const rawCategory = searchParams.get("category");
  const initialCategory = rawCategory ? rawCategory.replace(/\+/g, " ") : "All Categories";

  const categories = [
    "All Categories",
    ...new Set(initialStudios.map((studio) => studio.category)),
  ];

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: initialCategory,
    city: "all",
    sort: "default",
  });

  const [wishlist, setWishlist] = useState<string[]>(initialWishlistIds);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setFilters((prev) => ({ ...prev, category: urlCategory.replace(/\+/g, " ") }));
      setCurrentPage(1);
    } else {
      setFilters((prev) => ({ ...prev, category: "All Categories" }));
    }
  }, [searchParams]);

  const toggleWishlist = async (id: string) => {
    if (!session?.user?.email) {
      toast.error("Please sign in to save studios to your wishlist");
      router.push("/log-in");
      return;
    }

    const isSaved = wishlist.includes(id);
    const studio = initialStudios.find((s) => s._id === id);
    if (!studio) return;

    const token = await GetTokenFormClient();

    if (!isSaved) {
      setWishlist((prev) => [...prev, id]);
      try {
        const result = await addToWishlist({
          studioId: studio._id,
          userEmail: session.user.email,
          title: studio.title,
          image: studio.image,
          location: studio.location,
          hourlyRate: studio.hourlyRate,
          category: studio.category,
          rating: studio.rating,
        }, token);
        if (result.success) {
          toast.success("Studio added to your wishlist!");
        } else {
          setWishlist((prev) => prev.filter((item) => item !== id));
          toast.error(result.message || "Failed to add to wishlist");
        }
      } catch {
        setWishlist((prev) => prev.filter((item) => item !== id));
        toast.error("Failed to add to wishlist");
      }
    } else {
      setWishlist((prev) => prev.filter((item) => item !== id));
      try {
        const result = await removeFromWishlist(id, token);
        if (result.success) {
          toast.success("Studio removed from wishlist");
        } else {
          setWishlist((prev) => [...prev, id]);
          toast.error(result.message || "Failed to remove from wishlist");
        }
      } catch {
        setWishlist((prev) => [...prev, id]);
        toast.error("Failed to remove from wishlist");
      }
    }
  };

  const handleFilterChange = (name: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "All Categories",
      city: "all",
      sort: "default",
    });
    setCurrentPage(1);
  };

  const filteredStudios = initialStudios
    .filter((studio) => {
      const catFilter = filters.category.toLowerCase().trim();
      const studioCat = (studio.category || "").toLowerCase().trim();

      const matchesCategory =
        filters.category === "All Categories" ||
        studioCat === catFilter ||
        studioCat.includes(catFilter) ||
        catFilter.includes(studioCat) ||
        (catFilter.includes("photo") && studioCat.includes("photo")) ||
        (catFilter.includes("sound") && studioCat.includes("sound")) ||
        (catFilter.includes("podcast") && studioCat.includes("podcast")) ||
        (catFilter.includes("music") && (studioCat.includes("music") || studioCat.includes("recording"))) ||
        (catFilter.includes("art") && (studioCat.includes("art") || studioCat.includes("dance")));

      const matchesSearch =
        filters.search === "" ||
        studio.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        studio.location.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCity =
        filters.city === "all" ||
        studio.location.toLowerCase().includes(filters.city.toLowerCase());

      return matchesCategory && matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (filters.sort === "rate-asc") return a.hourlyRate - b.hourlyRate;
      if (filters.sort === "rate-desc") return b.hourlyRate - a.hourlyRate;
      if (filters.sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.ceil(filteredStudios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudios = filteredStudios.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-film-black py-8">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <StudioFilter
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          <main className="flex-1 w-full">
            <div className="flex items-center justify-between pb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                  Explore Studios
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Showing {paginatedStudios.length} of {filteredStudios.length} studios
                </p>
              </div>
            </div>

            {filteredStudios.length === 0 ? (
              <div className="rounded-2xl bg-surface-1 border border-border-subtle p-12 text-center flex flex-col items-center justify-center">
                <SearchX className="w-12 h-12 text-text-muted mb-4" />
                <h3 className="text-xl font-bold text-text-primary mb-2">No Studios Found</h3>
                <p className="text-text-secondary text-sm max-w-sm mb-6">
                  No studios match your current filter criteria. Try clearing search or resetting filters.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-semibold shadow hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedStudios.map((studio) => (
                    <StudioCard
                      key={studio._id}
                      studio={studio}
                      isSaved={wishlist.includes(studio._id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
