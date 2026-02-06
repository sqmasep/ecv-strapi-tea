import { Button } from "@/components/ui/button";
import { getUser, logout } from "@/features/auth/server/actions";
import { LogOut } from "lucide-react";
import Form from "next/form";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Welcome back, {user.username}</h1>
      <Form action={logout}>
        <Button variant="destructive" type="submit">
          <LogOut />
          Logout
        </Button>
      </Form>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
