"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PhotoMarker from "@/components/map/PhotoMarker";
import type { Memory } from "@/lib/types";

const DEFAULT_CENTER: [number, number] = [41.9028, 12.4964]; // Roma

export default function MapView({ memories }: { memories: Memory[] }) {
  const center: [number, number] =
    memories.length > 0 ? [memories[0].lat, memories[0].lng] : DEFAULT_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom
      className="h-[70vh] w-full rounded-3xl shadow-lg shadow-rose-100 ring-1 ring-rose-100"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {memories.map((memory) => (
        <PhotoMarker key={memory.id} memory={memory} />
      ))}
    </MapContainer>
  );
}
