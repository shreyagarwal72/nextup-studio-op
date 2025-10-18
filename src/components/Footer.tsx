import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-primary/20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Nextup Studio. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary animate-pulse" fill="currentColor" />
            <span>by Vanshu Agarwal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
