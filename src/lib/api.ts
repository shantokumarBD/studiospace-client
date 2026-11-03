import { Studio } from "@/Types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/featured-studios`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch featured studios:", error);
    return [];
  }
}

export async function getAllStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/studios`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch studios:", error);
    return [];
  }
}

export async function getSingleStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(`${API_URL}/studios/${id}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error("Failed to fetch studio details:", error);
    return null;
  }
}

export async function createStudio(studioData: Partial<Studio>) {
  const res = await fetch(`${API_URL}/studios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studioData),
  });
  return res.json();
}


export async function getMyStudios(email: string): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/my-studios?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch my studios:", error);
    return [];
  }
}

export async function deleteStudio(id: string) {
  const res = await fetch(`${API_URL}/studios/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function updateStudio(id: string, updatedData: Partial<Studio>) {
  const res = await fetch(`${API_URL}/studios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}