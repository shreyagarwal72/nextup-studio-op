import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionLinks = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Work" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);

  // Background state and page scroll progress
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          const total = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently under the nav (home page only)
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    const update = () => {
      let current = "";
      for (const { id } of sectionLinks) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 100) {
            current = id;
          }
        }
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  // Close mobile menu on route change, Escape key, or desktop breakpoint
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background/30 backdrop-blur-xs"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight focus-visible:outline-offset-4"
          aria-label="Nextup Studio — Home"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
          <span>
            Nextup <span className="font-medium text-muted-foreground">Studio</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((s) => (
            <Link
              key={s.id}
              to={{ pathname: "/", hash: `#${s.id}` }}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === s.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {s.label}
            </Link>
          ))}
          <Link
            to="/ai"
            className="ml-2 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            AI Assistant
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/ai"
            className="rounded-lg border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground"
          >
            AI
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="h-10 w-10 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Thin coral page progress line (Behavior #6) */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/20 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-signal origin-left transition-transform duration-75 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-border bg-background/95 backdrop-blur-xl px-6 py-6 md:hidden shadow-2xl"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {sectionLinks.map((s) => (
              <Link
                key={s.id}
                to={{ pathname: "/", hash: `#${s.id}` }}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  active === s.id ? "bg-muted text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </Link>
            ))}
            <Link
              to="/ai"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg border border-border px-3 py-2.5 text-center text-sm font-semibold text-foreground hover:border-primary"
            >
              Open AI Assistant
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
