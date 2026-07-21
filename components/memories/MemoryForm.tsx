"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LocationPicker = dynamic(
  () => import("@/components/memories/LocationPicker"),
  { ssr: false }
);

const schema = z.object({
  title: z.string().min(1, "Ponle un título a este recuerdo"),
  description: z.string().optional(),
  date: z.string().min(1, "Elige una fecha"),
  location_name: z.string().min(1, "¿Dónde fue?"),
});

type FormValues = z.infer<typeof schema>;

export default function MemoryForm() {
  const router = useRouter();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    if (!coords) {
      setError("Selecciona la ubicación en el mapa");
      return;
    }

    setSubmitting(true);
    setError(null);
    const supabase = createClient();

    try {
      const { data: memory, error: insertError } = await supabase
        .from("memories")
        .insert({
          title: values.title,
          description: values.description || null,
          date: values.date,
          location_name: values.location_name,
          lat: coords.lat,
          lng: coords.lng,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${memory.id}/${i}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("memory-photos")
          .upload(path, file);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("memory-photos")
          .getPublicUrl(path);

        const { error: photoError } = await supabase
          .from("memory_photos")
          .insert({
            memory_id: memory.id,
            url: publicUrlData.publicUrl,
            position: i,
          });
        if (photoError) throw photoError;
      }

      router.push("/timeline");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          {...register("title")}
          className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-400 focus:ring-rose-400"
          placeholder="Nuestro primer viaje a Italia"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            {...register("date")}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-400 focus:ring-rose-400"
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lugar
          </label>
          <input
            {...register("location_name")}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-400 focus:ring-rose-400"
            placeholder="Roma, Italia"
          />
          {errors.location_name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.location_name.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Vuestra reflexión
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-400 focus:ring-rose-400"
          placeholder="Qué recordáis de este momento..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ubicación en el mapa
        </label>
        <p className="mb-2 text-xs text-gray-400">
          Haz clic en el mapa para marcar dónde fue.
        </p>
        <LocationPicker
          lat={coords?.lat ?? null}
          lng={coords?.lng ?? null}
          onChange={(lat, lng) => setCoords({ lat, lng })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fotos
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-rose-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-rose-600 hover:file:bg-rose-200"
        />
        {files.length > 0 && (
          <p className="mt-1 text-xs text-gray-400">
            {files.length} foto(s) seleccionada(s)
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-rose-500 px-4 py-2.5 font-medium text-white shadow hover:bg-rose-600 disabled:opacity-50"
      >
        {submitting ? "Guardando..." : "Guardar recuerdo"}
      </button>
    </form>
  );
}
