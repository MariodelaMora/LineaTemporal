import Link from "next/link";
import { Map, Plus } from "lucide-react";
import MilestonesSection from "@/components/milestones/MilestonesSection";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Nuestros recuerdos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Cada viaje, cada foto, cada momento que hemos vivido juntos, en un
          solo lugar.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/nuevo-recuerdo"
            className="flex items-center gap-2 rounded-full bg-rose-500 px-5 py-2.5 font-medium text-white shadow hover:bg-rose-600"
          >
            <Plus size={16} />
            Añadir recuerdo
          </Link>
          <Link
            href="/mapa"
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-medium text-rose-500 shadow ring-1 ring-rose-200 hover:bg-rose-50"
          >
            <Map size={16} />
            Ver el mapa
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-rose-400">
          Hitos importantes
        </h2>
        <MilestonesSection />
      </section>
    </div>
  );
}
