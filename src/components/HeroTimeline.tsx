import { Link } from "react-router-dom";

type Lane = "video" | "music" | "game";
type Clip = { name: string; start: number; width: number; wave?: boolean; ghost?: boolean };

const lanes: { key: Lane; label: string; clips: Clip[] }[] = [
  {
    key: "video",
    label: "Video",
    clips: [
      { name: "Creative Edits", start: 0, width: 32 },
      { name: "Raat Ka Banda", start: 34, width: 34 },
      { name: "Your project", start: 72, width: 28, ghost: true },
    ],
  },
  {
    key: "music",
    label: "Music",
    clips: [
      { name: "The Night of Shadows", start: 4, width: 38, wave: true },
      { name: "Raat Ka Banda", start: 44, width: 26, wave: true },
      { name: "Fire Within", start: 72, width: 28, wave: true },
    ],
  },
  {
    key: "game",
    label: "Games",
    clips: [{ name: "Minecraft Projects", start: 0, width: 48 }],
  },
];

const laneStyle: Record<Lane, string> = {
  video: "border-lane-video/70 bg-lane-video/20 text-foreground",
  music: "border-lane-music/70 bg-lane-music/15 text-foreground",
  game: "border-lane-game/70 bg-lane-game/15 text-foreground",
};

const waveColor: Record<Lane, string> = {
  video: "bg-lane-video",
  music: "bg-lane-music",
  game: "bg-lane-game",
};

// Deterministic waveform so it never shifts
const bars = (seed: number, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const v = Math.abs(Math.sin(seed * 12.9898 + i * 4.1414) * 43758.5453) % 1;
    return 22 + Math.round(v * 70);
  });

interface HeroTimelineProps {
  /** 0 to 1 scroll scrubber position */
  progress?: number;
  reducedMotion?: boolean;
}

const HeroTimeline = ({ progress = 0.72, reducedMotion = false }: HeroTimelineProps) => {
  const ticks = ["0:00", "0:30", "1:00", "1:30", "2:00"];
  // If reduced motion, show full timeline with playhead resting at 72%
  const currentPct = reducedMotion ? 72 : Math.max(0, Math.min(100, progress * 100));

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card/85 backdrop-blur-sm select-none shadow-xl"
      role="img"
      aria-label="Interactive timeline showing Nextup Studio's creative projects: video editing, music tracks and Minecraft builds."
    >
      <div className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr]">
        {/* Ruler header */}
        <div className="border-b border-border bg-muted/20" />
        <div className="tl-ruler relative h-8 border-b border-border bg-muted/10" aria-hidden="true">
          {ticks.map((t, i) => (
            <span
              key={t}
              className="absolute top-1.5 text-[10px] font-medium tabular-nums text-muted-foreground sm:text-[11px]"
              style={{
                left: `${i * 25}%`,
                transform: i === 0 ? "none" : i === 4 ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Lanes */}
        {lanes.map((lane, li) => (
          <div key={lane.key} className="contents">
            <div
              className={`flex items-center border-border px-2 text-[11px] font-semibold text-muted-foreground sm:px-4 sm:text-xs uppercase tracking-wider ${
                li < lanes.length - 1 ? "border-b" : ""
              }`}
              aria-hidden="true"
            >
              {lane.label}
            </div>
            <div
              className={`relative h-12 border-border sm:h-15 ${
                li < lanes.length - 1 ? "border-b" : ""
              }`}
              aria-hidden="true"
            >
              {lane.clips.map((clip, ci) => {
                const isActive = reducedMotion || currentPct >= clip.start;
                const common = {
                  left: `${clip.start}%`,
                  width: `calc(${clip.width}% - 4px)`,
                };

                if (clip.ghost) {
                  return (
                    <Link
                      key={clip.name}
                      to={{ pathname: "/", hash: "#contact" }}
                      tabIndex={0}
                      className={`group absolute top-1.5 bottom-1.5 flex items-center justify-center rounded-lg border border-dashed border-signal/70 bg-signal/10 px-2 text-center text-xs font-semibold text-foreground transition-all duration-300 focus-visible:outline-offset-2 hover:bg-signal/20 hover:border-signal ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                      style={common}
                      aria-label="Start your project with Nextup Studio"
                    >
                      <span className="truncate group-hover:underline">
                        + Your project
                      </span>
                    </Link>
                  );
                }

                return (
                  <div
                    key={clip.name}
                    className={`absolute top-1.5 bottom-1.5 overflow-hidden rounded-lg border px-2.5 sm:px-3 text-xs font-medium transition-all duration-300 flex items-center ${
                      laneStyle[lane.key]
                    } ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                    style={common}
                  >
                    {/* Audio waveform illustration */}
                    {clip.wave && (
                      <div
                        className="pointer-events-none absolute inset-x-2 bottom-1 top-1 flex items-center justify-between gap-[2px] opacity-25"
                        aria-hidden="true"
                      >
                        {bars(ci + li * 5, 24).map((h, bi) => (
                          <span
                            key={bi}
                            className={`w-[2px] rounded-full ${waveColor[lane.key]}`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    )}
                    <span className="relative z-10 truncate text-[11px] sm:text-xs font-semibold">
                      {clip.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Scrubbing Playhead (coral signal) */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-30 transition-all duration-75"
        style={{ left: `calc(${3.5}rem + (100% - ${3.5}rem) * ${currentPct / 100})` }}
        aria-hidden="true"
      >
        <div className="relative h-full w-[2px] bg-signal shadow-[0_0_12px_rgba(255,90,95,0.8)]">
          {/* Top playhead indicator badge */}
          <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-signal" />
        </div>
      </div>
    </div>
  );
};

export default HeroTimeline;
