import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-studio",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/wishlist/:path*",
  ],
};

