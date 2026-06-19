import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { courses } from "@/lib/data";

const searchSchema = z.object({ course: z.string().optional() });

export const Route = createFileRoute("/waitlist")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Join the Waitlist — SPEAXA" },
      { name: "description", content: "Reserve your spot in the SPEAXA early-access beta and get founding-member pricing for life." },
      { property: "og:url", content: "/waitlist" },
    ],
    links: [{ rel: "canonical", href: "/waitlist" }],
  }),
  component: Waitlist,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  mobile: z.string().trim().min(7).max(20),
  interested_course: z.string().optional(),
  notes: z.string().max(500).optional(),
});

function Waitlist() {
  const { course } = Route.useSearch();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Check your inputs");
    setPending(true);
    const { error } = await supabase.from("waitlist").insert(parsed.data);
    setPending(false);
    if (error) return toast.error("Could not join. Try again.");
    toast.success("You're on the list!");
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 2500);
  }

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
        <h1 className="mt-4 text-3xl font-extrabold">You're in!</h1>
        <p className="mt-2 text-muted-foreground">We'll email you the moment beta access opens.</p>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Early Access" title="Reserve your founding-member seat" description="Beta access opens with limited seats. Join the waitlist now to lock in launch pricing for life." />
      <section className="mx-auto max-w-2xl px-4 lg:px-6 py-12">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-7 space-y-4">
          <Field name="name" label="Full name" required />
          <Field name="email" label="Email" type="email" required />
          <Field name="mobile" label="Mobile" required />
          <div>
            <label className="text-sm font-semibold">Interested course</label>
            <select name="interested_course" defaultValue={course ?? ""} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">No preference</option>
              {courses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold">Anything else?</label>
            <textarea name="notes" rows={3} maxLength={500} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <button disabled={pending} className="w-full rounded-md bg-primary text-primary-foreground py-3 font-bold disabled:opacity-50 hover:opacity-90">
            {pending ? "Joining…" : "Join Waitlist"}
          </button>
          <p className="text-xs text-muted-foreground text-center">Prefer to book a demo instead? <Link to="/book-demo" className="text-primary font-semibold">Book a free demo →</Link></p>
        </form>
      </section>
    </>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
