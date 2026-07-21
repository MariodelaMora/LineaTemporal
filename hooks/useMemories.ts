"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Memory } from "@/lib/types";

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("memories")
        .select("*, photos:memory_photos(*)")
        .order("date", { ascending: true });

      if (cancelled) return;

      if (error) {
        setError(error.message);
      } else {
        setMemories(
          (data ?? []).map((m) => ({
            ...m,
            photos: [...m.photos].sort((a, b) => a.position - b.position),
          }))
        );
        setError(null);
      }
      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadIndex]);

  const reload = useCallback(() => setReloadIndex((x) => x + 1), []);

  return { memories, loading, error, reload };
}
