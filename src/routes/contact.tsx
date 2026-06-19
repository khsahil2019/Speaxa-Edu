import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SPEAXA — We're Here to Help" },
      { name: "description", content: "Reach SPEAXA's team. Email support@speaxa.in or send us a message — we usually reply within a few hours." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  mobile: z.string().trim().min(7).max(20),
  message: z.string().trim().min(5).max(1000),
});

function Page() {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setPending(true);
    const { error } = await supabase.from("demo_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      mobile: parsed.data.mobile,
      message: parsed.data.message,
      status: "contact",
    });
    setPending(false);
    if (error) return toast.error("Could not send. Try again.");
    toast.success("Message sent! We'll reply soon.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="We're here to help" description="Questions about a course, your child's progress or partnering with us? Drop us a line." />
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12 grid md:grid-cols-3 gap-10">
        <div className="space-y-4">
          {[
            { i: Mail, l: "Email", v: "support@speaxa.in" },
            { i: Phone, l: "Phone", v: "+91 99999 99999" },
            { i: MapPin, l: "Hours", v: "Mon – Sat · 8 AM – 8 PM IST" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-border bg-card p-5 flex gap-3">
              <c.i className="h-5 w-5 text-primary mt-1" />
              <div>
                <div className="text-xs text-muted-foreground">{c.l}</div>
                <div className="font-bold">{c.v}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="md:col-span-2 rounded-2xl border border-border bg-card p-7 space-y-4">
          <h2 className="text-2xl font-extrabold">Send us a message</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="name" label="Your name" placeholder="Priya Sharma" />
            <Field name="email" type="email" label="Email" placeholder="you@example.com" />
          </div>
          <Field name="mobile" label="Mobile" placeholder="+91 99999 99999" />
          <div>
            <label className="text-sm font-semibold">Message</label>
            <textarea name="message" rows={5} required maxLength={1000} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button disabled={pending} className="rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold hover:opacity-90 disabled:opacity-50">
            {pending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </section>
    </>
  );
}

function Field({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input name={name} type={type} required placeholder={placeholder} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
