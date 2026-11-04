import { Search, MapPin, SlidersHorizontal, RotateCcw, LayoutGrid, ArrowUpDown } from "lucide-react";
import { StudioFilterProps } from "@/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LOCATION_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All Locations" },
  { value: "Manhattan", label: "Manhattan, NY" },
  { value: "Brooklyn", label: "Brooklyn, NY" },
  { value: "Burbank", label: "Burbank, CA" },
  { value: "Silver Lake", label: "Silver Lake, CA" },
  { value: "Austin", label: "Austin, TX" },
  { value: "Downtown", label: "Downtown LA, CA" },
];

const LOCATION_ITEMS_MAP: Record<string, string> = Object.fromEntries(
  LOCATION_OPTIONS.map((loc) => [loc.value, loc.label])
);

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "default", label: "Default Sorting" },
  { value: "rate-asc", label: "Price: Low to High" },
  { value: "rate-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const SORT_ITEMS_MAP: Record<string, string> = Object.fromEntries(
  SORT_OPTIONS.map((opt) => [opt.value, opt.label])
);

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
        <Select
          value={filters.category}
          onValueChange={(val) => onFilterChange("category", (val as string) || "All Categories")}
        >
          <SelectTrigger className="w-full bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5 h-auto text-xs text-text-primary focus-visible:border-brand-orange focus-visible:ring-0 cursor-pointer justify-between">
            <div className="flex items-center gap-2 truncate">
              <LayoutGrid className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <SelectValue placeholder="Select Category" />
            </div>
          </SelectTrigger>
          <SelectContent
            align="start"
            side="bottom"
            alignItemWithTrigger={false}
            className="bg-[#121214] border border-[#27272a] text-text-primary rounded-xl p-1 shadow-2xl z-50 w-[var(--anchor-width)] max-h-60"
          >
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="text-xs text-text-secondary hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg py-2 px-2.5 cursor-pointer transition-colors"
              >
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Location
        </label>
        <Select
          value={filters.city}
          items={LOCATION_ITEMS_MAP}
          onValueChange={(val) => onFilterChange("city", (val as string) || "all")}
        >
          <SelectTrigger className="w-full bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5 h-auto text-xs text-text-primary focus-visible:border-brand-orange focus-visible:ring-0 cursor-pointer justify-between">
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <SelectValue placeholder="Select Location" />
            </div>
          </SelectTrigger>
          <SelectContent
            align="start"
            side="bottom"
            alignItemWithTrigger={false}
            className="bg-[#121214] border border-[#27272a] text-text-primary rounded-xl p-1 shadow-2xl z-50 w-[var(--anchor-width)] max-h-60"
          >
            {LOCATION_OPTIONS.map((loc) => (
              <SelectItem
                key={loc.value}
                value={loc.value}
                className="text-xs text-text-secondary hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg py-2 px-2.5 cursor-pointer transition-colors"
              >
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Sort By
        </label>
        <Select
          value={filters.sort}
          items={SORT_ITEMS_MAP}
          onValueChange={(val) => onFilterChange("sort", (val as string) || "default")}
        >
          <SelectTrigger className="w-full bg-film-black border border-border-subtle rounded-xl px-3.5 py-2.5 h-auto text-xs text-text-primary focus-visible:border-brand-orange focus-visible:ring-0 cursor-pointer justify-between">
            <div className="flex items-center gap-2 truncate">
              <ArrowUpDown className="w-3.5 h-3.5 text-text-muted shrink-0" />
              <SelectValue placeholder="Sort By" />
            </div>
          </SelectTrigger>
          <SelectContent
            align="start"
            side="bottom"
            alignItemWithTrigger={false}
            className="bg-[#121214] border border-[#27272a] text-text-primary rounded-xl p-1 shadow-2xl z-50 w-[var(--anchor-width)]"
          >
            {SORT_OPTIONS.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="text-xs text-text-secondary hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg py-2 px-2.5 cursor-pointer transition-colors"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
