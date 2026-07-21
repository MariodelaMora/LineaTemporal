"use client";

import { useMilestones } from "@/hooks/useMilestones";
import CounterCard from "@/components/milestones/CounterCard";

export default function MilestonesSection() {
  const { milestones, loading } = useMilestones();

  if (loading) {
    return <p className="py-8 text-center text-gray-400">Cargando hitos...</p>;
  }

  if (milestones.length === 0) {
    return (
      <p className="py-8 text-center text-gray-400">
        Añade hitos (primera cita, aniversario...) en la tabla{" "}
        <code className="rounded bg-gray-100 px-1">milestones</code> de
        Supabase.
      </p>
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
