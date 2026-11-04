import Link from "next/link";
import Logo from "@/components/Shared/Logo";
import NewsletterForm from "../Shared/NewsletterForm";

// 1. Official Rebranded X Logo SVG (Strict Requirement: NOT the old Twitter bird)
const XIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// 2. Instagram SVG
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// 3. YouTube SVG
const YouTubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// 4. LinkedIn SVG
const LinkedInIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-surface-1 border-t border-border-subtle relative mt-auto transition-colors duration-200 print:hidden">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange to-transparent" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16">
        
        {/* Top Bar: Logo + Live Platform Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-12 border-b border-border-subtle gap-4">
          <Logo size="sm" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-pulse" />
            <span className="font-mono text-xs font-semibold text-[#22C55E] tracking-wider">
              ● PLATFORM STATUS: ONLINE
            </span>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-border-subtle">
          
          {/* Col 1: Mission Statement */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              The premier exchange for verified production stages, sound-isolated cyc bays, daylight film lofts, and audio mastering suites.
            </p>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              ENGINEERED FOR CREATORS & PRODUCERS
            </span>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h5 className="font-mono text-xs font-semibold tracking-wider text-text-secondary uppercase">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">Home</Link></li>
              <li><Link href="/studios" className="text-text-secondary hover:text-text-primary transition-colors">Explore Studios</Link></li>
              <li><Link href="/#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">About Us</Link></li>
              <li><Link href="/add-studio" className="text-text-secondary hover:text-text-primary transition-colors">Add Studio</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Studio Categories */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h5 className="font-mono text-xs font-semibold tracking-wider text-text-secondary uppercase">
              Studio Categories
            </h5>
            <ul className="space-y-2 text-xs">
              <li><Link href="/studios?category=Photo Studios" className="text-text-secondary hover:text-text-primary transition-colors">Photo Studio</Link></li>
              <li><Link href="/studios?category=Sound Stages" className="text-text-secondary hover:text-text-primary transition-colors">Sound Stage</Link></li>
              <li><Link href="/studios?category=Podcast Rooms" className="text-text-secondary hover:text-text-primary transition-colors">Podcast Room</Link></li>
              <li><Link href="/studios?category=Music Suites" className="text-text-secondary hover:text-text-primary transition-colors">Music Suite</Link></li>
              <li><Link href="/studios?category=Art Workshops" className="text-text-secondary hover:text-text-primary transition-colors">Art Workshop</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Form (Creator Dispatch) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h5 className="font-mono text-xs font-semibold tracking-wider text-text-primary uppercase">
              CREATOR DISPATCH
            </h5>
            <p className="text-xs text-text-secondary">
              Weekly studio inventory drops, stage openings, and gear specs.
            </p>
            <NewsletterForm />
          </div>

        </div>

        {/* Bottom Bar: Copyright & Rebranded Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted text-center sm:text-left">
          <p>© 2026 StudioSpace. All rights reserved. Film and audio facility telemetry platform.</p>
          
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-brand-orange hover:border-brand-orange/40 transition-all">
              <InstagramIcon />
            </a>
            {/* Official Rebranded X Logo */}
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-border-subtle transition-all">
              <XIcon />
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-all">
              <YouTubeIcon />
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-subtle flex items-center justify-center text-text-secondary hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-all">
              <LinkedInIcon />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}