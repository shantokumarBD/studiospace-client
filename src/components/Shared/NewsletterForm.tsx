"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="director@creativestudio.io"
        required
        className="w-full bg-surface-2 border border-border-subtle rounded-xl px-3.5 py-2 text-xs font-mono text-text-primary placeholder:text-text-muted focus-visible:border-brand-orange focus-visible:ring-0 transition-colors h-auto"
      />
      <Button
        type="submit"
        className="bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-xs px-4 py-2 rounded-xl hover:opacity-90 shrink-0 transition-opacity cursor-pointer h-auto border-0"
      >
        JOIN
      </Button>
    </form>
  );
}