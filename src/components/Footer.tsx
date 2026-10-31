import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "About", to: { pathname: "/", hash: "#about" } },
  { label: "Services", to: { pathname: "/", hash: "#services" } },
  { label: "Work", to: { pathname: "/", hash: "#portfolio" } },
  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
  { label: "AI Assistant", to: "/ai" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start rising when top enters the bottom 30% of viewport
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height * 0.8)));
      setReveal(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const wordmarkY = reducedMotion ? "0px" : `${(1 - reveal) * 60}px`;
  const wordmarkOpacity = reducedMotion ? 0.15 : 0.05 + reveal * 0.12;

  return (
    <footer ref={footerRef} className="border-t border-border overflow-hidden bg-background">
      <div className="wrap flex flex-col gap-8 pt-16 pb-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight focus-visible:outline-offset-4">
            Nextup <span className="font-medium text-muted-foreground">Studio</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Video editing, original music and Minecraft content from Agra, India.
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="wrap border-t border-border/60 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
        <p>© {year} Nextup Studio. All rights reserved.</p>
        <p>Built with precision & craft by Vanshu Agarwal.</p>
      </div>

      {/* Giant Wordmark rising into place at the end (Behavior #5) */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none pb-2 pt-6">
        <div
          className="font-display font-black text-center text-[13.5vw] leading-[0.8] tracking-tighter transition-transform duration-100 ease-out text-foreground will-change-transform"
          style={{
            transform: `translateY(${wordmarkY})`,
            opacity: wordmarkOpacity,
          }}
          aria-hidden="true"
        >
          NEXTUP STUDIO
        </div>
      </div>
    </footer>
  );
};

export default Footer;
