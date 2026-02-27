import { TeaFilters } from "@/features/tea/components/TeaFilters";
import { TeaGrid, type TeaItem } from "@/features/tea/components/TeaGrid";
import { getUser } from "@/features/auth/server/actions";
import { fetchCollectionType } from "@/lib/strapi";

type TeaTypeDocument = {
  id: string;
  name: string;
  teas: TeaItem[];
};

export default async function TeasPage() {
  const [teas, teaTypes, user] = await Promise.all([
    fetchCollectionType<TeaItem[]>("teas"),
    fetchCollectionType<TeaTypeDocument[]>("tea-types"),
    getUser(),
  ]);

  const favoriteDocumentIds = (user?.favorites ?? []).map(
    (f: { documentId: string }) => f.documentId,
  );

  return (
    <div className="flex grow">
      <aside className="w-64 shrink-0 p-5 bg-card border-r border-border sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
        <h2 className="text-lg font-semibold text-foreground mb-5">Filtrer</h2>
        <TeaFilters types={teaTypes} teas={teas} />
      </aside>

      <main className="grow p-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Nos Thés</h1>
          <span className="text-sm text-muted-foreground">
            {(teas as TeaItem[]).length} thés disponibles
          </span>
        </div>

        <TeaGrid
          teas={teas}
          favoriteDocumentIds={favoriteDocumentIds}
          isLoggedIn={!!user}
        />
      </main>
    </div>
  );
}
