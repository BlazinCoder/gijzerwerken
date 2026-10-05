"use client";

// CSS-vonken rond het hero-logo, zonder Three.js.
// - Touch / smal scherm (alles wat geen WebGL-vonken krijgt): 12 rustig opstijgende vonkjes.
// - prefers-reduced-motion: 7 vaste, zachte gloeipunten, geen beweging.
// Zichtbaarheid loopt via media queries, zodat de juiste variant al in de
// geprerenderde HTML klopt. Posities staan vast (geen Math.random): server en
// client renderen hetzelfde.

// [links %, boven %, grootte px, duur s, vertraging s, drift px, stijging px]
// Vertragingen binnen 0,4–1,5 s: de hero staat maar 2 s in beeld vóór de doorsturing.
const EMBERS: [number, number, number, number, number, number, number][] = [
  [18, 62, 3.5, 3.4, 0.4, -14, 70],
  [30, 78, 3, 4.2, 1.0, 10, 58],
  [44, 70, 4, 3.0, 0.6, -6, 80],
  [56, 80, 3, 3.8, 1.3, 12, 64],
  [70, 66, 3.5, 3.2, 0.8, 16, 74],
  [82, 58, 3, 4.4, 1.5, -10, 56],
  [24, 44, 3, 3.6, 1.1, -18, 50],
  [76, 40, 3, 3.9, 0.5, 14, 48],
  [38, 86, 3.5, 4.0, 1.4, -8, 70],
  [62, 88, 3, 3.5, 0.9, 6, 62],
  [12, 74, 3, 4.6, 1.2, -12, 46],
  [88, 76, 3.5, 3.7, 0.7, 10, 54],
];

// [links %, boven %, grootte px, opacity]
const GLOW_POINTS: [number, number, number, number][] = [
  [10, 52, 6, 0.55],
  [22, 20, 5, 0.45],
  [50, 6, 5.5, 0.5],
  [80, 18, 5, 0.45],
  [92, 54, 6, 0.55],
  [70, 90, 5.5, 0.5],
  [30, 92, 5, 0.45],
];

export default function HeroEmbers() {
  return (
    <div
      className="hero-embers absolute pointer-events-none"
      aria-hidden="true"
    >
      {EMBERS.map(([left, top, size, duration, delay, drift, rise], i) => (
        <span
          key={`e${i}`}
          className="hero-ember"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            // @ts-expect-error custom CSS variables
            "--ember-drift": `${drift}px`,
            "--ember-rise": `${-rise}px`,
          }}
        />
      ))}
      {GLOW_POINTS.map(([left, top, size, opacity], i) => (
        <span
          key={`g${i}`}
          className="hero-glowpoint"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
          }}
        />
      ))}
      <style jsx>{`
        .hero-embers {
          left: -25%;
          right: -25%;
          top: -25%;
          bottom: -25%;
        }
        .hero-ember,
        .hero-glowpoint {
          position: absolute;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .hero-ember {
          background: radial-gradient(circle, #fff1cf 0%, #e8a849 45%, rgba(196, 122, 42, 0) 100%);
          box-shadow: 0 0 6px rgba(232, 168, 73, 0.6);
          opacity: 0;
          animation-name: ember-rise;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
          animation-fill-mode: backwards;
        }
        .hero-glowpoint {
          display: none;
          background: radial-gradient(circle, #f5c96b 0%, #c47a2a 60%, rgba(196, 122, 42, 0) 100%);
          box-shadow: 0 0 10px 3px rgba(196, 122, 42, 0.4);
        }
        @keyframes ember-rise {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 0;
          }
          18% {
            opacity: 0.85;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--ember-drift), var(--ember-rise)) scale(0.4);
            opacity: 0;
          }
        }
        /* Desktop met muis krijgt de WebGL-vonken */
        @media (min-width: 768px) and (hover: hover) {
          .hero-ember {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-ember {
            display: none;
          }
          .hero-glowpoint {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
