import { Link } from "react-router-dom";

type Lane = "video" | "music" | "game";
type Clip = { name: string; start: number; width: number; wave?: boolean; ghost?: boolean };

const PLAYHEAD_END = 71; // keep in sync with @keyframes playhead-sweep
const SWEEP_SECONDS = 3.4;

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
  video: "border-lane-video/60 bg-lane-video/20 text-foreground",
  music: "border-lane-music/60 bg-lane-music/15 text-foreground",
  game: "border-lane-game/60 bg-lane-game/15 text-foreground",
};

const waveColor: Record<Lane, string> = {
  video: "bg-lane-video",
  music: "bg-lane-music",
  game: "bg-lane-game",
};

// Deterministic waveform so it never changes between renders.
const bars = (seed: number, count: number) =>
  Array.from({ length: count }, (_, i) => {
    const v = Math.abs(Math.sin(seed * 12.9898 + i * 4.1414) * 43758.5453) % 1;
    return 22 + Math.round(v * 70);
  });

const delayFor = (start: number) => `${((start / PLAYHEAD_END) * SWEEP_SECONDS * 0.9).toFixed(2)}s`;

const HeroTimeline = () => {
  const ticks = ["0:00", "0:30", "1:00", "1:30", "2:00"];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card/80"
      role="img"
      aria-label="A timeline showing Nextup Studio's work: video edits, music tracks and Minecraft projects, plus an empty slot for your project."
    >
      <div className="grid grid-cols-[3.75rem_1fr] sm:grid-cols-[5rem_1fr]">
        {/* Ruler */}
        <div className="border-b border-border" />
        <div className="tl-ruler relative h-8 border-b border-border" aria-hidden="true">
          {ticks.map((t, i) => (
            <span
              key={t}
              className="absolute top-1.5 text-[10px] font-medium tabular-nums text-muted-foreground sm:text-[11px]"
              style={{ left: `${i * 25}%`, transform: i === 0 ? "none" : i === 4 ? "translateX(-100%)" : "translateX(-50%)" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Lanes */}
        {lanes.map((lane, li) => (
          <div key={lane.key} className="contents">
            <div
              className={`flex items-center border-border px-2 text-xs font-semibold text-muted-foreground sm:px-4 sm:text-sm ${
                li < lanes.length - 1 ? "border-b" : ""
              }`}
              aria-hidden="true"
            >
              {lane.label}
            </div>
            <div
              className={`relative h-14 border-border sm:h-16 ${li < lanes.length - 1 ? "border-b" : ""}`}
              aria-hidden="true"
            >
              {lane.clips.map((clip, ci) => {
                const common = {
                  left: `${clip.start}%`,
                  width: `calc(${clip.width}% - 4px)`,
                  animationDelay: delayFor(clip.start),
                };
                if (clip.ghost) {
                  return (
                    <Link
                      key={clip.name}
                      to={{ pathname: "/", hash: "#contact" }}
                      className="tl-clip absolute inset-y-1.5 flex items-center overflow-hidden rounded-md border border-dashed border-signal/70 px-2 text-[11px] font-semibold text-signal transition-colors hover:bg-signal/10 sm:text-xs"
                      style={common}
                      tabIndex={-1}
                    >
                      <span className="truncate">{clip.name}</span>
                    </Link>
                  );
                }
                return (
                  <div
                    key={clip.name + ci}
                    className={`tl-clip absolute inset-y-1.5 overflow-hidden rounded-md border ${laneStyle[lane.key]}`}
                    style={common}
                  >
                    {clip.wave && (
                      <div className="absolute inset-x-1.5 inset-y-1 flex items-center gap-[2px] opacity-50">
                        {bars(clip.name.length + li, 40).map((h, i) => (
                          <span
                            key={i}
                            className={`min-w-0 flex-1 rounded-full ${waveColor[lane.key]}`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    )}
                    <span className="relative z-10 block truncate px-2 pt-1 text-[11px] font-semibold leading-tight sm:text-xs">
                      {clip.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Playhead — sweeps once on load, then rests */}
      <div
        className="pointer-events-none absolute inset-y-0 left-[3.75rem] right-0 sm:left-20"
        aria-hidden="true"
      >
        <div className="tl-playhead absolute inset-y-0 w-px bg-signal" style={{ left: `${PLAYHEAD_END}%` }}>
          <span className="absolute -left-[5px] top-0 h-0 w-0 border-x-[5.5px] border-t-[8px] border-x-transparent border-t-signal" />
        </div>
      </div>
    </div>
  );
};

export default HeroTimeline;
