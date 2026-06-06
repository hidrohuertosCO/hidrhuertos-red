// ─── Datos Mock — Red de Embajadores de Resiliencia ───

export interface Embajador {
  id: string;
  nombre: string;
  foto: string;
  rango: Rango;
  ciudad: string;
  fechaIngreso: Date;
  clientesActivos: number;
  torresInstaladas: number;
  produccionEstimada: number;
  aguaAhorrada: number;
  comisionesMes: number;
  mrrGenerado: number;
  certificaciones: string[];
  logros: string[];
  padreId: string | null;
  nivel: number;
}

export interface Cliente {
  id: string;
  nombre: string;
  ciudad: string;
  torre: string;
  estado: "Activo" | "Atención requerida" | "Excelente desempeño";
  produccion: number;
  ultimaActividad: Date;
  embajadorId: string;
}

export interface EstadisticaMensual {
  mes: string;
  ventas: number;
  clientesActivos: number;
  nutrientesVendidos: number;
  ingresosRecurrentes: number;
}

export interface Certificacion {
  id: string;
  nombre: string;
  rango: Rango;
  descripcion: string;
  estado: "Completado" | "En progreso" | "Bloqueado";
  horas: number;
  modulos: number;
  evaluacion: string;
  porcentaje: number;
  icono: string;
}

export interface ImpactoMensual {
  mes: string;
  aguaAhorrada: number;
  produccionLocal: number;
  co2Evitado: number;
  familiasImpactadas: number;
}

export interface Logro {
  id: string;
  nombre: string;
  descripcion: string;
  desbloqueado: boolean;
  fecha: Date | null;
  icono: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  progreso: number;
  estado: "Completado" | "En progreso" | "Bloqueado";
  modulos: number;
  modulosCompletados: number;
  categoria: string;
}

export type Rango =
  | "Embajador Semilla"
  | "Embajador Brote"
  | "Embajador Raíz"
  | "Embajador Tallo"
  | "Embajador Resiliente";

// ─── Constantes ───

export const RANGOS: { nombre: Rango; minimoClientes: number; minimoTorres: number; color: string }[] = [
  { nombre: "Embajador Semilla", minimoClientes: 0, minimoTorres: 0, color: "#a1a1aa" },
  { nombre: "Embajador Brote", minimoClientes: 3, minimoTorres: 5, color: "#86efac" },
  { nombre: "Embajador Raíz", minimoClientes: 8, minimoTorres: 15, color: "#22c55e" },
  { nombre: "Embajador Tallo", minimoClientes: 20, minimoTorres: 35, color: "#16a34a" },
  { nombre: "Embajador Resiliente", minimoClientes: 50, minimoTorres: 80, color: "#15803d" },
];

export const CIUDADES = [
  "Montería", "Sincelejo", "Apartadó", "Turbo", "Cereté",
  "San Marcos", "Sahagún", "San Antero", "Lorica", "Tolú",
  "Sincelejo", "Coveñas", "San Pelayo", "Planeta Rica", "Montelíbano",
];

export const TORRES = [
  "HidroTorre H-100", "HidroTorre H-200", "HidroTorre H-300",
  "HidroTorre H-400", "MicroTorre M-50", "MicroTorre M-100",
];

// ─── Embajadores ───

export const embajadores: Embajador[] = [
  {
    id: "emb-01",
    nombre: "Alex Montenegro",
    foto: "AM",
    rango: "Embajador Raíz",
    ciudad: "Montería",
    fechaIngreso: new Date("2024-01-15"),
    clientesActivos: 12,
    torresInstaladas: 18,
    produccionEstimada: 95,
    aguaAhorrada: 28500,
    comisionesMes: 1850000,
    mrrGenerado: 780000,
    certificaciones: ["Embajador Semilla", "Embajador Brote", "Embajador Raíz"],
    logros: ["Primera Torre", "10 Clientes", "Mentor"],
    padreId: null,
    nivel: 0,
  },
  {
    id: "emb-02",
    nombre: "Juan Martínez",
    foto: "JM",
    rango: "Embajador Brote",
    ciudad: "Sincelejo",
    fechaIngreso: new Date("2024-03-20"),
    clientesActivos: 7,
    torresInstaladas: 9,
    produccionEstimada: 52,
    aguaAhorrada: 14200,
    comisionesMes: 920000,
    mrrGenerado: 380000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre", "5 Clientes"],
    padreId: "emb-01",
    nivel: 1,
  },
  {
    id: "emb-03",
    nombre: "Ana Soto",
    foto: "AS",
    rango: "Embajador Brote",
    ciudad: "Montería",
    fechaIngreso: new Date("2024-04-10"),
    clientesActivos: 5,
    torresInstaladas: 7,
    produccionEstimada: 38,
    aguaAhorrada: 11000,
    comisionesMes: 650000,
    mrrGenerado: 290000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre"],
    padreId: "emb-02",
    nivel: 2,
  },
  {
    id: "emb-04",
    nombre: "Pedro Ramírez",
    foto: "PR",
    rango: "Embajador Semilla",
    ciudad: "Apartadó",
    fechaIngreso: new Date("2024-06-01"),
    clientesActivos: 3,
    torresInstaladas: 4,
    produccionEstimada: 22,
    aguaAhorrada: 6800,
    comisionesMes: 340000,
    mrrGenerado: 120000,
    certificaciones: ["Embajador Semilla"],
    logros: ["Primera Torre"],
    padreId: "emb-02",
    nivel: 2,
  },
  {
    id: "emb-05",
    nombre: "Carlos Mendoza",
    foto: "CM",
    rango: "Embajador Tallo",
    ciudad: "Turbo",
    fechaIngreso: new Date("2023-11-05"),
    clientesActivos: 22,
    torresInstaladas: 31,
    produccionEstimada: 158,
    aguaAhorrada: 42000,
    comisionesMes: 3100000,
    mrrGenerado: 1450000,
    certificaciones: ["Embajador Semilla", "Embajador Brote", "Embajador Raíz", "Embajador Tallo"],
    logros: ["Primera Torre", "20 Clientes", "Mentor", "Excelencia"],
    padreId: null,
    nivel: 0,
  },
  {
    id: "emb-06",
    nombre: "Laura Gómez",
    foto: "LG",
    rango: "Embajador Brote",
    ciudad: "Cereté",
    fechaIngreso: new Date("2024-02-14"),
    clientesActivos: 6,
    torresInstaladas: 8,
    produccionEstimada: 45,
    aguaAhorrada: 12500,
    comisionesMes: 780000,
    mrrGenerado: 310000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre"],
    padreId: "emb-05",
    nivel: 1,
  },
  {
    id: "emb-07",
    nombre: "David Torres",
    foto: "DT",
    rango: "Embajador Semilla",
    ciudad: "San Marcos",
    fechaIngreso: new Date("2024-07-22"),
    clientesActivos: 2,
    torresInstaladas: 3,
    produccionEstimada: 15,
    aguaAhorrada: 4500,
    comisionesMes: 210000,
    mrrGenerado: 85000,
    certificaciones: ["Embajador Semilla"],
    logros: [],
    padreId: "emb-05",
    nivel: 1,
  },
  {
    id: "emb-08",
    nombre: "María Valencia",
    foto: "MV",
    rango: "Embajador Brote",
    ciudad: "Sahagún",
    fechaIngreso: new Date("2024-03-08"),
    clientesActivos: 8,
    torresInstaladas: 11,
    produccionEstimada: 62,
    aguaAhorrada: 17000,
    comisionesMes: 1050000,
    mrrGenerado: 450000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre", "10 Clientes"],
    padreId: "emb-01",
    nivel: 1,
  },
  {
    id: "emb-09",
    nombre: "Felipe Ríos",
    foto: "FR",
    rango: "Embajador Semilla",
    ciudad: "San Antero",
    fechaIngreso: new Date("2024-08-15"),
    clientesActivos: 1,
    torresInstaladas: 2,
    produccionEstimada: 8,
    aguaAhorrada: 2400,
    comisionesMes: 125000,
    mrrGenerado: 42000,
    certificaciones: ["Embajador Semilla"],
    logros: [],
    padreId: "emb-08",
    nivel: 2,
  },
  {
    id: "emb-10",
    nombre: "Camila Rodríguez",
    foto: "CR",
    rango: "Embajador Raíz",
    ciudad: "Lorica",
    fechaIngreso: new Date("2024-01-28"),
    clientesActivos: 14,
    torresInstaladas: 20,
    produccionEstimada: 110,
    aguaAhorrada: 32000,
    comisionesMes: 2100000,
    mrrGenerado: 890000,
    certificaciones: ["Embajador Semilla", "Embajador Brote", "Embajador Raíz"],
    logros: ["Primera Torre", "10 Clientes", "Mentor"],
    padreId: null,
    nivel: 0,
  },
  {
    id: "emb-11",
    nombre: "Andrés Castro",
    foto: "AC",
    rango: "Embajador Brote",
    ciudad: "Tolú",
    fechaIngreso: new Date("2024-05-12"),
    clientesActivos: 4,
    torresInstaladas: 6,
    produccionEstimada: 32,
    aguaAhorrada: 9200,
    comisionesMes: 510000,
    mrrGenerado: 210000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre"],
    padreId: "emb-10",
    nivel: 1,
  },
  {
    id: "emb-12",
    nombre: "Sofía Hernández",
    foto: "SH",
    rango: "Embajador Semilla",
    ciudad: "San Pelayo",
    fechaIngreso: new Date("2024-09-01"),
    clientesActivos: 1,
    torresInstaladas: 1,
    produccionEstimada: 5,
    aguaAhorrada: 1500,
    comisionesMes: 85000,
    mrrGenerado: 28000,
    certificaciones: ["Embajador Semilla"],
    logros: [],
    padreId: "emb-10",
    nivel: 1,
  },
  {
    id: "emb-13",
    nombre: "Diego Jiménez",
    foto: "DJ",
    rango: "Embajador Semilla",
    ciudad: "Planeta Rica",
    fechaIngreso: new Date("2024-10-20"),
    clientesActivos: 0,
    torresInstaladas: 1,
    produccionEstimada: 3,
    aguaAhorrada: 800,
    comisionesMes: 45000,
    mrrGenerado: 12000,
    certificaciones: ["Embajador Semilla"],
    logros: [],
    padreId: "emb-01",
    nivel: 1,
  },
  {
    id: "emb-14",
    nombre: "Valentina Orozco",
    foto: "VO",
    rango: "Embajador Brote",
    ciudad: "Montelíbano",
    fechaIngreso: new Date("2024-04-22"),
    clientesActivos: 5,
    torresInstaladas: 7,
    produccionEstimada: 40,
    aguaAhorrada: 11500,
    comisionesMes: 680000,
    mrrGenerado: 275000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre"],
    padreId: "emb-05",
    nivel: 1,
  },
  {
    id: "emb-15",
    nombre: "Jorge Salazar",
    foto: "JS",
    rango: "Embajador Semilla",
    ciudad: "Coveñas",
    fechaIngreso: new Date("2024-11-10"),
    clientesActivos: 0,
    torresInstaladas: 1,
    produccionEstimada: 2,
    aguaAhorrada: 600,
    comisionesMes: 32000,
    mrrGenerado: 8000,
    certificaciones: [],
    logros: [],
    padreId: "emb-06",
    nivel: 2,
  },
  {
    id: "emb-16",
    nombre: "Daniela Páez",
    foto: "DP",
    rango: "Embajador Brote",
    ciudad: "Montería",
    fechaIngreso: new Date("2024-06-15"),
    clientesActivos: 6,
    torresInstaladas: 9,
    produccionEstimada: 48,
    aguaAhorrada: 13500,
    comisionesMes: 820000,
    mrrGenerado: 340000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre"],
    padreId: "emb-01",
    nivel: 1,
  },
  {
    id: "emb-17",
    nombre: "Alejandro Moreno",
    foto: "AM",
    rango: "Embajador Semilla",
    ciudad: "Sincelejo",
    fechaIngreso: new Date("2024-12-01"),
    clientesActivos: 1,
    torresInstaladas: 1,
    produccionEstimada: 4,
    aguaAhorrada: 1200,
    comisionesMes: 58000,
    mrrGenerado: 15000,
    certificaciones: [],
    logros: [],
    padreId: "emb-08",
    nivel: 2,
  },
  {
    id: "emb-18",
    nombre: "Carolina Peña",
    foto: "CP",
    rango: "Embajador Raíz",
    ciudad: "Turbo",
    fechaIngreso: new Date("2024-02-05"),
    clientesActivos: 15,
    torresInstaladas: 22,
    produccionEstimada: 125,
    aguaAhorrada: 35000,
    comisionesMes: 2350000,
    mrrGenerado: 950000,
    certificaciones: ["Embajador Semilla", "Embajador Brote", "Embajador Raíz"],
    logros: ["Primera Torre", "10 Clientes", "Excelencia"],
    padreId: "emb-05",
    nivel: 1,
  },
  {
    id: "emb-19",
    nombre: "Manuel Aguilar",
    foto: "MA",
    rango: "Embajador Semilla",
    ciudad: "Cereté",
    fechaIngreso: new Date("2025-01-15"),
    clientesActivos: 0,
    torresInstaladas: 1,
    produccionEstimada: 2,
    aguaAhorrada: 500,
    comisionesMes: 25000,
    mrrGenerado: 6000,
    certificaciones: [],
    logros: [],
    padreId: "emb-18",
    nivel: 2,
  },
  {
    id: "emb-20",
    nombre: "Paola Quintana",
    foto: "PQ",
    rango: "Embajador Brote",
    ciudad: "Apartadó",
    fechaIngreso: new Date("2024-07-30"),
    clientesActivos: 4,
    torresInstaladas: 6,
    produccionEstimada: 30,
    aguaAhorrada: 8500,
    comisionesMes: 480000,
    mrrGenerado: 195000,
    certificaciones: ["Embajador Semilla", "Embajador Brote"],
    logros: ["Primera Torre"],
    padreId: "emb-10",
    nivel: 1,
  },
];

// ─── Estadísticas Mensuales (12 meses) ───

export const estadisticasMensuales: EstadisticaMensual[] = [
  { mes: "Ene", ventas: 4, clientesActivos: 8, nutrientesVendidos: 12, ingresosRecurrentes: 120000 },
  { mes: "Feb", ventas: 6, clientesActivos: 12, nutrientesVendidos: 18, ingresosRecurrentes: 185000 },
  { mes: "Mar", ventas: 8, clientesActivos: 16, nutrientesVendidos: 25, ingresosRecurrentes: 260000 },
  { mes: "Abr", ventas: 7, clientesActivos: 20, nutrientesVendidos: 22, ingresosRecurrentes: 320000 },
  { mes: "May", ventas: 10, clientesActivos: 24, nutrientesVendidos: 30, ingresosRecurrentes: 390000 },
  { mes: "Jun", ventas: 12, clientesActivos: 28, nutrientesVendidos: 35, ingresosRecurrentes: 450000 },
  { mes: "Jul", ventas: 9, clientesActivos: 30, nutrientesVendidos: 28, ingresosRecurrentes: 480000 },
  { mes: "Ago", ventas: 14, clientesActivos: 34, nutrientesVendidos: 40, ingresosRecurrentes: 540000 },
  { mes: "Sep", ventas: 11, clientesActivos: 36, nutrientesVendidos: 32, ingresosRecurrentes: 590000 },
  { mes: "Oct", ventas: 15, clientesActivos: 40, nutrientesVendidos: 45, ingresosRecurrentes: 650000 },
  { mes: "Nov", ventas: 13, clientesActivos: 44, nutrientesVendidos: 38, ingresosRecurrentes: 710000 },
  { mes: "Dic", ventas: 16, clientesActivos: 48, nutrientesVendidos: 48, ingresosRecurrentes: 780000 },
];

// ─── Clientes (50) ───

const nombres = [
  "Héctor Pineda", "Rosa Álvarez", "Luis Torres", "Carmen Díaz", "Fernando Mora",
  "Patricia Rojas", "Gabriel Castillo", "Diana Núñez", "Óscar Guerrero", "Mónica Serrano",
  "Ricardo León", "Tatiana Vidal", "Eduardo Rivas", "Natalia Campos", "Alberto Peña",
  "Silvia Duarte", "Javier Méndez", "Adriana Ríos", "Pablo Carvajal", "María Solano",
  "Gustavo Pacheco", "Lorena Figueroa", "Arturo Vega", "Beatriz Nava", "Rodrigo Acosta",
  "Isabel Córdoba", "Mauricio Lara", "Vanessa Quintero", "Simón Barrios", "Julieta Meza",
  "Federico Ocampo", "Ángela Hurtado", "Esteban Rueda", "Carolina Pardo", "Humberto Vera",
  "Marcela Cantillo", "Iván Mestre", "Paula Escobar", "Ramiro Sandoval", "Daniela Franco",
  "César Linares", "Manuela Cortés", "Tomás Becerra", "Ximena Aguirre", "Leonardo Rocha",
  "Gabriela Montes", "Andrés Solís", "Fernanda Quintana", "Julián Pizarro", "Lucía Herrán",
];

const estados: Cliente["estado"][] = ["Activo", "Activo", "Activo", "Activo", "Activo", "Activo", "Activo", "Excelente desempeño", "Excelente desempeño", "Atención requerida"];

export const clientes: Cliente[] = nombres.map((nombre, i) => ({
  id: `cli-${String(i + 1).padStart(3, "0")}`,
  nombre,
  ciudad: CIUDADES[i % CIUDADES.length],
  torre: TORRES[i % TORRES.length],
  estado: estados[i % estados.length] as Cliente["estado"],
  produccion: Math.round(12 + Math.random() * 40),
  ultimaActividad: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
  embajadorId: embajadores[i % embajadores.length].id,
}));

// ─── Certificaciones ───

export const certificaciones: Certificacion[] = [
  {
    id: "cert-01",
    nombre: "Introducción a HidroHuertos",
    rango: "Embajador Semilla",
    descripcion: "Fundamentos de hidroponía, misión de la red y operación básica de torres.",
    estado: "Completado",
    horas: 8,
    modulos: 4,
    evaluacion: "96%",
    porcentaje: 100,
    icono: "Sprout",
  },
  {
    id: "cert-02",
    nombre: "Instalación básica",
    rango: "Embajador Brote",
    descripcion: "Montaje, calibración y puesta en marcha de HidroTorres y MicroTorres.",
    estado: "Completado",
    horas: 16,
    modulos: 6,
    evaluacion: "92%",
    porcentaje: 100,
    icono: "Wrench",
  },
  {
    id: "cert-03",
    nombre: "Diagnóstico de cultivos",
    rango: "Embajador Raíz",
    descripcion: "Identificación de deficiencias nutricionales, plagas y estrés hídrico en cultivos hidropónicos.",
    estado: "En progreso",
    horas: 24,
    modulos: 8,
    evaluacion: "78%",
    porcentaje: 72,
    icono: "Search",
  },
  {
    id: "cert-04",
    nombre: "SOP-20 — Protocolo Operativo Estándar",
    rango: "Embajador Tallo",
    descripcion: "Gestión avanzada de sistemas IoT, análisis de datos de sensores y optimización de producción.",
    estado: "Bloqueado",
    horas: 32,
    modulos: 10,
    evaluacion: "—",
    porcentaje: 0,
    icono: "Cpu",
  },
  {
    id: "cert-05",
    nombre: "Operación avanzada de red",
    rango: "Embajador Resiliente",
    descripcion: "Liderazgo de red, mentoría de nuevos embajadores y expansión de infraestructura alimentaria.",
    estado: "Bloqueado",
    horas: 48,
    modulos: 12,
    evaluacion: "—",
    porcentaje: 0,
    icono: "Award",
  },
];

// ─── Logros ───

export const logros: Logro[] = [
  { id: "log-01", nombre: "Primera Torre", descripcion: "Instalaste tu primera HidroTorre", desbloqueado: true, fecha: new Date("2024-02-10"), icono: "TowerControl" },
  { id: "log-02", nombre: "5 Clientes", descripcion: "Alcanzaste 5 clientes activos en tu red", desbloqueado: true, fecha: new Date("2024-04-15"), icono: "Users" },
  { id: "log-03", nombre: "10 Clientes", descripcion: "Alcanzaste 10 clientes activos en tu red", desbloqueado: true, fecha: new Date("2024-07-20"), icono: "Users" },
  { id: "log-04", nombre: "20 Clientes", descripcion: "Alcanzaste 20 clientes activos en tu red", desbloqueado: false, fecha: null, icono: "Users" },
  { id: "log-05", nombre: "Mentor", descripcion: "Un embajador de tu red completó su primera certificación", desbloqueado: true, fecha: new Date("2024-06-01"), icono: "GraduationCap" },
  { id: "log-06", nombre: "Excelencia", descripcion: "Calificación perfecta en un módulo de certificación", desbloqueado: true, fecha: new Date("2024-05-12"), icono: "Star" },
  { id: "log-07", nombre: "100 Torres", descripcion: "Tu red alcanzó 100 torres instaladas", desbloqueado: false, fecha: null, icono: "TowerControl" },
  { id: "log-08", nombre: "Resiliencia", descripcion: "Mantuviste producción activa por 6 meses consecutivos", desbloqueado: false, fecha: null, icono: "Heart" },
  { id: "log-09", nombre: "Embajador del Mes", descripcion: "Reconocimiento mensual al mejor desempeño de la red", desbloqueado: true, fecha: new Date("2024-08-01"), icono: "Medal" },
  { id: "log-10", nombre: "IoT Avanzado", descripcion: "Completaste el módulo de integración IoT", desbloqueado: false, fecha: null, icono: "CircuitBoard" },
];

// ─── Cursos (Centro de Aprendizaje) ───

export const cursos: Curso[] = [
  {
    id: "cur-01",
    titulo: "Introducción a la hidroponía",
    descripcion: "Principios básicos de cultivo hidropónico, sistemas NFT, DFT y sustratos.",
    duracion: "4 horas",
    progreso: 100,
    estado: "Completado",
    modulos: 5,
    modulosCompletados: 5,
    categoria: "Fundamentos",
  },
  {
    id: "cur-02",
    titulo: "Fórmula Maestra A+B",
    descripcion: "Preparación y balance de soluciones nutritivas para diferentes etapas del cultivo.",
    duracion: "6 horas",
    progreso: 100,
    estado: "Completado",
    modulos: 6,
    modulosCompletados: 6,
    categoria: "Nutrición",
  },
  {
    id: "cur-03",
    titulo: "Gestión térmica",
    descripcion: "Control de temperatura, humedad y ventilación en invernaderos y cultivos indoor.",
    duracion: "8 horas",
    progreso: 72,
    estado: "En progreso",
    modulos: 8,
    modulosCompletados: 6,
    categoria: "Ambiente",
  },
  {
    id: "cur-04",
    titulo: "SOP-20: Protocolo Operativo",
    descripcion: "Estándar operativo para mantenimiento preventivo y correctivo de torres hidropónicas.",
    duracion: "12 horas",
    progreso: 0,
    estado: "Bloqueado",
    modulos: 10,
    modulosCompletados: 0,
    categoria: "Operación",
  },
  {
    id: "cur-05",
    titulo: "Diagnóstico nutricional",
    descripcion: "Identificación visual y por sensores de deficiencias nutricionales en plantas.",
    duracion: "10 horas",
    progreso: 45,
    estado: "En progreso",
    modulos: 8,
    modulosCompletados: 4,
    categoria: "Nutrición",
  },
  {
    id: "cur-06",
    titulo: "Instalación IoT",
    descripcion: "Configuración de sensores de pH, EC, temperatura y conectividad para monitoreo remoto.",
    duracion: "8 horas",
    progreso: 0,
    estado: "Bloqueado",
    modulos: 7,
    modulosCompletados: 0,
    categoria: "IoT",
  },
];

// ─── Impacto Mensual ───

export const impactoMensual: ImpactoMensual[] = [
  { mes: "Ene", aguaAhorrada: 5200, produccionLocal: 28, co2Evitado: 0.12, familiasImpactadas: 8 },
  { mes: "Feb", aguaAhorrada: 7800, produccionLocal: 35, co2Evitado: 0.15, familiasImpactadas: 12 },
  { mes: "Mar", aguaAhorrada: 10400, produccionLocal: 42, co2Evitado: 0.18, familiasImpactadas: 16 },
  { mes: "Abr", aguaAhorrada: 9500, produccionLocal: 38, co2Evitado: 0.16, familiasImpactadas: 20 },
  { mes: "May", aguaAhorrada: 12800, produccionLocal: 48, co2Evitado: 0.21, familiasImpactadas: 24 },
  { mes: "Jun", aguaAhorrada: 14200, produccionLocal: 52, co2Evitado: 0.23, familiasImpactadas: 28 },
  { mes: "Jul", aguaAhorrada: 11500, produccionLocal: 45, co2Evitado: 0.19, familiasImpactadas: 30 },
  { mes: "Ago", aguaAhorrada: 15800, produccionLocal: 58, co2Evitado: 0.26, familiasImpactadas: 34 },
  { mes: "Sep", aguaAhorrada: 13500, produccionLocal: 50, co2Evitado: 0.22, familiasImpactadas: 36 },
  { mes: "Oct", aguaAhorrada: 17200, produccionLocal: 62, co2Evitado: 0.28, familiasImpactadas: 40 },
  { mes: "Nov", aguaAhorrada: 14800, produccionLocal: 55, co2Evitado: 0.24, familiasImpactadas: 44 },
  { mes: "Dic", aguaAhorrada: 18500, produccionLocal: 68, co2Evitado: 0.31, familiasImpactadas: 48 },
];

// ─── Función para calcular progresión de rango ───

export function calcularProgresoRango(clientes: number, torres: number, rangoActual: Rango): {
  porcentaje: number;
  siguienteRango: Rango | null;
  clientesRestantes: number;
  torresRestantes: number;
} {
  const idx = RANGOS.findIndex((r) => r.nombre === rangoActual);
  if (idx === -1 || idx >= RANGOS.length - 1) {
    return { porcentaje: 100, siguienteRango: null, clientesRestantes: 0, torresRestantes: 0 };
  }
  const actual = RANGOS[idx];
  const siguiente = RANGOS[idx + 1];
  const clientesRestantes = Math.max(0, siguiente.minimoClientes - clientes);
  const torresRestantes = Math.max(0, siguiente.minimoTorres - torres);
  const progresoClientes = Math.min(1, clientes / siguiente.minimoClientes);
  const progresoTorres = Math.min(1, torres / siguiente.minimoTorres);
  const porcentaje = Math.round(Math.min(100, ((progresoClientes + progresoTorres) / 2) * 100));
  return { porcentaje, siguienteRango: siguiente.nombre, clientesRestantes, torresRestantes };
}

// ─── Datos del embajador principal ───

export const embajadorPrincipal = embajadores[0];

export function getEmbajadorById(id: string) {
  return embajadores.find((e) => e.id === id);
}

export function getClientesByEmbajador(embajadorId: string) {
  return clientes.filter((c) => c.embajadorId === embajadorId);
}

export function getSubordinados(embajadorId: string): Embajador[] {
  return embajadores.filter((e) => e.padreId === embajadorId);
}

export function construirArbol(embajadorId: string): ArbolNodo {
  const emb = getEmbajadorById(embajadorId)!;
  const hijos = getSubordinados(embajadorId);
  return {
    ...emb,
    hijos: hijos.map((h) => construirArbol(h.id)),
  };
}

export interface ArbolNodo extends Embajador {
  hijos: ArbolNodo[];
}
