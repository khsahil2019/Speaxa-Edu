import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/speaxa-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/teachers", label: "Explore Teachers" },
  { to: "/live-classes", label: "Live Classes" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="shrink-0" onClick={close}>
          <img src={logo} alt="SPEAXA" className="h-9 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-foreground/75 hover:text-primary rounded-md transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-2">
          <a href="tel:+919999999999" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary mr-2">
            <Phone className="h-4 w-4" /> +91 99999 99999
          </a>
          {user ? (
            <>
              <Link to="/_authenticated/admin" className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Account</Link>
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" search={{ mode: "login" }} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-muted">Login</Link>
              <Link to="/auth" search={{ mode: "register" }} className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:bg-muted">Register</Link>
            </>
          )}
          <Link to="/book-demo" className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90">Book Demo</Link>
        </div>
        <button className="lg:hidden ml-auto p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={close} className="py-2 text-sm font-medium text-foreground/80">
                {n.label}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <Link to="/auth" search={{ mode: "login" }} onClick={close} className="py-2 text-sm font-semibold">Login</Link>
            <Link to="/auth" search={{ mode: "register" }} onClick={close} className="py-2 text-sm font-semibold">Register</Link>
            <Link to="/book-demo" onClick={close} className="mt-2 rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold text-center">Book Demo</Link>
          </div>
        </div>
      )}
    </header>
  );
}
