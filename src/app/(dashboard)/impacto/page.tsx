"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Sprout,
  Cloud,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import KpiCard from "@/components/kpi-card";
import { impactoMensual } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function ImpactoPage() {
  const totalAgua = impactoMensual.reduce((s, m) => s + m.aguaAhorrada, 0);
  const totalProduccion = impactoMensual.reduce((s, m) => s + m.produccionLocal, 0);
  const totalCO2 = impactoMensual.reduce((s, m) => s + m.co2Evitado, 0);
  const totalFamilias = impactoMensual[impactoMensual.length - 1].familiasImpactadas;
  const ciudades = 5;

  const kpis = [
    {
      title: "Agua ahorrada",
      value: formatNumber(totalAgua) + " L",
      subtitle: "vs. cultivo tradicional en tierra",
      icon: <Droplets className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Producción local",
      value: `${totalProduccion} kg`,
      subtitle: "Alimentos cultivados este año",
      icon: <Sprout className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "CO₂ evitado",
      value: `${totalCO2.toFixed(1)} ton`,
      subtitle: "Emisiones evitadas por producción local",
      icon: <Cloud className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Familias impactadas",
      value: formatNumber(totalFamilias),
      subtitle: "Acceso a alimentación resiliente",
      icon: <Users className="w-5 h-5" />,
      trend: "up" as const,
    },
    {
      title: "Ciudades activas",
      value: `${ciudades}`,
      subtitle: "Operando en la región Caribe",
      icon: <Building2 className="w-5 h-5" />,
      trend: "neutral" as const,
    },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Impacto</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">
          Métricas de resiliencia alimentaria — Red de Embajadores
        </p>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water & Production */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Agua ahorrada vs. producción
            </h2>
            <p className="text-sm text-[#a1a1aa] mt-0.5">
              Evolución mensual del impacto ambiental
            </p>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactoMensual}>
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
                <Bar
                  dataKey="aguaAhorrada"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Agua ahorrada (L)"
                />
                <Bar
                  dataKey="produccionLocal"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  name="Producción (kg)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* CO2 & Families */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              CO₂ evitado y familias impactadas
            </h2>
            <p className="text-sm text-[#a1a1aa] mt-0.5">
              Crecimiento del impacto social y ambiental
            </p>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactoMensual}>
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
                <Area
                  type="monotone"
                  dataKey="co2Evitado"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  name="CO₂ evitado (ton)"
                />
                <Area
                  type="monotone"
                  dataKey="familiasImpactadas"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  name="Familias impactadas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Fictional map visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">
            Ciudades activas — Región Caribe
          </h2>
          <p className="text-sm text-[#a1a1aa] mt-0.5">
            Presencia de la Red de Embajadores
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { ciudad: "Montería", torres: 28, clientes: 22, color: "#22c55e" },
            { ciudad: "Sincelejo", torres: 18, clientes: 14, color: "#3b82f6" },
            { ciudad: "Turbo", torres: 22, clientes: 18, color: "#f59e0b" },
            { ciudad: "Apartadó", torres: 12, clientes: 8, color: "#a855f7" },
            { ciudad: "Cereté", torres: 8, clientes: 6, color: "#06b6d4" },
          ].map((ciudad) => (
            <div
              key={ciudad.ciudad}
              className="flex-1 min-w-[160px] p-4 rounded-lg border border-[#1e1e1e] bg-[#0d0d0d] hover:border-[#22c55e]/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ciudad.color }}
                />
                <span className="text-sm font-medium text-white">
                  {ciudad.ciudad}
                </span>
              </div>
              <div className="space-y-1 text-xs text-[#a1a1aa]">
                <div className="flex justify-between">
                  <span>Torres</span>
                  <span className="text-white">{ciudad.torres}</span>
                </div>
                <div className="flex justify-between">
                  <span>Clientes</span>
                  <span className="text-white">{ciudad.clientes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
