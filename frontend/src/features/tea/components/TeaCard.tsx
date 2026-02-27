import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";

type StrapiImage = {
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
};

export function TeaCard({
  name,
  image,
  favorite,
  slug,
  documentId,
  isLoggedIn,
}: {
  name: string;
  image?: StrapiImage | null;
  favorite?: boolean;
  slug: string;
  documentId: string;
  isLoggedIn?: boolean;
}) {
  const imageUrl = image
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`
    : null;

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {imageUrl ? (
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={image?.alternativeText ?? name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div className="aspect-4/3 w-full bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground">
          <span className="text-3xl">🍵</span>
          <span className="text-xs">Aucune image</span>
        </div>
      )}

      {isLoggedIn && (
        <FavoriteButton teaDocumentId={documentId} isFavorite={!!favorite} />
      )}

      <div className="p-4 flex flex-col gap-3">
        <p className="font-semibold text-foreground text-base leading-snug">
          {name}
        </p>
        <Button asChild size="sm" className="w-full">
          <Link href={`/teas/${slug}`}>Découvrir →</Link>
        </Button>
      </div>
    </div>
  );
}
