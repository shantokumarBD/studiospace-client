import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getSingleStudio, getMyWishlist } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import StudioDetailsView from "@/components/Studios/StudioDetailsView";
import ModernLoader from "@/components/Shared/ModernLoader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const studio = await getSingleStudio(id);
  return {
    title: studio ? `${studio.title} | StudioSpace` : "Studio Details | StudioSpace",
    description: studio?.overview || "Explore production stage and creative studio specs.",
  };
}

async function StudioContent({ params }: PageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let userWishlist: any[] = [];
  if (session?.user?.email) {
    try {
      const token = await getAuthTokenServer();
      userWishlist = await getMyWishlist(session.user.email, token);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }

  const studio = await getSingleStudio(id);
  const wishlist = userWishlist;

  if (!studio) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Studio Not Found</h2>
          <p className="text-text-secondary text-sm mb-6">
            The studio you are looking for does not exist or has been removed from our listings.
          </p>
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-orange text-white font-mono text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore Studios</span>
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = wishlist.some((item) => item.studioId === id);

  return <StudioDetailsView studio={studio} initialIsSaved={isSaved} />;
}

export default function StudioDetailsPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense
        fallback={
          <ModernLoader
            size="lg"
            text="Calibrating Stage Specifications..."
            subtext="VERIFYING 4K RIGGING // CAMLOCK POWER METRICS"
          />
        }
      >
        <StudioContent params={params} />
      </Suspense>
    </main>
  );
}
