import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="glass rounded-3xl p-12 md:p-16 max-w-4xl mx-auto depth-card animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 glass rounded-full mb-4">
                <span className="text-sm font-medium gradient-text">About Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet <span className="gradient-text">Vanshu Agarwal</span>
              </h2>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Vanshu Agarwal is a passionate creative professional specializing in video editing, music production, and digital content creation. With a unique blend of technical expertise and artistic vision, Nextup Studio transforms ideas into engaging digital experiences.
              </p>
              <p>
                As a Class 11 PCM Science student, Vanshu balances academics with creative pursuits, demonstrating dedication to both intellectual growth and artistic expression. His work spans multiple disciplines including post-production workflows for gaming content, original music production, and innovative Minecraft projects.
              </p>
              <p>
                Whether it's crafting powerful rap tracks like "Fire Within" and "Raat Ka Banda," creating immersive gaming content, or delivering professional video editing services, Nextup Studio combines creativity with technology to produce exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
