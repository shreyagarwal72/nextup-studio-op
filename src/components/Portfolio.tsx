import { ExternalLink, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const projects = [
    {
      title: "Fire Within",
      category: "Music Production",
      description: "Original rap track with powerful visuals and impactful storytelling",
      link: "https://www.youtube.com/@nextupstudioyt",
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Raat Ka Banda",
      category: "Music Video",
      description: "Lo-fi beats with raw, authentic lyrics and cinematic editing",
      link: "https://www.youtube.com/@nextupstudioyt",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Minecraft Projects",
      category: "Gaming Content",
      description: "Creative builds and interactive gaming experiences",
      link: "https://www.youtube.com/@nextupstudioyt",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Creative Edits",
      category: "Video Editing",
      description: "Professional post-production for various content creators",
      link: "https://www.youtube.com/@nextupstudioyt",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-6 py-2 glass rounded-full mb-4">
            <span className="text-sm font-medium gradient-text">Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of creative projects and see how we bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="glass border-primary/20 overflow-hidden depth-card group animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 glass rounded-full text-xs font-medium mb-2">
                    {project.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                <Button
                  variant="outline"
                  className="glass border-primary/50 hover:bg-primary/10 w-full group/btn"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    View Project
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow"
            asChild
          >
            <a href="https://www.youtube.com/@nextupstudioyt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Youtube />
              View More on YouTube
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
