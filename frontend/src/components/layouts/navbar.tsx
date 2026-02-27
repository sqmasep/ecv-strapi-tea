import { getUser } from "@/features/auth/server/actions";
import { fetchSingleType } from "@/lib/strapi";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "@/features/search/components/Search";

export async function Navbar() {
  const navbar = await fetchSingleType("global");
  const user = await getUser();

  return (
    <div className="fixed top-0 h-14 flex items-center bg-zinc-400 w-full">
      <div className="container mx-auto flex items-center w-full gap-8">
        <Link href="/">{navbar.brand}</Link>
        {/* <pre>{JSON.stringify(navbar, null, 2)}</pre> */}

        <div className="flex items-center gap-2">
          <Link href="/teas">Teas</Link>
        </div>

        <Search />

        <div className="flex items-center gap-2 ml-auto">
          {user ? (
            <div>user!</div>
          ) : (
            <>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
