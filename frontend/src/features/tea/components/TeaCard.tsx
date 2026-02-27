import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TeaCard({
  name,
  image,
  favorite,
  slug,
}: {
  name: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  favorite?: boolean;
  slug: string;
}) {
  return (
    <div className="relative border p-4 border-zinc-100 rounded-sm">
      {/* <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
      /> */}
      <Button variant="outline" className="absolute top-2 right-2">
        <Heart fill={favorite ? "currentColor" : "none"} />
      </Button>
      {name}
      <Button asChild>
        <Link href={`/teas/${slug}`}>Learn more</Link>
      </Button>
    </div>
  );
}
