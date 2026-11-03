"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck2,
  Clock,
  Calendar,
  MapPin,
  Search,
  ExternalLink,
  Trash2,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { Booking } from "@/Types";
import { cancelBooking } from "@/lib/api";

interface MyBookingsClientProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  initialBookings: Booking[];
}

export default function MyBookingsClient({
  user,
  initialBookings,
}: MyBookingsClientProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(
    null
  );
  const [isCancelling, setIsCancelling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.studioTitle.toLowerCase().includes(q) ||
      (b.studioLocation || "").toLowerCase().includes(q) ||
      (b.category || "").toLowerCase().includes(q)
    );
  });

  const totalShoots = bookings.length;
  const totalSpent = bookings.reduce(
    (acc, b) => acc + (Number(b.totalAmount) || 0),
    0
  );
  const confirmedCount = bookings.filter(
    (b) => (b.status || "CONFIRMED") === "CONFIRMED"
  ).length;

  const handleConfirmCancel = async () => {
    if (!cancellingBooking) return;

    setIsCancelling(true);
    try {
      const result = await cancelBooking(cancellingBooking._id);
      if (result.success) {
        setBookings((prev) =>
          prev.filter((b) => b._id !== cancellingBooking._id)
        );
        toast.success("Reservation cancelled successfully");
        setCancellingBooking(null);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 border-b border-border-subtle pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          My Bookings
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          View and manage your reserved creative studios and production stages.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Total Bookings
          </span>
          <p className="text-2xl font-bold font-mono text-text-primary mt-1">
            {totalShoots}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Total Amount Spent
          </span>
          <p className="text-2xl font-bold font-mono text-brand-orange mt-1">
            ${totalSpent.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Confirmed Reservations
          </span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1 flex items-center gap-2">
            <span>{confirmedCount}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by studio or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors"
          />
        </div>
        <span className="hidden sm:block text-xs font-mono text-text-muted">
          Showing {filteredBookings.length} of {bookings.length}
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="my-12 p-12 rounded-3xl bg-surface-1 border border-border-subtle text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
            <CalendarCheck2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-text-primary">
            No Bookings Found
          </h3>
          <p className="text-xs text-text-secondary max-w-sm">
            You haven&apos;t reserved any studios yet. Explore available spaces
            and book your next creative production.
          </p>
          <Link
            href="/studios"
            className="mt-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs transition-all shadow-md shadow-brand-orange/20"
          >
            Explore Studios
          </Link>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="my-12 p-8 rounded-2xl bg-surface-1 border border-border-subtle text-center">
          <p className="text-sm text-text-secondary">
            No bookings found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-2 text-xs font-mono text-brand-orange hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredBookings.map((booking) => (
            <article
              key={booking._id}
              className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-orange/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-surface-2 shrink-0">
                  <img
                    src={booking.studioImage}
                    alt={booking.studioTitle}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/30 font-mono text-[9px] font-bold text-emerald-400 uppercase">
                    {booking.status || "CONFIRMED"}
                  </span>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider truncate">
                    {booking.category || "STUDIO"}{" "}
                    {booking.studioLocation ? `• ${booking.studioLocation}` : ""}
                  </span>

                  <h3 className="font-bold text-sm sm:text-base text-text-primary truncate">
                    {booking.studioTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary font-mono mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-orange" />
                      <span>{booking.date}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-orange" />
                      <span>
                        {booking.callTime} – {booking.wrapTime} ({booking.hours}h)
                      </span>
                    </span>
                  </div>

                  <div className="text-xs font-mono text-text-muted mt-1">
                    <span className="text-text-primary font-bold">
                      ${booking.hourlyRate}/h × {booking.hours}h = ${booking.totalAmount} Total
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-border-subtle shrink-0">
                <Link
                  href={`/studios/${booking.studioId}`}
                  className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary text-xs font-mono font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setCancellingBooking(booking)}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancel Booking</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {cancellingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-film-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-surface-1 border border-border-subtle p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Cancel Reservation?
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Are you sure you want to cancel this booking?
                </p>
              </div>
            </div>

            <p className="text-xs text-text-secondary bg-surface-2/60 p-3.5 rounded-xl border border-border-subtle">
              You are cancelling your booking for{" "}
              <strong className="text-text-primary">
                &ldquo;{cancellingBooking.studioTitle}&rdquo;
              </strong>{" "}
              on{" "}
              <span className="font-mono text-brand-orange">
                {cancellingBooking.date}
              </span>
              .
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setCancellingBooking(null)}
                className="px-4 py-2 rounded-xl bg-surface-2 text-text-secondary hover:text-text-primary text-xs font-mono font-semibold transition-colors cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancel}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono font-bold transition-all shadow-md shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Confirm Cancel</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
