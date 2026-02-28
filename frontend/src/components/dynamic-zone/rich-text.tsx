"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function RichText({ content }: { content?: any }) {
  if (!content) return null;

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <BlocksRenderer
          content={content}
          blocks={{
            heading: ({ children, level }) => {
              const Tag = `h${level}` as any;
              const sizes: Record<number, string> = {
                1: "text-4xl",
                2: "text-3xl",
                3: "text-2xl",
                4: "text-xl",
                5: "text-lg",
                6: "text-base",
              };
              return (
                <Tag
                  className={`${sizes[level] ?? "text-xl"} font-bold text-zinc-900 my-4`}
                >
                  {children}
                </Tag>
              );
            },
            paragraph: ({ children }) => (
              <p className="text-zinc-700 leading-relaxed my-3">{children}</p>
            ),
            list: ({ children, format }) =>
              format === "ordered" ? (
                <ol className="list-decimal list-inside my-3 space-y-1 text-zinc-700">
                  {children}
                </ol>
              ) : (
                <ul className="list-disc list-inside my-3 space-y-1 text-zinc-700">
                  {children}
                </ul>
              ),
            "list-item": ({ children }) => <li>{children}</li>,
            quote: ({ children }) => (
              <blockquote className="border-l-4 border-zinc-300 pl-4 italic text-zinc-500 my-4">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <pre className="bg-zinc-900 text-zinc-100 rounded p-4 my-4 overflow-x-auto text-sm">
                <code>{children}</code>
              </pre>
            ),
          }}
          modifiers={{
            bold: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            italic: ({ children }) => <em>{children}</em>,
          }}
        />
      </div>
    </section>
  );
}
