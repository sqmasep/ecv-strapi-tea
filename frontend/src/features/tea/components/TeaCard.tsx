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
    <div className="relative border border-zinc-100 rounded-sm overflow-hidden">
      {imageUrl ? (
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={image?.alternativeText ?? name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] w-full bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
          No image
        </div>
      )}

      {isLoggedIn && (
        <FavoriteButton teaDocumentId={documentId} isFavorite={!!favorite} />
      )}

      <div className="p-4">
        <p className="font-medium mb-3">{name}</p>
        <Button asChild className="w-full">
          <Link href={`/teas/${slug}`}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
