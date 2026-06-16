// src/types/finance.ts
// Interfaces TypeScript para el sistema SaaS Logística

export interface Empresa {
  id: string;
  nombre: string;
  razon_social?: string;
  metadata?: {
    rut?: string;
    logo_url?: string;
    datos_contacto?: {
      telefono?: string;
      email?: string;
      direccion?: string;
    };
    cuentas_bancarias?: CuentaBancaria[];
  };
  created_at?: string;
}

export interface CuentaBancaria {
  banco: string;
  nro_cuenta: string;
  moneda: 'USD' | 'UYU';
}

export interface Chofer {
  id: string;
  empresa_id: string;
  nombre: string;
  telefono?: string;
  email?: string;
  tipo: 'propio' | 'proveedor';
  comision_default?: number;
  activo?: boolean;
  metadata?: Record<string, unknown>;
  created_at?: string;
}

export interface Cliente {
  id: string;
  empresa_id: string;
  nombre_fantasia: string;
  razon_social?: string;
  tipo_cierre?: string;
  moneda?: 'USD' | 'UYU' | 'AMBAS';
  requiere_factura?: boolean;
  created_at?: string;
}

export interface Proveedor {
  id: string;
  empresa_id: string;
  nombre_fantasia: string;
  razon_social?: string;
  pais?: string;
  frecuencia?: string;
  moneda?: 'USD' | 'UYU' | 'AMBAS';
  created_at?: string;
}

export interface Viaje {
  id: string;
  empresa_id: string;
  chofer_id?: string;
  cliente_id?: string;
  proveedor_id?: string;
  ref_externa?: string;
  trayecto?: string;
  origen?: string;
  destino?: string;
  fecha?: string;
  hora?: string;
  pasajeros?: number;
  pasajeros_adultos?: number;
  pasajeros_menores?: number;
  pasajeros_infantes?: number;
  importe_usd?: number;
  importe_pesos?: number;
  comision_usd?: number;
  metodo_cobro?: string;
  paga_viajero?: boolean;
  estado?: 'pendiente' | 'realizado' | 'cancelado' | 'en_curso';
  obs_internas?: string;
  obs_cobros?: string;
  observaciones?: string;
  created_at?: string;
}

export type OrigenTipo = 'PAGO_FIJO' | 'PROVEEDOR' | 'CLIENTE' | 'CHOFER' | 'IMPUESTO';
export type EstadoPago = 'pendiente' | 'pagado' | 'vencido';
export type MetodoPago = 'transferencia' | 'debito_auto' | 'cheque' | 'efectivo';
export type Moneda = 'USD' | 'UYU';

export interface Pago {
  id: string;
  empresa_id: string;
  origen_tipo: OrigenTipo;
  origen_id?: string;
  monto: number;
  moneda: Moneda;
  fecha_pago: string;
  metodo: MetodoPago;
  estado: EstadoPago;
  comprobante_url?: string;
  created_at?: string;
}

export interface PagoFijo {
  id: string;
  empresa_id: string;
  categoria: string;
  detalle?: string;
  forma_pago?: string;
  moneda?: Moneda;
  valor_usd?: number;
  valor_pesos?: number;
  dia_vencimiento?: number;
  activo?: boolean;
  created_at?: string;
}

export interface CuentaCorriente {
  id: string;
  empresa_id: string;
  entidad_tipo: 'cliente' | 'proveedor';
  entidad_id: string;
  periodo?: string;
  importe_usd?: number;
  contados_usd?: number;
  pagos_usd?: number;
  saldo_usd?: number;
  importe_pesos?: number;
  contados_pesos?: number;
  pagos_pesos?: number;
  saldo_pesos?: number;
  created_at?: string;
}
