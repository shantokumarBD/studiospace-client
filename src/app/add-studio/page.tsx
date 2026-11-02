import AddStudioForm from "@/components/Forms/AddStudioForm";

export const metadata = {
  title: "List a Studio | StudioSpace",
  description: "Publish your creative production stage or soundstage to StudioSpace.",
};

export default function AddStudioPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <AddStudioForm />
    </main>
  );
}

