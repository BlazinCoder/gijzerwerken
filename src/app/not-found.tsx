import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-playfair text-8xl md:text-9xl text-copper/30">
        404
      </h1>
      <h2 className="mt-4 font-playfair text-2xl md:text-3xl text-cream">
        Deze pagina is nog in de smederij
      </h2>
      <p className="mt-4 text-cream/50 max-w-md">
        Het lijkt erop dat deze pagina niet bestaat — of nog gesmeed moet
        worden.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm tracking-widest uppercase text-copper hover:text-copper-light transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        Terug naar de werkplaats
      </Link>
    </div>
  );
}
