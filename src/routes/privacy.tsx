import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SPEAXA" },
      { name: "description", content: "How SPEAXA collects, uses and protects your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="This page is maintained by SPEAXA to answer common privacy questions about our platform." />
      <article className="mx-auto max-w-3xl px-4 py-12 prose prose-sm text-foreground/80 space-y-5">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-bold">What we collect</h2>
        <p>When you sign up, book a demo or join the waitlist, we collect your name, email, mobile and any course preferences you share. We use this only to deliver SPEAXA's learning services.</p>
        <h2 className="text-xl font-bold">How we use your data</h2>
        <p>Your information is used to contact you about classes, send progress reports to parents, and improve our service. We never sell your data.</p>
        <h2 className="text-xl font-bold">Access & deletion</h2>
        <p>Email <a className="text-primary" href="mailto:support@speaxa.in">support@speaxa.in</a> any time to request access to your data or have it deleted.</p>
        <h2 className="text-xl font-bold">Security</h2>
        <p>Data is encrypted in transit and at rest. Access is restricted to authorised SPEAXA team members.</p>
      </article>
    </>
  ),
});
