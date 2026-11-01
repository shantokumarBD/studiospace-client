import Link from "next/link";
import NavLinks from "../Shared/NavLinks";
import AuthButtons from "../Shared/AuthButtons";
import MobileNav from "../Shared/MobileNav";
import Logo from "../Shared/Logo";


export default function Navbar() {
  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-surface-1/85 backdrop-blur-xl border-b border-border-subtle">
      <div className="h-20 max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Logo></Logo>

        {/* Center NavLinks */}
        <NavLinks />

        {/* Right Section: Auth & Mobile Menu */}
        <div className="flex items-center gap-3">
          <AuthButtons />
          <MobileNav />
        </div>

      </div>
    </header>
  );
}