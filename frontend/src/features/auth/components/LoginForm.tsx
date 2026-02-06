"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/features/auth/server/actions";
import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export function LoginForm() {
  const [state, action] = useActionState(login, { error: "" });

  return (
    <div className="container mx-auto min-h-screen grid place-content-center">
      {state.error && <p className="text-red-500 mb-4">{state.error}</p>}

      <h1 className="text-xl font-bold">Login</h1>
      <Form action={action} className="mt-4 flex flex-col gap-4">
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <LoginButton />
      </Form>

      <p className="mt-4 text-center">
        You don't have an account?{" "}
        <Link href="/register" className="underline text-blue-300">
          Register
        </Link>
      </p>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Logging in..." : "Log In"}
    </Button>
  );
}
