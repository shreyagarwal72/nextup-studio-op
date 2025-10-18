import { Video, Music, Gamepad2, Film, Pencil, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional post-production workflows for gaming content, vlogs, and creative projects with industry-standard tools.",
    },
    {
      icon: Music,
      title: "Music Production",
      description: "Original rap tracks, lo-fi beats, and creative soundscapes that bring your audio vision to life.",
    },
    {
      icon: Gamepad2,
      title: "Gaming Content",
      description: "Minecraft builds, gameplay highlights, and entertaining gaming content creation and editing.",
    },
    {
      icon: Film,
      title: "Digital Storytelling",
      description: "Combining visual and audio elements to create engaging narratives that captivate your audience.",
    },
    {
      icon: Pencil,
      title: "Content Creation",
      description: "End-to-end content creation services from concept development to final delivery.",
    },
    {
      icon: Sparkles,
      title: "Creative Direction",
      description: "Strategic creative guidance to ensure your projects achieve maximum impact and engagement.",
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-6 py-2 glass rounded-full mb-4">
            <span className="text-sm font-medium gradient-text">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive creative solutions tailored to your unique vision and goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="glass border-primary/20 depth-card group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 glow group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
