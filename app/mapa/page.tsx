"use client";

import dynamic from "next/dynamic";
import { useMemories } from "@/hooks/useMemories";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] w-full items-center justify-center rounded-3xl bg-rose-50 text-rose-300">
      Cargando mapa...
    </div>
  ),
});

export default function MapaPage() {
  const { memories, loading, error } = useMemories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-center text-5xl text-rose-500">
        Nuestro mapa
      </h1>
      <p className="mt-2 text-center text-rose-400/80">
        Cada pin es una foto de un momento que habéis vivido.
      </p>

      <div className="mt-8">
        {loading && (
          <p className="py-16 text-center text-rose-300">
            Cargando recuerdos...
          </p>
        )}
        {error && <p className="py-16 text-center text-red-400">{error}</p>}
        {!loading && !error && <MapView memories={memories} />}
      </div>
    </div>
  );
}
