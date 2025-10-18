import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
        <div className="inline-block px-6 py-2 glass rounded-full mb-8">
          <span className="text-sm font-medium gradient-text">Professional Creative Services</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Nextup Studio</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          Where Creativity Meets Technology
        </p>

        <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
          Professional video editing, music production, and digital storytelling that brings your vision to life.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 text-lg px-8 py-6 glow group"
            asChild
          >
            <a href="#portfolio" className="flex items-center gap-2">
              View Our Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="glass border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 group"
            asChild
          >
            <a href="https://www.youtube.com/@nextupstudioyt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Play className="group-hover:scale-110 transition-transform" />
              Watch Demo
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "3+" },
            { label: "Awards Won", value: "5+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-6 depth-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
