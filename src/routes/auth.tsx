import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const searchSchema = z.object({ mode: z.enum(["login", "register"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Login or Register — SPEAXA" },
      { name: "description", content: "Sign in to SPEAXA to manage your live classes, batches and progress." },
      { property: "og:url", content: "/auth" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode = "login" } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/_authenticated/admin" });
  }, [user, loading, navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const full_name = String(fd.get("full_name") ?? "").trim();
    if (!email || password.length < 6) return toast.error("Email and 6+ char password required");
    setPending(true);
    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin, data: { full_name } },
      });
      setPending(false);
      if (error) return toast.error(error.message);
      toast.success("Account created! You're signed in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setPending(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back!");
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold">{mode === "register" ? "Create your account" : "Welcome back"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "register" ? "Free forever to browse. Demos are free." : "Sign in to continue your learning."}
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {mode === "register" && (
            <input name="full_name" required placeholder="Full name" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
          )}
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
          <input name="password" type="password" required minLength={6} placeholder="Password (6+ chars)" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm" />
          <button disabled={pending} className="w-full rounded-md bg-primary text-primary-foreground py-3 font-bold disabled:opacity-50 hover:opacity-90">
            {pending ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-muted-foreground">
          {mode === "register" ? (
            <>Already have an account? <Link to="/auth" search={{ mode: "login" }} className="text-primary font-semibold">Sign in</Link></>
          ) : (
            <>New to SPEAXA? <Link to="/auth" search={{ mode: "register" }} className="text-primary font-semibold">Create an account</Link></>
          )}
        </p>
      </div>
    </section>
  );
}
