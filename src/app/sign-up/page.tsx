import { Suspense } from "react";
import { SignUpForm } from "@/components/Forms/SignUpForm";
import ModernLoader from "@/components/Shared/ModernLoader";

export default function SignUpPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] w-full bg-film-black flex items-center justify-center py-8 sm:py-12 px-3 sm:px-6">
      <Suspense fallback={<ModernLoader size="sm" text="Loading..." />}>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
