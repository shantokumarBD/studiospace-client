"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  MapPin,
  Users,
  Clapperboard,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Search,
  CalendarCheck2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Studio } from "@/Types";
import { deleteStudio } from "@/lib/api";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface MyListingsClientProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  initialStudios: Studio[];
}

export default function MyListingsClient({
  user,
  initialStudios,
}: MyListingsClientProps) {
  const router = useRouter();
  const [studios, setStudios] = useState<Studio[]>(initialStudios);
  const [deletingStudio, setDeletingStudio] = useState<Studio | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudios = studios.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  const avgRate =
    studios.length > 0
      ? Math.round(
          studios.reduce((acc, s) => acc + (Number(s.hourlyRate) || 0), 0) /
            studios.length
        )
      : 0;

  const totalCapacity = studios.reduce(
    (acc, s) => acc + (Number(s.maxCapacity) || 10),
    0
  );

  const handleConfirmDelete = async () => {
    if (!deletingStudio) return;

    setIsDeleting(true);
    try {
      const token = await GetTokenFormClient();
      const result = await deleteStudio(deletingStudio._id, token);
      if (result.success) {
        setStudios((prev) => prev.filter((s) => s._id !== deletingStudio._id));
        toast.success("Studio deleted successfully");
        setDeletingStudio(null);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete studio");
      }
    } catch {
      toast.error("An error occurred while deleting the studio");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            My Studio Listings
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage your listed production spaces, update rates, or remove stages.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          <Link
            href="/dashboard#incoming-requests"
            className="px-4 py-2.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-border-subtle text-text-primary font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CalendarCheck2 className="w-4 h-4 text-brand-orange" />
            <span>Incoming Booking Requests</span>
          </Link>

          <Link
            href="/add-studio"
            className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Studio</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Total Listings
          </span>
          <p className="text-2xl font-bold font-mono text-text-primary mt-1">
            {studios.length}{" "}
            <span className="text-xs text-text-muted font-sans font-normal">
              Studios
            </span>
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Avg Hourly Rate
          </span>
          <p className="text-2xl font-bold font-mono text-brand-orange mt-1">
            ${avgRate}
            <span className="text-xs text-text-muted font-sans font-normal">
              /hr
            </span>
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Total Capacity
          </span>
          <p className="text-2xl font-bold font-mono text-text-primary mt-1">
            {totalCapacity}{" "}
            <span className="text-xs text-text-muted font-sans font-normal">
              People
            </span>
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter studios by title, category, or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus-visible:border-brand-orange focus-visible:ring-0 transition-colors h-auto"
          />
        </div>
        <span className="hidden sm:block text-xs font-mono text-text-muted">
          Showing {filteredStudios.length} of {studios.length}
        </span>
      </div>

      {studios.length === 0 ? (
        <div className="my-12 p-12 rounded-3xl bg-surface-1 border border-border-subtle text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
            <Clapperboard className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            No Studio Listings Found
          </h3>
          <p className="text-xs text-text-secondary max-w-sm">
            You haven&apos;t added any creative production studios yet. List your
            soundstage or photography loft to start earning.
          </p>
          <Link
            href="/add-studio"
            className="mt-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs transition-all shadow-md shadow-brand-orange/20"
          >
            List Your First Studio
          </Link>
        </div>
      ) : filteredStudios.length === 0 ? (
        <div className="my-12 p-8 rounded-2xl bg-surface-1 border border-border-subtle text-center">
          <p className="text-sm text-text-secondary">
            No listings found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-2 text-xs font-mono text-brand-orange hover:underline cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredStudios.map((studio) => (
            <article
              key={studio._id}
              className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-orange/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-film-black/90 font-mono text-[9px] font-bold text-brand-orange uppercase">
                    {studio.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <Badge variant="outline" className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider border-0 p-0 h-auto">
                      ACTIVE ON CATALOG
                    </Badge>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-text-primary truncate">
                    {studio.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span className="truncate">{studio.location}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-text-muted mt-1">
                    <span className="text-brand-orange font-bold text-sm">
                      ${studio.hourlyRate}/hr
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{studio.maxCapacity || 10} Cap</span>
                    </span>
                    {studio.securityDeposit ? (
                      <>
                        <span>•</span>
                        <span>${studio.securityDeposit} Dep</span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-border-subtle shrink-0">
                <Link
                  href={`/studios/${studio._id}`}
                  className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary hover:text-text-primary text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View</span>
                </Link>

                <Link
                  href={`/studios/edit/${studio._id}`}
                  className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-secondary hover:text-brand-orange text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeletingStudio(studio)}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer h-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}

      {deletingStudio && (
        <AlertDialog
          open={!!deletingStudio}
          onOpenChange={(open) => {
            if (!open) setDeletingStudio(null);
          }}
        >
          <AlertDialogContent className="relative w-full max-w-md rounded-3xl bg-surface-1 border border-border-subtle p-6 shadow-2xl flex flex-col gap-4 text-text-primary sm:max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <AlertDialogTitle className="text-base font-bold text-text-primary">
                  Delete Studio Listing?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-xs text-text-secondary mt-0.5">
                  This action cannot be undone.
                </AlertDialogDescription>
              </div>
            </div>

            <p className="text-xs text-text-secondary bg-surface-2/60 p-3.5 rounded-xl border border-border-subtle">
              Are you sure you want to remove{" "}
              <strong className="text-text-primary">
                &ldquo;{deletingStudio.title}&rdquo;
              </strong>{" "}
              from the StudioSpace catalog? All associated listings data will be
              deleted.
            </p>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting}
                onClick={() => setDeletingStudio(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-surface-2 text-text-secondary hover:text-text-primary text-xs font-mono font-semibold transition-colors cursor-pointer text-center h-auto border-border-subtle"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono font-bold transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 h-auto"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
