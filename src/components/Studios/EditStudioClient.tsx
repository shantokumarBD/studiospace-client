"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Studio } from "@/Types";
import { updateStudio } from "@/lib/api";
import { studioSchema } from "@/schemas/studio.schema";
import StudioForm from "@/components/Forms/StudioForm";
import { GetTokenFormClient } from "@/lib/gettokenformClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditStudioClientProps {
  studio: Studio;
}

export default function EditStudioClient({ studio }: EditStudioClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        ownerName: studio.ownerName,
        ownerEmail: studio.ownerEmail,
      };

      const token = await GetTokenFormClient();
      const result = await updateStudio(studio._id, payload, token);
      if (result.success) {
        toast.success("Studio listing updated successfully!");
        router.push("/my-listings");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update studio");
      }
    } catch {
      toast.error("Failed to update studio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link
          href="/my-listings"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-brand-orange transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Listings</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Update Studio Listing
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Modify technical specifications, hourly rates, and production features for this space.
        </p>
      </div>

      <div className="bg-surface-1 border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-2xl">
        <StudioForm
          initialData={studio}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Update Studio Listing"
          onCancel={() => router.push("/my-listings")}
        />
      </div>
    </div>
  );
}

