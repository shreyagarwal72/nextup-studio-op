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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center max-w-6xl pt-28 sm:pt-32 pb-16 sm:pb-20 animate-fade-in">
        {/* Slogan Badge */}
        <div className="mb-6 sm:mb-12">
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground tracking-widest uppercase">
            Nextup Studio — Where Creativity Meets Technology
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight tracking-tight uppercase break-words">
          <span className="text-foreground">Your New Home</span>
          <br />
          <span className="text-foreground">For Creativity &</span>
          <br />
          <span className="text-foreground">Innovation</span>
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
          A space for creators, dreamers, and tech minds to connect, build, and grow together. 
          All backgrounds and abilities are welcomed and treated as one of our own.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-sm sm:max-w-none mx-auto animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <Button
            size="lg"
            className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-scale transition-all duration-300 glow py-6"
            asChild
          >
            <a href="#contact">Join Us</a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto min-w-[180px] sm:min-w-[200px] glass border-primary/30 hover:bg-primary/10 hover-scale transition-all duration-300 py-6"
            asChild
          >
            <a href="#portfolio">Explore Projects</a>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {[
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Experience", value: "3+" },
            { label: "Awards Won", value: "5+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover-scale transition-all duration-300 cursor-default"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-bold gradient-text mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
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
