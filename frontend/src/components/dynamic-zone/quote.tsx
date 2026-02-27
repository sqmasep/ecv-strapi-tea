export function Quote({
  text,
  author,
}: {
  text: string;
  author?: string | null;
}) {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <blockquote className="border-l-4 border-zinc-900 pl-6 py-2">
          <p className="text-xl italic text-zinc-700 leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
          {author && (
            <footer className="mt-4 text-sm font-medium text-zinc-500">
              — {author}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}
