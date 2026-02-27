import { getUser } from "@/features/auth/server/actions";
import { fetchSingleType } from "@/lib/strapi";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "@/features/search/components/Search";

export async function Navbar() {
  const navbar = await fetchSingleType("global");
  const user = await getUser();

  return (
    <nav className="fixed top-0 h-16 flex items-center bg-card/95 backdrop-blur-sm border-b border-border w-full z-50 shadow-sm">
      <div className="container mx-auto flex items-center w-full gap-6 px-4">
        <Link
          href="/"
          className="text-xl font-bold text-primary tracking-tight shrink-0"
        >
          {navbar.brand}
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/teas"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/8 rounded-md transition-colors"
          >
            Les Thés
          </Link>
        </div>

        <div className="grow max-w-xs">
          <Search />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {user ? (
            <Button asChild variant="outline" size="sm">
              <Link href="/account">Mon compte</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">S&apos;inscrire</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
