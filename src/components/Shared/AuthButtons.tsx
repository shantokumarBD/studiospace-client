"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { UserDropdown } from "@/components/Shared/UserDropdown";

export default function AuthButtons() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  

  if (isPending) {
    return <div className="w-8 h-8 rounded-full bg-surface-2 animate-pulse" />;
  }

  if (user) {
    return <UserDropdown user={user} onSignOut={() => signOut()} />;
  }

  return (
    <div className="hidden sm:flex items-center gap-3">

      <Link
        href="/log-in"
        className="hidden md:flex px-4 py-2 text-sm font-semibold rounded-xl text-text-primary border border-border-subtle hover:bg-surface-2 transition-colors"
      >
        Log In
      </Link>

      <Link
        href="/sign-up"
        className="hidden md:flex px-5 py-2 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-brand-orange to-brand-amber brand-glow hover:opacity-95 transition-all"
      >
        Register
      </Link>
    </div>
  );
}
