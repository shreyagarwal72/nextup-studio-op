import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found — Nextup Studio";
  }, []);

  return (
    <div className="flex min-h-svh flex-col">
      <Navigation />
      <main id="main" className="wrap flex flex-1 flex-col justify-center py-32">
        <p className="font-display text-7xl font-extrabold tracking-tight text-signal sm:text-9xl">404</p>
        <h1 className="heading-lg mt-4">This page isn't on the timeline</h1>
        <p className="lead mt-4">The link may be old or mistyped. Head back to the studio home page.</p>
        <Button asChild size="lg" className="mt-8 self-start">
          <Link to="/">Back to home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
