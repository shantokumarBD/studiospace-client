"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (document.location.hash === "#how-it-works") {
      setTimeout(() => {
        const el = document.getElementById("how-it-works");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }

    const handleHashChange = () => {
      setActiveHash(document.location.hash);
    };

    document.defaultView?.addEventListener("hashchange", handleHashChange);
    return () => document.defaultView?.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== "undefined" && pathname === "/") {
      const el = document.getElementById("how-it-works");
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHash("#how-it-works");
            } else if ((document.documentElement.scrollTop || document.body.scrollTop || 0) < 300) {
              setActiveHash("");
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#how-it-works")) {
      e.preventDefault();
      setActiveHash("#how-it-works");
      if (pathname === "/") {
        const el = document.getElementById("how-it-works");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          router.replace("/#how-it-works", { scroll: false });
        }
      } else {
        router.push("/#how-it-works");
      }
    } else if (href === "/") {
      setActiveHash("");
      if (pathname === "/") {
        document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
        router.replace("/", { scroll: false });
      }
    } else {
      setActiveHash("");
    }
  };

  return (
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
      {navItems.map((link) => {
        let active = false;
        if (link.href.includes("#how-it-works")) {
          active = pathname === "/" && activeHash === "#how-it-works";
        } else if (link.href === "/") {
          active = pathname === "/" && activeHash !== "#how-it-works";
        } else {
          active = pathname === link.href;
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer ${
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
