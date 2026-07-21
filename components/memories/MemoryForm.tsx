"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ImagePlus, X, MapPin, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import LocationSearch from "@/components/memories/LocationSearch";

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

interface Photo {
  file: File;
  url: string;
}

export default function MemoryForm() {
  const router = useRouter();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [dragging, setDragging] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const photosRef = useRef<Photo[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const locationName = watch("location_name");

  // Fecha de hoy por defecto
  useEffect(() => {
    setValue("date", new Date().toISOString().slice(0, 10));
  }, [setValue]);

  // Limpieza de las miniaturas al desmontar
  useEffect(() => {
    return () => {
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const added = Array.from(list)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((prev) => {
      const next = [...prev, ...added];
      photosRef.current = next;
      return next;
    });
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].url);
      const next = prev.filter((_, i) => i !== index);
      photosRef.current = next;
      return next;
    });
  }

  function handleLocationSelect(name: string, lat: number, lng: number) {
    setValue("location_name", name, { shouldValidate: true });
    setCoords({ lat, lng });
    setShowMap(true);
  }

  async function onSubmit(values: FormValues) {
    if (!coords) {
      setError("Busca el lugar para colocarlo en el mapa");
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

      for (let i = 0; i < photos.length; i++) {
        const file = photos[i].file;
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* 1. Título */}
      <div>
        <label className="block text-sm font-semibold text-rose-500">
          ¿Qué momento fue?
        </label>
        <input
          {...register("title")}
          className="mt-1.5 w-full rounded-xl border-rose-200 bg-white/80 shadow-sm focus:border-rose-400 focus:ring-rose-400"
          placeholder="Nuestro primer viaje a Italia"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* 2. Fecha */}
      <div>
        <label className="block text-sm font-semibold text-rose-500">
          ¿Cuándo?
        </label>
        <input
          type="date"
          {...register("date")}
          className="mt-1.5 w-full rounded-xl border-rose-200 bg-white/80 shadow-sm focus:border-rose-400 focus:ring-rose-400 sm:w-56"
        />
        {errors.date && (
          <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* 3. Lugar con buscador */}
      <div>
        <label className="block text-sm font-semibold text-rose-500">
          ¿Dónde?
        </label>
        <p className="mb-1.5 text-xs text-rose-300">
          Escribe el nombre y elige una opción: el mapa se coloca solo.
        </p>
        <input type="hidden" {...register("location_name")} />
        <LocationSearch onSelect={handleLocationSelect} />

        {coords && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-rose-500">
            <Check size={15} className="text-green-500" />
            <span className="font-medium">{locationName}</span>
            <button
              type="button"
              onClick={() => setShowMap((s) => !s)}
              className="ml-auto text-xs text-rose-400 underline"
            >
              {showMap ? "Ocultar mapa" : "Ajustar en el mapa"}
            </button>
          </div>
        )}

        {showMap && (
          <div className="mt-2">
            <p className="mb-1.5 flex items-center gap-1 text-xs text-rose-300">
              <MapPin size={12} /> Toca el mapa si quieres afinar el punto exacto.
            </p>
            <LocationPicker
              lat={coords?.lat ?? null}
              lng={coords?.lng ?? null}
              onChange={(lat, lng) => setCoords({ lat, lng })}
            />
          </div>
        )}
        {errors.location_name && (
          <p className="mt-1 text-xs text-red-500">
            {errors.location_name.message}
          </p>
        )}
      </div>

      {/* 4. Fotos con miniaturas y arrastrar-soltar */}
      <div>
        <label className="block text-sm font-semibold text-rose-500">
          Vuestras fotos
        </label>
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
          className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragging
              ? "border-rose-400 bg-rose-50"
              : "border-rose-200 bg-white/60 hover:bg-rose-50/60"
          }`}
        >
          <ImagePlus size={26} className="text-rose-300" />
          <span className="text-sm font-medium text-rose-400">
            Arrastra tus fotos aquí o toca para elegir
          </span>
          <span className="text-xs text-rose-300">Puedes subir varias</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
          />
        </label>

        {photos.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {photos.map((photo, i) => (
              <div
                key={photo.url}
                className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-rose-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label="Quitar foto"
                  className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-rose-500 shadow opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Reflexión (opcional) */}
      <div>
        <label className="block text-sm font-semibold text-rose-500">
          Vuestra reflexión{" "}
          <span className="font-normal text-rose-300">(opcional)</span>
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="mt-1.5 w-full rounded-xl border-rose-200 bg-white/80 shadow-sm focus:border-rose-400 focus:ring-rose-400"
          placeholder="Qué recordáis de este momento..."
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-3 font-medium text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-0.5 disabled:opacity-50"
      >
        {submitting ? "Guardando..." : "Guardar recuerdo 💕"}
      </button>
    </form>
  );
}
