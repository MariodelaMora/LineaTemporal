"use client";

import { Heart } from "lucide-react";
import { daysSince, formatDate, yearsSince } from "@/lib/utils";
import type { Milestone } from "@/lib/types";

export default function CounterCard({ milestone }: { milestone: Milestone }) {
  const days = daysSince(milestone.date);
  const years = yearsSince(milestone.date);

  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl bg-white/70 p-6 text-center shadow-md shadow-rose-100 ring-1 ring-rose-100 backdrop-blur transition-transform hover:-translate-y-1">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-pink-100">
        <Heart className="fill-rose-300 text-rose-400" size={20} />
      </span>
      <p className="font-display text-4xl text-rose-500">{days}</p>
      <p className="text-xs uppercase tracking-widest text-rose-300">
        días desde
      </p>
      <p className="text-sm font-semibold text-rose-500/90">{milestone.title}</p>
      <p className="text-xs text-rose-300">
        {formatDate(milestone.date)}
        {years > 0 && ` · ${years} año${years > 1 ? "s" : ""}`}
      </p>
    </div>
  );
}
