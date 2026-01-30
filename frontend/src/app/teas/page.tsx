import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchCollectionType } from "@/lib/strapi";
import Link from "next/link";

export default async function TeasPage() {
  const teas = await fetchCollectionType("teas");
  const teaTypes = await fetchCollectionType("tea-types");

  return (
    <div className="flex grow gap-4">
      <aside className="basis-1/4 p-4 bg-zinc-50 border border-zinc-100">
        <div className="uppercase font-semibold text-zinc-500">Tea types</div>

        <div className="flex flex-col gap-8">
          {teaTypes.map(type => (
            <div key={type.id} className="bg">
              <Checkbox />
              {type.name} ({type.teas.length})
            </div>
          ))}
        </div>
      </aside>

      <main className="grow">
        <div>Teas ({teas.length})</div>

        <div className="grid grid-cols-4">
          {teas.map(tea => (
            <div key={tea.id} className="border p-4 border-zinc-100 rounded-sm">
              {tea.name}
              <Button asChild>
                <Link href={`/teas/${tea.slug}`}>Learn more</Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
