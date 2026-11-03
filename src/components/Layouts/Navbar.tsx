import { Suspense } from "react";
import NavLinks from "../Shared/NavLinks";
import AuthButtons from "../Shared/AuthButtons";
import MobileNav from "../Shared/MobileNav";
import Logo from "../Shared/Logo";
import ThemeToggle from "../Shared/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-surface-1/85 backdrop-blur-xl border-b border-border-subtle">
      <div className="h-20 max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Logo />

        <Suspense
          fallback={
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-6 w-72" />
          }
        >
          <NavLinks />
        </Suspense>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthButtons />
          <Suspense fallback={<div className="lg:hidden w-9 h-9" />}>
            <MobileNav />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
