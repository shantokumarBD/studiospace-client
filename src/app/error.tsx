"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("StudioSpace App Runtime Error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] w-full flex items-center justify-center p-6 bg-film-black select-none">
      <div className="w-full max-w-md rounded-3xl bg-surface-1 border border-border-subtle p-8 shadow-2xl text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div>
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest font-semibold block mb-1">
            CONNECTION SYNCHRONIZATION ERROR
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Stage Signal Interrupted
          </h2>
          <p className="text-text-secondary text-xs sm:text-sm mt-2 leading-relaxed">
            The studio telemetry feed encountered a momentary network hiccup while connecting to the soundstage servers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>

          <Link
            href="/"
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-brand-amber" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

