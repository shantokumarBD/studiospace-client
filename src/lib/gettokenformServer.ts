import { headers } from "next/headers";
import { auth } from "./auth";

export async function getAuthTokenServer() {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });
  return jwtToken?.token;
}