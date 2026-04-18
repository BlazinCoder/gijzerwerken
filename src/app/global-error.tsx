'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="nl">
      <body className="bg-[#0a0a0a]">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h2 className="text-3xl text-[#f5f0eb] mb-4" style={{ fontFamily: 'serif' }}>
              Er ging iets mis
            </h2>
            <p className="text-[#f5f0eb]/60 mb-8">
              Er is een onverwachte fout opgetreden.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#c47a2a] text-[#0a0a0a] font-medium rounded-lg hover:bg-[#e8a849] transition-colors"
            >
              Opnieuw proberen
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
