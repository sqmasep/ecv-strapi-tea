import DynamicZoneManager from "@/components/dynamic-zone/dynamic-zone-manager";
import { generateMetadataObject } from "@/lib/shared/metadata";
import { fetchCollectionType } from "@/lib/strapi";
import Image from "next/image";
import { notFound } from "next/navigation";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

export async function generateMetadata({
  params,
}: {
  params: { teaSlug: Promise<string> };
}) {
  const teaSlug = await params.teaSlug;
  const tea = (
    await fetchCollectionType("teas", {
      filters: { slug: teaSlug },
    })
  )?.[0];

  return generateMetadataObject(tea?.seo);
}

export default async function TeaPage({
  params,
}: {
  params: { teaSlug: Promise<string> };
}) {
  const teaSlug = await params.teaSlug;

  const tea = (
    await fetchCollectionType("teas", {
      filters: { slug: teaSlug },
    })
  )?.[0] as any;

  if (!tea) notFound();

  const heroImage = tea.images?.[0];

  return (
    <div>
      {/* Hero */}
      <div className="relative w-full aspect-21/9 bg-zinc-200 overflow-hidden">
        {heroImage ? (
          <Image
            src={`${STRAPI_URL}${heroImage.url}`}
            alt={heroImage.alternativeText ?? tea.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
          <h1 className="text-4xl font-bold text-white">{tea.name}</h1>
          {tea.excerpt && (
            <p className="mt-2 text-zinc-200 text-lg max-w-2xl">
              {tea.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic Blocks */}
      <DynamicZoneManager dynamicZone={tea.dynamicZone} />
    </div>
  );
}
