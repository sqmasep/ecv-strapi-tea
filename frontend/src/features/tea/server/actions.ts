"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function toggleFavorite(teaDocumentId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/teas/${teaDocumentId}/favorite`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const data = await res.json();
      console.error("Toggle favorite error:", data);
      return { error: "Failed to toggle favorite" };
    }

    revalidatePath("/teas");
    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("Toggle favorite error:", error);
    return { error: "Failed to toggle favorite" };
  }
}
