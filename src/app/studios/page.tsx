import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAllStudios, getMyWishlist } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import StudiosExplorer from "@/components/Studios/StudiosExplorer";
import ModernLoader from "@/components/Shared/ModernLoader";

export const metadata = {
  title: "Explore Studios | StudioSpace",
  description: "Browse film stages, soundstages, photo lofts, and creative production spaces.",
};

async function StudiosData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const studios = await getAllStudios();
  let wishlist: any[] = [];
  if (session?.user?.email) {
    try {
      const token = await getAuthTokenServer();
      wishlist = await getMyWishlist(session.user.email, token);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }

  const initialWishlistIds = (wishlist || []).map((item) => item.studioId);

  return (
    <StudiosExplorer
      initialStudios={studios}
      initialWishlistIds={initialWishlistIds}
    />
  );
}

export default function StudiosPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense
        fallback={
          <ModernLoader
            size="lg"
            text="Calibrating Studio Catalog..."
            subtext="SYNCING REALTIME AVAILABILITY & RATES"
          />
        }
      >
        <StudiosData />
      </Suspense>
    </main>
  );
}
