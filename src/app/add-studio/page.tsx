import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AddStudioForm from "@/components/Forms/AddStudioForm";

export const metadata = {
  title: "List a Studio | StudioSpace",
  description: "Publish your creative production stage or soundstage to StudioSpace.",
};

export default async function AddStudioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/log-in");
  }

  return (
    <main className="min-h-screen bg-film-black">
      <AddStudioForm />
    </main>
  );
}
