"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Map, Plus, Clock } from "lucide-react";

const links = [
  { href: "/", label: "Inicio", icon: Heart },
  { href: "/timeline", label: "Línea de tiempo", icon: Clock },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/nuevo-recuerdo", label: "Nuevo recuerdo", icon: Plus },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-rose-500">
          <Heart size={20} className="fill-rose-400 text-rose-400" />
          Nuestros recuerdos
        </Link>
        <div className="flex gap-1 sm:gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-rose-500 text-white"
                    : "text-gray-500 hover:bg-rose-50 hover:text-rose-500"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
