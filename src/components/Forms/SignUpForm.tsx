"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Camera,
  Lock,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";
import { signUpSchema } from "@/schemas/auth.schema";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const image = (formData.get("image") || formData.get("imageUrl")) as string;
    const password = formData.get("password") as string;

    const validation = signUpSchema.safeParse({
      fullName,
      email,
      image,
      password,
    });

    if (!validation.success) {
      toast.error(validation.error.issues[0]?.message || "Please fix the validation errors");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signUp.email({
        name: validation.data.fullName,
        email: validation.data.email,
        password: validation.data.password,
        image: validation.data.image || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to create account");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        router.push("/log-in");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const data = await signIn.social({
      provider: "google"
    })
  };




  return (
    <div
      className={cn(
        "w-full max-w-6xl mx-auto flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
        <div className="hidden lg:flex lg:col-span-5 relative rounded-3xl overflow-hidden border border-border-subtle bg-surface-1 shadow-2xl flex-col justify-between p-6 xl:p-8 self-stretch min-h-[580px] max-h-[88vh]">
          <img
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
            alt="Cinema Soundstage"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-film-black via-film-black/75 to-film-black/40 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-text-muted">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-film-black/80 backdrop-blur-md border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span>PROD//CORE 04.2</span>
            </div>
            <span className="tracking-widest">LA · NYC · LDN</span>
          </div>

          <div className="relative z-10 flex flex-col gap-4 my-auto py-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-amber p-[1.5px] flex items-center justify-center shadow-[0_0_24px_rgba(224,79,38,0.5)]">
              <div className="w-full h-full bg-surface-1 rounded-[inherit] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand-orange"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                  <line x1="9.69" y1="8" x2="21.17" y2="8" />
                  <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                  <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                  <line x1="14.31" y1="16" x2="2.83" y2="16" />
                  <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
                </svg>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight leading-tight">
                Start booking your{" "}
                <span className="text-brand-orange">creative space</span> today.
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mt-2">
                Join thousands of creators, cinematographers, and stage managers on the most trusted studio network.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-film-black/85 backdrop-blur-md border border-white/10 flex flex-col gap-2 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-text-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant booking confirmation & DMX configs</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sound-certified acoustical listings</span>
              </div>
              <div className="flex items-center gap-2 text-text-primary">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Secure insured escrow deposits & stage holds</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/10 text-xs font-mono text-text-muted">
            Already have an account?{" "}
            <Link
              href="/log-in"
              className="text-brand-orange font-bold hover:underline hover:text-brand-amber transition-colors"
            >
              Sign in →
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-center max-w-lg mx-auto w-full">
          <div className="mb-3 sm:mb-4">
            <span className="font-mono text-[11px] font-semibold text-brand-orange uppercase tracking-wider block mb-0.5">
              {"// CREATE YOUR WORKSPACE ACCOUNT"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Join StudioSpace
            </h1>
            <p className="text-text-secondary text-xs mt-0.5">
              Select tier authentication or provision direct stage credentials.
            </p>
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2.5 rounded-xl bg-surface-1 hover:bg-surface-2 border-border-subtle font-mono text-xs font-semibold text-text-primary flex items-center justify-center gap-2.5 shadow-sm cursor-pointer h-auto"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google Workspace</span>
          </Button>

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-film-black font-mono text-[10px] text-text-muted uppercase tracking-widest my-3">
            OR REGISTER WITH EMAIL
          </FieldSeparator>

          <Card className="border border-border-subtle bg-surface-1/90 shadow-2xl rounded-2xl p-4 sm:p-5">
            <CardContent className="p-0">
              <form onSubmit={handleEmailSignup}>
                <FieldGroup className="flex flex-col gap-3">
                  <Field>
                    <FieldLabel
                      htmlFor="name"
                      className="text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      OPERATOR / FULL NAME
                    </FieldLabel>
                    <div className="flex items-center bg-surface-2 border border-border-subtle rounded-xl px-3 py-0.5 focus-within:border-brand-orange transition-colors">
                      <User className="w-3.5 h-3.5 text-text-muted mr-2.5 shrink-0" />
                      <Input
                        id="name"
                        name="fullName"
                        type="text"
                        placeholder="Sundance Vance"
                        className="bg-transparent border-0 text-text-primary text-xs focus-visible:ring-0 shadow-none px-0 h-8"
                      />
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="email"
                      className="text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      PRODUCTION EMAIL
                    </FieldLabel>
                    <div className="flex items-center bg-surface-2 border border-border-subtle rounded-xl px-3 py-0.5 focus-within:border-brand-orange transition-colors">
                      <Mail className="w-3.5 h-3.5 text-text-muted mr-2.5 shrink-0" />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="svance@lightspeedstudios.com"
                        className="bg-transparent border-0 text-text-primary text-xs focus-visible:ring-0 shadow-none px-0 h-8"
                      />
                    </div>
                  </Field>

                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel
                        htmlFor="image"
                        className="text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        PROFILE PHOTO URL
                      </FieldLabel>
                      <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                        OPTIONAL
                      </span>
                    </div>
                    <div className="flex items-center bg-surface-2 border border-border-subtle rounded-xl px-3 py-0.5 focus-within:border-brand-orange transition-colors">
                      <Camera className="w-3.5 h-3.5 text-text-muted mr-2.5 shrink-0" />
                      <Input
                        id="image"
                        type="url"
                        name="image"
                        placeholder="https://images.unsplash.com/photo-producer"
                        className="bg-transparent border-0 text-text-primary text-xs focus-visible:ring-0 shadow-none px-0 h-8"
                      />
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel
                      htmlFor="password"
                      className="text-[10px] font-mono font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      MASTER PASSWORD
                    </FieldLabel>
                    <div className="flex items-center bg-surface-2 border border-border-subtle rounded-xl px-3 py-0.5 focus-within:border-brand-orange transition-colors">
                      <Lock className="w-3.5 h-3.5 text-text-muted mr-2.5 shrink-0" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••••••••"
                        className="bg-transparent border-0 text-text-primary text-xs focus-visible:ring-0 shadow-none px-0 h-8"
                      />
                    </div>
                  </Field>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-1 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(224,79,38,0.35)] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2 h-auto border-0 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>

                  <FieldDescription className="text-center text-[11px] text-text-muted">
                    By registering, you agree to our{" "}
                    <Link
                      href="#"
                      className="underline hover:text-text-secondary"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="underline hover:text-text-secondary"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </FieldDescription>

                  <FieldDescription className="text-center font-mono text-[11px] text-text-muted pt-1.5 border-t border-border-subtle">
                    Already have an account?{" "}
                    <Link
                      href="/log-in"
                      className="text-brand-orange font-bold hover:underline hover:text-brand-amber transition-colors"
                    >
                      Sign In
                    </Link>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

          <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[10px] text-text-muted text-center">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>
              Secured by BetterAuth Engine · 256-bit AES End-to-End Vault
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
