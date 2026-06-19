import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Clock, Users, CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import { courses, teachers, batches } from "@/lib/data";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.course.title ?? "Course"} — SPEAXA` },
      { name: "description", content: loaderData?.course.description },
      { property: "og:url", content: `/courses/${loaderData?.course.slug}` },
    ],
    links: [{ rel: "canonical", href: `/courses/${loaderData?.course.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <Link to="/courses" className="mt-4 inline-block text-primary font-semibold">← Back to all courses</Link>
    </div>
  ),
  component: CoursePage,
});

const seatColor = (seats: number, capacity: number) => {
  if (seats === 0) return { dot: "bg-muted-foreground", label: "Full", chip: "bg-muted text-muted-foreground" };
  if (seats / capacity < 0.2) return { dot: "bg-orange-500", label: `Only ${seats} seats`, chip: "bg-orange-100 text-orange-700" };
  return { dot: "bg-green-500", label: `${seats} seats available`, chip: "bg-green-100 text-green-700" };
};

function CoursePage() {
  const { course } = Route.useLoaderData();
  const courseTeachers = teachers.filter((t) => course.teacherSlugs.includes(t.slug));
  const courseBatches = batches[course.slug] ?? [];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[oklch(0.97_0.04_55)] to-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-12">
          <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary">← All courses</Link>
          <div className="mt-4 grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-primary text-primary-foreground px-2.5 py-1 font-bold">{course.category}</span>
                <span className="text-muted-foreground font-medium">{course.subject}</span>
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">{course.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{course.longDescription}</p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1 text-primary font-bold"><Star className="h-4 w-4 fill-current" /> {course.rating} rating</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.teacherCount} expert teachers</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
              </div>
            </div>
            <aside className="rounded-2xl bg-card border border-border p-6 shadow-sm">
              <div className="text-3xl font-extrabold">₹{course.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">All-inclusive · GST extra</div>
              <div className="mt-5 flex flex-col gap-2">
                <Link to="/book-demo" search={{ course: course.slug }} className="rounded-md bg-primary text-primary-foreground py-3 font-bold text-center hover:opacity-90">Book Free Demo</Link>
                <Link to="/auth" search={{ mode: "register" }} className="rounded-md bg-foreground text-background py-3 font-bold text-center hover:opacity-90">Enroll Now</Link>
                <Link to="/waitlist" search={{ course: course.slug }} className="rounded-md border border-border py-3 font-bold text-center hover:bg-muted">Join Waitlist</Link>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Live HD classes + recordings</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Monthly progress reports</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> Parent portal access</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Curriculum */}
          <div>
            <h2 className="text-2xl font-extrabold">Curriculum</h2>
            <ol className="mt-4 rounded-2xl border border-border bg-card divide-y">
              {course.curriculum.map((c, i) => (
                <li key={i} className="p-4 flex items-start gap-3">
                  <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Teachers */}
          <div>
            <h2 className="text-2xl font-extrabold">Teachers</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {courseTeachers.map((t) => (
                <Link key={t.slug} to="/teachers/$slug" params={{ slug: t.slug }} className="rounded-2xl border border-border bg-card p-4 flex gap-4 hover:shadow-md transition-shadow">
                  <img src={t.image} alt={t.name} className="h-20 w-20 rounded-xl object-cover" loading="lazy" />
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.subjects.join(", ")}</div>
                    <div className="mt-1 text-xs flex items-center gap-2"><Star className="h-3 w-3 text-primary fill-current" /> {t.rating} · {t.experience}+ yrs</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-extrabold">Frequently asked</h2>
            <div className="mt-4 space-y-3">
              {course.faqs.map((f, i) => (
                <details key={i} className="group rounded-2xl border border-border bg-card p-5">
                  <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                    {f.q}<span className="text-primary group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Batches */}
        <aside>
          <h2 className="text-2xl font-extrabold">Upcoming batches</h2>
          <div className="mt-4 space-y-3">
            {courseBatches.map((b) => {
              const c = seatColor(b.seats, b.capacity);
              const teacher = teachers.find((t) => t.slug === b.teacherSlug);
              return (
                <div key={b.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-foreground/80"><Calendar className="h-3.5 w-3.5" /> {new Date(b.startDate).toDateString()}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${c.chip}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} /> {c.label}
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-sm">{b.timing}</div>
                  <div className="text-xs text-muted-foreground">Duration · {b.duration} · with {teacher?.name}</div>
                  <Link
                    to={b.seats === 0 ? "/waitlist" : "/book-demo"}
                    search={{ course: course.slug }}
                    className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-md bg-primary text-primary-foreground py-2 text-sm font-bold hover:opacity-90"
                  >
                    {b.seats === 0 ? "Join waitlist" : "Book demo"} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
    </>
  );
}
