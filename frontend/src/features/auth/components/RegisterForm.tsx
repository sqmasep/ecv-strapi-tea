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
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-linear-to-br from-primary/5 via-background to-accent/10">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-md p-8">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-3">🍃</span>
          <h1 className="text-2xl font-bold text-foreground">Rejoignez-nous</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Créez votre espace thé
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
          <Input name="username" placeholder="Nom d'utilisateur" required />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            required
          />
          <RegisterButton />
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Inscription en cours…" : "Créer mon compte"}
    </Button>
  );
}
