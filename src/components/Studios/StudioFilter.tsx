import { Search, MapPin, SlidersHorizontal, ChevronDown, RotateCcw } from "lucide-react";
import { StudioFilterProps } from "@/Types";

export default function StudioFilter({
  categories,
  filters,
  onFilterChange,
  onReset,
}: StudioFilterProps) {
  const isFiltered =
    filters.search !== "" ||
    filters.category !== "All Categories" ||
    filters.city !== "all" ||
    filters.sort !== "default";

  return (
    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 bg-surface-1 border border-border-subtle rounded-2xl p-5 shadow-xl flex flex-col gap-6">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-orange" />
          <h2 className="font-bold text-sm text-text-primary tracking-wide uppercase">
            Filters
          </h2>
        </div>
        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-brand-orange hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Search
        </label>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-text-muted absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Studio name or city..."
            className="w-full bg-film-black border border-border-subtle text-text-primary text-xs pl-9 pr-3 py-2.5 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const isActive = filters.category.toLowerCase().trim() === cat.toLowerCase().trim();
            return (
              <button
                key={cat}
                onClick={() => onFilterChange("category", cat)}
                className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-brand-orange to-brand-amber text-white font-semibold shadow-md"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Location
        </label>
        <div className="relative">
          <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5">
            <MapPin className="w-3.5 h-3.5 text-text-muted mr-2 shrink-0" />
            <select
              value={filters.city}
              onChange={(e) => onFilterChange("city", e.target.value)}
              className="w-full bg-transparent text-text-primary text-xs appearance-none focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-surface-1 text-text-primary">All Locations</option>
              <option value="Manhattan" className="bg-surface-1 text-text-primary">Manhattan, NY</option>
              <option value="Brooklyn" className="bg-surface-1 text-text-primary">Brooklyn, NY</option>
              <option value="Burbank" className="bg-surface-1 text-text-primary">Burbank, CA</option>
              <option value="Silver Lake" className="bg-surface-1 text-text-primary">Silver Lake, CA</option>
              <option value="Austin" className="bg-surface-1 text-text-primary">Austin, TX</option>
              <option value="Downtown" className="bg-surface-1 text-text-primary">Downtown LA, CA</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted ml-auto pointer-events-none shrink-0" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Sort By
        </label>
        <div className="relative">
          <div className="flex items-center bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5">
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange("sort", e.target.value)}
              className="w-full bg-transparent text-text-primary text-xs appearance-none focus:outline-none cursor-pointer"
            >
              <option value="default" className="bg-surface-1 text-text-primary">Default Sorting</option>
              <option value="rate-asc" className="bg-surface-1 text-text-primary">Price: Low to High</option>
              <option value="rate-desc" className="bg-surface-1 text-text-primary">Price: High to Low</option>
              <option value="rating" className="bg-surface-1 text-text-primary">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted ml-auto pointer-events-none shrink-0" />
          </div>
        </div>
      </div>
    </aside>
  );
}