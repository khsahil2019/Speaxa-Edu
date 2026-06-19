import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Award, Search } from "lucide-react";
import { teachers } from "@/lib/data";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/teachers")({
  head: () => ({
    meta: [
      { title: "Explore Teachers — SPEAXA" },
      { name: "description", content: "Meet SPEAXA's SOP-verified expert teachers. Filter by subject, language and rating, and pick the teacher who fits you best." },
      { property: "og:url", content: "/teachers" },
    ],
    links: [{ rel: "canonical", href: "/teachers" }],
  }),
  component: TeachersPage,
});

const allSubjects = Array.from(new Set(teachers.flatMap((t) => t.subjects)));

function TeachersPage() {
  const [q, setQ] = useState("");
  const [subj, setSubj] = useState<string | null>(null);

  const filtered = teachers.filter((t) => {
    if (subj && !t.subjects.includes(subj)) return false;
    if (q && !`${t.name} ${t.subjects.join(" ")} ${t.languages.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        eyebrow="Faculty Marketplace"
        title="Pick a teacher you click with"
        description="Every SPEAXA teacher is SOP-verified and background-checked. Compare experience, ratings and student reviews before booking a free demo."
      >
        <div className="flex items-center gap-2 max-w-lg rounded-full bg-card border border-border px-4 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, subject or language…" className="flex-1 bg-transparent outline-none text-sm" />
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSubj(null)} className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${!subj ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/80 border-border hover:bg-muted"}`}>All subjects</button>
          {allSubjects.map((s) => (
            <button key={s} onClick={() => setSubj(s)} className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${subj === s ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/80 border-border hover:bg-muted"}`}>{s}</button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div key={t.slug} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={t.image} alt={t.name} className="w-full h-56 object-cover" loading="lazy" />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-bold">
                  <Award className="h-3 w-3" /> SOP-Verified
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.title}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.subjects.map((s) => <span key={s} className="text-[11px] rounded-full bg-accent text-accent-foreground px-2 py-0.5 font-semibold">{s}</span>)}
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Languages: {t.languages.join(", ")}</div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-primary font-bold"><Star className="h-3.5 w-3.5 fill-current" /> {t.rating} ({t.reviews})</span>
                  <span className="text-muted-foreground">{t.experience}+ yrs experience</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to="/teachers/$slug" params={{ slug: t.slug }} className="flex-1 rounded-md border border-border py-2 text-sm font-bold text-center hover:bg-muted">View Profile</Link>
                  <Link to="/book-demo" search={{ teacher: t.slug }} className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-sm font-bold text-center hover:opacity-90">Book Demo</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
