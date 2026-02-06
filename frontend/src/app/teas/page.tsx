import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TeaCard } from "@/features/tea/components/TeaCard";
import { TeaFilters } from "@/features/tea/components/TeaFilters";
import { fetchCollectionType } from "@/lib/strapi";
import Link from "next/link";

export default async function TeasPage() {
  const teas = await fetchCollectionType("teas");
  const teaTypes = await fetchCollectionType("tea-types");

  return (
    <div className="flex grow gap-4">
      <aside className="basis-1/4 p-4 bg-zinc-50 border border-zinc-100">
        <TeaFilters types={teaTypes} />
      </aside>

      <main className="grow">
        <div>Teas ({teas.length})</div>

        <div className="grid grid-cols-4">
          {teas.map(tea => (
            <TeaCard key={tea.id} name={tea.name} slug={tea.slug} />
          ))}
        </div>
      </main>
    </div>
  );
}
