"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
      {navItems.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative py-1 transition-colors whitespace-nowrap ${
              active
                ? "text-text-primary font-semibold after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-brand-orange after:rounded-full after:shadow-[0_0_8px_#E04F26]"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
