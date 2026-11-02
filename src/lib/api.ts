import { Studio } from "@/Types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  
export async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/featured-studios`, {
      cache: "no-store",
    });
    const json = await res.json();
    console.log(json);
    
    return json?.data
  } catch (error) {
    console.error("Failed to fetch featured studios:", error);
    return [];
  }
}