import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TeaCard({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="border p-4 border-zinc-100 rounded-sm">
      {name}
      <Button asChild>
        <Link href={`/teas/${slug}`}>Learn more</Link>
      </Button>
    </div>
  );
}
