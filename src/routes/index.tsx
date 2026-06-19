import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Play, Award, Video, FileText, ClipboardCheck, ShieldCheck, Eye, ArrowRight, CheckCircle2 } from "lucide-react";
import { CountdownBanner } from "@/components/site/Countdown";
import { courses, teachers, testimonials, categories } from "@/lib/data";
import teacher1 from "@/assets/teacher-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPEAXA — Choose Your Teacher. Learn Your Way." },
      { name: "description", content: "Live interactive learning with expert teachers, progress tracking and complete parent visibility. Class 9–12, English Speaking, Public Speaking & more." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const features = [
  { icon: Video, title: "Live Interactive Classes", desc: "HD video classes with polls, quizzes, whiteboard, and real-time Q&A." },
  { icon: FileText, title: "Monthly Progress Reports", desc: "Automated reports tracking attendance, assignments and communication scores." },
  { icon: ClipboardCheck, title: "Auto Attendance", desc: "Join time, exit time and duration tracked automatically for every class." },
  { icon: Eye, title: "Parent Monitoring", desc: "Dedicated parent portal with real-time view of grades and teacher feedback." },
  { icon: Play, title: "Class Recordings", desc: "Every class recorded automatically. Revisit lectures anytime, on any device." },
  { icon: ShieldCheck, title: "SOP-Verified Teachers", desc: "Every teacher passes a rigorous 5-stage verification before being allowed to teach." },
];

function Home() {
  const topCourses = courses.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.97_0.04_55)] to-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-12 pb-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Premium Interactive Learning for Every Student
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                Choose Your Teacher. <br />
                <span className="text-primary">Learn Your Way.</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                Interactive live learning with expert teachers, progress tracking, and complete parent visibility.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/courses" className="rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold hover:opacity-90 shadow-sm inline-flex items-center gap-1.5">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/teachers" className="rounded-md border border-border bg-card px-6 py-3 text-sm font-bold hover:bg-muted">Explore Teachers</Link>
                <Link to="/book-demo" className="rounded-md bg-foreground text-background px-6 py-3 text-sm font-bold hover:opacity-90">Book Free Demo</Link>
              </div>
              <div className="mt-8 grid grid-cols-4 gap-4 max-w-md">
                {[["10K+", "Students"], ["200+", "Teachers"], ["150+", "Live Courses"], ["98%", "Parent NPS"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-extrabold text-primary">{n}</div>
                    <div className="text-[11px] text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl bg-[var(--tint-blue)] p-6 relative shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive text-white px-2.5 py-1 text-[11px] font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> LIVE NOW
                  </span>
                  <span className="text-xs text-foreground/70">28 students online</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <img src={teacher1} alt="Dr. Priya Sharma" className="h-14 w-14 rounded-full object-cover ring-2 ring-white" width={56} height={56} />
                  <div>
                    <div className="font-bold">Dr. Priya Sharma</div>
                    <div className="text-xs text-foreground/70">Physics · Class 10</div>
                  </div>
                </div>
                <div className="mt-4 aspect-video rounded-2xl bg-foreground/90 flex items-center justify-center">
                  <Play className="h-14 w-14 text-white/90" fill="currentColor" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden md:block rounded-xl bg-card border border-border shadow-lg p-3 w-60">
                <div className="text-xs text-muted-foreground">Rahul's Progress</div>
                <div className="mt-1 font-bold text-sm">82% this month</div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "82%" }} />
                </div>
                <div className="mt-1 text-[11px] text-primary font-semibold">Excellent!</div>
              </div>
              <div className="absolute -top-3 -right-3 hidden md:flex items-center gap-1.5 rounded-full bg-card border border-border shadow-lg px-3 py-1.5">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold">SOP-Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CountdownBanner />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-14">
        <h2 className="text-3xl md:text-4xl font-extrabold">Explore by category</h2>
        <p className="mt-2 text-muted-foreground">Pick what you want to learn — every category opens a full catalogue.</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.key}
              to="/courses"
              search={{ category: c.key }}
              className="rounded-2xl p-5 hover:shadow-lg transition-shadow border border-border bg-card group"
              style={{ background: c.color }}
            >
              <div className="text-3xl">{c.icon}</div>
              <div className="mt-3 font-bold text-foreground flex items-center justify-between">
                {c.key}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-center">
            <div className="text-sm font-bold text-primary uppercase tracking-wider">Simple process</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Start learning in 3 easy steps</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Register Free", d: "Create your student account in under 2 minutes. No credit card needed.", to: "/auth" },
              { n: "02", t: "Choose Your Teacher", d: "Browse expert teachers, compare ratings, and pick the one that fits you.", to: "/teachers" },
              { n: "03", t: "Learn Live", d: "Join interactive batches, track progress and grow with monthly reports.", to: "/courses" },
            ].map((s) => (
              <Link key={s.n} to={s.to} className="rounded-2xl bg-card border border-border p-7 hover:shadow-md transition-shadow block">
                <div className="text-6xl font-black text-primary/15 leading-none">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-primary uppercase tracking-wider">Featured</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Most-loved live courses</h2>
          </div>
          <Link to="/courses" className="text-sm font-semibold text-primary hover:underline shrink-0">View all →</Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCourses.map((c) => (
            <Link key={c.slug} to="/courses/$slug" params={{ slug: c.slug }} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="h-32 flex items-center justify-center text-5xl" style={{ background: c.tint }}>{c.emoji}</div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-accent text-accent-foreground px-2.5 py-1 font-bold">{c.category}</span>
                  <span className="text-muted-foreground font-medium">{c.duration}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 text-primary fill-current" />
                    <span className="font-bold">{c.rating}</span>
                    <span className="text-muted-foreground">· {c.teacherCount} teachers</span>
                  </div>
                  <div className="text-base font-extrabold">₹{c.price.toLocaleString()}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="bg-[oklch(0.98_0.02_55)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-primary uppercase tracking-wider">Faculty</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Learn from teachers you choose</h2>
            </div>
            <Link to="/teachers" className="text-sm font-semibold text-primary hover:underline shrink-0">Meet all teachers →</Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teachers.map((t) => (
              <Link key={t.slug} to="/teachers/$slug" params={{ slug: t.slug }} className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={t.image} alt={t.name} className="w-full h-56 object-cover" loading="lazy" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-bold">
                    <Award className="h-3 w-3" /> Gold
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{t.subjects.join(", ")}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" /> {t.rating}
                    </span>
                    <span className="text-muted-foreground">{t.experience}+ yrs</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SPEAXA */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-wider">Why SPEAXA</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Everything you need to excel</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-card border border-border p-6 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-accent-foreground">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-center">
            <div className="text-sm font-bold text-primary uppercase tracking-wider">Success Stories</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">What our students say</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-6 shadow-sm">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-foreground/80">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
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
          <div className="mt-8 text-center">
            <Link to="/success-stories" className="text-sm font-semibold text-primary hover:underline">Read more stories →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-[oklch(0.65_0.22_30)] text-primary-foreground p-10 md:p-14 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to start your learning journey?</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">Join thousands of students already excelling with SPEAXA's live classes.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/auth" search={{ mode: "register" }} className="rounded-md bg-white text-primary px-6 py-3 font-bold hover:opacity-90">Join as Student</Link>
            <Link to="/book-demo" className="rounded-md border-2 border-white/80 text-white px-6 py-3 font-bold hover:bg-white/10">Book Free Demo</Link>
          </div>
        </div>
      </section>
    </>
  );
}
