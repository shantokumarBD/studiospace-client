"use client";

import { Booking } from "@/Types";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CancelBookingDialogProps {
  booking: Booking | null;
  isCancelling: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function CancelBookingDialog({
  booking,
  isCancelling,
  onConfirm,
  onClose,
}: CancelBookingDialogProps) {
  if (!booking) return null;

  return (
    <AlertDialog open={!!booking} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="relative w-full max-w-md rounded-3xl bg-surface-1 border border-border-subtle p-6 shadow-2xl flex flex-col gap-4 sm:max-w-md text-text-primary">
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

        <p className="text-xs text-text-secondary bg-surface-2/60 p-3.5 rounded-xl border border-border-subtle">
          You are requesting cancellation for{" "}
          <strong className="text-text-primary">
            &ldquo;{booking.studioTitle}&rdquo;
          </strong>{" "}
          on{" "}
          <span className="font-mono text-brand-orange">
            {booking.date}
          </span>
          . The record will remain in your booking history.
        </p>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={isCancelling}
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-surface-2 text-text-secondary hover:text-text-primary text-xs font-mono font-semibold transition-colors cursor-pointer text-center h-auto border-border-subtle"
          >
            Keep Reservation
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isCancelling}
            onClick={onConfirm}
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
  );
}

