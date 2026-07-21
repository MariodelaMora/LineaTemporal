"use client";

import { Heart } from "lucide-react";
import { daysSince, formatDate, yearsSince } from "@/lib/utils";
import type { Milestone } from "@/lib/types";

export default function CounterCard({ milestone }: { milestone: Milestone }) {
  const days = daysSince(milestone.date);
  const years = yearsSince(milestone.date);

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-black/5">
      <Heart className="text-rose-400" size={22} />
      <p className="text-3xl font-bold text-gray-900">{days}</p>
      <p className="text-xs uppercase tracking-wide text-gray-400">
        días desde
      </p>
      <p className="text-sm font-medium text-gray-700">{milestone.title}</p>
      <p className="text-xs text-gray-400">
        {formatDate(milestone.date)}
        {years > 0 && ` · ${years} año${years > 1 ? "s" : ""}`}
      </p>
    </div>
  );
}
