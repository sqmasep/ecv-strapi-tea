import { fetchCollectionType, fetchSingleType } from "@/lib/strapi";
import Link from "next/link";

type StoreLink = {
  label: string;
  URL: string;
  target?: "none" | "_blank" | "_self" | "_parent" | "_top" | null;
};

type Store = {
  id: number;
  name: string;
  link?: StoreLink | null;
};

type FooterCategory = {
  id: number;
  label: string;
};

type GlobalData = {
  brand: string;
  footer?: {
    categories?: FooterCategory[];
  };
};

export async function Footer() {
  const [global, stores] = await Promise.all([
    fetchSingleType<GlobalData>("global"),
    fetchCollectionType<Store[]>("stores"),
  ]);

  const categories = global.footer?.categories ?? [];

  return (
    <footer className="bg-zinc-900 text-zinc-300 mt-auto">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="text-white text-xl font-bold">
            {global.brand}
          </Link>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Discover our selection of premium teas from around the world.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div>
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
              Categories
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              {categories.map(cat => (
                <li key={cat.id} className="text-zinc-400">
                  {cat.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Stores */}
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
            Recommended Stores
          </h3>
          {stores.length === 0 ? (
            <p className="text-zinc-500 text-sm">No stores listed yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 text-sm">
              {stores.map(store => (
                <li key={store.id}>
                  {store.link ? (
                    <a
                      href={store.link.URL}
                      target={
                        store.link.target && store.link.target !== "none"
                          ? store.link.target
                          : undefined
                      }
                      rel={
                        store.link.target === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {store.name}
                    </a>
                  ) : (
                    <span className="text-zinc-400">{store.name}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-zinc-800 py-4">
        <p className="text-center text-zinc-500 text-xs">
          © {new Date().getFullYear()} {global.brand}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
