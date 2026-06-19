import { createFileRoute, Link } from "@tanstack/react-router";
import { Video, Calendar, Users } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { courses, batches, teachers } from "@/lib/data";

export const Route = createFileRoute("/live-classes")({
  head: () => ({
    meta: [
      { title: "Live Classes — SPEAXA" },
      { name: "description", content: "See SPEAXA's upcoming live class schedule. Join HD interactive sessions with polls, quizzes, whiteboard and real-time Q&A." },
      { property: "og:url", content: "/live-classes" },
    ],
    links: [{ rel: "canonical", href: "/live-classes" }],
  }),
  component: LiveClasses,
});

function LiveClasses() {
  const upcoming = Object.entries(batches).flatMap(([slug, list]) =>
    list.map((b) => ({ ...b, course: courses.find((c) => c.slug === slug)!, teacher: teachers.find((t) => t.slug === b.teacherSlug)! })),
  ).sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <>
      <PageHeader
        eyebrow="Live Schedule"
        title="HD live classes — interactive, every single session"
        description="Real-time polls, quizzes, whiteboard sketching and Q&A. Every class is recorded and available within 2 hours."
      />
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { i: Video, t: "HD broadcast", d: "Crystal-clear video and low-latency audio on any device." },
            { i: Users, t: "Small batches", d: "Capped at 12–30 students so every learner gets attention." },
            { i: Calendar, t: "Flexible timings", d: "Pick a batch that fits your school, work or family schedule." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl bg-card border border-border p-6">
              <f.i className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-bold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-extrabold">Upcoming live batches</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Course</th>
                <th className="text-left p-4">Teacher</th>
                <th className="text-left p-4">Timing</th>
                <th className="text-left p-4">Seats</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {upcoming.map((b) => (
                <tr key={`${b.course.slug}-${b.id}`} className="hover:bg-muted/30">
                  <td className="p-4 font-medium">{new Date(b.startDate).toDateString()}</td>
                  <td className="p-4">
                    <Link to="/courses/$slug" params={{ slug: b.course.slug }} className="font-semibold hover:text-primary">{b.course.title}</Link>
                  </td>
                  <td className="p-4">{b.teacher.name}</td>
                  <td className="p-4">{b.timing}</td>
                  <td className="p-4">
                    {b.seats === 0
                      ? <span className="text-muted-foreground">Full</span>
                      : b.seats < 6
                        ? <span className="text-orange-600 font-bold">Only {b.seats}</span>
                        : <span className="text-green-600 font-bold">{b.seats} open</span>}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={b.seats === 0 ? "/waitlist" : "/book-demo"}
                      search={{ course: b.course.slug }}
                      className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold hover:opacity-90"
                    >
                      {b.seats === 0 ? "Waitlist" : "Book Demo"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
