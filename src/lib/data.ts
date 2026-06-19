import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import teacher3 from "@/assets/teacher-3.jpg";
import teacher4 from "@/assets/teacher-4.jpg";
import student1 from "@/assets/student-1.jpg";

export const TEACHER_IMAGES = { teacher1, teacher2, teacher3, teacher4, student1 };

export type Teacher = {
  slug: string;
  name: string;
  title: string;
  subjects: string[];
  languages: string[];
  experience: number;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  qualifications: string[];
};

export type Batch = {
  id: string;
  startDate: string;
  duration: string;
  seats: number;
  capacity: number;
  timing: string;
  teacherSlug: string;
};

export type Course = {
  slug: string;
  title: string;
  category: "Class 9" | "Class 10" | "Class 11" | "Class 12" | "English Speaking" | "Communication Skills" | "Public Speaking" | "Interview Preparation";
  subject: string;
  description: string;
  longDescription: string;
  duration: string;
  weeks: number;
  rating: number;
  teacherCount: number;
  price: number;
  tint: string;
  emoji: string;
  curriculum: string[];
  teacherSlugs: string[];
  faqs: { q: string; a: string }[];
};

export const teachers: Teacher[] = [
  {
    slug: "priya-sharma",
    name: "Dr. Priya Sharma",
    title: "Senior Physics & Mathematics Mentor",
    subjects: ["Physics", "Mathematics"],
    languages: ["English", "Hindi"],
    experience: 8,
    rating: 4.9,
    reviews: 482,
    image: teacher1,
    bio: "Dr. Priya specialises in making complex Physics intuitive for Class 9–12 students. Her live sessions blend conceptual clarity with exam-ready problem solving.",
    qualifications: ["Ph.D. Physics, IIT Delhi", "B.Ed.", "8+ yrs teaching Class 9–12"],
  },
  {
    slug: "arjun-mehta",
    name: "Arjun Mehta",
    title: "Chemistry & Biology Expert",
    subjects: ["Chemistry", "Biology"],
    languages: ["English", "Hindi", "Marathi"],
    experience: 10,
    rating: 4.8,
    reviews: 612,
    image: teacher2,
    bio: "Arjun has guided 5000+ students through CBSE / ICSE board preparations with a calm, structured approach focused on first-principles understanding.",
    qualifications: ["M.Sc. Chemistry, BHU", "CSIR-NET qualified", "10+ yrs teaching"],
  },
  {
    slug: "ananya-iyer",
    name: "Ananya Iyer",
    title: "English & Communication Coach",
    subjects: ["English Speaking", "Communication Skills", "Public Speaking"],
    languages: ["English", "Tamil", "Hindi"],
    experience: 7,
    rating: 5.0,
    reviews: 308,
    image: teacher3,
    bio: "Ananya helps students unlock confident, fluent English through structured speaking drills, real-world conversations, and personalised feedback.",
    qualifications: ["M.A. English Literature", "TESOL certified", "Ex-corporate trainer"],
  },
  {
    slug: "rohan-desai",
    name: "Rohan Desai",
    title: "Interview & Career Mentor",
    subjects: ["Interview Preparation", "Public Speaking", "Communication Skills"],
    languages: ["English", "Hindi", "Gujarati"],
    experience: 9,
    rating: 4.9,
    reviews: 256,
    image: teacher4,
    bio: "Rohan is an ex-MNC hiring manager who now coaches students for interviews, GDs, and confident communication for top colleges and internships.",
    qualifications: ["MBA, IIM Bangalore", "Ex-Deloitte, Ex-Amazon", "9+ yrs mentoring"],
  },
];

export const courses: Course[] = [
  {
    slug: "class-10-physics-mastery",
    title: "Class 10 Physics Mastery",
    category: "Class 10",
    subject: "Physics",
    description: "Complete CBSE/ICSE Class 10 Physics with live demonstrations, weekly tests and doubt sessions.",
    longDescription: "Master every chapter of Class 10 Physics with live interactive classes, animated simulations and personalised doubt-solving. Designed to maximise both your conceptual depth and board exam scores.",
    duration: "24 weeks",
    weeks: 24,
    rating: 4.9,
    teacherCount: 6,
    price: 1999,
    tint: "var(--tint-blue)",
    emoji: "⚛️",
    curriculum: ["Light - Reflection & Refraction", "The Human Eye & Colourful World", "Electricity", "Magnetic Effects of Current", "Sources of Energy", "Weekly mock tests & PYQ practice"],
    teacherSlugs: ["priya-sharma", "arjun-mehta"],
    faqs: [
      { q: "Are classes live or recorded?", a: "All classes are LIVE with real-time Q&A. Recordings are available within 2 hours for revision." },
      { q: "Do you cover board exam patterns?", a: "Yes — every chapter ends with board-pattern questions and previous year solved papers." },
    ],
  },
  {
    slug: "class-10-mathematics-excellence",
    title: "Class 10 Mathematics Excellence",
    category: "Class 10",
    subject: "Mathematics",
    description: "Algebra, geometry, trigonometry & statistics with weekly mock tests and step-by-step doubt support.",
    longDescription: "A 24-week structured program that builds Class 10 Maths from fundamentals to advanced board-level problem solving with live whiteboard sessions.",
    duration: "24 weeks",
    weeks: 24,
    rating: 4.8,
    teacherCount: 5,
    price: 1999,
    tint: "var(--tint-pink)",
    emoji: "📐",
    curriculum: ["Real Numbers & Polynomials", "Linear & Quadratic Equations", "Triangles & Circles", "Trigonometry", "Statistics & Probability", "Weekly tests + monthly mocks"],
    teacherSlugs: ["priya-sharma"],
    faqs: [
      { q: "Is the course aligned to CBSE & ICSE?", a: "Yes — all major board syllabi are covered, with board-specific practice modules." },
    ],
  },
  {
    slug: "class-9-foundation",
    title: "Class 9 Foundation Bundle",
    category: "Class 9",
    subject: "Physics, Chemistry, Maths",
    description: "Build rock-solid Class 9 fundamentals in Physics, Chemistry & Maths with live classes 5 days/week.",
    longDescription: "Set the foundation for board success with a comprehensive Class 9 program covering Physics, Chemistry and Mathematics in live, interactive sessions.",
    duration: "30 weeks",
    weeks: 30,
    rating: 4.7,
    teacherCount: 4,
    price: 2499,
    tint: "var(--tint-mint)",
    emoji: "🧪",
    curriculum: ["Motion & Force", "Atoms & Molecules", "Number Systems", "Quadrilaterals & Triangles", "Sound & Work", "Weekly assessments"],
    teacherSlugs: ["priya-sharma", "arjun-mehta"],
    faqs: [
      { q: "Can I attend a demo first?", a: "Absolutely. Book a free 45-minute demo from the course page." },
    ],
  },
  {
    slug: "class-11-chemistry-foundation",
    title: "Class 11 Chemistry Foundation",
    category: "Class 11",
    subject: "Chemistry",
    description: "Physical, Organic and Inorganic chemistry foundations for boards and competitive exams.",
    longDescription: "Comprehensive Class 11 Chemistry course covering NCERT, advanced problem solving and competitive exam patterns.",
    duration: "32 weeks",
    weeks: 32,
    rating: 4.8,
    teacherCount: 3,
    price: 2499,
    tint: "var(--tint-purple)",
    emoji: "🧬",
    curriculum: ["States of Matter", "Atomic Structure", "Chemical Bonding", "Thermodynamics", "Organic Chemistry Basics"],
    teacherSlugs: ["arjun-mehta"],
    faqs: [{ q: "Are there competitive exam questions?", a: "Yes, weekly JEE/NEET-style problems are included." }],
  },
  {
    slug: "class-12-biology-board-prep",
    title: "Class 12 Biology Board Prep",
    category: "Class 12",
    subject: "Biology",
    description: "Targeted Class 12 Biology preparation focused on board exam patterns and revision strategies.",
    longDescription: "Score 95+ in Class 12 Biology boards with intensive chapter coverage, diagram practice and full-length mock tests.",
    duration: "24 weeks",
    weeks: 24,
    rating: 4.9,
    teacherCount: 4,
    price: 2999,
    tint: "var(--tint-peach)",
    emoji: "🌱",
    curriculum: ["Reproduction in Organisms", "Genetics & Evolution", "Biotechnology", "Ecology", "Full-length mocks"],
    teacherSlugs: ["arjun-mehta"],
    faqs: [{ q: "Do you provide notes?", a: "Yes — chapter-wise NCERT-aligned notes are shared after each class." }],
  },
  {
    slug: "english-speaking-pro",
    title: "English Speaking Pro",
    category: "English Speaking",
    subject: "Spoken English",
    description: "Speak confident, fluent English through guided drills, real conversations and personalised feedback.",
    longDescription: "An immersive 16-week program that takes you from hesitant speaker to confident communicator with daily speaking practice and 1-on-1 feedback.",
    duration: "16 weeks",
    weeks: 16,
    rating: 4.9,
    teacherCount: 3,
    price: 1799,
    tint: "var(--tint-yellow)",
    emoji: "🗣️",
    curriculum: ["Foundations of Fluency", "Pronunciation Lab", "Daily Conversations", "Storytelling & Opinions", "Group Discussions"],
    teacherSlugs: ["ananya-iyer", "rohan-desai"],
    faqs: [
      { q: "What is the class size?", a: "We keep batches small (8–12 students) so every learner speaks in every session." },
    ],
  },
  {
    slug: "communication-skills-mastery",
    title: "Communication Skills Mastery",
    category: "Communication Skills",
    subject: "Communication",
    description: "Build professional communication — emails, meetings, presentations and interpersonal influence.",
    longDescription: "Master the full spectrum of professional communication with live workshops, real scenarios and personalised coaching.",
    duration: "12 weeks",
    weeks: 12,
    rating: 4.8,
    teacherCount: 3,
    price: 1999,
    tint: "var(--tint-blue)",
    emoji: "💬",
    curriculum: ["Active Listening", "Assertive Communication", "Email & Chat Etiquette", "Difficult Conversations", "Presentations"],
    teacherSlugs: ["ananya-iyer", "rohan-desai"],
    faqs: [{ q: "Is this for students or working professionals?", a: "Both. We run separate cohorts for high-schoolers, college students and early-career professionals." }],
  },
  {
    slug: "public-speaking-confidence",
    title: "Public Speaking Confidence",
    category: "Public Speaking",
    subject: "Public Speaking",
    description: "Move from stage fear to commanding presence with structured speech practice and live coaching.",
    longDescription: "A focused 10-week journey to help you craft, rehearse and deliver speeches with poise — perfect for school events, college presentations and competitions.",
    duration: "10 weeks",
    weeks: 10,
    rating: 4.9,
    teacherCount: 2,
    price: 1799,
    tint: "var(--tint-purple)",
    emoji: "🎤",
    curriculum: ["Stage Presence", "Voice Modulation", "Storytelling Frameworks", "Impromptu Speaking", "Final Showcase"],
    teacherSlugs: ["ananya-iyer", "rohan-desai"],
    faqs: [{ q: "Will I get to present live?", a: "Yes — every batch ends with a live showcase in front of the cohort." }],
  },
  {
    slug: "interview-preparation",
    title: "Interview Preparation",
    category: "Interview Preparation",
    subject: "Interview Prep",
    description: "Crack college, internship & job interviews with mock interviews, frameworks and feedback.",
    longDescription: "Get interview-ready with realistic mocks, story-driven answers, body-language coaching and personalised feedback from industry mentors.",
    duration: "8 weeks",
    weeks: 8,
    rating: 5.0,
    teacherCount: 2,
    price: 2499,
    tint: "var(--tint-peach)",
    emoji: "🎯",
    curriculum: ["Resume & Profile", "HR Round Mastery", "Behavioural Frameworks", "Mock Interviews", "Personalised Feedback"],
    teacherSlugs: ["rohan-desai"],
    faqs: [{ q: "How many mock interviews are included?", a: "Each student gets 4 personalised 1-on-1 mock interviews with written feedback." }],
  },
];

export const batches: Record<string, Batch[]> = {
  "class-10-physics-mastery": [
    { id: "b1", startDate: "2026-07-08", duration: "24 wks", seats: 5, capacity: 30, timing: "Mon/Wed/Fri · 6:00 PM", teacherSlug: "priya-sharma" },
    { id: "b2", startDate: "2026-07-15", duration: "24 wks", seats: 18, capacity: 30, timing: "Tue/Thu/Sat · 7:30 PM", teacherSlug: "arjun-mehta" },
    { id: "b3", startDate: "2026-08-01", duration: "24 wks", seats: 0, capacity: 30, timing: "Weekends · 10:00 AM", teacherSlug: "priya-sharma" },
  ],
  "class-10-mathematics-excellence": [
    { id: "b1", startDate: "2026-07-10", duration: "24 wks", seats: 12, capacity: 30, timing: "Mon/Wed/Fri · 5:00 PM", teacherSlug: "priya-sharma" },
    { id: "b2", startDate: "2026-08-05", duration: "24 wks", seats: 3, capacity: 30, timing: "Tue/Thu · 7:00 PM", teacherSlug: "priya-sharma" },
  ],
  "class-9-foundation": [
    { id: "b1", startDate: "2026-07-01", duration: "30 wks", seats: 22, capacity: 30, timing: "Daily · 6:30 PM", teacherSlug: "arjun-mehta" },
  ],
  "class-11-chemistry-foundation": [
    { id: "b1", startDate: "2026-07-12", duration: "32 wks", seats: 14, capacity: 30, timing: "Mon/Wed · 7:00 PM", teacherSlug: "arjun-mehta" },
  ],
  "class-12-biology-board-prep": [
    { id: "b1", startDate: "2026-07-05", duration: "24 wks", seats: 4, capacity: 30, timing: "Tue/Thu/Sat · 6:00 PM", teacherSlug: "arjun-mehta" },
  ],
  "english-speaking-pro": [
    { id: "b1", startDate: "2026-07-03", duration: "16 wks", seats: 8, capacity: 12, timing: "Mon/Wed/Fri · 8:00 PM", teacherSlug: "ananya-iyer" },
    { id: "b2", startDate: "2026-07-22", duration: "16 wks", seats: 11, capacity: 12, timing: "Tue/Thu · 7:00 AM", teacherSlug: "ananya-iyer" },
  ],
  "communication-skills-mastery": [
    { id: "b1", startDate: "2026-07-09", duration: "12 wks", seats: 6, capacity: 15, timing: "Sat/Sun · 11:00 AM", teacherSlug: "ananya-iyer" },
  ],
  "public-speaking-confidence": [
    { id: "b1", startDate: "2026-07-15", duration: "10 wks", seats: 2, capacity: 12, timing: "Sat/Sun · 5:00 PM", teacherSlug: "rohan-desai" },
  ],
  "interview-preparation": [
    { id: "b1", startDate: "2026-07-06", duration: "8 wks", seats: 9, capacity: 12, timing: "Mon/Thu · 8:30 PM", teacherSlug: "rohan-desai" },
  ],
};

export const categories = [
  { key: "Class 9", icon: "📘", color: "var(--tint-blue)" },
  { key: "Class 10", icon: "📗", color: "var(--tint-mint)" },
  { key: "Class 11", icon: "📙", color: "var(--tint-peach)" },
  { key: "Class 12", icon: "📕", color: "var(--tint-pink)" },
  { key: "English Speaking", icon: "🗣️", color: "var(--tint-yellow)" },
  { key: "Communication Skills", icon: "💬", color: "var(--tint-purple)" },
  { key: "Public Speaking", icon: "🎤", color: "var(--tint-blue)" },
  { key: "Interview Preparation", icon: "🎯", color: "var(--tint-peach)" },
] as const;

export const testimonials = [
  { quote: "SPEAXA's live classes transformed my Physics. I scored 96/100 in boards!", name: "Rahul Verma", role: "Class 10 · CBSE", img: student1, achievement: "96/100 in Physics" },
  { quote: "I went from being scared of speaking to leading our school debate team in 4 months.", name: "Aisha Khan", role: "Class 11 · ICSE", img: teacher3, achievement: "School Debate Captain" },
  { quote: "The interview prep mocks landed me an internship at a top consulting firm.", name: "Karan Patel", role: "B.Com Final Year", img: teacher4, achievement: "Consulting Internship" },
  { quote: "Monthly reports help me track exactly how my daughter is progressing. Brilliant!", name: "Suresh Kumar", role: "Parent · Bangalore", img: teacher2, achievement: "Parent of Class 10 student" },
];
