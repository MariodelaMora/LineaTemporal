import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nuestros recuerdos",
    short_name: "Recuerdos",
    description: "Nuestros viajes y momentos, en una línea de tiempo y un mapa",
    start_url: "/",
    display: "standalone",
    background_color: "#fff5f8",
    theme_color: "#fb7185",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
