"use client";
export default function NewsletterForm() {

  return (
    <form  className="flex items-center gap-2 mt-2">
      <input
        type="email"
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