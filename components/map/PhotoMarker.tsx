"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MemoryPopup from "@/components/map/MemoryPopup";
import type { Memory } from "@/lib/types";

function createPhotoIcon(url: string) {
  return L.divIcon({
    className: "photo-marker",
    html: `<div class="photo-marker-inner"><img src="${url}" alt="" style="width:100%;height:100%;object-fit:cover;display:block" /></div>`,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });
}

export default function PhotoMarker({ memory }: { memory: Memory }) {
  const thumbnail = memory.photos[0]?.url;
  if (!thumbnail) return null;

  return (
    <Marker
      position={[memory.lat, memory.lng]}
      icon={createPhotoIcon(thumbnail)}
    >
      <Popup minWidth={240} maxWidth={280}>
        <MemoryPopup memory={memory} />
      </Popup>
    </Marker>
  );
}
