import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Award, Play, Calendar } from "lucide-react";
import { teachers, courses, batches } from "@/lib/data";

export const Route = createFileRoute("/teachers/$slug")({
  loader: ({ params }) => {
    const teacher = teachers.find((t) => t.slug === params.slug);
    if (!teacher) throw notFound();
    return { teacher };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.teacher.name ?? "Teacher"} — SPEAXA` },
      { name: "description", content: loaderData?.teacher.bio },
      { property: "og:url", content: `/teachers/${loaderData?.teacher.slug}` },
    ],
    links: [{ rel: "canonical", href: `/teachers/${loaderData?.teacher.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Teacher not found</h1>
      <Link to="/teachers" className="mt-4 inline-block text-primary font-semibold">← Back to teachers</Link>
    </div>
  ),
  component: TeacherProfile,
});

function TeacherProfile() {
  const { teacher } = Route.useLoaderData();
  const teacherCourses = courses.filter((c) => c.teacherSlugs.includes(teacher.slug));
  const teacherBatches = teacherCourses.flatMap((c) =>
    (batches[c.slug] ?? []).filter((b) => b.teacherSlug === teacher.slug).map((b) => ({ ...b, course: c })),
  );

  return (
    <>
      <section className="bg-gradient-to-b from-[oklch(0.97_0.04_55)] to-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-12">
          <Link to="/teachers" className="text-sm text-muted-foreground hover:text-primary">← All teachers</Link>
          <div className="mt-4 grid md:grid-cols-3 gap-8 items-start">
            <div>
              <img src={teacher.image} alt={teacher.name} className="w-full max-w-sm rounded-2xl shadow-lg" />
            </div>
            <div className="md:col-span-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-bold">
                <Award className="h-3 w-3" /> SOP-Verified Teacher
              </span>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">{teacher.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{teacher.title}</p>
              <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">
                <span className="flex items-center gap-1 text-primary font-bold"><Star className="h-4 w-4 fill-current" /> {teacher.rating} ({teacher.reviews} reviews)</span>
                <span>{teacher.experience}+ years experience</span>
                <span>Languages: {teacher.languages.join(", ")}</span>
              </div>
              <p className="mt-5 text-foreground/80 max-w-2xl">{teacher.bio}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/book-demo" search={{ teacher: teacher.slug }} className="rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold hover:opacity-90">Book Free Demo</Link>
                <Link to="/auth" search={{ mode: "register" }} className="rounded-md bg-foreground text-background px-6 py-3 font-bold hover:opacity-90">Select Teacher</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-12 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-extrabold">Qualifications</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-3">
              {teacher.qualifications.map((q: string, i: number) => (
                <li key={i} className="rounded-xl border border-border bg-card p-4 text-sm">{q}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Demo session</h2>
            <div className="mt-4 aspect-video rounded-2xl bg-foreground/90 flex items-center justify-center cursor-pointer hover:bg-foreground transition-colors">
              <div className="text-center text-white">
                <Play className="h-14 w-14 mx-auto" fill="currentColor" />
                <div className="mt-2 text-sm font-bold">Watch a 3-minute teaching sample</div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Courses by {teacher.name.split(" ")[0]}</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {teacherCourses.map((c) => (
                <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="mt-2 font-bold">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.duration} · ₹{c.price.toLocaleString()}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <h2 className="text-2xl font-extrabold">Available batches</h2>
          <div className="mt-4 space-y-3">
            {teacherBatches.length === 0 && <p className="text-sm text-muted-foreground">No upcoming batches.</p>}
            {teacherBatches.map((b) => (
              <div key={`${b.course.slug}-${b.id}`} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs font-bold text-primary">{b.course.title}</div>
                <div className="mt-1 flex items-center gap-1 text-xs"><Calendar className="h-3.5 w-3.5" /> {new Date(b.startDate).toDateString()}</div>
                <div className="mt-1 font-bold text-sm">{b.timing}</div>
                <Link to="/book-demo" search={{ teacher: teacher.slug, course: b.course.slug }} className="mt-3 block w-full text-center rounded-md bg-primary text-primary-foreground py-2 text-sm font-bold hover:opacity-90">Book demo</Link>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
