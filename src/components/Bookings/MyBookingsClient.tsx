"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import toast from "react-hot-toast";
import { Booking } from "@/Types";
import { cancelBooking } from "@/lib/api";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BookingStats } from "./BookingStats";
import { BookingCard } from "./BookingCard";
import { BookingReceiptDialog } from "./BookingReceiptDialog";
import { CancelBookingDialog } from "./CancelBookingDialog";

interface MyBookingsClientProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  initialBookings: Booking[];
}

export default function MyBookingsClient({
  initialBookings,
}: MyBookingsClientProps) {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">("all");

  const totalShoots = bookings.length;
  const totalCharged = bookings.reduce(
    (acc, b) => acc + (Number(b.totalAmount) || 0),
    0
  );
  const confirmedCount = bookings.filter((b) =>
    (b.status || "").toLowerCase().includes("confirm")
  ).length;
  const pendingCount = bookings.filter((b) => {
    const s = (b.status || "").toLowerCase();
    return s.includes("pending") || s === "pending host approval";
  }).length;
  const cancelledCount = bookings.filter((b) =>
    (b.status || "").toLowerCase().includes("cancel")
  ).length;

  const filteredBookings = bookings.filter((b) => {
    const s = (b.status || "").toLowerCase();
    if (statusFilter === "confirmed" && !s.includes("confirm")) return false;
    if (statusFilter === "pending" && !s.includes("pending")) return false;
    if (statusFilter === "cancelled" && !s.includes("cancel")) return false;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.studioTitle.toLowerCase().includes(q) ||
      (b.studioLocation || "").toLowerCase().includes(q) ||
      (b.category || "").toLowerCase().includes(q) ||
      (b.status || "").toLowerCase().includes(q) ||
      b._id.toLowerCase().includes(q)
    );
  });

  const handleConfirmCancel = async () => {
    if (!cancellingBooking) return;

    setIsCancelling(true);
    try {
      const token = await GetTokenFormClient();
      const result = await cancelBooking(cancellingBooking._id, token);
      if (result.success) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === cancellingBooking._id
              ? { ...b, status: "Cancelled" }
              : b
          )
        );
        toast.success("Reservation marked as Cancelled");
        setCancellingBooking(null);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel reservation");
      }
    } catch {
      toast.error("An error occurred while cancelling the reservation");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border-subtle pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Production Schedule</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
              My Studio Bookings
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5">
              Track reservation statuses, cancellation requests, and shoot times
            </p>
          </div>

          <Link
            href="/studios"
            className="self-start sm:self-auto px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-brand-orange/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore More Studios</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top Summary Stats */}
        <BookingStats
          totalShoots={totalShoots}
          totalCharged={totalCharged}
          pendingCount={pendingCount}
        />

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 mb-6">
          {[
            { id: "all", label: "All Bookings", count: totalShoots },
            { id: "confirmed", label: "Confirmed", count: confirmedCount },
            { id: "pending", label: "Pending", count: pendingCount },
            { id: "cancelled", label: "Cancelled", count: cancelledCount },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                    : "bg-surface-1 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-muted"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-surface-2 text-text-muted"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by studio, location, or status..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus-visible:border-brand-orange focus-visible:ring-0 transition-colors h-auto"
            />
          </div>
          <span className="hidden sm:block text-xs font-mono text-text-muted">
            Showing {filteredBookings.length} of {bookings.length} reservations
          </span>
        </div>

        {/* Bookings List or Empty States */}
        {bookings.length === 0 ? (
          <div className="my-12 p-12 rounded-3xl bg-surface-1 border border-border-subtle text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
              <CalendarDays className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary">
              No Studio Bookings Found
            </h3>
            <p className="text-xs text-text-secondary max-w-sm">
              You haven&apos;t reserved any studios yet. Explore available creative
              spaces and lock your next production.
            </p>
            <Link
              href="/studios"
              className="mt-2 px-6 py-2.5 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs transition-all shadow-md shadow-brand-orange/20 flex items-center gap-2"
            >
              <span>Explore More Studios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="my-12 p-8 rounded-2xl bg-surface-1 border border-border-subtle text-center">
            <p className="text-sm text-text-secondary">
              No bookings found matching &ldquo;{searchQuery}&rdquo;
            </p>
            <Button
              type="button"
              variant="link"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs font-mono text-brand-orange hover:underline cursor-pointer"
            >
              Clear Filter
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onOpenReceipt={setSelectedReceipt}
                onRequestCancel={setCancellingBooking}
              />
            ))}
          </div>
        )}
      </div>

      {/* Official Receipt Dialog (Shadcn Dialog) */}
      <BookingReceiptDialog
        booking={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      {/* Cancel Reservation Confirmation Dialog (Shadcn AlertDialog) */}
      <CancelBookingDialog
        booking={cancellingBooking}
        isCancelling={isCancelling}
        onConfirm={handleConfirmCancel}
        onClose={() => setCancellingBooking(null)}
      />
    </>
  );
}
