"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TowerControl,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Network,
  TreePine,
  User,
  Sprout,
} from "lucide-react";
import {
  embajadores,
  embajadorPrincipal,
  construirArbol,
  type ArbolNodo,
} from "@/lib/data";
import { cn } from "@/lib/utils";

// ─── Rank colors ───

const rankColor = (rango: string) => {
  if (rango.includes("Resiliente")) return "text-[#15803d] bg-[#15803d]/10 border-[#15803d]/20";
  if (rango.includes("Tallo")) return "text-[#16a34a] bg-[#16a34a]/10 border-[#16a34a]/20";
  if (rango.includes("Raíz")) return "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20";
  if (rango.includes("Brote")) return "text-[#86efac] bg-[#86efac]/10 border-[#86efac]/20";
  return "text-[#a1a1aa] bg-[#a1a1aa]/10 border-[#a1a1aa]/20";
};

// ─── Org Chart Node ───

function OrgNode({
  nodo,
  nivel = 0,
}: {
  nodo: ArbolNodo;
  nivel?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasHijos = nodo.hijos.length > 0;
  const isCurrentUser = nodo.id === embajadorPrincipal.id;
  const isLider = nivel === 0;

  return (
    <div className="relative">
      {/* Node card */}
      <div className="relative flex items-start gap-3">
        {/* Vertical connector line */}
        {nivel > 0 && (
          <div className="absolute -left-6 top-0 bottom-1/2 w-6 border-l-2 border-b-2 border-[#22c55e]/20 rounded-bl-xl" />
        )}

        {/* Card */}
        <div
          className={cn(
            "flex-1 rounded-xl border transition-all duration-200",
            isCurrentUser
              ? "border-[#22c55e]/30 bg-gradient-to-r from-[#22c55e]/5 to-transparent"
              : "border-[#1e1e1e] bg-[#111111] hover:border-[#22c55e]/20"
          )}
        >
          {/* Card header */}
          <div className="p-3 md:p-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div
                className={cn(
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 border",
                  isCurrentUser
                    ? "bg-[#22c55e] text-black border-[#22c55e]"
                    : "bg-[#1a1a1a] text-[#a1a1aa] border-[#2a2a2a]"
                )}
              >
                {nodo.foto}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm md:text-base font-semibold text-white">
                    {nodo.nombre}
                  </span>
                  {isCurrentUser && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] font-medium">
                      Tú
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-medium border",
                      rankColor(nodo.rango)
                    )}
                  >
                    {nodo.rango}
                  </span>
                  {isLider && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20 font-medium">
                      Líder de red
                    </span>
                  )}
                </div>
              </div>

              {/* Stats badges (desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03]">
                  <Users className="w-3.5 h-3.5 text-[#3b82f6]" />
                  <span className="text-xs font-medium text-white">
                    {nodo.clientesActivos}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03]">
                  <TowerControl className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span className="text-xs font-medium text-white">
                    {nodo.torresInstaladas}
                  </span>
                </div>
                {/* Expand/collapse */}
                {hasHijos && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(!expanded);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-[#52525b] hover:text-white transition-all"
                  >
                    {expanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Mobile expand */}
              {hasHijos && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  className="md:hidden p-1.5 rounded-lg hover:bg-white/5 text-[#52525b] transition-all"
                >
                  {expanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Stats row (mobile) */}
            <div className="flex md:hidden items-center gap-3 mt-3 pt-3 border-t border-[#1e1e1e]">
              <div className="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
                <Users className="w-3.5 h-3.5 text-[#3b82f6]" />
                {nodo.clientesActivos} clientes
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#a1a1aa]">
                <TowerControl className="w-3.5 h-3.5 text-[#22c55e]" />
                {nodo.torresInstaladas} torres
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Children container */}
      <AnimatePresence>
        {expanded && hasHijos && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative pl-6 md:pl-8 mt-1"
          >
            {/* Vertical line */}
            <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-[2px] bg-[#22c55e]/10" />
            {nodo.hijos.map((hijo) => (
              <div key={hijo.id} className="relative pt-1">
                <OrgNode nodo={hijo} nivel={nivel + 1} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Radial Graph View ───

function RadialGraph() {
  const nodes = embajadores.slice(0, 12);
  const [hovered, setHovered] = useState<string | null>(null);

  const cx = 250;
  const cy = 250;
  const innerR = 60;
  const outerR = 180;
  const centerNode = nodes[0];

  return (
    <div className="w-full flex items-center justify-center py-4 md:py-8">
      <svg
        viewBox="0 0 500 500"
        className="w-full max-w-[500px] h-auto"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={cx} cy={cy} r="80" fill="url(#centerGlow)" />

        {/* Connection lines */}
        {nodes.slice(1).map((n) => {
          const idx = nodes.indexOf(n);
          const angle =
            ((idx - 1) / (nodes.length - 1)) * 2 * Math.PI - Math.PI / 2;
          const x = cx + outerR * Math.cos(angle);
          const y = cy + outerR * Math.sin(angle);
          const isHovered = hovered === n.id;

          return (
            <g key={`conn-${n.id}`}>
              {/* Line from center */}
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={isHovered ? "#22c55e" : "#1e1e1e"}
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 0.6 : 0.4}
              />
            </g>
          );
        })}

        {/* Center node */}
        <circle cx={cx} cy={cy} r="32" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#000"
          fontSize="14"
          fontWeight="bold"
        >
          {centerNode.foto}
        </text>
        <text
          x={cx}
          y={cy + 42}
          textAnchor="middle"
          fill="#22c55e"
          fontSize="10"
          fontWeight="600"
        >
          {centerNode.nombre.split(" ")[0]}
        </text>

        {/* Orbit nodes */}
        {nodes.slice(1).map((n) => {
          const idx = nodes.indexOf(n);
          const angle =
            ((idx - 1) / (nodes.length - 1)) * 2 * Math.PI - Math.PI / 2;
          const x = cx + outerR * Math.cos(angle);
          const y = cy + outerR * Math.sin(angle);
          const isHovered = hovered === n.id;

          return (
            <g
              key={n.id}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              {/* Hover glow */}
              {isHovered && (
                <circle
                  cx={x}
                  cy={y}
                  r="28"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  opacity="0.3"
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? "24" : "20"}
                fill={isHovered ? "#1a1a1a" : "#111111"}
                stroke={isHovered ? "#22c55e" : "#2a2a2a"}
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#a1a1aa"
                fontSize="11"
                fontWeight="bold"
              >
                {n.foto}
              </text>
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                fill={isHovered ? "#22c55e" : "#a1a1aa"}
                fontSize="9"
                fontWeight={isHovered ? "600" : "400"}
              >
                {n.nombre.split(" ")[0]}
              </text>
              {isHovered && (
                <text
                  x={x}
                  y={y + 42}
                  textAnchor="middle"
                  fill="#52525b"
                  fontSize="8"
                >
                  {n.clientesActivos} cl. · {n.torresInstaladas} tor.
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Page ───

export default function MiRedPage() {
  const [view, setView] = useState<"tree" | "graph">("tree");
  const arbol = construirArbol(embajadorPrincipal.id);

  const totalRed = embajadores.length;
  const totalClientes = embajadores.reduce(
    (sum, e) => sum + e.clientesActivos,
    0
  );
  const totalTorres = embajadores.reduce(
    (sum, e) => sum + e.torresInstaladas,
    0
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Mi Red</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">
            Comunidad de operadores certificados
          </p>
        </div>
        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111111] border border-[#1e1e1e] self-start sm:self-auto">
          <button
            onClick={() => setView("tree")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all",
              view === "tree"
                ? "bg-[#22c55e]/10 text-[#22c55e]"
                : "text-[#a1a1aa] hover:text-white"
            )}
          >
            <TreePine className="w-4 h-4" />
            <span className="hidden sm:inline">Árbol</span>
          </button>
          <button
            onClick={() => setView("graph")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all",
              view === "graph"
                ? "bg-[#22c55e]/10 text-[#22c55e]"
                : "text-[#a1a1aa] hover:text-white"
            )}
          >
            <Network className="w-4 h-4" />
            <span className="hidden sm:inline">Grafo</span>
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-bold text-white">{totalRed}</p>
          <p className="text-[10px] md:text-xs text-[#a1a1aa] mt-1">Embajadores</p>
        </div>
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-bold text-white">{totalClientes}</p>
          <p className="text-[10px] md:text-xs text-[#a1a1aa] mt-1">Clientes</p>
        </div>
        <div className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-bold text-white">{totalTorres}</p>
          <p className="text-[10px] md:text-xs text-[#a1a1aa] mt-1">Torres</p>
        </div>
      </div>

      {/* Network view */}
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[#1e1e1e] bg-[#111111] p-4 md:p-6"
      >
        {view === "tree" ? (
          <div className="space-y-1">
            <div className="relative pl-0">
              <OrgNode nodo={arbol} />
            </div>
          </div>
        ) : (
          <RadialGraph />
        )}
      </motion.div>

      {/* Note */}
      <p className="text-xs text-[#52525b] text-center">
        Tu red crece a medida que capacitas y certificas nuevos embajadores.
        El liderazgo se mide por el impacto, no por el volumen.
      </p>
    </div>
  );
}
