import { Suspense } from "react";
import { getAllStudios } from "@/lib/api";
import StudiosExplorer from "@/components/Studios/StudiosExplorer";
import ModernLoader from "@/components/Shared/ModernLoader";

async function StudiosData() {
  const studios = await getAllStudios();
  return <StudiosExplorer initialStudios={studios} />;
}

export default function StudiosPage() {
  return (
    <main className="min-h-screen bg-film-black">
      <Suspense
        fallback={
          <ModernLoader
            size="lg"
            text="Calibrating Studio Catalog..."
            subtext="SYNCING REALTIME AVAILABILITY & RATES"
          />
        }
      >
        <StudiosData />
      </Suspense>
    </main>
  );
}
