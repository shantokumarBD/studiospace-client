"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = saved ? saved === "dark" : true;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle color theme"
      className="w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-brand-orange transition-colors cursor-pointer shadow-sm"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-brand-amber" />
      ) : (
        <Moon className="w-4 h-4 text-brand-orange" />
      )}
    </button>
  );
}

