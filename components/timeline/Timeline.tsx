"use client";

import TimelineCard from "@/components/timeline/TimelineCard";
import type { Memory } from "@/lib/types";

export default function Timeline({ memories }: { memories: Memory[] }) {
  if (memories.length === 0) {
    return (
      <p className="py-16 text-center text-gray-400">
        Todavía no hay recuerdos. ¡Añadid el primero!
      </p>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12">
      <div className="absolute left-4 top-0 h-full w-px bg-rose-200 sm:left-1/2" />

      <div className="space-y-10">
        {memories.map((memory, i) => (
          <div key={memory.id} className="relative pl-10 sm:pl-0">
            <span className="absolute left-4 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-400 ring-4 ring-rose-100 sm:left-1/2" />
            <TimelineCard memory={memory} align={i % 2 === 0 ? "left" : "right"} />
          </div>
        ))}
      </div>
    </div>
  );
}
