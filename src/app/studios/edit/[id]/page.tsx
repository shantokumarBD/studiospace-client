import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getSingleStudio } from "@/lib/api";
import EditStudioClient from "@/components/Studios/EditStudioClient";

export const metadata = {
  title: "Update Studio Listing | StudioSpace",
  description: "Edit and update your listed creative production studio.",
};

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStudioPage({ params }: EditPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  const studio = await getSingleStudio(id);

  if (!studio) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-text-primary mb-2">Studio Not Found</h2>
          <p className="text-text-secondary text-sm mb-6">
            The studio you are attempting to edit does not exist or has been removed.
          </p>
          <Link
            href="/my-listings"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-orange text-white font-mono text-xs font-semibold"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  if (studio.ownerEmail !== session.user.email) {
    redirect("/my-listings");
  }

  return (
    <main className="min-h-screen bg-film-black">
      <EditStudioClient studio={studio} />
    </main>
  );
}

