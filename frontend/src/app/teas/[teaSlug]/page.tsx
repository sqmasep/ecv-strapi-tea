import DynamicZoneManager from "@/components/dynamic-zone/dynamic-zone-manager";
import { generateMetadataObject } from "@/lib/shared/metadata";
import { fetchCollectionType } from "@/lib/strapi";
import { notFound } from "next/navigation";

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

  return generateMetadataObject(tea.seo);
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
  )?.[0];

  if (!tea) notFound();

  return (
    <div className="container mx-auto">
      <div>tea page {teaSlug}</div>

      <DynamicZoneManager dynamicZone={tea.dynamicZone} />

      <pre>{JSON.stringify(tea, null, 2)}</pre>
    </div>
  );
}
