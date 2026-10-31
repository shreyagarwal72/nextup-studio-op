import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroTimeline from "@/components/HeroTimeline";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* Studio photo, dimmed into the page. Not fixed-attached (breaks on iOS). */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      </div>

      <div className="wrap">
        <h1 className="heading-xl max-w-[15ch] sm:max-w-[18ch]">
          We cut the video, write the track and build the world.
        </h1>

        <p className="lead mt-6 sm:mt-8">
          Nextup Studio is Vanshu Agarwal's creative studio in Agra. Video editing, original music and Minecraft
          content, from the first idea to the final export.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
          <Button asChild size="lg">
            <Link to={{ pathname: "/", hash: "#portfolio" }}>See the work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to={{ pathname: "/", hash: "#contact" }}>Start a project</Link>
          </Button>
        </div>

        <div className="mt-14 sm:mt-20">
          <HeroTimeline />
        </div>
      </div>
    </section>
  );
};

export default Hero;
