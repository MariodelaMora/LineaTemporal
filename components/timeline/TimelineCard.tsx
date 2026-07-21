"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import PhotoCarousel from "@/components/memories/PhotoCarousel";
import { formatDate } from "@/lib/utils";
import type { Memory } from "@/lib/types";

export default function TimelineCard({
  memory,
  align,
}: {
  memory: Memory;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative flex w-full ${
        align === "left" ? "sm:justify-start" : "sm:justify-end"
      }`}
    >
      <div className="w-full sm:w-[46%]">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
          <PhotoCarousel photos={memory.photos} alt={memory.title} />
          <div className="space-y-2 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-rose-400">
              {formatDate(memory.date)}
            </p>
            <h3 className="text-lg font-semibold text-gray-900">
              {memory.title}
            </h3>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin size={14} className="text-rose-400" />
              {memory.location_name}
            </p>
            {memory.description && (
              <p className="text-sm leading-relaxed text-gray-600">
                {memory.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
