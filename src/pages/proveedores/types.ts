export interface Proveedor {
  id: string;
  empresa_id: string;
  nombre_contacto?: string;
  nombre_fantasia: string;
  razon_social?: string;
  rut?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  cuenta_bancaria?: string;
  banco_nombre?: string;
  comision_porcentaje?: number;
  activo: boolean;
  notas?: string;
  created_at: string;
}
