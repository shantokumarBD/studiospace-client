import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyWishlist } from "@/lib/api";
import WishlistClient from "@/components/Wishlist/WishlistClient";

export const metadata = {
  title: "Saved Wishlist | StudioSpace",
  description: "Your saved production stages and creative studios.",
};

export default async function WishlistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const initialWishlist = await getMyWishlist(session.user.email || "");

  return (
    <main className="min-h-screen bg-film-black">
      <WishlistClient
        user={session.user}
        initialWishlist={initialWishlist}
      />
    </main>
  );
}
