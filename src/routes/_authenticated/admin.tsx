import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, GraduationCap, Trash2, Megaphone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useIsAdmin } from "@/hooks/use-auth";
import { PageHeader } from "@/components/site/PageHeader";
import { courses, teachers, batches } from "@/lib/data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — SPEAXA" }] }),
  component: Admin,
});

type DemoRow = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  class_level: string | null;
  board: string | null;
  preferred_time: string | null;
  course_slug: string | null;
  teacher_slug: string | null;
  status: string;
  created_at: string;
};
type WaitRow = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  interested_course: string | null;
  notes: string | null;
  created_at: string;
};

function Admin() {
  const { user } = useAuth();
  const { isAdmin, checking } = useIsAdmin(user?.id);

  if (checking) return <div className="mx-auto max-w-3xl px-4 py-24 text-center">Loading…</div>;
  if (!isAdmin) return <NonAdminAccount email={user?.email ?? ""} userId={user?.id ?? ""} />;
  return <AdminPanel />;
}

function NonAdminAccount({ email, userId }: { email: string; userId: string }) {
  return (
    <>
      <PageHeader eyebrow="Account" title={`Welcome, ${email.split("@")[0]}`} description="Manage your SPEAXA account and explore live courses." />
      <section className="mx-auto max-w-4xl px-4 lg:px-6 py-10 space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold text-lg">Your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Signed in as <strong className="text-foreground">{email}</strong></p>
          <p className="mt-1 text-xs text-muted-foreground">User ID · {userId}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-bold text-lg">Quick actions</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link to="/courses" className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">Browse courses</Link>
            <Link to="/teachers" className="rounded-md border border-border px-4 py-2 text-sm font-bold">Find a teacher</Link>
            <Link to="/book-demo" className="rounded-md border border-border px-4 py-2 text-sm font-bold">Book a free demo</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-sm text-muted-foreground">
          Need admin access? Contact <a href="mailto:support@speaxa.in" className="text-primary font-semibold">support@speaxa.in</a> with your user ID.
        </div>
      </section>
    </>
  );
}

function AdminPanel() {
  const [tab, setTab] = useState<"demos" | "waitlist" | "courses" | "teachers" | "batches" | "announce">("demos");
  const [demos, setDemos] = useState<DemoRow[]>([]);
  const [waits, setWaits] = useState<WaitRow[]>([]);

  async function refresh() {
    const [{ data: d }, { data: w }] = await Promise.all([
      supabase.from("demo_requests").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("waitlist").select("*").order("created_at", { ascending: false }).limit(200),
    ]);
    setDemos((d ?? []) as DemoRow[]);
    setWaits((w ?? []) as WaitRow[]);
  }
  useEffect(() => { refresh(); }, []);

  async function deleteDemo(id: string) {
    const { error } = await supabase.from("demo_requests").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    refresh();
  }
  async function deleteWait(id: string) {
    const { error } = await supabase.from("waitlist").delete().eq("id", id);
    if (error) return toast.error("Delete failed");
    toast.success("Deleted");
    refresh();
  }
  async function setStatus(id: string, status: string) {
    const { error } = await supabase.from("demo_requests").update({ status }).eq("id", id);
    if (error) return toast.error("Update failed");
    refresh();
  }

  const tabs = [
    { k: "demos", label: `Demo Requests (${demos.length})` },
    { k: "waitlist", label: `Waitlist (${waits.length})` },
    { k: "courses", label: `Courses (${courses.length})` },
    { k: "teachers", label: `Teachers (${teachers.length})` },
    { k: "batches", label: "Batches" },
    { k: "announce", label: "Announcements" },
  ] as const;

  return (
    <>
      <PageHeader eyebrow="Admin" title="SPEAXA Operations" description="Manage demo requests, waitlist signups, courses, teachers and batches." />
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {tabs.map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === t.k ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70 hover:bg-muted"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "demos" && (
            <Table
              empty="No demo requests yet."
              head={["When", "Name", "Contact", "Class / Board", "Course", "Status", ""]}
              rows={demos.map((d) => [
                new Date(d.created_at).toLocaleString(),
                <div key="n"><div className="font-bold">{d.name}</div><div className="text-xs text-muted-foreground">{d.preferred_time}</div></div>,
                <div key="c" className="text-xs">
                  <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {d.email}</div>
                  <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {d.mobile}</div>
                </div>,
                <div key="cb" className="text-xs"><div>{d.class_level ?? "—"}</div><div className="text-muted-foreground">{d.board ?? "—"}</div></div>,
                <div key="co" className="text-xs"><div>{d.course_slug ?? "—"}</div><div className="text-muted-foreground">{d.teacher_slug ?? ""}</div></div>,
                <select key="s" value={d.status} onChange={(e) => setStatus(d.id, e.target.value)} className="text-xs rounded-md border border-border bg-background px-2 py-1">
                  {["new", "contacted", "scheduled", "converted", "lost", "contact"].map((s) => <option key={s}>{s}</option>)}
                </select>,
                <button key="d" onClick={() => deleteDemo(d.id)} className="text-destructive hover:text-destructive/70" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>,
              ])}
            />
          )}
          {tab === "waitlist" && (
            <Table
              empty="No waitlist signups yet."
              head={["When", "Name", "Contact", "Interested in", "Notes", ""]}
              rows={waits.map((w) => [
                new Date(w.created_at).toLocaleString(),
                <div key="n" className="font-bold">{w.name}</div>,
                <div key="c" className="text-xs">
                  <div className="flex items-center gap-1"><Mail className="h-3 w-3" /> {w.email}</div>
                  <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {w.mobile}</div>
                </div>,
                w.interested_course ?? "—",
                <div key="nt" className="text-xs text-muted-foreground line-clamp-2 max-w-xs">{w.notes ?? "—"}</div>,
                <button key="d" onClick={() => deleteWait(w.id)} className="text-destructive hover:text-destructive/70">
                  <Trash2 className="h-4 w-4" />
                </button>,
              ])}
            />
          )}
          {tab === "courses" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="rounded-xl border border-border bg-card p-4 hover:shadow-md">
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="mt-2 font-bold text-sm">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.category} · ₹{c.price.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          )}
          {tab === "teachers" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers.map((t) => (
                <Link key={t.slug} to="/teachers/$slug" params={{ slug: t.slug }} className="rounded-xl border border-border bg-card p-4 flex gap-3 hover:shadow-md">
                  <img src={t.image} className="h-14 w-14 rounded-lg object-cover" alt="" />
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.subjects.join(", ")}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {tab === "batches" && (
            <div className="space-y-6">
              {Object.entries(batches).map(([slug, list]) => {
                const c = courses.find((x) => x.slug === slug)!;
                return (
                  <div key={slug} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /><div className="font-bold">{c.title}</div></div>
                    <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {list.map((b) => (
                        <div key={b.id} className="rounded-xl bg-muted/40 p-3 text-sm">
                          <div className="font-semibold">{new Date(b.startDate).toDateString()}</div>
                          <div className="text-xs text-muted-foreground">{b.timing}</div>
                          <div className="mt-1 text-xs">Seats {b.seats}/{b.capacity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab === "announce" && (
            <div className="max-w-xl rounded-2xl border border-border bg-card p-6">
              <h2 className="font-bold text-lg flex items-center gap-2"><Megaphone className="h-5 w-5 text-primary" /> Send announcement</h2>
              <p className="mt-1 text-sm text-muted-foreground">Compose an announcement — sending integration coming with email provider.</p>
              <form onSubmit={(e) => { e.preventDefault(); toast.success("Announcement queued (demo)"); (e.target as HTMLFormElement).reset(); }} className="mt-4 space-y-3">
                <input required placeholder="Subject" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <textarea required rows={5} placeholder="Message…" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">Send</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Table({ head, rows, empty }: { head: string[]; rows: React.ReactNode[][]; empty: string }) {
  if (rows.length === 0) return <div className="rounded-2xl bg-muted/30 p-10 text-center text-muted-foreground">{empty}</div>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
          <tr>{head.map((h, i) => <th key={i} className="text-left p-3">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-muted/30">
              {r.map((cell, j) => <td key={j} className="p-3 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
