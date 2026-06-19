import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Users, Clock, Search } from "lucide-react";
import { z } from "zod";
import { courses, categories } from "@/lib/data";
import { PageHeader } from "@/components/site/PageHeader";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/courses")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Courses — SPEAXA Live Classes" },
      { name: "description", content: "Explore SPEAXA's full course catalogue — Class 9–12, English speaking, public speaking, communication and interview preparation." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { category, q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const navigate = Route.useNavigate();

  const filtered = courses.filter((c) => {
    if (category && c.category !== category) return false;
    if (query && !(`${c.title} ${c.subject} ${c.description}`).toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Find your perfect live course"
        description="Browse curated programs, compare teachers and pick the batch that fits your schedule."
      >
        <div className="flex items-center gap-2 max-w-lg rounded-full bg-card border border-border px-4 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              navigate({ search: (prev) => ({ ...prev, q: e.target.value || undefined }) });
            }}
            placeholder="Search courses, subjects, teachers…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate({ search: (prev) => ({ ...prev, category: undefined }) })}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${!category ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/80 border-border hover:bg-muted"}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => navigate({ search: (prev) => ({ ...prev, category: c.key }) })}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold border ${category === c.key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/80 border-border hover:bg-muted"}`}
            >
              {c.icon} {c.key}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl bg-muted/40">
            <p className="text-lg font-semibold">No courses match your filters.</p>
            <p className="text-muted-foreground mt-1">Try clearing the search or picking a different category.</p>
          </div>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="h-36 flex items-center justify-center text-6xl" style={{ background: c.tint }}>{c.emoji}</div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-accent text-accent-foreground px-2.5 py-1 font-bold">{c.category}</span>
                    <span className="text-muted-foreground font-medium">{c.subject}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.duration}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.teacherCount} teachers</span>
                    <span className="flex items-center gap-1 text-primary font-bold"><Star className="h-3.5 w-3.5 fill-current" /> {c.rating}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-extrabold">₹{c.price.toLocaleString()}</div>
                    <span className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold">View Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
