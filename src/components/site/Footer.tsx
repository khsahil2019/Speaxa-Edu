import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/speaxa-logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90 mt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-14 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <img src={logo} alt="SPEAXA" className="h-9 w-auto brightness-0 invert" />
          <p className="mt-3 text-sm text-background/60 max-w-sm">
            Choose your teacher. Learn your way. Premium interactive live learning for every student — built around expert teachers, progress tracking and complete parent visibility.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3">Learn</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/teachers">Explore Teachers</Link></li>
            <li><Link to="/live-classes">Live Classes</Link></li>
            <li><Link to="/success-stories">Success Stories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/about">About SPEAXA</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/waitlist">Join Waitlist</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li>support@speaxa.in</li>
            <li>+91 99999 99999</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
        © {new Date().getFullYear()} SPEAXA · speaxa.in · All rights reserved.
      </div>
    </footer>
  );
}
