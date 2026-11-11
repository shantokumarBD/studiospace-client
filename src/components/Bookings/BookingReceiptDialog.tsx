"use client";

import { Booking } from "@/Types";
import { Download, MapPin, Receipt, Calendar, Clock, CalendarPlus } from "lucide-react";
import toast from "react-hot-toast";
import { downloadBookingInvoice } from "@/lib/invoice";
import { downloadIcsCalendar } from "@/lib/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingReceiptDialogProps {
  booking: Booking | null;
  onClose: () => void;
}

export function BookingReceiptDialog({
  booking,
  onClose,
}: BookingReceiptDialogProps) {
  if (!booking) return null;

  const shortId = booking._id.slice(-8).toUpperCase();
  const subtotal = Number(booking.hourlyRate) * Number(booking.hours);

  const handleDownload = () => {
    downloadBookingInvoice(booking);
    toast.success("Official invoice file downloaded successfully!");
  };

  const handleAddToCalendar = () => {
    downloadIcsCalendar(booking);
    toast.success("Production event exported for Apple/Google Calendar!");
  };

  return (
    <Dialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-xl rounded-3xl bg-surface-1 border border-border-subtle p-6 sm:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto sm:max-w-xl text-text-primary">
        <DialogHeader className="border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest">
            <Receipt className="w-3.5 h-3.5" />
            <span>StudioSpace Official Receipt</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight mt-1">
            Reservation #{shortId}
          </DialogTitle>
          <DialogDescription className="text-xs font-mono text-text-muted mt-0.5">
            Issued for: {booking.renterName} ({booking.renterEmail})
          </DialogDescription>
        </DialogHeader>

        {/* Status Row */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-2 border border-border-subtle">
          <span className="text-xs font-mono text-text-muted uppercase">
            Reservation Status
          </span>
          <BookingStatusBadge status={booking.status} />
        </div>

        {/* Studio & Schedule Box */}
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Studio Space & Production Schedule
          </span>
          <div className="p-4 rounded-2xl bg-surface-2/60 border border-border-subtle flex flex-col gap-2.5">
            <span className="font-bold text-sm text-text-primary">
              {booking.studioTitle}
            </span>
            <span className="text-xs text-text-secondary flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
              <span>{booking.studioLocation || "Calibrated Film Stage"}</span>
            </span>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-2 border-t border-border-subtle/50">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Date: {booking.date}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  Call: {booking.callTime} – {booking.wrapTime} ({booking.hours} hrs)
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Financial Ledger Breakdown
          </span>
          <div className="rounded-2xl bg-surface-2/60 border border-border-subtle overflow-hidden p-1 font-mono text-xs">
            <Table>
              <TableBody>
                <TableRow className="border-b border-border-subtle/50 hover:bg-transparent">
                  <TableCell className="text-text-secondary py-2.5 px-3">
                    Studio Hourly Rate
                  </TableCell>
                  <TableCell className="text-right text-text-primary py-2.5 px-3">
                    ${booking.hourlyRate} / hour
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-border-subtle/50 hover:bg-transparent">
                  <TableCell className="text-text-secondary py-2.5 px-3">
                    Reserved Production Block
                  </TableCell>
                  <TableCell className="text-right text-text-primary py-2.5 px-3">
                    {booking.hours} hours
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-border-subtle/50 hover:bg-transparent">
                  <TableCell className="text-text-secondary py-2.5 px-3">
                    Stage Rental ({booking.hourlyRate} × {booking.hours}h)
                  </TableCell>
                  <TableCell className="text-right text-text-primary py-2.5 px-3 font-semibold">
                    ${subtotal}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-border-subtle/50 hover:bg-transparent">
                  <TableCell className="text-text-secondary py-2.5 px-3">
                    Security & Soundstage Deposit
                  </TableCell>
                  <TableCell className="text-right text-text-primary py-2.5 px-3">
                    $250
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent bg-surface-2/40">
                  <TableCell className="text-sm font-bold text-text-primary py-3 px-3">
                    Total Production Lock
                  </TableCell>
                  <TableCell className="text-right text-base font-extrabold text-amber-500 py-3 px-3">
                    ${booking.totalAmount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-3 border-t border-border-subtle">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer h-auto border-border-subtle"
          >
            <CalendarPlus className="w-4 h-4 text-amber-500" />
            <span>Add to Calendar</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleDownload}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-2 hover:bg-surface-3 text-text-primary text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer h-auto border-border-subtle"
          >
            <Download className="w-4 h-4 text-brand-orange" />
            <span>Download Invoice</span>
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-mono font-semibold transition-colors cursor-pointer text-center h-auto"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

