import { Studio, Booking, WishlistItem } from "@/Types";


export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";





export async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/featured-studios`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json?.data || [];
  } catch {
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
  } catch {
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
  } catch {
    return null;
  }
}

export async function createStudio(studioData: Partial<Studio>, token?: string) {
  const res = await fetch(`${API_URL}/studios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studioData),
  });
  return res.json();
}


export async function getMyStudios(email: string, token?: string): Promise<Studio[]> {
  try {
    const res = await fetch(`${API_URL}/my-studios?email=${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch my studios:", error);
    return [];
  }
}

export async function deleteStudio(id: string, token?: string) {
  const res = await fetch(`${API_URL}/studios/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function updateStudio(id: string, updatedData: Partial<Studio>, token?: string) {
  const res = await fetch(`${API_URL}/studios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  return res.json();
}

export async function createBooking(bookingData: Partial<Booking>, token?: string) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });
  return res.json();
}

export async function getMyBookings(email: string, token?: string): Promise<Booking[]> {
  try {
    const res = await fetch(
      `${API_URL}/my-bookings?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch my bookings:", error);
    return [];
  }
}

export async function cancelBooking(id: string,token?: string) {
  const res = await fetch(`${API_URL}/my-bookings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function addToWishlist(item: Partial<WishlistItem>, token?: string) {
  const res = await fetch(`${API_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  return res.json();
}

export async function getMyWishlist(email: string, token?: string): Promise<WishlistItem[]> {
  try {
    const res = await fetch(
      `${API_URL}/wishlist?email=${encodeURIComponent(email)}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    return [];
  }
}

export async function removeFromWishlist(id: string, token?: string) {
  const res = await fetch(`${API_URL}/wishlist/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}