import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyStudios } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import MyListingsClient from "@/components/Studios/MyListingsClient";
import ModernLoader from "@/components/Shared/ModernLoader";

export const metadata = {
  title: "My Studio Listings | StudioSpace",
  description: "Manage your listed production spaces and stages.",
};

async function MyListingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const token = await getAuthTokenServer();
  const initialStudios = await getMyStudios(session.user.email || "", token);

  return (
    <MyListingsClient
      key={initialStudios.map((s) => s._id).join("-") || "empty"}
      user={session.user}
      initialStudios={initialStudios}
    />
  );
}

export default function MyListingsPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense fallback={<ModernLoader size="lg" text="Loading your studio listings..." />}>
        <MyListingsContent />
      </Suspense>
    </main>
  );
}