import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4 overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/10">
        <div className="absolute inset-0 bg-[url('/tea-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Découverte &amp; Dégustation
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            L'art du thé,
            <br />
            <span className="text-primary">à la française</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Sélection rigoureuse des meilleurs jardins du monde — Japon, Inde,
            Chine, Taiwan. Chaque tasse est une invitation au voyage.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link href="/teas">Explorer la collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">Créer un compte</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-secondary/40">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                emoji: "🍃",
                title: "Sélection premium",
                desc: "Sourcés directement auprès des producteurs, récoltés à la main au bon moment.",
              },
              {
                emoji: "🌍",
                title: "Origines traçables",
                desc: "Chaque thé est accompagné de son histoire, son terroir et ses conseils d'infusion.",
              },
              {
                emoji: "❤️",
                title: "Vos favoris",
                desc: "Créez un compte, enregistrez vos thés préférés et retrouvez-les à tout moment.",
              },
            ].map(feat => (
              <div
                key={feat.title}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-4xl">{feat.emoji}</span>
                <h3 className="text-lg font-bold text-foreground">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
