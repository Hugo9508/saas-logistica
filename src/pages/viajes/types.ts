export type EstadoViaje = "realizado" | "pendiente" | "en_curso" | "cancelado";

export type TipoServicio =
  | "REMISE"
  | "TRASLADO_REGULAR_BODEGAS"
  | "TRASLADO_VUELTA_BODEGA"
  | "MOVIMIENTO_ENTRE_BODEGAS"
  | "SHUTTLE"
  | "CITY_TOUR"
  | "DISPOSICION"
  | "MINIVAN"
  | "OTRO";

export type MetodoCobro =
  | "efectivo"
  | "pix"
  | "link"
  | "transferencia"
  | "plataforma"
  | "otro";

export interface Viaje {
  id: string;
  empresa_id: string;
  ref_externa?: string;
  estado: EstadoViaje;
  fecha: string;
  hora?: string;
  chofer_id: string;
  cliente_id?: string;
  proveedor_id?: string;
  trayecto: TipoServicio | string;
  origen: string;
  destino: string;
  pasajeros_adultos?: number;
  pasajeros_menores?: number;
  pasajeros_infantes?: number;
  importe_usd?: number;
  importe_pesos?: number;
  comision_usd?: number;
  metodo_cobro?: MetodoCobro;
  paga_viajero?: boolean;
  obs_internas?: string;
  obs_cobros?: string;
  observaciones?: string;
  created_at: string;
}
