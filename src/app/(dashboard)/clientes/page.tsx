"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table2,
  Search,
  MapPin,
  TowerControl,
  Sprout,
  Clock,
  ChevronDown,
  Filter,
} from "lucide-react";
import { clientes, type Cliente } from "@/lib/data";
import { formatRelativeDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusStyles: Record<
  Cliente["estado"],
  { color: string; bg: string; dot: string; label: string }
> = {
  Activo: {
    color: "text-[#22c55e]",
    bg: "bg-[#22c55e]/10",
    dot: "bg-[#22c55e]",
    label: "Activo",
  },
  "Atención requerida": {
    color: "text-[#ef4444]",
    bg: "bg-[#ef4444]/10",
    dot: "bg-[#ef4444]",
    label: "Atención",
  },
  "Excelente desempeño": {
    color: "text-[#3b82f6]",
    bg: "bg-[#3b82f6]/10",
    dot: "bg-[#3b82f6]",
    label: "Excelente",
  },
};

export default function ClientesPage() {
  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("todos");

  const filtered = clientes.filter((c) => {
    const matchesSearch =
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.ciudad.toLowerCase().includes(search.toLowerCase());
    const matchesEstado =
      filterEstado === "todos" || c.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-xl md:text-2xl font-bold text-white">Clientes</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          {clientes.length} clientes activos en tu red
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52525b]" />
          <input
            type="text"
            placeholder="Buscar cliente o ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1e1e1e] bg-[#111111] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[#22c55e]/40 focus:ring-1 focus:ring-[#22c55e]/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg border border-[#1e1e1e] bg-[#111111] overflow-x-auto w-full sm:w-auto">
          {["todos", "Activo", "Excelente desempeño", "Atención requerida"].map(
            (estado) => (
              <button
                key={estado}
                onClick={() => setFilterEstado(estado)}
                className={cn(
                  "px-2.5 md:px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                  filterEstado === estado
                    ? "bg-[#22c55e]/10 text-[#22c55e]"
                    : "text-[#52525b] hover:text-[#a1a1aa]"
                )}
              >
                {estado === "todos"
                  ? "Todos"
                  : estado === "Excelente desempeño"
                  ? "Excelente"
                  : estado === "Atención requerida"
                  ? "Atención"
                  : estado}
              </button>
            )
          )}
        </div>
      </div>

      {/* Desktop Table (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block rounded-xl border border-[#1e1e1e] bg-[#111111] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#1e1e1e]">
                <th className="text-left px-5 py-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
                  Ciudad
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
                  Torre
                </th>
                <th className="text-left px-5 py-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
                  Estado
                </th>
                <th className="text-right px-5 py-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
                  Producción
                </th>
                <th className="text-right px-5 py-4 text-xs font-medium text-[#52525b] uppercase tracking-wider">
                  Última actividad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {filtered.map((cliente, i) => {
                const st = statusStyles[cliente.estado];
                return (
                  <motion.tr
                    key={cliente.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-[#a1a1aa]">
                          {cliente.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {cliente.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#a1a1aa]">
                        <MapPin className="w-3.5 h-3.5 text-[#52525b] shrink-0" />
                        {cliente.ciudad}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#a1a1aa]">
                        <TowerControl className="w-3.5 h-3.5 text-[#52525b] shrink-0" />
                        {cliente.torre}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                          st.bg,
                          st.color
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", st.dot)} />
                        {cliente.estado}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Sprout className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                        <span className="text-sm font-medium text-white">
                          {cliente.produccion} kg
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 text-sm text-[#a1a1aa]">
                        <Clock className="w-3.5 h-3.5 text-[#52525b] shrink-0" />
                        {formatRelativeDate(cliente.ultimaActividad)}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#52525b]">
            No se encontraron clientes con esos filtros.
          </div>
        )}
      </motion.div>

      {/* Mobile Cards (hidden on desktop) */}
      <div className="md:hidden space-y-3">
        {filtered.map((cliente, i) => {
          const st = statusStyles[cliente.estado];
          return (
            <motion.div
              key={cliente.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-4 space-y-3"
            >
              {/* Top: name + status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-[#a1a1aa] shrink-0">
                    {cliente.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {cliente.nombre}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#52525b]">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{cliente.ciudad}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0",
                    st.bg,
                    st.color
                  )}
                >
                  <span className={cn("w-1.5 h-1.5 rounded-full", st.dot)} />
                  {st.label}
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                  <p className="text-xs font-medium text-white">{cliente.torre.replace("HidroTorre ", "H-").replace("MicroTorre ", "M-")}</p>
                  <p className="text-[10px] text-[#52525b]">Torre</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                  <div className="flex items-center justify-center gap-1">
                    <Sprout className="w-3 h-3 text-[#22c55e]" />
                    <span className="text-xs font-medium text-white">{cliente.produccion} kg</span>
                  </div>
                  <p className="text-[10px] text-[#52525b]">Producción</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/[0.03]">
                  <p className="text-xs text-[#a1a1aa]">{formatRelativeDate(cliente.ultimaActividad)}</p>
                  <p className="text-[10px] text-[#52525b]">Actividad</p>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#52525b]">
            No se encontraron clientes con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
}
