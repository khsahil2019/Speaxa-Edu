import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { testimonials, courses } from "@/lib/data";

export const Route = createFileRoute("/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories — SPEAXA Students Who Excelled" },
      { name: "description", content: "Real stories from SPEAXA students and parents — board toppers, confident speakers, and interview-ready learners." },
      { property: "og:url", content: "/success-stories" },
    ],
    links: [{ rel: "canonical", href: "/success-stories" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Real Outcomes"
        title="Stories from students who chose SPEAXA"
        description="From board toppers to confident speakers — see what learners and parents achieve with the right teacher."
      />
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border p-6 shadow-sm">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-foreground/80">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" /> {t.achievement}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-r from-primary to-[oklch(0.65_0.22_30)] text-primary-foreground p-10 text-center">
          <h2 className="text-3xl font-extrabold">Be our next success story</h2>
          <p className="mt-2 opacity-90">Browse {courses.length} live courses and pick the one that gets you there.</p>
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <Link to="/courses" className="rounded-md bg-white text-primary px-6 py-3 font-bold">Explore Courses</Link>
            <Link to="/book-demo" className="rounded-md border-2 border-white/80 text-white px-6 py-3 font-bold hover:bg-white/10">Book Free Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
