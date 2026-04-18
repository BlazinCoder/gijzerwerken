import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-iron-800 border-t border-iron-700/50">
      {/* Subtle steel texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="block">
            <img
              src="/images/logo-white.png"
              alt="Gijzerwerken"
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Instagram */}
          <a
            href="https://instagram.com/gijzerwerken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm tracking-widest uppercase text-cream/50 hover:text-copper transition-colors duration-300"
          >
            @gijzerwerken
          </a>

          {/* Copyright */}
          <p className="text-sm text-cream/30">
            &copy; {new Date().getFullYear()} Gijzerwerken
          </p>
        </div>
      </div>
    </footer>
  );
}
