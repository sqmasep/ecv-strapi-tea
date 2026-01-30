import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function RichText({ content }: { content?: any }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          const Tag = `h${level}` as any;
          return (
            <Tag className="text-zinc-200 text-7xl font-bold my-4">
              {children}
            </Tag>
          );
        },
        paragraph: ({ children }) => {
          return <p className="text-zinc-400 p-12 bg-zinc-900">{children}</p>;
        },
      }}
    />
  );
}
