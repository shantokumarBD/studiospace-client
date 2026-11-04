"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  MapPin,
  Search,
  Trash2,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Receipt,
  XCircle,
  Printer,
  X,
  CalendarDays,
} from "lucide-react";
import toast from "react-hot-toast";
import { Booking } from "@/Types";
import { cancelBooking } from "@/lib/api";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

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
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(
    null
  );
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter((b) => {
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

  const totalShoots = bookings.length;
  const totalCharged = bookings.reduce(
    (acc, b) => acc + (Number(b.totalAmount) || 0),
    0
  );
  const pendingCount = bookings.filter((b) => {
    const s = (b.status || "").toLowerCase();
    return s.includes("pending") || s === "pending host approval";
  }).length;

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

  const getStatusBadge = (status?: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("cancel")) {
      return (
        <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-semibold h-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>Cancelled</span>
        </Badge>
      );
    }
    if (s.includes("complete")) {
      return (
        <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-[11px] font-semibold h-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Completed</span>
        </Badge>
      );
    }
    if (s.includes("confirm")) {
      return (
        <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold h-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Confirmed Reservation</span>
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-semibold h-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>Pending Host Approval</span>
      </Badge>
    );
  };

  const isCancelled = (status?: string) => {
    return (status || "").toLowerCase().includes("cancel");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 print:hidden">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Total Reservations
          </span>
          <p className="text-2xl font-bold font-mono text-text-primary mt-1">
            {totalShoots}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Total Charged / Due
          </span>
          <p className="text-2xl font-bold font-mono text-brand-orange mt-1">
            ${totalCharged.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase block">
            Pending Approval
          </span>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1 flex items-center gap-2">
            <span>{pendingCount}</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
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
            placeholder="Filter by studio, location, or status..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-1 border border-border-subtle text-xs text-text-primary placeholder:text-text-muted focus-visible:border-brand-orange focus-visible:ring-0 transition-colors h-auto"
          />
        </div>
        <span className="hidden sm:block text-xs font-mono text-text-muted">
          Showing {filteredBookings.length} of {bookings.length} reservations
        </span>
      </div>

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
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="mt-2 text-xs font-mono text-brand-orange hover:underline cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredBookings.map((booking) => {
            const shortId = booking._id.slice(-6);
            const cancelled = isCancelled(booking.status);

            return (
              <article
                key={booking._id}
                className="p-5 sm:p-6 rounded-2xl bg-surface-1 border border-border-subtle hover:border-brand-orange/30 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full lg:w-auto">
                  <div className="relative w-full sm:w-36 h-36 sm:h-24 rounded-xl overflow-hidden bg-surface-2 shrink-0 border border-border-subtle">
                    <img
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {getStatusBadge(booking.status)}
                      <span className="font-mono text-xs text-text-muted">
                        ID: #{shortId}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-text-primary tracking-tight">
                      {booking.studioTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{booking.date}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          {booking.callTime} – {booking.wrapTime} ({booking.hours} hrs)
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span className="truncate">
                        {booking.studioLocation || "Arts District, Downtown Los Angeles, CA"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border-subtle gap-4">
                  <div className="text-left lg:text-right">
                    <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted">
                      Total Charged / Due
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-500">
                      ${booking.totalAmount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReceipt(booking)}
                      className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm h-auto"
                    >
                      <Receipt className="w-3.5 h-3.5 text-text-muted" />
                      <span>Receipt</span>
                    </Button>

                    {!cancelled && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => setCancellingBooking(booking)}
                        className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm h-auto"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>

    {selectedReceipt && (
      <div
        id="printable-receipt-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-film-black/80 backdrop-blur-md print:static print:p-0 print:bg-white print:block"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedReceipt(null);
        }}
      >
        <div
          id="printable-receipt"
          className="relative w-full max-w-xl rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border print:border-gray-200 print:p-6 print:gap-3 print:w-full print:max-w-none print:bg-white print:text-black"
        >
            <div className="flex items-start justify-between border-b border-border-subtle pb-5 print:pb-2.5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-orange block">
                  StudioSpace Production Receipt
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight mt-1 print:text-xl print:text-black">
                  Reservation #{selectedReceipt._id.slice(-8).toUpperCase()}
                </h2>
                <span className="text-xs font-mono text-text-muted mt-0.5 block print:text-gray-600">
                  Generated for: {selectedReceipt.renterEmail}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedReceipt(null)}
                className="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer print:hidden h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-2 border border-border-subtle print:p-2.5 print:bg-gray-50 print:border-gray-200">
              <span className="text-xs font-mono text-text-muted uppercase print:text-gray-600">
                Reservation Status
              </span>
              <div>{getStatusBadge(selectedReceipt.status)}</div>
            </div>

            <div className="flex flex-col gap-3 print:gap-1.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted print:text-gray-600">
                Studio Space & Production Schedule
              </h4>
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border-subtle flex flex-col gap-2 print:p-2.5 print:bg-gray-50 print:border-gray-200 print:gap-1">
                <span className="font-bold text-sm text-text-primary print:text-black">
                  {selectedReceipt.studioTitle}
                </span>
                <span className="text-xs text-text-secondary flex items-center gap-1.5 print:text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{selectedReceipt.studioLocation}</span>
                </span>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-2 border-t border-border-subtle/50 print:pt-1 print:text-gray-600 print:border-gray-200">
                  <span>Date: {selectedReceipt.date}</span>
                  <span>
                    Call: {selectedReceipt.callTime} – {selectedReceipt.wrapTime} ({selectedReceipt.hours} hrs)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 print:gap-1.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted print:text-gray-600">
                Cost Breakdown
              </h4>
              <div className="p-4 rounded-2xl bg-surface-2/60 border border-border-subtle flex flex-col gap-2 font-mono text-xs print:p-2.5 print:bg-gray-50 print:border-gray-200 print:gap-1">
                <div className="flex items-center justify-between text-text-secondary print:text-gray-700">
                  <span>Studio Hourly Rate</span>
                  <span>${selectedReceipt.hourlyRate} / hour</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary print:text-gray-700">
                  <span>Reserved Production Block</span>
                  <span>{selectedReceipt.hours} hours</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary print:text-gray-700">
                  <span>Stage Rental ({selectedReceipt.hourlyRate} × {selectedReceipt.hours}h)</span>
                  <span>${selectedReceipt.hourlyRate * selectedReceipt.hours}</span>
                </div>
                <div className="flex items-center justify-between text-text-secondary print:text-gray-700">
                  <span>Security & Soundstage Deposit</span>
                  <span>$250</span>
                </div>
                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-sm font-bold text-text-primary print:pt-1.5 print:border-gray-200 print:text-black">
                  <span>Total Production Lock</span>
                  <span className="text-amber-500 text-base print:text-brand-orange font-bold">
                    ${selectedReceipt.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-border-subtle print:hidden">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer h-auto border-border-subtle"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </Button>
              <Button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono font-semibold transition-colors cursor-pointer text-center h-auto"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    {cancellingBooking && (
      <AlertDialog
        open={!!cancellingBooking}
        onOpenChange={(open) => {
          if (!open) setCancellingBooking(null);
        }}
      >
        <AlertDialogContent className="relative w-full max-w-md rounded-3xl bg-surface-1 border border-border-subtle p-6 shadow-2xl flex flex-col gap-4 sm:max-w-md print:hidden text-text-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <AlertDialogTitle className="text-base font-bold text-text-primary">
                Cancel Reservation?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-text-secondary mt-0.5">
                This reservation will be marked as Cancelled in your schedule.
              </AlertDialogDescription>
            </div>
          </div>

          {cancellingBooking && (
            <p className="text-xs text-text-secondary bg-surface-2/60 p-3.5 rounded-xl border border-border-subtle">
              You are requesting cancellation for{" "}
              <strong className="text-text-primary">
                &ldquo;{cancellingBooking.studioTitle}&rdquo;
              </strong>{" "}
              on{" "}
              <span className="font-mono text-brand-orange">
                {cancellingBooking.date}
              </span>
              . The record will remain in your booking history.
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isCancelling}
              onClick={() => setCancellingBooking(null)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-surface-2 text-text-secondary hover:text-text-primary text-xs font-mono font-semibold transition-colors cursor-pointer text-center h-auto border-border-subtle"
            >
              Keep Reservation
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isCancelling}
              onClick={handleConfirmCancel}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono font-bold transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 h-auto"
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
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    )}
    </>
  );
}
