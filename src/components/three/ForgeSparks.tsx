"use client";

import { useMemo } from "react";

// Vaste seed (mulberry32): server-prerender en client geven dezelfde vonken,
// dus geen hydration-mismatch op de inline-stijlen.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ForgeSparks() {
  const sparks = useMemo(() => {
    const random = mulberry32(0x6a1e);
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: random() * 100,
      delay: random() * 8,
      duration: 3 + random() * 3,
      xDrift: (random() - 0.5) * 160,
      size: 2 + random() * 2,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {sparks.map((s) => (
        <span
          key={s.id}
          className="forge-spark"
          style={{
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            // @ts-expect-error custom CSS variable
            "--x-drift": `${s.xDrift}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
      <style jsx>{`
        .forge-spark {
          position: absolute;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            #e8a849 0%,
            #c47a2a 50%,
            transparent 100%
          );
          box-shadow:
            0 0 8px #c47a2a,
            0 0 16px rgba(232, 168, 73, 0.6);
          animation: rise-and-fade ease-out infinite;
          pointer-events: none;
        }
        @keyframes rise-and-fade {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          70% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) translateX(var(--x-drift)) scale(0.3);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .forge-spark {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
