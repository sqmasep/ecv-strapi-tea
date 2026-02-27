"use client";

import { useTeaFilters } from "../hooks/useTeaFilters";
import { TeaCard } from "./TeaCard";

type StrapiImage = {
  url: string;
  alternativeText?: string | null;
  width: number;
  height: number;
};

export type TeaItem = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  temperature?: number | null;
  infusionTime?: number | null;
  images?: StrapiImage[];
  tea_types?: { name: string }[];
};

export function TeaGrid({
  teas,
  favoriteDocumentIds,
  isLoggedIn,
}: {
  teas: TeaItem[];
  favoriteDocumentIds: string[];
  isLoggedIn: boolean;
}) {
  const [filters] = useTeaFilters();

  const favoriteSet = new Set(favoriteDocumentIds);

  const filtered = teas.filter(tea => {
    if (
      filters.type?.length &&
      !tea.tea_types?.some(t => filters.type!.includes(t.name))
    ) {
      return false;
    }
    if (
      filters.maxTime != null &&
      tea.infusionTime != null &&
      tea.infusionTime > filters.maxTime
    ) {
      return false;
    }
    if (
      filters.maxTemp != null &&
      tea.temperature != null &&
      tea.temperature > filters.maxTemp
    ) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="text-zinc-400 text-sm mt-6">
        Aucun thé ne correspond aux filtres sélectionnés.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filtered.map(tea => (
        <TeaCard
          key={tea.id}
          documentId={tea.documentId}
          name={tea.name}
          slug={tea.slug}
          image={tea.images?.[0] ?? null}
          favorite={favoriteSet.has(tea.documentId)}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}
