import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyWishlist } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import WishlistClient from "@/components/Wishlist/WishlistClient";
import ModernLoader from "@/components/Shared/ModernLoader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  const token = await getAuthTokenServer();
  const initialWishlist = await getMyWishlist(session.user.email || "", token);

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
