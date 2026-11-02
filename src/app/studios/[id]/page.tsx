import { Suspense } from "react";
import { getSingleStudio } from "@/lib/api";
import StudioDetailsView from "@/components/Studios/StudioDetailsView";
import ModernLoader from "@/components/Shared/ModernLoader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function StudioContent({ params }: PageProps) {
  const { id } = await params;
  const studio = await getSingleStudio(id);

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

  return <StudioDetailsView studio={studio} />;
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
