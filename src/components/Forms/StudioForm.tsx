"use client";

import { Loader2 } from "lucide-react";
import { Studio } from "@/Types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useSession } from "@/lib/auth-client";
import ImageUploadField from "@/components/Shared/ImageUploadField";

export const studioCategories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
  "Virtual Production",
  "Dance & Rehearsal",
  "Film Set",
];

interface StudioFormProps {
  initialData?: Partial<Studio> | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  loading?: boolean;
  submitText?: string;
  onCancel?: () => void;
}

export default function StudioForm({
  initialData,
  onSubmit,
  loading = false,
  submitText = "Save Studio",
  onCancel,
}: StudioFormProps) {
  const { data: session } = useSession();
  const hostName = initialData?.ownerName || session?.user?.name || "Verified Studio Host";
  const hostEmail = initialData?.ownerEmail || session?.user?.email || "";

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="title" className="text-xs text-text-secondary uppercase font-semibold">
          Studio Title
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={initialData?.title || ""}
          placeholder="Apex 4K Soundstage & Cyclorama"
          required
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="category" className="text-xs text-text-secondary uppercase font-semibold">
          Category
        </Label>
        <NativeSelect
          id="category"
          name="category"
          defaultValue={initialData?.category || "Sound Stages"}
          className="w-full bg-film-black border-border-subtle"
        >
          {studioCategories.map((cat) => (
            <NativeSelectOption key={cat} value={cat}>
              {cat}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="badge" className="text-xs text-text-secondary uppercase font-semibold">
          Badge Type
        </Label>
        <Input
          id="badge"
          name="badge"
          defaultValue={initialData?.badge || "Verified Stage"}
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="location" className="text-xs text-text-secondary uppercase font-semibold">
          Location
        </Label>
        <Input
          id="location"
          name="location"
          defaultValue={initialData?.location || ""}
          placeholder="Brooklyn Arts District, New York"
          required
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="hourlyRate" className="text-xs text-text-secondary uppercase font-semibold">
          Hourly Rate ($)
        </Label>
        <Input
          id="hourlyRate"
          name="hourlyRate"
          type="number"
          defaultValue={initialData?.hourlyRate ?? ""}
          placeholder="150"
          min="1"
          required
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="securityDeposit" className="text-xs text-text-secondary uppercase font-semibold">
          Deposit ($)
        </Label>
        <Input
          id="securityDeposit"
          name="securityDeposit"
          type="number"
          defaultValue={initialData?.securityDeposit ?? 0}
          min="0"
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="maxCapacity" className="text-xs text-text-secondary uppercase font-semibold">
          Capacity (People)
        </Label>
        <Input
          id="maxCapacity"
          name="maxCapacity"
          type="number"
          defaultValue={initialData?.maxCapacity ?? 10}
          min="1"
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="sm:col-span-2">
        <ImageUploadField
          name="image"
          label="Studio Cover Image"
          defaultValue={initialData?.image || ""}
          required
          placeholder="https://images.unsplash.com/... or upload a stage photo"
          helperText="Upload a high-resolution studio photo via ImgBB or paste an image link."
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="features" className="text-xs text-text-secondary uppercase font-semibold">
          Key Features (Comma Separated)
        </Label>
        <Input
          id="features"
          name="features"
          defaultValue={
            Array.isArray(initialData?.features)
              ? initialData.features.join(", ")
              : initialData?.features || ""
          }
          placeholder="Soundproof, 4K Lighting Grid, Cyclorama"
          required
          className="bg-film-black border-border-subtle"
        />
      </div>

      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="overview" className="text-xs text-text-secondary uppercase font-semibold">
          Overview & Stage Specs
        </Label>
        <Textarea
          id="overview"
          name="overview"
          rows={4}
          defaultValue={initialData?.overview || ""}
          placeholder="Describe lighting rigs, soundproofing, and space dimensions..."
          required
          className="bg-film-black border-border-subtle text-text-primary"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ownerName" className="text-xs text-text-secondary uppercase font-semibold">
          Host Name (Read-Only)
        </Label>
        <Input
          id="ownerName"
          name="ownerName"
          value={hostName}
          readOnly
          className="bg-surface-2/60 border-border-subtle text-text-muted cursor-not-allowed font-mono text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="ownerEmail" className="text-xs text-text-secondary uppercase font-semibold">
          Host Email (Read-Only)
        </Label>
        <Input
          id="ownerEmail"
          name="ownerEmail"
          value={hostEmail}
          readOnly
          className="bg-surface-2/60 border-border-subtle text-text-muted cursor-not-allowed font-mono text-xs"
        />
      </div>

      <div className="sm:col-span-2 pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-border-subtle bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary cursor-pointer"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading}
          className={`${
            onCancel ? "" : "w-full"
          } py-3 px-6 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-brand-orange/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>{submitText}</span>
          )}
        </Button>
      </div>
    </form>
  );
}
