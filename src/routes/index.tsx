import { createFileRoute } from "@tanstack/react-router";
import { Phone, ShoppingCart, ChevronDown, Search, Star, Play, Award, BookOpen, Users, Video, FileText, ClipboardCheck, ShieldCheck, Eye } from "lucide-react";
import logo from "@/assets/speaxa-logo.png";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import student1 from "@/assets/student-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPEAXA - #1 Live EdTech Platform | Online Classes for K-12, JEE, NEET" },
      { name: "description", content: "Join SPEAXA's live interactive classes with India's top teachers. Live HD classes, monthly progress reports, parent monitoring & SOP-verified teachers." },
      { property: "og:title", content: "SPEAXA - Learn Live from Top Teachers" },
      { property: "og:description", content: "Live interactive online classes for school, JEE & NEET with personalized attention." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const navLinks = ["Courses", "Courses for Kids", "Free study material", "Offline Centres", "More"];

const heroPills = [
  { label: "2-Year JEE", icon: "⏱️", tint: "var(--tint-purple)" },
  { label: "2-Year NEET", icon: "🎯", tint: "var(--tint-peach)" },
  { label: "Offline Centres", icon: "🏫", tint: "var(--tint-mint)" },
  { label: "Olympiad", icon: "🏆", tint: "var(--tint-pink)" },
  { label: "Early Learning (LKG-Cl 8)", icon: "🎨", tint: "var(--tint-yellow)" },
  { label: "One to One Classes", icon: "👥", tint: "var(--tint-blue)" },
];

const exploreCategories = [
  {
    eyebrow: "Class 6 - 12",
    eyebrowColor: "oklch(0.6 0.2 250)",
    title: "Competitive Exams",
    tags: ["JEE", "NEET", "Foundation", "Olympiad", "JEE Books", "NEET Books"],
    image: teacher1,
    bg: "var(--tint-blue)",
  },
  {
    eyebrow: "Class 3 - 12",
    eyebrowColor: "oklch(0.55 0.2 300)",
    title: "School Tuition",
    tags: ["CBSE Board", "ICSE Board", "All Boards", "State Boards"],
    image: teacher2,
    bg: "var(--tint-purple)",
  },
  {
    eyebrow: "Class LKG - 8",
    eyebrowColor: "oklch(0.6 0.2 250)",
    title: "Courses for Kids",
    tags: ["Spoken English", "Learn Math", "Learn Coding", "Phonics English"],
    image: student1,
    bg: "var(--tint-yellow)",
  },
];

const featuredCourses = [
  { cls: "Class 6", subj: "General", weeks: 24, title: "Extra Ordinary Course", desc: "A standard program designed to provide learners with strong fundamentals across subjects.", price: 1999, tint: "var(--tint-mint)" },
  { cls: "Class 10", subj: "Physics", weeks: 24, title: "Class 10 Physics Mastery", desc: "Complete CBSE Class 10 Physics covering all chapters with live demonstrations.", price: 1999, tint: "var(--tint-blue)" },
  { cls: "Class 10", subj: "Mathematics", weeks: 24, title: "Class 10 Maths Excellence", desc: "Algebra, geometry, trigonometry and statistics with weekly mock tests.", price: 1999, tint: "var(--tint-pink)" },
  { cls: "Class 11", subj: "Chemistry", weeks: 32, title: "Class 11 Chemistry Foundation", desc: "Physical, Organic and Inorganic chemistry foundations for boards and JEE.", price: 2499, tint: "var(--tint-purple)" },
  { cls: "Class 12", subj: "Biology", weeks: 24, title: "Class 12 Biology Board Prep", desc: "Targeted Class 12 Biology preparation with board-pattern practice.", price: 2999, tint: "var(--tint-peach)" },
  { cls: "LKG - 5", subj: "Spoken English", weeks: 20, title: "Phonics & Spoken English", desc: "Master English speaking fluency with playful live sessions for kids.", price: 1499, tint: "var(--tint-yellow)" },
];

const features = [
  { icon: Video, title: "Live Interactive Classes", desc: "HD video classes with polls, quizzes, whiteboard, and real-time Q&A." },
  { icon: FileText, title: "Monthly Progress Reports", desc: "Automated reports tracking attendance, assignments and communication scores." },
  { icon: ClipboardCheck, title: "Auto Attendance", desc: "Join time, exit time and duration tracked automatically for every class." },
  { icon: Eye, title: "Parent Monitoring", desc: "Dedicated parent portal with real-time view of grades and teacher feedback." },
  { icon: Play, title: "Class Recordings", desc: "Every class recorded automatically. Revisit lectures anytime, on any device." },
  { icon: ShieldCheck, title: "SOP-Verified Teachers", desc: "Every teacher passes a rigorous 5-stage verification before being allowed to teach." },
];

const testimonials = [
  { quote: "SPEAXA's live classes with Dr. Priya completely transformed my understanding of Physics. I scored 96/100 in my boards!", name: "Rahul Verma", role: "Class 10 Student, CBSE", img: student1 },
  { quote: "The monthly reports are amazing! As a parent, I always know exactly how my child is performing in every subject.", name: "Suresh Kumar", role: "Parent, Bangalore", img: teacher2 },
  { quote: "Teaching on SPEAXA is so professional. The SOP system ensures quality, and earnings are transparent and fair.", name: "Dr. Priya Sharma", role: "Gold Teacher, Physics", img: teacher1 },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 h-16 flex items-center gap-6">
          <a href="/" className="flex items-center shrink-0">
            <img src={logo} alt="SPEAXA" className="h-9 w-auto" />
          </a>
          <button className="hidden md:inline-flex items-center gap-1 rounded-full border-2 border-primary text-primary px-4 py-1.5 text-sm font-semibold">
            Courses <ChevronDown className="h-4 w-4" />
          </button>
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-foreground/80">
            {navLinks.map((l) => (
              <a key={l} href="#" className="flex items-center gap-1 hover:text-primary">
                {l} <ChevronDown className="h-3.5 w-3.5" />
              </a>
            ))}
            <a href="#" className="flex items-center gap-1.5 hover:text-primary">
              <ShoppingCart className="h-4 w-4" /> Store
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-right">
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                <Phone className="h-4 w-4 text-foreground/70" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] text-muted-foreground">Talk to our experts</div>
                <div className="text-sm font-semibold">+91 9999 999 999</div>
              </div>
            </div>
            <button className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Sign In</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.97_0.04_55)] to-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-10 pb-6">
          <div className="rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12 items-center">
              <div>
                <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold">#1 Live EdTech Platform in India</span>
                <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                  Learn From <span className="text-primary">Expert Teachers</span> In Real-Time
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-lg">
                  Join live interactive classes, get personalized attention, and track your child's growth with SPEAXA's AI-powered learning system.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#courses" className="rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 shadow-sm">Start Learning Free</a>
                  <a href="#how" className="rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted">How It Works</a>
                </div>
                <div className="mt-8 grid grid-cols-4 gap-4 max-w-md">
                  {[["10K+","Students"],["200+","Teachers"],["150+","Courses"],["12.8K+","Classes"]].map(([n,l]) => (
                    <div key={l}>
                      <div className="text-xl font-extrabold text-primary">{n}</div>
                      <div className="text-[11px] text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl bg-[var(--tint-blue)] p-6 relative">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive text-white px-2.5 py-1 text-[11px] font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"/> LIVE
                    </span>
                    <span className="text-xs text-foreground/70">28 students online</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <img src={teacher1} alt="Dr. Priya Sharma" className="h-14 w-14 rounded-full object-cover ring-2 ring-white" width={56} height={56} />
                    <div>
                      <div className="font-bold">Dr. Priya Sharma</div>
                      <div className="text-xs text-foreground/70">Physics • Class 10</div>
                    </div>
                  </div>
                  <div className="mt-4 aspect-video rounded-xl bg-foreground/90 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white/90" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 hidden md:block rounded-xl bg-card border border-border shadow-md p-3 w-56">
                  <div className="text-xs text-muted-foreground">Rahul's Progress</div>
                  <div className="mt-1 font-bold text-sm">82% this month</div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "82%" }} />
                  </div>
                  <div className="mt-1 text-[11px] text-primary font-semibold">Excellent!</div>
                </div>
                <div className="absolute -top-3 -right-3 hidden md:flex items-center gap-1.5 rounded-full bg-card border border-border shadow-md px-3 py-1.5">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold">Gold Teacher</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick pills */}
          <div className="mt-6 rounded-2xl bg-card border border-border p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {heroPills.map((p) => (
                <a key={p.label} href="#" className="rounded-xl p-4 hover:shadow-md transition-shadow" style={{ background: p.tint }}>
                  <div className="text-2xl">{p.icon}</div>
                  <div className="mt-3 text-sm font-bold text-foreground flex items-center justify-between">
                    {p.label} <span className="text-foreground/50">›</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE COURSES */}
      <section id="courses" className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Explore courses <span className="text-muted-foreground text-2xl font-bold">(LKG - 12)</span>
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {exploreCategories.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-64" style={{ background: c.bg }}>
                <div className="absolute inset-0 p-6">
                  <div className="text-sm font-bold" style={{ color: c.eyebrowColor }}>{c.eyebrow}</div>
                  <div className="mt-1 text-2xl font-extrabold">{c.title}</div>
                  <div className="mt-3 flex flex-wrap gap-2 max-w-[60%]">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border border-primary/30 bg-card px-3 py-1 text-xs font-semibold text-primary">{t}</span>
                    ))}
                  </div>
                </div>
                <img src={c.image} alt="" className="absolute right-0 bottom-0 h-full w-auto object-contain object-bottom" loading="lazy" />
              </div>
              <div className="p-5">
                <button className="w-full rounded-md bg-primary text-primary-foreground py-2.5 font-semibold hover:opacity-90">Explore Courses</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-center">
            <div className="text-sm font-bold text-primary uppercase tracking-wider">Simple Process</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Start Learning in 3 Easy Steps</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Register Free", d: "Create your student account in under 2 minutes. No credit card required." },
              { n: "02", t: "Choose a Batch", d: "Browse courses, compare teachers, and enroll in a batch that fits your schedule." },
              { n: "03", t: "Learn Live", d: "Join live classes, submit assignments, and track your growth with monthly reports." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-card border border-border p-7 relative">
                <div className="text-6xl font-black text-primary/15 leading-none">{s.n}</div>
                <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-sm font-bold text-primary uppercase tracking-wider">Explore</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Featured Courses</h2>
          </div>
          <a href="#" className="text-sm font-semibold text-primary hover:underline">View All →</a>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="h-32 flex items-center justify-center text-5xl" style={{ background: c.tint }}>📖</div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-accent text-accent-foreground px-2.5 py-1 font-bold">{c.cls}</span>
                  <span className="text-muted-foreground font-medium">{c.subj} • {c.weeks} weeks</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{c.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xl font-extrabold">₹{c.price.toLocaleString()}</div>
                  <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="bg-[oklch(0.98_0.02_55)] py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="text-center">
            <div className="text-sm font-bold text-primary uppercase tracking-wider">Our Faculty</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Learn from Top Teachers</h2>
            <p className="mt-3 text-muted-foreground">All teachers are SOP-verified and background-checked for quality.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Dr. Priya Sharma", subj: "Physics, Mathematics", img: teacher1, exp: "8+ yrs" },
              { name: "Arjun Mehta", subj: "Chemistry, Biology", img: teacher2, exp: "10+ yrs" },
              { name: "Dr. Priya Sharma", subj: "Physics", img: teacher1, exp: "8+ yrs" },
              { name: "Arjun Mehta", subj: "Mathematics", img: teacher2, exp: "10+ yrs" },
            ].map((t, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={t.img} alt={t.name} className="w-full h-56 object-cover" loading="lazy" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[11px] font-bold">
                    <Award className="h-3 w-3" /> Gold
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.subj}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" /> 5.0
                    </span>
                    <span className="text-muted-foreground">{t.exp} experience</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#" className="inline-block rounded-md border-2 border-primary text-primary px-6 py-2.5 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">Meet All Teachers</a>
          </div>
        </div>
      </section>

      {/* WHY SPEAXA */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-wider">Why SPEAXA</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">Everything You Need to Excel</h2>
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
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">What Our Students Say</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-7 shadow-sm">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({length: 5}).map((_,k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-4 text-foreground/80 italic">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-[oklch(0.65_0.22_30)] text-primary-foreground p-10 md:p-14 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Start Your Learning Journey?</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">Join 10,000+ students already excelling with SPEAXA's live classes.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#" className="rounded-md bg-white text-primary px-6 py-3 font-semibold hover:opacity-90">Join as Student</a>
            <a href="#" className="rounded-md border-2 border-white/80 text-white px-6 py-3 font-semibold hover:bg-white/10">Teach with Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background/90">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-14 grid md:grid-cols-4 gap-10">
          <div>
            <img src={logo} alt="SPEAXA" className="h-8 w-auto brightness-0 invert" />
            <p className="mt-3 text-sm text-background/60">India's #1 live edtech platform — learn from expert teachers in real time.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Courses</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>JEE</li><li>NEET</li><li>CBSE / ICSE</li><li>Olympiad</li><li>Kids Programs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>About Us</li><li>Teachers</li><li>Careers</li><li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>support@speaxa.com</li>
              <li>+91 9999 999 999</li>
              <li>Mon–Sat: 8 AM – 8 PM IST</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
          © {new Date().getFullYear()} SPEAXA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
