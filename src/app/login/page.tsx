"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Correo electrónico inválido.");
      }
    } catch {
      setError("Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#22c55e]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#22c55e]/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mb-4 mx-auto">
            <img
              src="/hidrohuertos-logo.svg"
              alt="HidroHuertos"
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold text-white">
            Red de Embajadores
          </h1>
          <p className="text-sm text-[#a1a1aa] mt-1">HidroHuertos</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#1e1e1e] bg-[#111111] p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">
              Iniciar sesión
            </h2>
            <p className="text-xs text-[#52525b] mt-1">
              Accedé a tu panel de embajador
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a1a1aa]">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.co"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#22c55e]/40 focus:ring-1 focus:ring-[#22c55e]/20 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#a1a1aa]">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#22c55e]/40 focus:ring-1 focus:ring-[#22c55e]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525b] hover:text-[#a1a1aa] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20"
              >
                <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0" />
                <p className="text-xs text-[#ef4444]">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#22c55e] text-black font-medium text-sm hover:bg-[#16a34a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          {/* Hint */}
          <div className="text-center">
            <p className="text-[10px] text-[#52525b] leading-relaxed">
              Demo — cualquier correo con @ y cualquier contraseña funcionan.
              <br />
              Probá con{" "}
              <span className="text-[#a1a1aa] font-mono">
                alex@hidrohuertos.co
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
