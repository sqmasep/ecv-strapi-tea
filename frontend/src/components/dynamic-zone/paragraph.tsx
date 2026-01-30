import { cn } from "@/lib/utils";

export function Paragraph({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p {...props} className={cn("text-pretty text-zinc-600", className)}>
      {children}
    </p>
  );
}
