import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyWishlist } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import { WishlistItem } from "@/Types";
import WishlistClient from "@/components/Wishlist/WishlistClient";
import ModernLoader from "@/components/Shared/ModernLoader";

export const metadata = {
  title: "Saved Wishlist | StudioSpace",
  description: "Your saved production stages and creative studios.",
};

async function WishlistContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  let initialWishlist: WishlistItem[] = [];
  try {
    const token = await getAuthTokenServer();
    initialWishlist = await getMyWishlist(session.user.email || "", token);
  } catch (error) {
    console.error("Failed to load wishlist:", error);
  }

  return (
    <WishlistClient
      key={initialWishlist.map((w) => w._id).join("-") || "empty"}
      user={session.user}
      initialWishlist={initialWishlist}
    />
  );
}

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense fallback={<ModernLoader size="lg" text="Loading your saved wishlist..." />}>
        <WishlistContent />
      </Suspense>
    </main>
  );
}
