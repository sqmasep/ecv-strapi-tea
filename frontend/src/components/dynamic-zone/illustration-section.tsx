import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

export function IllustrationSection({
  title,
  paragraph,
}: {
  title?: { text: string; as?: string } | null;
  paragraph?: { text: string } | null;
}) {
  return (
    <section className="py-16 px-4 bg-zinc-100">
      <div className="container mx-auto max-w-3xl">
        {title?.text && (
          <Heading as={title.as ?? "h2"} className="text-zinc-800">
            {title.text}
          </Heading>
        )}
        {paragraph?.text && (
          <Paragraph className="text-zinc-600 mt-3 text-base leading-relaxed">
            {paragraph.text}
          </Paragraph>
        )}
      </div>
    </section>
  );
}
