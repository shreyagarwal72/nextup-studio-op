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

  // Background once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently under the nav (home page only).
  useEffect(() => {
    if (!isHome) {
      setActive("");
      return;
    }
    const update = () => {
      let current = "";
      for (const { id } of sectionLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  // Close the mobile menu on navigation, Escape, or when growing to desktop width.
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

  const linkBase =
    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current]:text-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2" aria-label="Nextup Studio home">
          <span className="font-display text-xl font-extrabold tracking-tight">Nextup</span>
          <span className="font-display text-xl font-medium tracking-tight text-muted-foreground">Studio</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((l) => (
            <Link
              key={l.id}
              to={{ pathname: "/", hash: `#${l.id}` }}
              aria-current={isHome && active === l.id ? "location" : undefined}
              className={linkBase}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/ai" aria-current={pathname === "/ai" ? "page" : undefined} className={linkBase}>
            AI Assistant
          </Link>
          <Button asChild size="sm" className="ml-3">
            <Link to={{ pathname: "/", hash: "#contact" }}>Start a project</Link>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="wrap flex max-h-[calc(100svh-4rem)] flex-col gap-1 overflow-y-auto pb-6 pt-2 md:hidden"
        >
          {sectionLinks.map((l) => (
            <Link
              key={l.id}
              to={{ pathname: "/", hash: `#${l.id}` }}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-display text-2xl font-semibold tracking-tight hover:bg-accent"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/ai"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 font-display text-2xl font-semibold tracking-tight hover:bg-accent"
          >
            AI Assistant
          </Link>
          <Button asChild size="lg" className="mt-4">
            <Link to={{ pathname: "/", hash: "#contact" }} onClick={() => setOpen(false)}>
              Start a project
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
