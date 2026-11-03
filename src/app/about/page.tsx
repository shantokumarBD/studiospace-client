import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Camera,
  Layers,
  HeartHandshake,
} from "lucide-react";

export const metadata = {
  title: "About Us | StudioSpace",
  description:
    "The premier peer-to-peer sharing platform for verified production stages, soundstages, and creative studios.",
};

const stats = [
  { label: "Verified Soundstages & Lofts", value: "120+" },
  { label: "Successful Productions", value: "1,800+" },
  { label: "Creator Community", value: "12,000+" },
  { label: "Safety & Host Guarantee", value: "$1M" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Rigorous Stage Verification",
    description:
      "Every studio and soundstage on StudioSpace undergoes physical inspection for acoustics, Camlock power rating, ceiling clearance, and freight access.",
  },
  {
    icon: Zap,
    title: "Creator-First Transparent Rates",
    description:
      "Zero hidden cleaning surcharges, opaque hourly fees, or surprise equipment charges. See exactly what you pay before you roll cameras.",
  },
  {
    icon: HeartHandshake,
    title: "Host Protection Guarantee",
    description:
      "We protect our studio owners with $1M in property liability coverage, verified renter screening, and automated security deposit locks.",
  },
  {
    icon: Layers,
    title: "Frictionless Scheduling",
    description:
      "Real-time hourly call & wrap times, instant production lock, synchronized host calendars, and unified digital receipts for your tax ledgers.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-film-black py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            Democratizing Access to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">
              World-Class Creative Studios
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
            StudioSpace is the premier peer-to-peer exchange connecting filmmakers, photographers, audio engineers, and indie producers with calibrated soundstages and photo lofts.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 sm:mb-28">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-surface-1 border border-border-subtle text-center hover:border-brand-orange/30 transition-all shadow-sm"
            >
              <p className="font-mono text-2xl sm:text-4xl font-extrabold text-brand-orange">
                {stat.value}
              </p>
              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-mono text-text-secondary uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-20 sm:mb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border-subtle font-mono text-xs text-text-muted uppercase mb-3">
              <Camera className="w-3.5 h-3.5 text-brand-orange" />
              <span>Our Origin Story</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Built by Filmmakers, for Independent Creators
            </h2>
            <div className="mt-4 space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
              <p>
                In early 2026, independent film and commercial creators faced a recurring roadblock: booking professional studio spaces meant dealing with fragmented brokerage agencies, opaque quote negotiations, and unexpected on-set fees.
              </p>
              <p>
                Meanwhile, top-tier audio suites, photo lofts, and cyclorama soundstages sat empty between episodic shoots.
              </p>
              <p>
                We built StudioSpace to bridge this divide — providing a transparent, verified platform where stage owners monetize downtime and creators instantly lock calibrated spaces tailored to their crew size and lighting packages.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Brokerage Markups</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Transparent Hourly Rates</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant Production Receipts</span>
              </span>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-border-subtle bg-surface-2 aspect-[4/3] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
              alt="Film soundstage production studio"
              className="w-full h-full object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-film-black/80 via-transparent to-film-black/20" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-film-black/85 backdrop-blur-md border border-white/10 font-mono text-[11px] sm:text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
              <span className="text-text-primary font-bold">Horizon Stage 4 Cinema Volume</span>
              <span className="text-brand-orange font-semibold">Sound-Certified</span>
            </div>
          </div>
        </div>

        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Our Core Production Pillars
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary">
              Everything we design is engineered to streamline creative operations and protect both creators and hosts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="p-6 sm:p-8 rounded-3xl bg-surface-1 border border-border-subtle hover:border-brand-orange/30 transition-all shadow-sm flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-surface-1 via-surface-2 to-surface-1 border border-border-subtle text-center flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(224,79,38,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Ready to Lock Your Next Production Stage?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
              Explore calibrated spaces across New York, Los Angeles, and Atlanta, or list your creative workspace to start earning.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/studios"
              className="px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-brand-orange/20 flex items-center gap-2"
            >
              <span>Explore Studios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/add-studio"
              className="px-6 py-3 rounded-full bg-surface-2 hover:bg-surface-3 border border-border-subtle text-text-primary font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>List Your Studio</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

