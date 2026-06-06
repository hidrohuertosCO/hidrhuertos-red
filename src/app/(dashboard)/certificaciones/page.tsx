"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sprout,
  Wrench,
  Search,
  Cpu,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  Lock,
  FileText,
} from "lucide-react";
import { certificaciones } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Wrench,
  Search,
  Cpu,
  Award,
};

const statusConfig = {
  Completado: {
    icon: CheckCircle2,
    color: "text-[#22c55e]",
    bg: "bg-[#22c55e]/10",
    border: "border-[#22c55e]/20",
  },
  "En progreso": {
    icon: FileText,
    color: "text-[#f59e0b]",
    bg: "bg-[#f59e0b]/10",
    border: "border-[#f59e0b]/20",
  },
  Bloqueado: {
    icon: Lock,
    color: "text-[#52525b]",
    bg: "bg-[#52525b]/10",
    border: "border-[#52525b]/20",
  },
};

export default function CertificacionesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Certificaciones
        </h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          Sistema de progresión técnica — de Semilla a Resiliente
        </p>
      </motion.div>

      {/* Progression path */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[23px] md:left-[31px] top-8 bottom-8 w-[2px] bg-[#1e1e1e]" />

        <div className="space-y-3 md:space-y-4">
          {certificaciones.map((cert, index) => {
            const Icon = iconMap[cert.icono] || ShieldCheck;
            const config = statusConfig[cert.estado];

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative flex gap-3 md:gap-5 p-4 md:p-5 rounded-xl border transition-all duration-300",
                  cert.estado === "Bloqueado"
                    ? "border-[#1a1a1a] bg-[#0d0d0d] opacity-60"
                    : "border-[#1e1e1e] bg-[#111111] hover:border-[#22c55e]/20"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "relative z-10 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 border",
                    config.bg,
                    config.border
                  )}
                >
                  <Icon className={cn("w-5 h-5 md:w-6 md:h-6", config.color)} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <h3 className="text-sm md:text-base font-semibold text-white truncate">
                          {cert.nombre}
                        </h3>
                        <span
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-medium w-fit shrink-0",
                            config.bg,
                            config.color
                          )}
                        >
                          {cert.rango}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-[#a1a1aa] mt-1 line-clamp-2 md:line-clamp-none">
                        {cert.descripcion}
                      </p>
                    </div>
                    {/* Status badge — hidden on very small, shown as tag below instead */}
                    <span
                      className={cn(
                        "hidden sm:inline-flex text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap shrink-0",
                        config.bg,
                        config.color
                      )}
                    >
                      {cert.estado}
                    </span>
                  </div>

                  {/* Status badge for mobile */}
                  <span
                    className={cn(
                      "sm:hidden inline-flex text-[10px] px-2 py-0.5 rounded-full font-medium mt-2",
                      config.bg,
                      config.color
                    )}
                  >
                    {cert.estado}
                  </span>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 md:mt-4 text-xs text-[#52525b]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {cert.horas} horas
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      {cert.modulos} módulos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      Evaluación: {cert.evaluacion}
                    </span>
                  </div>

                  {/* Progress bar */}
                  {cert.porcentaje > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#52525b]">Completado</span>
                        <span className="text-white">{cert.porcentaje}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cert.porcentaje}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={cn(
                            "h-full rounded-full",
                            cert.estado === "Completado"
                              ? "bg-[#22c55e]"
                              : "bg-[#f59e0b]"
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-3 md:p-4 text-center">
          <p className="text-lg md:text-2xl font-bold text-[#22c55e]">
            {certificaciones.filter((c) => c.estado === "Completado").length}
          </p>
          <p className="text-[10px] md:text-xs text-[#a1a1aa] mt-1">Completadas</p>
        </div>
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-3 md:p-4 text-center">
          <p className="text-lg md:text-2xl font-bold text-[#f59e0b]">
            {certificaciones.filter((c) => c.estado === "En progreso").length}
          </p>
          <p className="text-[10px] md:text-xs text-[#a1a1aa] mt-1">En progreso</p>
        </div>
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-3 md:p-4 text-center">
          <p className="text-lg md:text-2xl font-bold text-[#52525b]">
            {certificaciones.filter((c) => c.estado === "Bloqueado").length}
          </p>
          <p className="text-[10px] md:text-xs text-[#a1a1aa] mt-1">Bloqueadas</p>
        </div>
      </div>
    </div>
  );
}
