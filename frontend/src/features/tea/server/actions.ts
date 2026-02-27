"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getUser } from "@/features/auth/server/actions";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function toggleFavorite(teaDocumentId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return { error: "Not authenticated" };

  const user = await getUser();
  if (!user) return { error: "Not authenticated" };

  const isFavorite = user.favorites?.some(
    (f: { documentId: string }) => f.documentId === teaDocumentId,
  );

  try {
    const res = await fetch(`${STRAPI_URL}/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        favorites: {
          [isFavorite ? "disconnect" : "connect"]: [
            { documentId: teaDocumentId },
          ],
        },
      }),
    });

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
