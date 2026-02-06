"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/features/auth/server/actions";
import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export function RegisterForm() {
  const [state, action] = useActionState(register, { error: "" });

  return (
    <div className="container mx-auto min-h-screen grid place-content-center">
      {state.error && <p className="text-red-500 mb-4">{state.error}</p>}

      <h1 className="text-xl font-bold">Register</h1>
      <Form action={action} className="mt-4 flex flex-col gap-4">
        <Input type="email" name="email" placeholder="Email" required />
        <Input name="username" placeholder="Username" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <RegisterButton />
      </Form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="underline text-blue-300">
          Log in
        </Link>
      </p>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}
