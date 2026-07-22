import { formatDate } from "@/lib/utils";
import type { Memory } from "@/lib/types";

export default function MemoryPopup({ memory }: { memory: Memory }) {
  return (
    <div className="w-56">
      {/* Tira con scroll-snap: nativa, sin el bug de medida de embla en el popup */}
      <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto rounded-xl">
        {memory.photos.map((photo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.id}
            src={photo.url}
            alt={memory.title}
            className="h-40 w-full shrink-0 snap-center object-cover"
          />
        ))}
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
