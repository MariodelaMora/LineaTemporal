"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Memory } from "@/lib/types";

export default function MemoryPopup({ memory }: { memory: Memory }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByView = (dir: number) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="w-60">
      <div className="relative">
        {/* Scroll nativo con ancho fijo por foto (w-60): sin el hueco blanco
            que causaba embla al medir mal dentro del popup de Leaflet. */}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {memory.photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo.id}
              src={photo.url}
              alt={memory.title}
              className="h-40 w-60 shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        {memory.photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollByView(-1)}
              aria-label="Foto anterior"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-rose-500 shadow hover:bg-white"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollByView(1)}
              aria-label="Foto siguiente"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 text-rose-500 shadow hover:bg-white"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <div className="space-y-1 pt-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-rose-400">
          {formatDate(memory.date)}
        </p>
        <h4 className="text-sm font-semibold text-gray-900">{memory.title}</h4>
        <p className="text-xs text-gray-500">{memory.location_name}</p>
        {memory.description && (
          <p className="text-xs leading-relaxed text-gray-600">
            {memory.description}
          </p>
        )}
      </div>
    </div>
  );
}
