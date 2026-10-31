import { Video, Music, Gamepad2, Film, Pencil, Sparkles } from "lucide-react";

const services = [
  {
    icon: Video,
    title: "Video editing",
    description:
      "Post-production for gaming content, vlogs and creative projects: cuts, pacing, color, sound and final export.",
  },
  {
    icon: Music,
    title: "Music production",
    description: "Original rap tracks, lo-fi beats and soundscapes, written and produced to fit your project.",
  },
  {
    icon: Gamepad2,
    title: "Gaming content",
    description: "Minecraft builds, gameplay highlights and finished gaming videos, filmed and edited.",
  },
  {
    icon: Film,
    title: "Digital storytelling",
    description: "Visuals and audio shaped into a narrative that holds attention from the first second.",
  },
  {
    icon: Pencil,
    title: "Content creation",
    description: "End-to-end production: concept, shoot or build, edit and delivery in one workflow.",
  },
  {
    icon: Sparkles,
    title: "Creative direction",
    description: "Guidance on look, sound and structure so your project lands the way you picture it.",
  },
];

const Services = () => (
  <section id="services" className="section-y border-t border-border">
    <div className="wrap">
      <div className="max-w-2xl">
        <h2 className="heading-lg">What we make</h2>
        <p className="lead mt-4">Six ways to work with the studio, from a single edit to a full production.</p>
      </div>

      <ul className="mt-12 border-t border-border sm:mt-16">
        {services.map((s) => (
          <li
            key={s.title}
            className="grid gap-3 border-b border-border py-7 transition-colors hover:bg-card/60 sm:grid-cols-12 sm:gap-8 sm:px-4 sm:py-8"
          >
            <div className="flex items-center gap-4 sm:col-span-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary-foreground">
                <s.icon className="h-5 w-5 text-lane-video" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{s.title}</h3>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:col-span-7 sm:pt-1.5">{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Services;
