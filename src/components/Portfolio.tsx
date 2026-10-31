import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Youtube } from "lucide-react";
import nightOfShadowsImg from "@/assets/night-of-shadows.jpg";
import raatKaBandaImg from "@/assets/raat-ka-banda.jpg";
import creativeEditsImg from "@/assets/creative-edits.jpg";
import minecraftProjectsImg from "@/assets/minecraft-projects.jpg";
import fireWithinImg from "@/assets/fire-within.jpg";

const CHANNEL = "https://www.youtube.com/@nextupstudioyt";

type Project = {
  title: string;
  category: string;
  lane: "video" | "music" | "game";
  description: string;
  link: string;
  cta: string;
  image: string;
  width: number;
  height: number;
};

const projects: Project[] = [
  {
    title: "The Night of Shadows",
    category: "Music production",
    lane: "music",
    description: "Atmospheric Halloween rap release with eerie visual tones and cinematic sound layering.",
    link: "https://youtu.be/koZVuRfa_Gc?si=iuAnVIQBgHvqY3Wk",
    cta: "Watch on YouTube",
    image: nightOfShadowsImg,
    width: 1280,
    height: 720,
  },
  {
    title: "Raat Ka Banda",
    category: "Music video",
    lane: "music",
    description: "Lo-fi urban hip-hop cut pairing reflective lyricism with raw nighttime post-production.",
    link: "https://youtu.be/xftcj39h-QY?si=MOcYT5nEyL2eqmO3",
    cta: "Watch on YouTube",
    image: raatKaBandaImg,
    width: 1024,
    height: 576,
  },
  {
    title: "Fire Within",
    category: "Original track",
    lane: "music",
    description: "High-intensity rap track featuring energetic rhythm and custom cover typography.",
    link: CHANNEL,
    cta: "Find on YouTube",
    image: fireWithinImg,
    width: 1024,
    height: 576,
  },
  {
    title: "Creative Edits",
    category: "Video editing",
    lane: "video",
    description: "Full post-production pipeline for creators: jump-cut timing, SFX layering, and color grading.",
    link: "https://nextup-hub.vercel.app/",
    cta: "Open project hub",
    image: creativeEditsImg,
    width: 1024,
    height: 576,
  },
  {
    title: "Minecraft Projects",
    category: "Gaming content",
    lane: "game",
    description: "Custom architecture, obstacle gameplay, and scripted storytelling built in Minecraft.",
    link: CHANNEL,
    cta: "Explore channel",
    image: minecraftProjectsImg,
    width: 1024,
    height: 576,
  },
];

const laneColors: Record<"video" | "music" | "game", string> = {
  video: "text-lane-video border-lane-video/40 bg-lane-video/10",
  music: "text-lane-music border-lane-music/40 bg-lane-music/10",
  game: "text-lane-game border-lane-game/40 bg-lane-game/10",
};

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScrollDist, setMaxScrollDist] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Calculate track overflow for horizontal scrubbing
  useEffect(() => {
    if (reducedMotion) return;

    const measure = () => {
      if (!trackRef.current) return;
      const totalWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setMaxScrollDist(Math.max(0, totalWidth - viewportWidth + 64));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reducedMotion]);

  // Sync vertical scroll to horizontal track position
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setScrollProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  // Bring card into view when focused via keyboard
  const handleCardFocus = (index: number) => {
    if (reducedMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const targetProgress = index / (projects.length - 1);
    const targetY = window.scrollY + rect.top + targetProgress * scrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const trackTranslate = reducedMotion ? 0 : -(scrollProgress * maxScrollDist);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={`border-t border-border ${
        reducedMotion ? "section-y" : "relative min-h-[300vh] sm:min-h-[340vh]"
      }`}
    >
      {/* If reduced motion is requested, render normal responsive grid */}
      {reducedMotion ? (
        <div className="wrap">
          <div className="flex flex-col gap-3">
            <h2 className="heading-lg">Selected Work</h2>
            <p className="lead">Featured video edits, original music tracks and Minecraft builds.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${laneColors[p.lane]}`}>
                    {p.category}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    {p.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* Pinned horizontal scrubber section (Behavior #4) */
        <div className="sticky top-0 h-screen max-h-screen overflow-hidden flex flex-col justify-center py-8">
          {/* Section header and progress bar */}
          <div className="wrap mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="heading-lg">Selected Work</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Scroll vertically to scrub through projects
              </p>
            </div>

            {/* Thin progress line for the work track */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {String(Math.min(projects.length, Math.floor(scrollProgress * (projects.length - 1)) + 1)).padStart(2, "0")} / 0{projects.length}
              </span>
              <div className="h-[2px] w-36 sm:w-48 bg-border rounded-full overflow-hidden" aria-hidden="true">
                <div
                  className="h-full bg-signal origin-left transition-transform duration-75"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                />
              </div>
            </div>
          </div>

          {/* Horizontal Track of Project Cards */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-10 px-6 sm:px-16 will-change-transform transition-transform duration-75 ease-out"
            style={{ transform: `translateX(${trackTranslate}px)` }}
          >
            {projects.map((p, i) => {
              // Card inner parallax calculation
              const cardOffset = scrollProgress - i / (projects.length - 1);
              const imgParallax = `${cardOffset * -36}px`;

              return (
                <article
                  key={p.title}
                  onFocus={() => handleCardFocus(i)}
                  className="group relative w-[82vw] sm:w-[480px] md:w-[540px] shrink-0 rounded-2xl border border-border bg-card/90 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-border/90 focus-within:ring-2 focus-within:ring-primary focus-within:outline-none"
                >
                  {/* Card Image with Parallax Mask */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                    <img
                      src={p.image}
                      alt={p.title}
                      width={p.width}
                      height={p.height}
                      loading="lazy"
                      className="h-full w-full object-cover will-change-transform scale-110 transition-transform duration-200"
                      style={{ transform: `scale(1.12) translateX(${imgParallax})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Card metadata */}
                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        laneColors[p.lane]
                      }`}
                    >
                      {p.category}
                    </span>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-offset-2"
                    >
                      <span>{p.cta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
