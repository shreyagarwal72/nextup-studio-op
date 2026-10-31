import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroTimeline from "@/components/HeroTimeline";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMqChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMqChange);
    return () => mq.removeEventListener("change", onMqChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
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
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  // Lead text and CTAs fade out as user scrolls past first 28% of section
  const leadOpacity = reducedMotion ? 1 : Math.max(0, 1 - scrollProgress * 3.5);
  const leadTransform = reducedMotion ? "none" : `translateY(${scrollProgress * 20}px)`;
  const photoParallax = reducedMotion ? "none" : `translateY(${scrollProgress * 15}%)`;

  return (
    <section
      id="home"
      ref={containerRef}
      className={`relative ${
        reducedMotion ? "py-20 sm:py-28" : "min-h-[260svh] sm:min-h-[280svh]"
      }`}
    >
      <div
        className={`${
          reducedMotion
            ? "relative"
            : "sticky top-0 h-svh max-h-svh w-full overflow-hidden flex flex-col justify-between pt-18 pb-4 sm:pt-22 sm:pb-8"
        }`}
      >
        {/* Studio photo background drifting slower than page */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            className="h-full w-full object-cover opacity-25 will-change-transform scale-105"
            style={{ transform: photoParallax }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        </div>

        <div className="wrap flex-1 flex flex-col justify-between max-w-6xl">
          {/* Top text block: Headline stays pinned */}
          <div className="mt-2 sm:mt-4">
            <h1 className="heading-xl max-w-[15ch] sm:max-w-[18ch] text-balance">
              We cut the video, write the track and build the world.
            </h1>

            {/* Lead text and CTAs fade out as user scrolls */}
            <div
              className="transition-opacity duration-100 ease-out will-change-transform"
              style={{
                opacity: leadOpacity,
                transform: leadTransform,
                pointerEvents: leadOpacity < 0.1 ? "none" : "auto",
              }}
            >
              <p className="lead mt-3 sm:mt-5 max-w-[54ch] text-sm sm:text-base lg:text-lg">
                Nextup Studio is Vanshu Agarwal's creative studio in Agra. Video editing, original music and Minecraft
                content, from the first cut to the final export.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6">
                <Button asChild size="default" className="shadow-lg">
                  <Link to={{ pathname: "/", hash: "#portfolio" }}>See the work</Link>
                </Button>
                <Button asChild size="default" variant="outline">
                  <Link to={{ pathname: "/", hash: "#contact" }}>Start a project</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive timeline at bottom of pinned viewport */}
          <div className="mb-2 sm:mb-4 pt-4">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
                Timeline Scrub
              </span>
              <span className="tabular-nums font-mono text-[11px]">
                {reducedMotion
                  ? "01:30"
                  : `0${Math.floor(scrollProgress * 2)}:${String(
                      Math.floor((scrollProgress * 120) % 60)
                    ).padStart(2, "0")}`}
              </span>
            </div>
            <HeroTimeline progress={scrollProgress} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
