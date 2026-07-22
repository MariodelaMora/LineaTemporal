"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Map, Plus, Clock, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/", label: "Inicio", icon: Heart },
  { href: "/timeline", label: "Línea de tiempo", icon: Clock },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/nuevo-recuerdo", label: "Nuevo recuerdo", icon: Plus },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100/70 bg-white/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display flex items-center gap-2 text-2xl text-rose-500"
        >
          <Heart size={20} className="animate-heartbeat fill-rose-400 text-rose-400" />
          Nuestros recuerdos
        </Link>
        <div className="flex gap-1 sm:gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-sm shadow-rose-200"
                    : "text-rose-400/80 hover:bg-rose-100/60 hover:text-rose-500"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => createClient().auth.signOut()}
            aria-label="Salir"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-rose-400/80 transition-all hover:bg-rose-100/60 hover:text-rose-500"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
