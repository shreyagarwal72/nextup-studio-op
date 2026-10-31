import { useEffect, useRef, useState } from "react";

type Service = {
  num: string;
  lane: "video" | "music" | "game";
  title: string;
  description: string;
};

const services: Service[] = [
  {
    num: "01",
    lane: "video",
    title: "Video editing",
    description:
      "Post-production for gaming channels, creative edits and narrative content: cut pacing, sound design, color grading, and final delivery.",
  },
  {
    num: "02",
    lane: "music",
    title: "Music production",
    description:
      "Original rap tracks, melodic hooks, lo-fi beats and cinematic atmosphere, composed and mixed to fit your exact vision.",
  },
  {
    num: "03",
    lane: "game",
    title: "Gaming content",
    description:
      "Minecraft custom builds, mini-game design, immersive cinematic recording, and gameplay highlights tailored for YouTube.",
  },
  {
    num: "04",
    lane: "video",
    title: "Digital storytelling",
    description:
      "Pacing visuals and audio together into a coherent narrative that captures and keeps viewer retention.",
  },
  {
    num: "05",
    lane: "music",
    title: "Creative direction",
    description:
      "Consultation on creative tone, acoustic balance, visual cues and pacing so the final export matches your creative goal.",
  },
  {
    num: "06",
    lane: "game",
    title: "Content creation",
    description:
      "From initial ideation, recording, sound layering and color styling to published assets, executed in a unified studio workflow.",
  },
];

const laneColors: Record<"video" | "music" | "game", string> = {
  video: "bg-lane-video",
  music: "bg-lane-music",
  game: "bg-lane-game",
};

const Services = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    const calculateClosestRow = () => {
      const midY = window.innerHeight / 2;
      let minDistance = Infinity;
      let closest = 0;

      rowRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(midY - rowCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(calculateClosestRow);
    };

    calculateClosestRow();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <section id="services" className="section-y border-t border-border">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="heading-lg">What we make</h2>
          <p className="lead mt-4">
            Six focused ways to collaborate with the studio, from a single post-production cut to end-to-end creative releases.
          </p>
        </div>

        {/* Display-type rows: nearest to screen center is bright, others dim */}
        <ul ref={containerRef} className="mt-14 border-t border-border sm:mt-20">
          {services.map((s, i) => {
            const isHighlight =
              reducedMotion || (hoveredIndex !== null ? hoveredIndex === i : activeIndex === i);

            return (
              <li
                key={s.title}
                ref={(el) => (rowRefs.current[i] = el)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(i)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
                className={`group border-b border-border py-8 sm:py-12 transition-all duration-300 outline-none focus-visible:bg-card/40 ${
                  isHighlight ? "opacity-100" : "opacity-35"
                }`}
              >
                <div className="grid gap-4 md:grid-cols-12 md:gap-8 items-baseline">
                  {/* Row number and lane dot */}
                  <div className="flex items-center gap-4 md:col-span-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-transform duration-300 ${laneColors[s.lane]} ${
                        isHighlight ? "scale-125 shadow-[0_0_8px_currentColor]" : "scale-90 opacity-60"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-sm font-semibold tabular-nums text-muted-foreground">
                      {s.num}
                    </span>
                  </div>

                  {/* Big display title */}
                  <div className="md:col-span-5">
                    <h3
                      className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-colors duration-200 ${
                        isHighlight ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* Clean editorial description */}
                  <div className="md:col-span-5">
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground group-focus-visible:text-foreground">
                      {s.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Services;
