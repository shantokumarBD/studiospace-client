import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyBookings } from "@/lib/api";
import { getAuthTokenServer } from "@/lib/gettokenformServer";
import MyBookingsClient from "@/components/Bookings/MyBookingsClient";
import ModernLoader from "@/components/Shared/ModernLoader";

export const metadata = {
  title: "My Stage Bookings | StudioSpace",
  description: "Track and manage your scheduled film and photo shoot reservations.",
};

async function MyBookingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const token = await getAuthTokenServer();
  const initialBookings = await getMyBookings(session.user.email || "", token);

  return (
    <MyBookingsClient
      key={initialBookings.map((b) => b._id + (b.status || "")).join("-") || "empty"}
      user={session.user}
      initialBookings={initialBookings}
    />
  );
}

export default function MyBookingsPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense fallback={<ModernLoader size="lg" text="Loading your bookings..." />}>
        <MyBookingsContent />
      </Suspense>
    </main>
  );
}