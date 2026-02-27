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
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-linear-to-br from-primary/5 via-background to-accent/10">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-md p-8">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">🍵</span>
          <h1 className="text-2xl font-bold text-foreground">Bon retour !</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Connectez-vous pour retrouver vos favoris
          </p>
        </div>

        {state.error && (
          <div className="mb-4 px-4 py-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg">
            {state.error}
          </div>
        )}

        <Form action={action} className="flex flex-col gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
          />
          <LoginButton />
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Connexion…" : "Se connecter"}
    </Button>
  );
}
