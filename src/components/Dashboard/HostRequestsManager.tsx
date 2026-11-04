"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  Mail,
  User,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Loader2,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { Booking } from "@/Types";
import { updateBookingStatus } from "@/lib/api";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HostRequestsManagerProps {
  initialRequests: Booking[];
  hostEmail: string;
}

export default function HostRequestsManager({
  initialRequests,
  hostEmail,
}: HostRequestsManagerProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<Booking[]>(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const pendingCount = requests.filter((r) =>
    (r.status || "").toLowerCase().includes("pending")
  ).length;

  const confirmedCount = requests.filter((r) =>
    (r.status || "").toLowerCase().includes("confirm")
  ).length;

  const cancelledCount = requests.filter((r) => {
    const s = (r.status || "").toLowerCase();
    return s.includes("cancel") || s.includes("reject");
  }).length;

  const filteredRequests = requests.filter((req) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      req.studioTitle?.toLowerCase().includes(q) ||
      req.renterName?.toLowerCase().includes(q) ||
      req.renterEmail?.toLowerCase().includes(q) ||
      req.date?.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    const s = (req.status || "").toLowerCase();
    if (statusFilter === "pending") return s.includes("pending");
    if (statusFilter === "confirmed") return s.includes("confirm");
    if (statusFilter === "cancelled") return s.includes("cancel") || s.includes("reject");

    return true;
  });

  const handleStatusChange = async (
    bookingId: string,
    newStatus: "Confirmed" | "Cancelled"
  ) => {
    setProcessingId(bookingId);
    try {
      const token = await GetTokenFormClient();
      const res = await updateBookingStatus(bookingId, newStatus, token);

      if (res?.success) {
        setRequests((prev) =>
          prev.map((item) =>
            item._id === bookingId ? { ...item, status: newStatus } : item
          )
        );
        if (newStatus === "Confirmed") {
          toast.success("Stage reservation confirmed! Renter's booking status updated.");
        } else {
          toast.success("Reservation request rejected / cancelled.");
        }
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update reservation status");
      }
    } catch {
      toast.error("Failed to connect to server. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("confirm")) {
      return (
        <Badge
          variant="outline"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold h-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Confirmed Stage Lock</span>
        </Badge>
      );
    }
    if (s.includes("cancel") || s.includes("reject")) {
      return (
        <Badge
          variant="outline"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-[11px] font-semibold h-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>Rejected / Cancelled</span>
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-semibold h-auto"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>Pending Host Decision</span>
      </Badge>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-surface-1 border border-border-subtle">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOST PRODUCTION LEDGER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
            Incoming Studio Stage Requests
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Review, approve, or reject incoming reservations requested by creators for your listed stages.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-surface-2 border border-border-subtle flex items-center gap-2">
            <span className="text-text-muted">Total:</span>
            <span className="font-bold text-text-primary">{requests.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Pending:</span>
            <span className="font-bold">{pendingCount}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
            <span>Confirmed:</span>
            <span className="font-bold">{confirmedCount}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <Input
            type="text"
            placeholder="Search by stage title, renter name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-surface-1 border-border-subtle text-text-primary text-xs h-10 rounded-xl focus-visible:border-brand-orange"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 font-mono text-xs">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs h-auto cursor-pointer ${
              statusFilter === "all"
                ? "bg-brand-orange text-white font-bold"
                : "bg-surface-1 border border-border-subtle text-text-secondary hover:text-text-primary"
            }`}
          >
            All ({requests.length})
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 rounded-xl text-xs h-auto cursor-pointer ${
              statusFilter === "pending"
                ? "bg-amber-500 text-black font-bold"
                : "bg-surface-1 border border-border-subtle text-amber-400 hover:text-amber-300"
            }`}
          >
            Pending ({pendingCount})
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setStatusFilter("confirmed")}
            className={`px-3 py-1.5 rounded-xl text-xs h-auto cursor-pointer ${
              statusFilter === "confirmed"
                ? "bg-emerald-500 text-black font-bold"
                : "bg-surface-1 border border-border-subtle text-emerald-400 hover:text-emerald-300"
            }`}
          >
            Confirmed ({confirmedCount})
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setStatusFilter("cancelled")}
            className={`px-3 py-1.5 rounded-xl text-xs h-auto cursor-pointer ${
              statusFilter === "cancelled"
                ? "bg-rose-500 text-white font-bold"
                : "bg-surface-1 border border-border-subtle text-rose-400 hover:text-rose-300"
            }`}
          >
            Declined ({cancelledCount})
          </Button>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="py-16 px-4 rounded-3xl bg-surface-1 border border-dashed border-border-subtle text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center text-text-muted mb-3">
            <CalendarCheck2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-text-primary mb-1">
            No Stage Requests Found
          </h3>
          <p className="text-xs text-text-secondary max-w-sm">
            {searchQuery || statusFilter !== "all"
              ? "No incoming reservations match your active search or status filter."
              : "When creators schedule reservations for your studio listings, their requests will appear here for your review and approval."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredRequests.map((req) => {
            const isPending = (req.status || "").toLowerCase().includes("pending");
            const isConfirmed = (req.status || "").toLowerCase().includes("confirm");
            const isCancelled =
              (req.status || "").toLowerCase().includes("cancel") ||
              (req.status || "").toLowerCase().includes("reject");
            const isProcessing = processingId === req._id;

            return (
              <div
                key={req._id}
                className="p-5 sm:p-6 rounded-3xl bg-surface-1 border border-border-subtle hover:border-border-default transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0">
                  {req.studioImage ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-surface-2 border border-border-subtle">
                      <img
                        src={req.studioImage}
                        alt={req.studioTitle || "Studio Stage"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center shrink-0 text-text-muted">
                      <CalendarCheck2 className="w-8 h-8" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <Link
                        href={`/studios/${req.studioId}`}
                        className="text-base sm:text-lg font-black text-text-primary hover:text-brand-orange transition-colors truncate"
                      >
                        {req.studioTitle || "Studio Space"}
                      </Link>
                      {getStatusBadge(req.status)}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-text-secondary flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-orange" />
                        <span className="font-semibold text-text-primary">
                          {req.renterName}
                        </span>
                      </div>
                      <span>•</span>
                      <a
                        href={`mailto:${req.renterEmail}`}
                        className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors font-mono"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{req.renterEmail}</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-text-muted mt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        <span className="text-text-secondary font-bold">DATE:</span>
                        <span className="text-text-primary">{req.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-text-muted" />
                        <span>
                          {req.callTime} – {req.wrapTime} ({req.hours}h)
                        </span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span className="text-text-secondary font-bold">PAYOUT:</span>
                        <span className="text-emerald-400 font-black">
                          ${req.totalAmount}
                        </span>
                      </div>
                    </div>

                    {req.specialNotes && (
                      <div className="mt-2 p-2.5 rounded-xl bg-surface-2 border border-border-subtle/80 text-xs text-text-secondary flex items-start gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <p className="line-clamp-2 italic">
                          &ldquo;{req.specialNotes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                  {isPending && (
                    <>
                      <Button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleStatusChange(req._id, "Confirmed")}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] h-auto"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        <span>Accept & Confirm</span>
                      </Button>

                      <Button
                        type="button"
                        disabled={isProcessing}
                        variant="outline"
                        onClick={() => handleStatusChange(req._id, "Cancelled")}
                        className="px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-rose-500/10 border-border-subtle hover:border-rose-500/30 text-rose-400 font-mono text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 h-auto"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>Reject</span>
                      </Button>
                    </>
                  )}

                  {isConfirmed && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirmed on Stage Schedule</span>
                      </span>
                      <Button
                        type="button"
                        disabled={isProcessing}
                        variant="ghost"
                        onClick={() => handleStatusChange(req._id, "Cancelled")}
                        className="px-3 py-1.5 rounded-xl text-[11px] font-mono text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 cursor-pointer h-auto"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}

                  {isCancelled && (
                    <span className="font-mono text-xs text-rose-400 font-semibold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      <span>Request Declined</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
