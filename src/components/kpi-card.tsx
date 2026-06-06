"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative group card-shine rounded-xl border border-[#1e1e1e] bg-[#111111] p-5 hover:border-[#22c55e]/20 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-[#22c55e]/5 border border-[#22c55e]/10">
          <div className="text-[#22c55e]">{icon}</div>
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend === "up" && "bg-[#22c55e]/10 text-[#22c55e]",
              trend === "down" && "bg-[#ef4444]/10 text-[#ef4444]",
              trend === "neutral" && "bg-[#f59e0b]/10 text-[#f59e0b]"
            )}
          >
            {trend === "up" && "↑ 12%"}
            {trend === "down" && "↓ 3%"}
            {trend === "neutral" && "→ 0%"}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-[#a1a1aa]">{title}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        {subtitle && (
          <p className="text-xs text-[#52525b]">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}
