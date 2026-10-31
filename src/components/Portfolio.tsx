import { ArrowUpRight, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import nightOfShadowsImg from "@/assets/night-of-shadows.jpg";
import raatKaBandaImg from "@/assets/raat-ka-banda.jpg";
import creativeEditsImg from "@/assets/creative-edits.jpg";
import minecraftProjectsImg from "@/assets/minecraft-projects.jpg";
import fireWithinImg from "@/assets/fire-within.jpg";

const CHANNEL = "https://www.youtube.com/@nextupstudioyt";

type Project = {
  title: string;
  category: string;
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
    description: "A chilling Halloween rap track with haunting visuals and atmospheric storytelling.",
    link: "https://youtu.be/koZVuRfa_Gc?si=iuAnVIQBgHvqY3Wk",
    cta: "Watch on YouTube",
    image: nightOfShadowsImg,
    width: 1280,
    height: 720,
  },
  {
    title: "Raat Ka Banda",
    category: "Music video",
    description: "Lo-fi beats with raw, authentic lyrics and cinematic editing.",
    link: "https://youtu.be/xftcj39h-QY?si=MOcYT5nEyL2eqmO3",
    cta: "Watch on YouTube",
    image: raatKaBandaImg,
    width: 1024,
    height: 576,
  },
  {
    title: "Fire Within",
    category: "Music production",
    description: "A powerful rap track with a fiery title treatment.",
    link: CHANNEL,
    cta: "Find it on YouTube",
    image: fireWithinImg,
    width: 1024,
    height: 576,
  },
  {
    title: "Creative Edits",
    category: "Video editing",
    description: "Professional post-production for content creators.",
    link: "https://nextup-hub.vercel.app/",
    cta: "Open project",
    image: creativeEditsImg,
    width: 1024,
    height: 576,
  },
  {
    title: "Minecraft Projects",
    category: "Gaming content",
    description: "Creative builds and interactive gaming experiences.",
    link: "https://nextup-hub-mc.vercel.app/",
    cta: "Open project",
    image: minecraftProjectsImg,
    width: 1024,
    height: 576,
  },
];

const ProjectCard = ({ project, featured }: { project: Project; featured?: boolean }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/70 ${
      featured ? "lg:col-span-2" : ""
    }`}
  >
    <div className={`relative overflow-hidden ${featured ? "aspect-video lg:aspect-[2/1]" : "aspect-video"}`}>
      <img
        src={project.image}
        alt=""
        width={project.width}
        height={project.height}
        loading={featured ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
    <div className="flex flex-1 flex-col p-5 sm:p-6">
      <p className="text-sm font-medium text-muted-foreground">{project.category}</p>
      <h3 className={`mt-1.5 font-bold tracking-tight ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{project.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {project.cta}
        <ArrowUpRight
          className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        <span className="sr-only">(opens in a new tab)</span>
      </span>
    </div>
  </a>
);

const Portfolio = () => (
  <section id="portfolio" className="section-y border-t border-border">
    <div className="wrap">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="heading-lg">Selected work</h2>
          <p className="lead mt-4">Music, videos and Minecraft projects from the studio.</p>
        </div>
        <Button asChild variant="outline" className="self-start sm:self-auto">
          <a href={CHANNEL} target="_blank" rel="noopener noreferrer">
            <Youtube aria-hidden="true" />
            More on YouTube
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Button>
      </div>

      <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} featured={i === 0} />
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
