import MemoryForm from "@/components/memories/MemoryForm";

export default function NuevoRecuerdoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-center text-5xl text-rose-500">
        Nuevo recuerdo
      </h1>
      <p className="mt-2 text-center text-rose-400/80">
        Guarda una foto, el lugar y qué sentisteis en ese momento.
      </p>

      <div className="mt-8 rounded-3xl bg-white/70 p-6 shadow-lg shadow-rose-100 ring-1 ring-rose-100 backdrop-blur sm:p-8">
        <MemoryForm />
      </div>
    </div>
  );
}
