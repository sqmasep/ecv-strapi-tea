import { getUser } from "@/features/auth/server/actions";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const user = await getUser();
  if (user) redirect("/account");

  return <RegisterForm />;
}
