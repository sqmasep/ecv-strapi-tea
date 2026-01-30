import { fetchSingleType } from "@/lib/strapi";
import Link from "next/link";

export async function Navbar() {
  const navbar = await fetchSingleType("global");

  return (
    <div className="fixed top-0 h-10 flex items-center bg-zinc-400 w-full">
      <div className="container mx-auto">
        <Link href="/">{navbar.brand}</Link>
        {/* <pre>{JSON.stringify(navbar, null, 2)}</pre> */}
      </div>
    </div>
  );
}
