import { useEffect, useRef, useState } from "react";

const STATEMENT =
  "Nextup Studio is Vanshu Agarwal's creative studio in Agra. We shape video, original music and Minecraft worlds from first cut to final export — turning raw ideas into stories people replay.";

const facts = [
  { term: "Based in", detail: "Agra, Uttar Pradesh, India" },
  { term: "Founder", detail: "Vanshu Agarwal" },
  { term: "Studying", detail: "Class 12, PCM Science" },
  { term: "Focus", detail: "Video editing, music & gaming" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const words = STATEMENT.split(" ");

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
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start lighting up when top is at 80% of window, fully illuminated by 25%
      const start = vh * 0.8;
      const end = vh * 0.25;
      const current = rect.top;

      const p = Math.max(0, Math.min(1, (start - current) / (start - end)));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="section-y border-t border-border">
      <div className="wrap space-y-16 sm:space-y-24">
        {/* Large editorial statement whose words light up as you scroll */}
        <div className="max-w-4xl">
          <p
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.25] tracking-tight"
            aria-label={STATEMENT}
          >
            {words.map((word, i) => {
              const isLit = reducedMotion || i / words.length <= progress;
              return (
                <span
                  key={`${word}-${i}`}
                  className="transition-colors duration-200 inline-block mr-[0.28em]"
                  style={{
                    color: isLit
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground) / 0.25)",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* Factual studio details & context */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="heading-lg">Meet Vanshu</h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {facts.map((f) => (
                <div key={f.term} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-sm text-muted-foreground">{f.term}</dt>
                  <dd className="text-right text-sm font-medium sm:text-base text-foreground">
                    {f.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-6 text-base leading-[1.75] text-muted-foreground sm:text-lg lg:col-span-7">
            <p className="max-w-[62ch]">
              Vanshu is a creator who edits video, produces music and builds in Minecraft. Nextup Studio is where those
              crafts meet: ideas turn into finished videos, tracks and worlds designed to grab attention and hold it.
            </p>
            <p className="max-w-[62ch]">
              He is currently a Class 12 PCM Science student in Agra. Studio work runs alongside academics, spanning post-production
              for gaming creators, original music compositions, and custom Minecraft projects.
            </p>
            <p className="max-w-[62ch]">
              Featured releases include tracks like <span className="font-medium text-foreground">Fire Within</span> and{" "}
              <span className="font-medium text-foreground">Raat Ka Banda</span>, atmospheric Halloween edits, and high-energy gameplay narratives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
