"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { studioSchema } from "@/schemas/studio.schema";
import { createStudio } from "@/lib/api";
import { Card } from "@/components/ui/card";
import StudioForm from "@/components/Forms/StudioForm";

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please sign in to list a studio");
      router.push("/log-in");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData);

    const validation = studioSchema.safeParse(rawData);
    if (!validation.success) {
      toast.error(validation.error.issues[0]?.message || "Validation failed");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...validation.data,
        features: validation.data.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        ownerName: session.user.name || "Studio Host",
        ownerEmail: session.user.email || "",
      };

      const result = await createStudio(payload);
      if (result.success) {
        toast.success("Studio published successfully!");
        form.reset();
        router.push("/studios");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to publish studio");
      }
    } catch {
      toast.error("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-text-primary">
          List a Creative Studio
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Add your production stage or soundstage to StudioSpace
        </p>
      </div>

      <Card className="rounded-3xl bg-surface-1 border-border-subtle p-6 sm:p-8 shadow-2xl">
        <StudioForm
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Publish Creative Studio"
        />
      </Card>
    </div>
  );
}
