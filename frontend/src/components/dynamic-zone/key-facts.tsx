type KeyFact = {
  id?: number;
  label: string;
  value: string;
};

export function KeyFacts({
  title,
  facts,
}: {
  title?: string | null;
  facts?: KeyFact[];
}) {
  if (!facts?.length) return null;

  return (
    <section className="py-12 px-4 bg-zinc-50">
      <div className="container mx-auto max-w-3xl">
        {title && (
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">{title}</h2>
        )}
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {facts.map((fact, i) => (
            <div
              key={fact.id ?? i}
              className="bg-white border border-zinc-200 rounded-md p-4"
            >
              <dt className="text-xs uppercase tracking-wider text-zinc-400 font-medium mb-1">
                {fact.label}
              </dt>
              <dd className="text-lg font-semibold text-zinc-800">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
