import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/features/auth/server/actions";
import { TeaCard } from "@/features/tea/components/TeaCard";
import { LogOut } from "lucide-react";
import Form from "next/form";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const favorites: any[] = user.favorites ?? [];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Welcome back, {user.username}</h1>
        <Form action={logout}>
          <Button variant="destructive" type="submit">
            <LogOut />
            Logout
          </Button>
        </Form>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-zinc-500">
            No favorites yet. Browse teas and heart the ones you love!
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {favorites.map(tea => (
              <TeaCard
                key={tea.id}
                documentId={tea.documentId}
                name={tea.name}
                slug={tea.slug}
                image={tea.images?.[0] ?? null}
                favorite={true}
                isLoggedIn={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
