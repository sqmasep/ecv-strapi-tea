import Link from "next/link";
import { Button } from "../ui/button";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";

export function IllustrationSection({
  heading,
  paragraph,
  button,
}: {
  heading: { text: string; as: string };
  paragraph: { text: string };
  button: { label: string; target?: string; url: string };
}) {
  return (
    <div className="py-16 bg-zinc-200">
      <div>
        <Heading as={heading.as}>{heading?.text}</Heading>
        <Paragraph>{paragraph?.text}</Paragraph>
        <Button asChild>
          <Link href={button.url} target={button?.target ?? undefined}>
            {button?.label}
          </Link>
        </Button>
      </div>
    </div>
  );
}
