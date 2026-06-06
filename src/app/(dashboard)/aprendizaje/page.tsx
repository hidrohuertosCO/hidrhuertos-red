"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FlaskConical,
  Thermometer,
  FileText,
  Search,
  Wifi,
  Sprout,
  Clock,
  CheckCircle2,
  Lock,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import { cursos } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
  Fundamentos: Sprout,
  Nutrición: FlaskConical,
  Ambiente: Thermometer,
  Operación: FileText,
  IoT: Wifi,
};

const categoryColors: Record<string, string> = {
  Fundamentos: "#22c55e",
  Nutrición: "#a855f7",
  Ambiente: "#f59e0b",
  Operación: "#3b82f6",
  IoT: "#06b6d4",
};

export default function AprendizajePage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20">
            <BookOpen className="w-5 h-5 text-[#22c55e]" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Centro de Aprendizaje
          </h1>
        </div>
        <p className="text-sm text-[#a1a1aa] ml-[52px]">
          Capacitación técnica para Embajadores de Resiliencia
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-4 text-center">
          <p className="text-2xl font-bold text-[#22c55e]">
            {
              cursos.filter((c) => c.estado === "Completado").length
            }
          </p>
          <p className="text-xs text-[#a1a1aa] mt-1">Completados</p>
        </div>
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-4 text-center">
          <p className="text-2xl font-bold text-[#f59e0b]">
            {cursos.filter((c) => c.estado === "En progreso").length}
          </p>
          <p className="text-xs text-[#a1a1aa] mt-1">En progreso</p>
        </div>
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-4 text-center">
          <p className="text-2xl font-bold text-[#52525b]">
            {cursos.filter((c) => c.estado === "Bloqueado").length}
          </p>
          <p className="text-xs text-[#a1a1aa] mt-1">Bloqueados</p>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursos.map((curso, i) => {
          const CategoryIcon = categoryIcons[curso.categoria] || BookOpen;
          const color = categoryColors[curso.categoria] || "#22c55e";

          return (
            <motion.div
              key={curso.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "rounded-xl border p-5 transition-all duration-300 group relative overflow-hidden",
                curso.estado === "Bloqueado"
                  ? "border-[#1a1a1a] bg-[#0d0d0d] opacity-60"
                  : "border-[#1e1e1e] bg-[#111111] hover:border-[#22c55e]/20 hover:shadow-lg hover:shadow-[#22c55e]/5"
              )}
            >
              {/* Top section */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <CategoryIcon
                    className="w-5 h-5"
                    style={{ color }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-medium",
                    curso.estado === "Completado" &&
                      "bg-[#22c55e]/10 text-[#22c55e]",
                    curso.estado === "En progreso" &&
                      "bg-[#f59e0b]/10 text-[#f59e0b]",
                    curso.estado === "Bloqueado" &&
                      "bg-[#52525b]/10 text-[#52525b]"
                  )}
                >
                  {curso.estado === "Completado" && "Completado"}
                  {curso.estado === "En progreso" && "En progreso"}
                  {curso.estado === "Bloqueado" && "Bloqueado"}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold text-white mb-1">
                {curso.titulo}
              </h3>
              <p className="text-xs text-[#a1a1aa] mb-4 line-clamp-2">
                {curso.descripcion}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-[#52525b] mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {curso.duracion}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {curso.modulosCompletados}/{curso.modulos} módulos
                </span>
              </div>

              {/* Progress */}
              {curso.progreso > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#52525b]">Progreso</span>
                    <span className="text-white">{curso.progreso}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${curso.progreso}%` }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${color}, ${color}dd)`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Action */}
              <button
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                  curso.estado === "Bloqueado"
                    ? "bg-[#1a1a1a] text-[#52525b] cursor-not-allowed"
                    : curso.estado === "Completado"
                    ? "bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e]/15"
                    : "bg-white/5 text-white hover:bg-white/10"
                )}
              >
                {curso.estado === "Completado" && (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Repasar
                  </>
                )}
                {curso.estado === "En progreso" && (
                  <>
                    <PlayCircle className="w-3.5 h-3.5" />
                    Continuar
                  </>
                )}
                {curso.estado === "Bloqueado" && (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    Completá la certificación anterior
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
