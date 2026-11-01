"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { navItems } from "./NavLinks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="p-2 rounded-xl text-text-secondary hover:text-text-primary bg-surface-2 border border-border-subtle cursor-pointer">
          <Menu className="w-5 h-5" />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-surface-1 border-l border-border-subtle text-text-primary w-72"
        >
          <SheetHeader className="text-left pb-4 border-b border-border-subtle">
            <SheetTitle className="text-text-primary font-bold">
              Studio<span className="text-brand-orange">Space</span>
            </SheetTitle>
          </SheetHeader>

          {/* Links */}
          <div className="flex flex-col gap-2 py-4">
            {navItems.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-surface-2 text-text-primary border-l-2 border-brand-orange"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-border-subtle flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-text-primary bg-surface-2 border border-border-subtle"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-brand-amber"
            >
              Register
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
