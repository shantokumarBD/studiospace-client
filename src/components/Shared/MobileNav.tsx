"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems } from "./NavLinks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "@/lib/auth-client";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleMobileNavClick = (href: string) => {
    setOpen(false);
    if (href.includes("#how-it-works")) {
      if (pathname === "/") {
        const el = document.getElementById("how-it-works");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "/#how-it-works");
        }
      } else {
        router.push("/#how-it-works");
      }
    } else if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="p-2 rounded-xl text-text-secondary hover:text-text-primary bg-surface-2 border border-border-subtle cursor-pointer">
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-surface-1 border-l border-border-subtle text-text-primary w-72 flex flex-col justify-between"
        >
          <div>
            <SheetHeader className="text-left pb-4 border-b border-border-subtle">
              <SheetTitle className="text-text-primary font-bold">
                Studio<span className="text-brand-orange">Space</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-1.5 py-4">
              {navItems.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => handleMobileNavClick(link.href)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-surface-2 text-text-primary border-l-2 border-brand-orange"
                        : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {!user && (
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-2">
              <Link
                href="/log-in"
                onClick={() => setOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-text-primary bg-surface-2 border border-border-subtle"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-brand-amber"
              >
                Register
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
