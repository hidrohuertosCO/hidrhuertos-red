"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  TowerControl,
  Users,
  FlaskConical,
  Crown,
  DollarSign,
  TrendingUp,
  Gift,
  AlertTriangle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// ─── Slider Component ───

function Slider({
  label,
  icon,
  value,
  onChange,
  min,
  max,
  step = 1,
  format = (v: number) => String(v),
  color = "green",
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (v: number) => string;
  color?: "green" | "blue" | "amber" | "purple";
}) {
  const colorMap = {
    green: "accent-[#22c55e]",
    blue: "accent-[#3b82f6]",
    amber: "accent-[#f59e0b]",
    purple: "accent-[#a855f7]",
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-sm font-medium text-white">{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full h-1.5 bg-[#1e1e1e] rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-[#22c55e]
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:shadow-[#22c55e]/20
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-[#22c55e]
          [&::-moz-range-thumb]:cursor-pointer
        `}
        style={{
          background: `linear-gradient(to right, #22c55e ${(value / max) * 100}%, #1e1e1e ${(value / max) * 100}%)`,
        }}
      />
    </div>
  );
}

export default function SimuladorPage() {
  const [torres, setTorres] = useState(18);
  const [clientes, setClientes] = useState(12);
  const [nutrientes, setNutrientes] = useState(28);
  const [suscripciones, setSuscripciones] = useState(5);

  // Fictional calculation
  const precioTorre = 450000;
  const precioNutrientes = 85000;
  const suscripcionPremium = 65000;
  const comisionVenta = 0.12;
  const comisionRecurrente = 0.08;

  const ingresosVentas = torres * precioTorre * comisionVenta;
  const ingresosNutrientes = nutrientes * precioNutrientes * comisionVenta;
  const ingresosRecurrentes = suscripciones * suscripcionPremium * comisionRecurrente * clientes;
  const bonificaciones = clientes >= 10 ? clientes * 15000 : 0;
  const totalMensual = ingresosVentas + ingresosNutrientes + ingresosRecurrentes + bonificaciones;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
            <SlidersHorizontal className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Simulador</h1>
            <p className="text-sm text-[#a1a1aa] mt-1">
              Proyectá tus ingresos como Embajador de Resiliencia
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6 space-y-6"
        >
          <h2 className="text-lg font-semibold text-white mb-2">
            Variables de actividad
          </h2>

          <Slider
            label="Torres vendidas"
            icon={<TowerControl className="w-4 h-4 text-[#22c55e]" />}
            value={torres}
            onChange={setTorres}
            min={0}
            max={50}
          />

          <Slider
            label="Clientes activos"
            icon={<Users className="w-4 h-4 text-[#3b82f6]" />}
            value={clientes}
            onChange={setClientes}
            min={0}
            max={40}
          />

          <Slider
            label="Nutrientes vendidos"
            icon={<FlaskConical className="w-4 h-4 text-[#a855f7]" />}
            value={nutrientes}
            onChange={setNutrientes}
            min={0}
            max={80}
          />

          <Slider
            label="Suscripciones premium"
            icon={<Crown className="w-4 h-4 text-[#f59e0b]" />}
            value={suscripciones}
            onChange={setSuscripciones}
            min={0}
            max={20}
          />
          <div className="h-px bg-[#1e1e1e]" />
          <p className="text-[10px] text-[#52525b] leading-relaxed">
            * Los valores de comisiones y bonificaciones son ilustrativos.
            Consultá los términos actualizados con tu coordinador de red.
          </p>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            Proyección mensual
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-[#22c55e]" />
                </div>
                <div>
                  <p className="text-sm text-[#a1a1aa]">Ingresos por ventas</p>
                  <p className="text-xs text-[#52525b]">Torres + nutrientes</p>
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                {formatCurrency(ingresosVentas + ingresosNutrientes)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-sm text-[#a1a1aa]">
                    Ingresos recurrentes
                  </p>
                  <p className="text-xs text-[#52525b]">
                    Suscripciones premium
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                {formatCurrency(ingresosRecurrentes)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-sm text-[#a1a1aa]">Bonificaciones</p>
                  <p className="text-xs text-[#52525b]">
                    Por volumen de clientes
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                {formatCurrency(bonificaciones)}
              </span>
            </div>

            <div className="h-px bg-[#1e1e1e]" />

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-[#22c55e]/10 to-transparent border border-[#22c55e]/20">
              <div>
                <p className="text-sm font-medium text-white">Total mensual</p>
                <p className="text-xs text-[#a1a1aa]">
                  Ingreso estimado como embajador
                </p>
              </div>
              <span className="text-2xl font-bold text-[#22c55e]">
                {formatCurrency(totalMensual)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-3 p-4 rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5"
      >
        <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[#f59e0b]">
            Proyección ilustrativa
          </p>
          <p className="text-xs text-[#a1a1aa] mt-1">
            Los resultados mostrados son simulados y dependen de la actividad
            real del embajador, condiciones del mercado y disponibilidad de
            inventario. Esta herramienta no constituye una promesa de ingresos.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
