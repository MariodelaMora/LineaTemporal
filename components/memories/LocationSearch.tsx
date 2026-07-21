"use client";

import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

function shortName(displayName: string) {
  const parts = displayName.split(",").map((p) => p.trim());
  if (parts.length <= 2) return displayName;
  return `${parts[0]}, ${parts[parts.length - 1]}`;
}

export default function LocationSearch({
  onSelect,
}: {
  onSelect: (name: string, lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const skipNextSearch = useRef(false);

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      if (query.trim().length < 3) {
        setResults([]);
        setOpen(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal, headers: { "Accept-Language": "es" } }
        );
        const data: NominatimResult[] = await res.json();
        setResults(data);
        setOpen(true);
      } catch {
        // búsqueda cancelada o sin red: ignoramos
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function handleSelect(result: NominatimResult) {
    const name = shortName(result.display_name);
    skipNextSearch.current = true;
    setQuery(name);
    setOpen(false);
    setResults([]);
    onSelect(name, parseFloat(result.lat), parseFloat(result.lon));
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-rose-300"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Escribe una ciudad o lugar (ej. Roma)"
          className="w-full rounded-xl border-rose-200 bg-white/80 py-2 pl-9 pr-9 shadow-sm focus:border-rose-400 focus:ring-rose-400"
        />
        {loading && (
          <Loader2
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-rose-300"
          />
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-[1000] mt-1 w-full overflow-hidden rounded-xl border border-rose-100 bg-white shadow-lg shadow-rose-100">
          {results.map((result, i) => (
            <li key={`${result.lat}-${result.lon}-${i}`}>
              <button
                type="button"
                onClick={() => handleSelect(result)}
                className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-rose-500 transition-colors hover:bg-rose-50"
              >
                <MapPin size={15} className="mt-0.5 shrink-0 text-rose-400" />
                <span className="line-clamp-2">{result.display_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
