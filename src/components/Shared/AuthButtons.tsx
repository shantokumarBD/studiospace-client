"use client";

import Link from "next/link";
import { Moon } from "lucide-react";

export default function AuthButtons() {
  return (
    <div className="hidden sm:flex items-center gap-3">

      <button
        aria-label="Toggle Theme"
        className="w-10 h-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
      >
        <Moon className="w-4 h-4" />
      </button>


      <Link
        href="/login"
        className="hidden md:flex px-4 py-2 text-sm font-semibold rounded-xl text-text-primary border border-border-subtle hover:bg-surface-2 transition-colors"
      >
        Log In
      </Link>


      <Link
        href="/register"
        className="hidden md:flex px-5 py-2 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-brand-orange to-brand-amber brand-glow hover:opacity-95 transition-all"
      >
        Register
      </Link>
    </div>
  );
}