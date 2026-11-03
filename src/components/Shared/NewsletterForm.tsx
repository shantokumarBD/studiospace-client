"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing to StudioSpace telemetry updates!");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="director@creativestudio.io"
        required
        className="w-full bg-surface-2 border border-border-subtle rounded-xl px-3.5 py-2 text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs px-4 py-2 rounded-xl hover:opacity-90 shrink-0 transition-opacity cursor-pointer"
      >
        JOIN
      </button>
    </form>
  );
}
