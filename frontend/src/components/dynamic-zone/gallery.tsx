import Image from "next/image";

type GalleryImage = {
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
};

export function Gallery({
  images,
  caption,
}: {
  images?: GalleryImage[];
  caption?: string | null;
}) {
  if (!images?.length) return null;

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div
          className={`grid gap-3 ${
            images.length === 1
              ? "grid-cols-1 max-w-2xl mx-auto"
              : images.length === 2
                ? "grid-cols-2"
                : "grid-cols-3"
          }`}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-4/3 overflow-hidden rounded-md"
            >
              <Image
                src={`${strapiUrl}${img.url}`}
                alt={img.alternativeText ?? caption ?? ""}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {caption && (
          <p className="text-center text-sm text-zinc-500 mt-3">{caption}</p>
        )}
      </div>
    </section>
  );
}
