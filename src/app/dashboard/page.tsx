import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck2,
  Heart,
  PlusCircle,
  ArrowRight,
  Compass,
  Clock,
  Sparkles,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getMyStudios, getMyBookings, getMyWishlist, getHostBookings } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import ModernLoader from "@/components/Shared/ModernLoader";
import HostRequestsManager from "@/components/Dashboard/HostRequestsManager";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Creator Dashboard | StudioSpace",
  description: "Overview of your studio listings, bookings, and saved workspaces.",
};

async function DashboardContent() {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch {
    session = null;
  }

  if (!session?.user) {
    redirect("/log-in");
  }

  let token: string | undefined;
  try {
    token = await getAuthTokenServer();
  } catch {
    token = undefined;
  }
  const email = session.user.email || "";

  let studios: any[] = [];
  let bookings: any[] = [];
  let wishlist: any[] = [];
  let hostRequests: any[] = [];

  try {
    const results = await Promise.allSettled([
      getMyStudios(email, token),
      getMyBookings(email, token),
      getMyWishlist(email, token),
      getHostBookings(email, token),
    ]);

    studios = results[0].status === "fulfilled" ? results[0].value : [];
    bookings = results[1].status === "fulfilled" ? results[1].value : [];
    wishlist = results[2].status === "fulfilled" ? results[2].value : [];
    hostRequests = results[3].status === "fulfilled" ? results[3].value : [];
  } catch {
    studios = [];
    bookings = [];
    wishlist = [];
    hostRequests = [];
  }

  const pendingHostRequests = (hostRequests || []).filter((b) =>
    (b.status || "").toLowerCase().includes("pending")
  ).length;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-border-subtle">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>CREATOR & HOST CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
            Welcome back, {session.user.name?.split(" ")[0] || "Creator"}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Manage your listed stages, review incoming creator reservations, and track scheduled productions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(224,79,38,0.35)] hover:opacity-90 py-2.5 px-4 transition-opacity"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List New Studio</span>
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center gap-2 rounded-xl bg-surface-1 border border-border-subtle text-text-primary hover:bg-surface-2 font-mono text-xs font-semibold py-2.5 px-4 transition-colors"
          >
            <Compass className="w-4 h-4 text-brand-orange" />
            <span>Explore Studios</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between hover:border-brand-orange/40 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              My Listed Studios
            </span>
            <div className="w-9 h-9 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-black text-text-primary">
              {studios.length}
            </div>
            <Link
              href="/my-listings"
              className="inline-flex items-center gap-1.5 text-xs text-brand-orange hover:text-brand-amber font-semibold mt-3 transition-colors"
            >
              <span>Manage Listings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between hover:border-brand-orange/40 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Incoming Stage Requests
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-black text-text-primary">
                {hostRequests.length}
              </span>
              {pendingHostRequests > 0 && (
                <span className="text-xs font-mono text-amber-400 font-bold">
                  ({pendingHostRequests} pending)
                </span>
              )}
            </div>
            <a
              href="#incoming-requests"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold mt-3 transition-colors"
            >
              <span>Review Requests</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between hover:border-brand-orange/40 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              My Reservations
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-black text-text-primary">
              {bookings.length}
            </div>
            <Link
              href="/my-bookings"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mt-3 transition-colors"
            >
              <span>View Renter Ledger</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-1 border border-border-subtle flex flex-col justify-between hover:border-brand-orange/40 transition-colors group">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Saved Wishlist
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl font-black text-text-primary">
              {wishlist.length}
            </div>
            <Link
              href="/wishlist"
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold mt-3 transition-colors"
            >
              <span>Saved Workspaces</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div id="incoming-requests" className="my-10 scroll-mt-6">
        <HostRequestsManager
          initialRequests={hostRequests}
          hostEmail={email}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <div className="p-6 rounded-3xl bg-surface-1 border border-border-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-brand-orange" />
                <h3 className="font-bold text-base text-text-primary">My Studio Stages</h3>
              </div>
              <Link
                href="/my-listings"
                className="text-xs font-mono text-brand-orange hover:underline font-semibold"
              >
                View All ({studios.length}) →
              </Link>
            </div>

            {studios.length === 0 ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <p className="text-xs text-text-secondary max-w-xs mb-4">
                  You haven&apos;t listed any studios yet. Monetize your creative space by listing it today.
                </p>
                <Link
                  href="/add-studio"
                  className="px-4 py-2 rounded-xl bg-brand-orange text-white font-mono text-xs font-semibold"
                >
                  Add Your First Studio
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {studios.slice(0, 3).map((st) => (
                  <div
                    key={st._id}
                    className="p-3 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-surface-1">
                        <img
                          src={st.image}
                          alt={st.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-text-primary truncate">
                          {st.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                          <span>{st.category}</span>
                          <span>•</span>
                          <span className="text-brand-orange font-bold font-mono">
                            ${st.hourlyRate}/hr
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/studios/edit/${st._id}`}
                      className="shrink-0 text-xs font-mono py-1 px-2.5 rounded-lg border border-border-subtle hover:bg-surface-3 transition-colors text-text-primary"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-surface-1 border border-border-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4 text-brand-orange" />
                <h3 className="font-bold text-base text-text-primary">Recent Reservations (Renter)</h3>
              </div>
              <Link
                href="/my-bookings"
                className="text-xs font-mono text-brand-orange hover:underline font-semibold"
              >
                View All ({bookings.length}) →
              </Link>
            </div>

            {bookings.length === 0 ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <p className="text-xs text-text-secondary max-w-xs mb-4">
                  No stage reservations scheduled yet. Browse available studios for your next shoot.
                </p>
                <Link
                  href="/studios"
                  className="px-4 py-2 rounded-xl bg-brand-orange text-white font-mono text-xs font-semibold"
                >
                  Explore Spaces
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {bookings.slice(0, 3).map((bk) => (
                  <div
                    key={bk._id}
                    className="p-3 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-text-primary truncate">
                          {bk.studioTitle}
                        </h4>
                        <Badge
                          variant="outline"
                          className={`text-[9px] font-mono uppercase font-bold py-0 px-1.5 h-auto ${
                            (bk.status || "").toLowerCase().includes("confirm")
                              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                              : (bk.status || "").toLowerCase().includes("cancel")
                              ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                              : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          }`}
                        >
                          {bk.status || "Pending"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted mt-1">
                        <span>{bk.date}</span>
                        <span>•</span>
                        <span>{bk.callTime} – {bk.wrapTime}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">${bk.totalAmount}</span>
                      </div>
                    </div>
                    <Link
                      href="/my-bookings"
                      className="shrink-0 text-xs font-mono py-1 px-2.5 rounded-lg border border-border-subtle hover:bg-surface-3 transition-colors text-text-primary"
                    >
                      Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense
        fallback={
          <ModernLoader
            size="fullscreen"
            text="Calibrating Dashboard Telemetry..."
            subtext="SYNCING STAGES, BOOKINGS & LEDGERS"
          />
        }
      >
        <DashboardContent />
      </Suspense>
    </main>
  );
}
