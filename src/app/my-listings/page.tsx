import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyStudios } from "@/lib/api";
import MyListingsClient from "@/components/Studios/MyListingsClient";

export const metadata = {
  title: "My Studio Listings | StudioSpace",
  description: "Manage your listed production spaces and stages.",
};

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const initialStudios = await getMyStudios(session.user.email || "");

  return (
    <main className="min-h-screen bg-film-black">
      <MyListingsClient
        user={session.user}
        initialStudios={initialStudios}
      />
    </main>
  );
}

