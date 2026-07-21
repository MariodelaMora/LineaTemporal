import MemoryForm from "@/components/memories/MemoryForm";

export default function NuevoRecuerdoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-gray-900">
        Nuevo recuerdo
      </h1>
      <p className="mt-2 text-center text-gray-500">
        Guarda una foto, el lugar y qué sentisteis en ese momento.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-8">
        <MemoryForm />
      </div>
    </div>
  );
}
