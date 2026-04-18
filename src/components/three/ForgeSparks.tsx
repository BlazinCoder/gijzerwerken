"use client";

import { useMemo } from "react";

export default function ForgeSparks() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 3 + Math.random() * 3,
        xDrift: (Math.random() - 0.5) * 160,
        size: 2 + Math.random() * 2,
      })),
    []
  );

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
