import { getUser } from "@/features/auth/server/actions";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  if (user) redirect("/account");

  return <LoginForm />;
}
