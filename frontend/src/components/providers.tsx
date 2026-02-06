import { NuqsAdapter } from "nuqs/adapters/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
