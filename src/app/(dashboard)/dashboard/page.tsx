"use client";

import { motion } from "framer-motion";
import {
  Users,
  TowerControl,
  Sprout,
  Droplets,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import KpiCard from "@/components/kpi-card";
import {
  embajadorPrincipal,
  estadisticasMensuales,
  calcularProgresoRango,
} from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const emb = embajadorPrincipal;
  const progreso = calcularProgresoRango(
    emb.clientesActivos,
    emb.torresInstaladas,
    emb.rango
  );

  const kpis = [
    {
      title: "Clientes activos",
      value: formatNumber(emb.clientesActivos),
      subtitle: "+4 este mes",
      icon: <Users className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Torres instaladas",
      value: formatNumber(emb.torresInstaladas),
      subtitle: "+2 este mes",
      icon: <TowerControl className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Producción estimada",
      value: `${emb.produccionEstimada} kg`,
      subtitle: "Cosecha del mes",
      icon: <Sprout className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Agua ahorrada",
      value: formatNumber(emb.aguaAhorrada) + " L",
      subtitle: "vs. cultivo tradicional",
      icon: <Droplets className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Comisiones del mes",
      value: formatCurrency(emb.comisionesMes),
      subtitle: "Por ventas y recurrencia",
      icon: <DollarSign className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "MRR generado",
      value: formatCurrency(emb.mrrGenerado),
      subtitle: "Ingreso recurrente mensual",
      icon: <TrendingUp className="w-5 h-5" />,
      trend: "up" as const,
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">
            Resumen de tu red de resiliencia alimentaria
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-[#a1a1aa]">
          <span>Actualizado hoy</span>
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        </div>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-xl border border-[#1e1e1e] bg-[#111111] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Evolución mensual
              </h2>
              <p className="text-sm text-[#a1a1aa] mt-0.5">
                Ventas, clientes y nutrientes — últimos 12 meses
              </p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={estadisticasMensuales}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e1e1e"
                  vertical={false}
                />
                <XAxis
                  dataKey="mes"
                  stroke="#52525b"
                  tick={{ fill: "#a1a1aa", fontSize: 12 }}
                  axisLine={{ stroke: "#1e1e1e" }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#52525b"
                  tick={{ fill: "#a1a1aa", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#fafafa",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }}
                />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", r: 3 }}
                  activeDot={{ r: 5, fill: "#22c55e" }}
                  name="Ventas"
                />
                <Line
                  type="monotone"
                  dataKey="clientesActivos"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 3 }}
                  activeDot={{ r: 5, fill: "#3b82f6" }}
                  name="Clientes activos"
                />
                <Line
                  type="monotone"
                  dataKey="nutrientesVendidos"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 3 }}
                  activeDot={{ r: 5, fill: "#f59e0b" }}
                  name="Nutrientes vendidos"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Rank Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Tu rango</h2>
              <p className="text-sm text-[#a1a1aa] mt-0.5">
                Progreso de certificación
              </p>
            </div>
            <div className="p-2 rounded-lg bg-[#22c55e]/5 border border-[#22c55e]/10">
              <Target className="w-5 h-5 text-[#22c55e]" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Current rank */}
            <div className="text-center p-4 rounded-lg bg-gradient-to-b from-[#22c55e]/5 to-transparent border border-[#22c55e]/10">
              <p className="text-xs text-[#a1a1aa] mb-1">Rango actual</p>
              <p className="text-xl font-bold text-[#22c55e]">
                {emb.rango}
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#a1a1aa]">Progreso</span>
                <span className="text-white font-medium">
                  {progreso.porcentaje}%
                </span>
              </div>
              <div className="h-2 bg-[#1e1e1e] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progreso.porcentaje}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full"
                />
              </div>
            </div>

            {/* Next rank */}
            {progreso.siguienteRango && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a1a1aa]">Siguiente rango</span>
                  <span className="text-white font-medium">
                    {progreso.siguienteRango}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a1a1aa]">Clientes necesarios</span>
                    <span className="text-white">
                      {progreso.clientesRestantes} restantes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a1a1aa]">Torres necesarias</span>
                    <span className="text-white">
                      {progreso.torresRestantes} restantes
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e]/5 transition-all text-sm font-medium">
              Ver certificaciones
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
