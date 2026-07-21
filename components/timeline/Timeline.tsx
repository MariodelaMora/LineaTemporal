"use client";

import TimelineCard from "@/components/timeline/TimelineCard";
import type { Memory } from "@/lib/types";

export default function Timeline({ memories }: { memories: Memory[] }) {
  if (memories.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-3xl bg-white/60 p-8 text-center shadow-sm ring-1 ring-rose-100 backdrop-blur">
        <p className="text-2xl">📷</p>
        <p className="mt-2 text-rose-400/80">
          Todavía no hay recuerdos. ¡Añadid el primero!
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-12">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-rose-200 via-pink-200 to-rose-100 sm:left-1/2" />

      <div className="space-y-10">
        {memories.map((memory, i) => (
          <div key={memory.id} className="relative pl-10 sm:pl-0">
            <span className="absolute left-4 top-6 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-400 ring-4 ring-rose-100 sm:left-1/2" />
            <TimelineCard memory={memory} align={i % 2 === 0 ? "left" : "right"} />
          </div>
        ))}
      </div>
    </div>
  );
}
