import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

const openings = [
  { role: "Senior Live Class Teacher — Physics", location: "Remote · India", type: "Full-time" },
  { role: "Communication Skills Coach", location: "Remote · India", type: "Part-time" },
  { role: "Product Designer", location: "Bengaluru / Remote", type: "Full-time" },
  { role: "Customer Success Lead", location: "Bengaluru", type: "Full-time" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join SPEAXA" },
      { name: "description", content: "Help us build India's most loved live learning platform. Open roles at SPEAXA." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Careers" title="Build SPEAXA with us" description="We're a small, focused team obsessed with student outcomes. Come help us grow." />
      <section className="mx-auto max-w-4xl px-4 py-12 space-y-3">
        {openings.map((o) => (
          <div key={o.role} className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-bold">{o.role}</div>
              <div className="text-xs text-muted-foreground">{o.location} · {o.type}</div>
            </div>
            <Link to="/contact" className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">Apply</Link>
          </div>
        ))}
      </section>
    </>
  ),
});
