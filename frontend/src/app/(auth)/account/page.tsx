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
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Bienvenue,</p>
          <h1 className="text-4xl font-bold text-foreground">
            {user.username}
          </h1>
        </div>
        <Form action={logout}>
          <Button variant="outline" type="submit" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </Form>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Vos Favoris
        </h2>
        {favorites.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <span className="text-5xl block mb-4">🍵</span>
            <p className="text-base">Aucun favori pour l'instant.</p>
            <p className="text-sm mt-1">
              Explorez nos thés et ajoutez-en à vos favoris !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
