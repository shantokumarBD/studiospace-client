import { Suspense } from "react";
import { getAllStudios } from "@/lib/api";
import StudiosExplorer from "@/components/Studios/StudiosExplorer";

export default async function StudiosPage() {
  const studios = await getAllStudios();

  return (
    <main className="min-h-screen bg-film-black">
      <Suspense
        fallback={
          <div className="py-24 text-center text-text-muted font-mono text-sm">
            Loading Calibrated Studios...
          </div>
        }
      >
        <StudiosExplorer initialStudios={studios} />
      </Suspense>
    </main>
  );
}