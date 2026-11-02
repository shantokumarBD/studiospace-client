"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Clapperboard,
  Sparkles,
  MapPin,
  DollarSign,
  Users,
  ShieldCheck,
  ImageIcon,
  Tags,
  FileText,
  ArrowRight,
  Loader2,
  Lock,
  Star,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import { studioSchema } from "@/schemas/studio.schema";
import { createStudio } from "@/lib/api";

const CATEGORIES = [
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
  const { data: session, isPending } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    category: "Soundstage",
    badge: "Verified Stage",
    location: "",
    hourlyRate: "",
    securityDeposit: "0",
    maxCapacity: "10",
    image: "",
    features: "",
    overview: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please sign in to list a studio stage");
      router.push("/log-in");
      return;
    }

    const validation = studioSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Please check the form for errors");
      return;
    }

    setSubmitting(true);

    try {
      const featureList = validation.data.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const payload = {
        title: validation.data.title,
        category: validation.data.category,
        badge: validation.data.badge || "Verified Stage",
        location: validation.data.location,
        hourlyRate: validation.data.hourlyRate,
        securityDeposit: validation.data.securityDeposit,
        maxCapacity: validation.data.maxCapacity,
        features: featureList,
        image: validation.data.image,
        overview: validation.data.overview,
        ownerName: session.user.name || "Studio Host",
        ownerEmail: session.user.email || "",
        rating: 5.0,
        shootsCompleted: 0,
        isFeatured: false,
        createdAt: new Date().toISOString(),
      };

      const result = await createStudio(payload);

      if (result.success) {
        toast.success("Studio published successfully!");
        router.push("/studios");
      } else {
        toast.error(result.message || "Failed to publish studio");
      }
    } catch {
      toast.error("An unexpected error occurred while listing the studio");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
        <p className="font-mono text-xs text-text-secondary tracking-widest uppercase">
          Verifying Host Credentials...
        </p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-surface-1 border border-border-subtle shadow-2xl text-center flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
          <Lock className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            Host Access Required
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            You need to be authenticated as a stage host to publish creative
            studios.
          </p>
        </div>
        <Link
          href="/log-in"
          className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25"
        >
          <span>Sign In to Continue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const featurePills = formData.features
    ? formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : ["4K Lighting Grid", "Acoustic Treated", "Green Room"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Host Production Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            List a Creative Studio
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Publish your production stage to thousands of verified filmmakers &
            photographers.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-surface-1 border border-border-subtle">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <p className="text-[10px] font-mono text-text-muted uppercase">
              Authenticated Host
            </p>
            <p className="text-xs font-bold text-text-primary">
              {session.user.name || "Verified Creator"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 bg-surface-1 border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <Clapperboard className="w-4 h-4 text-brand-orange" />
              <span>Studio Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Apex 4K Soundstage & Cyclorama"
              className={`w-full bg-film-black border ${
                errors.title ? "border-red-500" : "border-border-subtle"
              } text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 font-medium">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-film-black border border-border-subtle text-text-primary text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-brand-orange transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.category}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Badge Type
              </label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="Verified Stage, Master Studio..."
                className="w-full bg-film-black border border-border-subtle text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span>Location (City, Area)</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Brooklyn Arts District, New York"
              className={`w-full bg-film-black border ${
                errors.location ? "border-red-500" : "border-border-subtle"
              } text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors`}
            />
            {errors.location && (
              <p className="text-xs text-red-500 font-medium">
                {errors.location}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-brand-orange" />
                <span>Hourly Rate ($)</span>
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="150"
                min="1"
                className={`w-full bg-film-black border ${
                  errors.hourlyRate ? "border-red-500" : "border-border-subtle"
                } text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors`}
              />
              {errors.hourlyRate && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.hourlyRate}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                <span>Deposit ($)</span>
              </label>
              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                placeholder="200"
                min="0"
                className="w-full bg-film-black border border-border-subtle text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-orange" />
                <span>Capacity</span>
              </label>
              <input
                type="number"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleChange}
                placeholder="20"
                min="1"
                className="w-full bg-film-black border border-border-subtle text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-orange" />
              <span>Studio Cover Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className={`w-full bg-film-black border ${
                errors.image ? "border-red-500" : "border-border-subtle"
              } text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors`}
            />
            {errors.image && (
              <p className="text-xs text-red-500 font-medium">{errors.image}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <Tags className="w-4 h-4 text-brand-orange" />
              <span>Key Features (Comma Separated)</span>
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Soundproof, 4K Lighting Grid, Hair & Makeup Room, Cyclorama"
              className={`w-full bg-film-black border ${
                errors.features ? "border-red-500" : "border-border-subtle"
              } text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors`}
            />
            {errors.features && (
              <p className="text-xs text-red-500 font-medium">
                {errors.features}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-orange" />
              <span>Overview & Stage Specs</span>
            </label>
            <textarea
              name="overview"
              rows={4}
              value={formData.overview}
              onChange={handleChange}
              placeholder="Provide a cinematic description of your space, lighting rigs, audio isolation, and loading bay specs..."
              className={`w-full bg-film-black border ${
                errors.overview ? "border-red-500" : "border-border-subtle"
              } text-text-primary text-sm px-4 py-3 rounded-xl placeholder:text-text-muted focus:outline-none focus:border-brand-orange transition-colors`}
            />
            {errors.overview && (
              <p className="text-xs text-red-500 font-medium">
                {errors.overview}
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-surface-2 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <p className="text-text-muted font-mono uppercase text-[10px]">
                Owner Details Auto-Synced
              </p>
              <p className="font-semibold text-text-primary mt-0.5">
                {session.user.name} ({session.user.email})
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Identity Verified</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Stage to Atlas...</span>
              </>
            ) : (
              <>
                <span>Publish Creative Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Realtime Stage Preview
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              Live Render
            </span>
          </div>

          <article className="rounded-3xl bg-surface-1 border border-border-subtle overflow-hidden shadow-2xl flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.title || "Studio preview"}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-text-muted gap-2 bg-film-black/60">
                    <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                    <span className="text-xs font-mono">
                      Image Preview Will Appear Here
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-film-black/90 via-transparent to-film-black/30 pointer-events-none" />

                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10 font-mono text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>{formData.category || "Soundstage"}</span>
                </div>

                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-film-black/85 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-emerald-400">
                    Available Now
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-film-black/85 backdrop-blur-md border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
                  <span className="font-mono text-xs font-bold text-text-primary">
                    5.0
                  </span>
                  <span className="text-[10px] text-text-muted">(New)</span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h2 className="font-bold text-lg text-text-primary line-clamp-1">
                  {formData.title || "Your Studio Title Here"}
                </h2>

                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{formData.location || "Location not set"}</span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {featurePills.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-film-black border border-border-subtle text-[11px] font-mono text-text-secondary"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-border-subtle flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase">
                  Hourly Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-bold text-text-primary">
                    ${formData.hourlyRate || "0"}
                  </span>
                  <span className="text-xs text-text-secondary">/hr</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-text-muted uppercase">
                  Capacity
                </span>
                <p className="font-mono text-xs font-bold text-text-primary">
                  {formData.maxCapacity || "10"} people
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
