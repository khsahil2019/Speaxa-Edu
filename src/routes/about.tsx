import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Target, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SPEAXA — Our Mission" },
      { name: "description", content: "SPEAXA is on a mission to make premium live learning accessible to every student — through expert teachers and complete parent visibility." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="About SPEAXA"
        title="Built so every student can choose a teacher who truly fits."
        description="We're an India-first edtech platform that combines small live batches, SOP-verified teachers and complete parent visibility into one premium learning experience."
      />
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12 space-y-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { i: Heart, t: "Student-first", d: "Every product decision is made through the lens of a 13-year-old in a tier-2 town." },
            { i: Target, t: "Outcome-driven", d: "We measure success in board scores, fluency milestones and offers accepted." },
            { i: Sparkles, t: "Premium by default", d: "Tiny batches, expert teachers, beautiful product — without enterprise pricing." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl bg-card border border-border p-6">
              <v.i className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-bold text-lg">{v.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-muted/40 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-extrabold">Our story</h2>
          <p className="mt-4 text-foreground/80 max-w-3xl">
            SPEAXA started because we believe the right teacher changes everything. Traditional tuition forces students into one classroom, one teacher, one style. We let learners <strong>choose</strong> — across subjects, languages and learning styles — and give parents a clear window into every class, assignment and assessment.
          </p>
          <p className="mt-4 text-foreground/80 max-w-3xl">
            Today, thousands of students across Class 9–12 plus working professionals are improving their academic scores, English fluency, public speaking and interview readiness on SPEAXA.
          </p>
        </div>

        <div className="text-center">
          <Link to="/contact" className="rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold hover:opacity-90">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
