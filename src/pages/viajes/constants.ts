import { EstadoViaje, TipoServicio, MetodoCobro } from "./types";

export const ESTADOS_VIAJE: { value: EstadoViaje; label: string; color: string }[] = [
  { value: "realizado", label: "✅ Realizado", color: "green" },
  { value: "pendiente", label: "⏳ Pendiente", color: "orange" },
  { value: "en_curso", label: "🔄 En curso", color: "blue" },
  { value: "cancelado", label: "❌ Cancelado", color: "red" },
];

export const TIPOS_SERVICIO: { value: TipoServicio; label: string }[] = [
  { value: "REMISE", label: "🚗 Remise" },
  { value: "TRASLADO_REGULAR_BODEGAS", label: "🍷 Traslado Regular Bodegas" },
  { value: "TRASLADO_VUELTA_BODEGA", label: "🔄 Traslado Vuelta Bodega" },
  { value: "MOVIMIENTO_ENTRE_BODEGAS", label: "↔️ Movimiento entre Bodegas" },
  { value: "SHUTTLE", label: "🚌 Shuttle Compartido" },
  { value: "CITY_TOUR", label: "🗺️ City Tour" },
  { value: "DISPOSICION", label: "📍 Disposición" },
  { value: "MINIVAN", label: "🚐 Minivan" },
  { value: "OTRO", label: "📋 Otro" },
];

export const METODOS_COBRO: { value: MetodoCobro; label: string }[] = [
  { value: "efectivo", label: "💵 Efectivo" },
  { value: "pix", label: "📱 PIX" },
  { value: "link", label: "🔗 Link de pago" },
  { value: "transferencia", label: "🏦 Transferencia" },
  { value: "plataforma", label: "💻 Plataforma" },
  { value: "otro", label: "📋 Otro" },
];
