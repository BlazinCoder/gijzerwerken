'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h2 className="font-playfair text-3xl text-cream mb-4">
          Er ging iets mis
        </h2>
        <p className="text-cream/60 mb-8">
          Er is een fout opgetreden bij het laden van deze pagina.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-copper text-iron-900 font-medium rounded-lg hover:bg-copper-light transition-colors"
        >
          Opnieuw proberen
        </button>
      </div>
    </div>
  );
}
