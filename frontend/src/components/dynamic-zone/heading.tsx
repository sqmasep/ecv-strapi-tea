import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export function Heading({
  as = "h1",
  className,
  children,
}: {
  as: string;
} & React.ComponentProps<"h1">) {
  const Tag = as as "h1";

  return (
    <Tag className={cn("text-zinc-200 text-2xl font-bold my-4", className)}>
      {children}
    </Tag>
  );
}
