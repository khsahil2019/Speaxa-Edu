import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Rocket, Bell } from "lucide-react";

const LAUNCH = new Date("2026-09-01T09:00:00Z").getTime();

function diff() {
  const ms = Math.max(0, LAUNCH - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return { d, h, m, s };
}

export function CountdownBanner() {
  const [t, setT] = useState(diff());
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: [string, number][] = [
    ["Days", t.d],
    ["Hours", t.h],
    ["Mins", t.m],
    ["Secs", t.s],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-6 pt-8">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.65_0.22_30)] text-primary-foreground p-6 md:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
          <div className="flex items-start gap-3">
            <Rocket className="h-7 w-7 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-90">Launching Soon</div>
              <h3 className="text-xl md:text-2xl font-extrabold mt-1">SPEAXA opens early-access beta. Limited seats.</h3>
              <p className="text-sm opacity-90 mt-1">Reserve your spot and get founding-member pricing for life.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cells.map(([label, n]) => (
              <div key={label} className="rounded-xl bg-white/15 backdrop-blur px-3 py-2 text-center min-w-[60px]">
                <div className="text-xl md:text-2xl font-extrabold tabular-nums">{String(n).padStart(2, "0")}</div>
                <div className="text-[10px] uppercase opacity-80">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/waitlist" className="rounded-md bg-white text-primary px-4 py-2.5 text-sm font-bold hover:opacity-90 flex items-center gap-1.5">
              <Bell className="h-4 w-4" /> Notify Me
            </Link>
            <Link to="/waitlist" className="rounded-md border-2 border-white/80 text-white px-4 py-2.5 text-sm font-bold hover:bg-white/10">Join Waitlist</Link>
            <Link to="/book-demo" className="rounded-md bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-90">Book Demo</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
