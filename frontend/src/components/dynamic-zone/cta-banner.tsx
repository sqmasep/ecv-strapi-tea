import { Button } from "@/components/ui/button";
import Link from "next/link";

type CtaLink = {
  label: string;
  URL: string;
  target?: "none" | "_blank" | "_self" | "_parent" | "_top" | null;
};

export function CtaBanner({
  title,
  description,
  link,
}: {
  title: string;
  description?: string | null;
  link?: CtaLink | null;
}) {
  return (
    <section className="py-16 px-4 bg-zinc-900 text-white">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-zinc-300 text-base leading-relaxed mb-8">
            {description}
          </p>
        )}
        {link && (
          <Button asChild size="lg">
            <Link
              href={link.URL}
              target={
                link.target && link.target !== "none" ? link.target : undefined
              }
              rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
