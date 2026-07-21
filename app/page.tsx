import Link from "next/link";
import { Map, Plus, Heart } from "lucide-react";
import MilestonesSection from "@/components/milestones/MilestonesSection";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="relative text-center">
        <div className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center gap-6 text-rose-200/70">
          <Heart size={18} className="fill-rose-200" />
          <Heart size={24} className="fill-rose-300" />
          <Heart size={18} className="fill-rose-200" />
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-300">
          Celia &amp; Mario
        </p>
        <h1 className="font-display mt-3 text-6xl text-rose-500 sm:text-7xl">
          Nuestros recuerdos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-rose-400/80">
          Cada viaje, cada foto, cada momento que hemos vivido juntos,
          guardados en un solo lugar bonito.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/nuevo-recuerdo"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-6 py-3 font-medium text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-0.5"
          >
            <Plus size={16} />
            Añadir recuerdo
          </Link>
          <Link
            href="/mapa"
            className="flex items-center gap-2 rounded-full bg-white/70 px-6 py-3 font-medium text-rose-500 shadow-sm ring-1 ring-rose-200 backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            <Map size={16} />
            Ver el mapa
          </Link>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display mb-8 text-center text-3xl text-rose-400">
          Nuestros hitos
        </h2>
        <MilestonesSection />
      </section>
    </div>
  );
}
