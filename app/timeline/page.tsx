"use client";

import Timeline from "@/components/timeline/Timeline";
import { useMemories } from "@/hooks/useMemories";

export default function TimelinePage() {
  const { memories, loading, error } = useMemories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        Línea de tiempo
      </h1>
      <p className="mt-2 text-center text-gray-500">
        Vuestra historia, momento a momento.
      </p>

      {loading && (
        <p className="py-16 text-center text-gray-400">Cargando recuerdos...</p>
      )}
      {error && <p className="py-16 text-center text-red-500">{error}</p>}
      {!loading && !error && <Timeline memories={memories} />}
    </div>
  );
}
