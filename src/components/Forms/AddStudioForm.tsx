"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { studioSchema } from "@/schemas/studio.schema";
import { createStudio } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

const categories = [
  "Soundstage",
  "Photography",
  "Podcast",
  "Virtual Production",
  "Dance & Rehearsal",
  "Film Set",
  "Recording Studio",
];

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
        features: validation.data.features.split(",").map((f) => f.trim()).filter(Boolean),
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
        <h1 className="text-3xl font-bold text-text-primary">List a Creative Studio</h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Add your production stage or soundstage to StudioSpace
        </p>
      </div>

      <Card className="rounded-3xl bg-surface-1 border-border-subtle p-6 sm:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="title" className="text-xs text-text-secondary uppercase font-semibold">Studio Title</Label>
            <Input id="title" name="title" placeholder="Apex 4K Soundstage & Cyclorama" required className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="category" className="text-xs text-text-secondary uppercase font-semibold">Category</Label>
            <NativeSelect id="category" name="category" defaultValue="Soundstage" className="w-full bg-film-black border-border-subtle">
              {categories.map((cat) => (
                <NativeSelectOption key={cat} value={cat}>
                  {cat}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="badge" className="text-xs text-text-secondary uppercase font-semibold">Badge Type</Label>
            <Input id="badge" name="badge" defaultValue="Verified Stage" className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="location" className="text-xs text-text-secondary uppercase font-semibold">Location</Label>
            <Input id="location" name="location" placeholder="Brooklyn Arts District, New York" required className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hourlyRate" className="text-xs text-text-secondary uppercase font-semibold">Hourly Rate ($)</Label>
            <Input id="hourlyRate" name="hourlyRate" type="number" placeholder="150" min="1" required className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="securityDeposit" className="text-xs text-text-secondary uppercase font-semibold">Deposit ($)</Label>
            <Input id="securityDeposit" name="securityDeposit" type="number" defaultValue="0" min="0" className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="maxCapacity" className="text-xs text-text-secondary uppercase font-semibold">Capacity (People)</Label>
            <Input id="maxCapacity" name="maxCapacity" type="number" defaultValue="10" min="1" className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="image" className="text-xs text-text-secondary uppercase font-semibold">Cover Image URL</Label>
            <Input id="image" name="image" type="url" placeholder="https://images.unsplash.com/photo-..." required className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="features" className="text-xs text-text-secondary uppercase font-semibold">Key Features (Comma Separated)</Label>
            <Input id="features" name="features" placeholder="Soundproof, 4K Lighting Grid, Cyclorama" required className="bg-film-black border-border-subtle" />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="overview" className="text-xs text-text-secondary uppercase font-semibold">Overview & Stage Specs</Label>
            <Textarea id="overview" name="overview" rows={4} placeholder="Describe lighting rigs, soundproofing, and space dimensions..." required className="bg-film-black border-border-subtle text-text-primary" />
          </div>

          <div className="sm:col-span-2 pt-2">
            <Button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-brand-orange/20 cursor-pointer disabled:opacity-50">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  <span>Publishing Stage...</span>
                </>
              ) : (
                <span>Publish Creative Studio</span>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}