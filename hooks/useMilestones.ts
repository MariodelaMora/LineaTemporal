"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Milestone } from "@/lib/types";

export function useMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data, error } = await supabase
        .from("milestones")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data) setMilestones(data);
      setLoading(false);
    }

    load();
  }, []);

  return { milestones, loading };
}
