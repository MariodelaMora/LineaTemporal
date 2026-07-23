import { formatDate } from "@/lib/utils";
import type { Memory } from "@/lib/types";

export default function MemoryPopup({ memory }: { memory: Memory }) {
  return (
    <div className="w-56">
      {/* Solo la primera foto: el popup es una miniatura, la galería está en el timeline */}
      {memory.photos[0] && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={memory.photos[0].url}
          alt={memory.title}
          className="h-40 w-full rounded-xl object-cover"
        />
      )}
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
