"use client";

interface ModernLoaderProps {
  text?: string;
  subtext?: string;
  size?: "sm" | "md" | "lg" | "fullscreen";
}

export default function ModernLoader({
  text = "Calibrating Workspace Telemetry...",
  subtext = "OPTICAL FEED SYNCHRONIZED",
  size = "md",
}: ModernLoaderProps) {
  const isFull = size === "fullscreen";

  return (
    <div
      className={`flex flex-col items-center justify-center select-none ${
        isFull
          ? "min-h-[80vh] w-full py-20"
          : size === "lg"
          ? "py-24"
          : size === "sm"
          ? "py-8"
          : "py-16"
      }`}
    >
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-28 h-28 rounded-full bg-brand-orange/10 blur-2xl animate-pulse" />

        <div className="w-16 h-16 rounded-full border-2 border-border-subtle border-t-brand-orange border-r-brand-amber animate-spin" />

        <div className="absolute w-11 h-11 rounded-full border border-dashed border-border-subtle/80 animate-spin [animation-direction:reverse] [animation-duration:6s]" />

        <div className="absolute w-6 h-6 rounded-full bg-surface-1 border border-brand-orange/40 flex items-center justify-center shadow-[0_0_12px_rgba(224,79,38,0.4)]">
          <svg
            className="w-3.5 h-3.5 text-brand-orange animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center px-4">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-text-primary tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
          <span>{text}</span>
        </div>

        {subtext && (
          <span className="font-mono text-[11px] text-text-muted tracking-widest">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

