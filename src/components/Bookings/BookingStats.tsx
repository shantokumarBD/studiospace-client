"use client";

import { CheckCircle2, DollarSign, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BookingStatsProps {
  totalShoots: number;
  totalCharged: number;
  pendingCount: number;
}

export function BookingStats({
  totalShoots,
  totalCharged,
  pendingCount,
}: BookingStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <Card className="bg-surface-1 border-border-subtle shadow-sm py-4">
        <CardContent className="px-4 py-0 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-text-muted uppercase block">
              Total Reservations
            </span>
            <p className="text-2xl font-bold font-mono text-text-primary mt-1">
              {totalShoots}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-text-muted">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-surface-1 border-border-subtle shadow-sm py-4">
        <CardContent className="px-4 py-0 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-text-muted uppercase block">
              Total Charged / Due
            </span>
            <p className="text-2xl font-bold font-mono text-brand-orange mt-1">
              ${totalCharged.toLocaleString()}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
            <DollarSign className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-surface-1 border-border-subtle shadow-sm py-4">
        <CardContent className="px-4 py-0 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-text-muted uppercase block">
              Pending Approval
            </span>
            <p className="text-2xl font-bold font-mono text-amber-400 mt-1 flex items-center gap-2">
              <span>{pendingCount}</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

