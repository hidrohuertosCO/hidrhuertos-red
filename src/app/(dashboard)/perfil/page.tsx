"use client";

import { motion } from "framer-motion";
import {
  UserCircle,
  MapPin,
  Calendar,
  ShieldCheck,
  TowerControl,
  Users,
  Sprout,
  Star,
  Medal,
  GraduationCap,
  Heart,
  CircuitBoard,
  Trophy,
  Target,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { embajadorPrincipal, logros } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const logroIcons: Record<string, React.ElementType> = {
  TowerControl: TowerControl,
  Users: Users,
  GraduationCap: GraduationCap,
  Star: Star,
  Heart: Heart,
  CircuitBoard: CircuitBoard,
  Medal: Medal,
};

export default function PerfilPage() {
  const emb = embajadorPrincipal;
  const desbloqueados = logros.filter((l) => l.desbloqueado).length;
  const totalLogros = logros.length;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Perfil</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          Tu información y logros como Embajador de Resiliencia
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6 space-y-6">
            {/* Avatar */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4">
                {emb.foto}
              </div>
              <h2 className="text-xl font-bold text-white">{emb.nombre}</h2>
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-xs font-medium bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
                <Target className="w-3.5 h-3.5" />
                {emb.rango}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                <MapPin className="w-4 h-4 text-[#52525b]" />
                {emb.ciudad}, Córdoba
              </div>
              <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                <Calendar className="w-4 h-4 text-[#52525b]" />
                Ingreso: {formatDate(emb.fechaIngreso)}
              </div>
              <div className="flex items-center gap-3 text-sm text-[#a1a1aa]">
                <ShieldCheck className="w-4 h-4 text-[#52525b]" />
                {emb.certificaciones.length} certificaciones completadas
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 rounded-lg bg-white/5">
                <p className="text-lg font-bold text-white">
                  {emb.clientesActivos}
                </p>
                <p className="text-[10px] text-[#52525b]">Clientes</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <p className="text-lg font-bold text-white">
                  {emb.torresInstaladas}
                </p>
                <p className="text-[10px] text-[#52525b]">Torres</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <p className="text-lg font-bold text-white">
                  {emb.produccionEstimada}kg
                </p>
                <p className="text-[10px] text-[#52525b]">Produc.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Logros</h2>
                <p className="text-sm text-[#a1a1aa] mt-0.5">
                  {desbloqueados}/{totalLogros} desbloqueados
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-2xl font-bold text-white">
                  {desbloqueados}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(desbloqueados / totalLogros) * 100}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#f59e0b] to-[#eab308] rounded-full"
              />
            </div>

            {/* Logros grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {logros.map((logro) => {
                const Icon = logroIcons[logro.icono] || Star;

                return (
                  <div
                    key={logro.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-all",
                      logro.desbloqueado
                        ? "bg-white/[0.03] hover:bg-white/[0.06]"
                        : "bg-transparent opacity-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        logro.desbloqueado
                          ? "bg-[#f59e0b]/10 border border-[#f59e0b]/20"
                          : "bg-[#1e1e1e] border border-[#1e1e1e]"
                      )}
                    >
                      {logro.desbloqueado ? (
                        <Icon className="w-4 h-4 text-[#f59e0b]" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#52525b]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            logro.desbloqueado
                              ? "text-white"
                              : "text-[#52525b]"
                          )}
                        >
                          {logro.nombre}
                        </span>
                        {logro.desbloqueado && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-xs mt-0.5",
                          logro.desbloqueado
                            ? "text-[#a1a1aa]"
                            : "text-[#52525b]"
                        )}
                      >
                        {logro.descripcion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
