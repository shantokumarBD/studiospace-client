import ModernLoader from "@/components/Shared/ModernLoader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-film-black flex items-center justify-center">
      <ModernLoader
        size="fullscreen"
        text="Calibrating Production Stage..."
        subtext="FETCHING SOUNDSTAGE TELEMETRY // 24 FPS SYNC"
      />
    </main>
  );
}

