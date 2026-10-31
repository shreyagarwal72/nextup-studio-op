import { Link } from "react-router-dom";

const links = [
  { label: "About", to: { pathname: "/", hash: "#about" } },
  { label: "Services", to: { pathname: "/", hash: "#services" } },
  { label: "Work", to: { pathname: "/", hash: "#portfolio" } },
  { label: "Contact", to: { pathname: "/", hash: "#contact" } },
  { label: "AI Assistant", to: "/ai" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="wrap flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl font-extrabold tracking-tight">
            Nextup <span className="font-medium text-muted-foreground">Studio</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Video, music and gaming content from Agra, India.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="wrap py-5 text-xs text-muted-foreground">© {year} Nextup Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
