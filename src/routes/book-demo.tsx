import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarCheck } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { courses, teachers } from "@/lib/data";

const searchSchema = z.object({ course: z.string().optional(), teacher: z.string().optional() });

export const Route = createFileRoute("/book-demo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book a Free Demo — SPEAXA" },
      { name: "description", content: "Book a free 45-minute SPEAXA demo with an expert teacher. No credit card required." },
      { property: "og:url", content: "/book-demo" },
    ],
    links: [{ rel: "canonical", href: "/book-demo" }],
  }),
  component: BookDemo,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  mobile: z.string().trim().min(7, "Enter a valid mobile").max(20),
  class_level: z.string().optional(),
  board: z.string().optional(),
  preferred_time: z.string().optional(),
  course_slug: z.string().optional(),
  teacher_slug: z.string().optional(),
});

function BookDemo() {
  const { course, teacher } = Route.useSearch();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? "Check your inputs");
    setPending(true);
    const { error } = await supabase.from("demo_requests").insert(parsed.data);
    setPending(false);
    if (error) return toast.error("Could not submit. Please try again.");
    toast.success("Demo booked! We'll contact you shortly.");
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 2500);
  }

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center">
        <CalendarCheck className="h-16 w-16 mx-auto text-primary" />
        <h1 className="mt-4 text-3xl font-extrabold">You're booked!</h1>
        <p className="mt-2 text-muted-foreground">Our team will call you within 2 working hours to confirm your free demo slot.</p>
        <Link to="/courses" className="mt-6 inline-block rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold">Explore more courses</Link>
      </section>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Free Demo" title="Book your free 45-minute demo" description="Pick a course and time — we'll match you with the right teacher." />
      <section className="mx-auto max-w-3xl px-4 lg:px-6 py-12">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-7 grid sm:grid-cols-2 gap-4">
          <Input name="name" label="Full name" placeholder="e.g. Aarav Sharma" required />
          <Input name="mobile" label="Mobile" placeholder="+91 99999 99999" required />
          <Input name="email" label="Email" type="email" required placeholder="you@example.com" />
          <Select name="class_level" label="Class / Level" options={["Class 9", "Class 10", "Class 11", "Class 12", "College", "Working Professional"]} />
          <Select name="board" label="Board" options={["CBSE", "ICSE", "State Board", "IB / IGCSE", "Other"]} />
          <Select name="preferred_time" label="Preferred time" options={["Morning (7–10 AM)", "Afternoon (12–4 PM)", "Evening (5–8 PM)", "Night (8–10 PM)", "Weekends only"]} />
          <Select name="course_slug" label="Course" defaultValue={course} options={courses.map((c) => ({ value: c.slug, label: c.title }))} />
          <Select name="teacher_slug" label="Preferred teacher (optional)" defaultValue={teacher} options={[{ value: "", label: "No preference" }, ...teachers.map((t) => ({ value: t.slug, label: t.name }))]} />
          <button disabled={pending} className="sm:col-span-2 rounded-md bg-primary text-primary-foreground py-3 font-bold hover:opacity-90 disabled:opacity-50">
            {pending ? "Booking…" : "Book Free Demo"}
          </button>
          <p className="sm:col-span-2 text-xs text-muted-foreground text-center">By submitting you agree to our <Link to="/terms" className="underline">Terms</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
        </form>
      </section>
    </>
  );
}

function Input({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}

type SelectOpt = string | { value: string; label: string };
function Select({ name, label, options, defaultValue }: { name: string; label: string; options: SelectOpt[]; defaultValue?: string }) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <select name={name} defaultValue={defaultValue} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        <option value="">Select…</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </div>
  );
}
