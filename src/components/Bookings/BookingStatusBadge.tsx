"use client";

import { Badge } from "@/components/ui/badge";

interface BookingStatusBadgeProps {
  status?: string;
  className?: string;
}

export function BookingStatusBadge({ status, className }: BookingStatusBadgeProps) {
  const s = (status || "").toLowerCase();

  if (s.includes("cancel")) {
    return (
      <Badge
        variant="outline"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border-rose-500/30 text-rose-400 font-mono text-[11px] font-semibold h-auto ${className || ""}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
        <span>Cancelled</span>
      </Badge>
    );
  }

  if (s.includes("complete")) {
    return (
      <Badge
        variant="outline"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border-blue-500/30 text-blue-400 font-mono text-[11px] font-semibold h-auto ${className || ""}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
        <span>Completed</span>
      </Badge>
    );
  }

  if (s.includes("confirm")) {
    return (
      <Badge
        variant="outline"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold h-auto ${className || ""}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
        <span>Confirmed</span>
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border-amber-500/30 text-amber-400 font-mono text-[11px] font-semibold h-auto ${className || ""}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
      <span>Pending Host Approval</span>
    </Badge>
  );
}

