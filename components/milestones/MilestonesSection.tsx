"use client";

import { useMilestones } from "@/hooks/useMilestones";
import CounterCard from "@/components/milestones/CounterCard";

export default function MilestonesSection() {
  const { milestones, loading } = useMilestones();

  if (loading) {
    return <p className="py-8 text-center text-rose-300">Cargando hitos...</p>;
  }

  if (milestones.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white/60 p-8 text-center shadow-sm ring-1 ring-rose-100 backdrop-blur">
        <p className="text-2xl">💕</p>
        <p className="mt-2 text-rose-400/80">
          Aquí aparecerán vuestros hitos: la primera cita, el primer viaje,
          vuestro aniversario...
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {milestones.map((milestone) => (
        <CounterCard key={milestone.id} milestone={milestone} />
      ))}
    </div>
  );
}
