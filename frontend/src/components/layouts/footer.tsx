import { fetchCollectionType, fetchSingleType } from "@/lib/strapi";

export async function Footer() {
  const footer = await fetchSingleType("global");
  const stores = await fetchCollectionType("stores");

  return (
    <div className="bg-zinc-200 text-zinc-700 mt-auto">
      Footer
      <pre>{JSON.stringify(footer.footer, null, 2)}</pre>
      <div></div>
      stores
      <pre>{JSON.stringify(stores, null, 2)}</pre>
    </div>
  );
}
