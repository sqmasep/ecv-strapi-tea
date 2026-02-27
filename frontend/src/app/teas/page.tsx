import { TeaCard } from "@/features/tea/components/TeaCard";
import { TeaFilters } from "@/features/tea/components/TeaFilters";
import { getUser } from "@/features/auth/server/actions";
import { fetchCollectionType } from "@/lib/strapi";

type TeaDocument = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  images?: {
    url: string;
    alternativeText?: string | null;
    width: number;
    height: number;
  }[];
};

type TeaTypeDocument = {
  id: string;
  name: string;
  teas: TeaDocument[];
};

export default async function TeasPage() {
  const [teas, teaTypes, user] = await Promise.all([
    fetchCollectionType<TeaDocument[]>("teas"),
    fetchCollectionType<TeaTypeDocument[]>("tea-types"),
    getUser(),
  ]);

  const favoriteIds = new Set(
    (user?.favorites ?? []).map((f: { documentId: string }) => f.documentId),
  );

  return (
    <div className="flex grow gap-4">
      <aside className="basis-1/4 p-4 bg-zinc-50 border border-zinc-100">
        <TeaFilters types={teaTypes} />
      </aside>

      <main className="grow p-4">
        <div className="mb-4 text-zinc-500">Teas ({teas.length})</div>

        <div className="grid grid-cols-4 gap-4">
          {teas.map(tea => (
            <TeaCard
              key={tea.id}
              documentId={tea.documentId}
              name={tea.name}
              slug={tea.slug}
              image={tea.images?.[0] ?? null}
              favorite={favoriteIds.has(tea.documentId)}
              isLoggedIn={!!user}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
