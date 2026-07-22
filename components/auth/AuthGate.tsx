"use client";

import { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "in" | "out">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "in" : "out");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setStatus(session ? "in" : "out");
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const supabase = createClient();
    // Supabase Auth usa email; dejamos escribir solo el usuario y le pegamos
    // un dominio fijo por detrás. Al crear los usuarios: celia@recuerdos.local
    const asEmail = email.includes("@") ? email : `${email.trim()}@recuerdos.local`;
    const { error } = await supabase.auth.signInWithPassword({
      email: asEmail,
      password,
    });
    if (error) setError("Usuario o contraseña incorrectos");
    setSubmitting(false);
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-rose-300" size={28} />
      </div>
    );
  }

  if (status === "out") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl bg-white/70 p-8 shadow-lg shadow-rose-100 ring-1 ring-rose-100 backdrop-blur"
        >
          <div className="mb-6 text-center">
            <Heart
              className="animate-heartbeat mx-auto fill-rose-400 text-rose-400"
              size={32}
            />
            <h1 className="font-display mt-2 text-4xl text-rose-500">
              Nuestros recuerdos
            </h1>
            <p className="mt-1 text-sm text-rose-400/80">
              Este rinconcito es solo nuestro 💕
            </p>
          </div>

          <label className="block text-sm font-semibold text-rose-500">
            Usuario
          </label>
          <input
            type="text"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 mt-1.5 w-full rounded-xl border-rose-200 bg-white/80 shadow-sm focus:border-rose-400 focus:ring-rose-400"
            placeholder="Nombre de usuario"
          />

          <label className="block text-sm font-semibold text-rose-500">
            Contraseña
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 mt-1.5 w-full rounded-xl border-rose-200 bg-white/80 shadow-sm focus:border-rose-400 focus:ring-rose-400"
            placeholder="••••••••"
          />

          {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-4 py-3 font-medium text-white shadow-lg shadow-rose-200 transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {submitting ? "Entrando..." : "Entrar 💗"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
