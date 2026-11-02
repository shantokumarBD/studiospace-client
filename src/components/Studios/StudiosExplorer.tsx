"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { Studio, FilterState } from "@/Types";
import StudioCard from "./StudioCard";
import StudioFilter from "./StudioFilter";
import Pagination from "@/components/Shared/Pagination";

interface StudiosExplorerProps {
  initialStudios: Studio[];
}

export default function StudiosExplorer({ initialStudios }: StudiosExplorerProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Categories";

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

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
      const matchesCategory =
        filters.category === "All Categories" ||
        studio.category.toLowerCase() === filters.category.toLowerCase();

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