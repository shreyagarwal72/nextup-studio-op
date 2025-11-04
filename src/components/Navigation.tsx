import { useState, useEffect } from "react";
import { Menu, X, MapPin, Calendar, MessageSquare, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAIPage = location.pathname === "/ai";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
  ];

  const utilityLinks = [
    { href: "#portfolio", label: "Projects", icon: MapPin },
    { href: "#services", label: "Services", icon: Calendar },
    { href: "#contact", label: "Contact", icon: MessageSquare },
    { href: "#contact", label: "Join Us", icon: UserPlus },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Top utility bar */}
        <div className="hidden lg:flex items-center justify-end gap-8 py-3 border-b border-border/30">
          {utilityLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <link.icon size={16} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-6">
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">NEXTUP</span>
              <div className="text-xs text-muted-foreground tracking-widest">STUDIO</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {!isAIPage && (
              <>
                <a href="#home" className="text-foreground hover:text-muted-foreground transition-colors text-sm tracking-wide">
                  Home
                </a>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-muted-foreground transition-colors text-sm tracking-wide"
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
            {isAIPage && (
              <Link to="/" className="text-foreground hover:text-muted-foreground transition-colors text-sm tracking-wide">
                Home
              </Link>
            )}
            <Link 
              to="/ai" 
              className={`text-foreground hover:text-muted-foreground transition-colors text-sm tracking-wide ${isAIPage ? 'gradient-text font-medium' : ''}`}
            >
              AI Assistant
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            {!isAIPage && (
              <>
                <a
                  href="#home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-muted-foreground transition-colors py-2"
                >
                  Home
                </a>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground hover:text-muted-foreground transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </>
            )}
            {isAIPage && (
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-muted-foreground transition-colors py-2"
              >
                Home
              </Link>
            )}
            <Link
              to="/ai"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-foreground hover:text-muted-foreground transition-colors py-2 ${isAIPage ? 'gradient-text font-medium' : ''}`}
            >
              AI Assistant
            </Link>
            {!isAIPage && (
              <div className="pt-4 space-y-2">
                {utilityLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <link.icon size={16} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
