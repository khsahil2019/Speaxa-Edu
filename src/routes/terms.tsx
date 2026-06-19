import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SPEAXA" },
      { name: "description", content: "Terms governing use of the SPEAXA platform." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <article className="mx-auto max-w-3xl px-4 py-12 text-foreground/80 space-y-5">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-bold">Using SPEAXA</h2>
        <p>By creating an account or booking a demo you agree to use SPEAXA only for lawful learning purposes and to keep your login credentials secure.</p>
        <h2 className="text-xl font-bold">Payments & refunds</h2>
        <p>Course fees are billed per batch. Refund requests received within 7 days of batch start are eligible for a pro-rata refund.</p>
        <h2 className="text-xl font-bold">Content</h2>
        <p>All course content, recordings and materials are the property of SPEAXA and its teachers. Re-sharing or redistribution is not permitted.</p>
      </article>
    </>
  ),
});
