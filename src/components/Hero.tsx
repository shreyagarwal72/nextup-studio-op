import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Dark Overlay */}
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl pt-20 animate-fade-in">
        {/* Slogan Badge */}
        <div className="mb-12">
          <p className="text-sm md:text-base text-muted-foreground tracking-widest uppercase">
            Nextup Studio — Where Creativity Meets Technology
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight uppercase">
          <span className="text-foreground">Your New Home</span>
          <br />
          <span className="text-foreground">For Creativity &</span>
          <br />
          <span className="text-foreground">Innovation</span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          A space for creators, dreamers, and tech minds to connect, build, and grow together. 
          All backgrounds and abilities are welcomed and treated as one of our own.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <Button
            size="lg"
            className="min-w-[200px] bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-scale transition-all duration-300 glow"
            asChild
          >
            <a href="#contact">Join Us</a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] glass border-primary/30 hover:bg-primary/10 hover-scale transition-all duration-300"
            asChild
          >
            <a href="#portfolio">Explore Projects</a>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "3+" },
            { label: "Awards Won", value: "5+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in glass rounded-2xl p-6 hover-scale transition-all duration-300 cursor-default"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
