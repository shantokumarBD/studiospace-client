"use client";

import { Booking } from "@/Types";
import { Calendar, Clock, MapPin, Receipt, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingCardProps {
  booking: Booking;
  onOpenReceipt: (booking: Booking) => void;
  onRequestCancel: (booking: Booking) => void;
}

export function BookingCard({
  booking,
  onOpenReceipt,
  onRequestCancel,
}: BookingCardProps) {
  const shortId = booking._id.slice(-6);
  const isCancelled = (booking.status || "").toLowerCase().includes("cancel");

  return (
    <Card className="bg-surface-1 border-border-subtle hover:border-brand-orange/30 transition-all shadow-sm rounded-2xl py-0 overflow-hidden">
      <CardContent className="p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full lg:w-auto">
          {/* Studio Image */}
          <div className="relative w-full sm:w-36 h-36 sm:h-24 rounded-xl overflow-hidden bg-surface-2 shrink-0 border border-border-subtle">
            <img
              src={booking.studioImage}
              alt={booking.studioTitle}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <BookingStatusBadge status={booking.status} />
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

        {/* Pricing & Actions */}
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
              onClick={() => onOpenReceipt(booking)}
              className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm h-auto"
            >
              <Receipt className="w-3.5 h-3.5 text-text-muted" />
              <span>Receipt</span>
            </Button>

            {!isCancelled && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRequestCancel(booking)}
                className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm h-auto"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel Booking</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

