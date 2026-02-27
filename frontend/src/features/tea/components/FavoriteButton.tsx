"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toggleFavorite } from "../server/actions";

export function FavoriteButton({
  teaDocumentId,
  isFavorite,
}: {
  teaDocumentId: string;
  isFavorite: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute top-2 right-2"
      onClick={() => startTransition(() => toggleFavorite(teaDocumentId))}
      disabled={isPending}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={isFavorite ? "fill-rose-500 text-rose-500" : ""}
        fill={isFavorite ? "currentColor" : "none"}
      />
    </Button>
  );
}
