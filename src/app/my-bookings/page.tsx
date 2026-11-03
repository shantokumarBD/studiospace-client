import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyBookings } from "@/lib/api";
import MyBookingsClient from "@/components/Bookings/MyBookingsClient";

export const metadata = {
  title: "My Stage Bookings | StudioSpace",
  description: "Track and manage your scheduled film and photo shoot reservations.",
};

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const initialBookings = await getMyBookings(session.user.email || "");

  return (
    <main className="min-h-screen bg-film-black">
      <MyBookingsClient
        user={session.user}
        initialBookings={initialBookings}
      />
    </main>
  );
}

