import React from "react";
import { Show } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Badge, Card, Col, Descriptions, Divider, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { ESTADOS_VIAJE } from "./constants";

const { Title, Text } = Typography;

export const ViajesShow: React.FC = () => {
  const { query } = useShow();
  const viaje = query?.data?.data;

  // Relation loaders for related data
  const { data: choferResponse } = useOne({
    resource: "choferes",
    id: viaje?.chofer_id ?? "",
    queryOptions: { enabled: !!viaje?.chofer_id },
  }) as any;
  const choferData = choferResponse?.data;

  const { data: clienteResponse } = useOne({
    resource: "clientes",
    id: viaje?.cliente_id ?? "",
    queryOptions: { enabled: !!viaje?.cliente_id },
  }) as any;
  const clienteData = clienteResponse?.data;

  const { data: proveedorResponse } = useOne({
    resource: "proveedores",
    id: viaje?.proveedor_id ?? "",
    queryOptions: { enabled: !!viaje?.proveedor_id },
  }) as any;
  const proveedorData = proveedorResponse?.data;

  const { data: empresaResponse } = useOne({
    resource: "empresas",
    id: viaje?.empresa_id ?? "",
    queryOptions: { enabled: !!viaje?.empresa_id },
  }) as any;
  const empresaData = empresaResponse?.data;

  const refExterna = viaje?.ref_externa ? String(viaje.ref_externa) : String(viaje?.id ?? "").substring(0, 8);
  const empresaNombre = empresaData?.nombre ? String(empresaData.nombre) : "—";
  const estadoViaje = viaje?.estado ? String(viaje.estado) : "pendiente";

  const fechaFormatted = viaje?.fecha ? dayjs(String(viaje.fecha)).format("DD/MM/YYYY") : "—";
  const horaFormatted = viaje?.hora ? String(viaje.hora) : "—";
  const choferNombre = choferData?.nombre ? String(choferData.nombre) : "—";
  const trayecto = viaje?.trayecto ? String(viaje.trayecto) : "—";
  const origen = viaje?.origen ? String(viaje.origen) : "—";
  const destino = viaje?.destino ? String(viaje.destino) : "—";

  const pAdultos = Number(viaje?.pasajeros_adultos ?? 0);
  const pMenores = Number(viaje?.pasajeros_menores ?? 0);
  const pInfantes = Number(viaje?.pasajeros_infantes ?? 0);

  const getEstadoColor = (est: string) => {
    return ESTADOS_VIAJE.find((item) => item.value === est)?.color || "default";
  };

  return (
    <Show breadcrumb={false} title="Ficha de Trazabilidad Integral del Viaje">
      <Row gutter={[16, 16]}>
        {/* Header Summary */}
        <Col xs={24}>
          <Card bordered={false} className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg shadow-sm">
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} className="!text-white !m-0">
                  🚗 Viaje #{refExterna}
                </Title>
                <Text className="text-slate-300 font-medium">Empresa: {empresaNombre}</Text>
              </Col>
              <Col>
                <Tag
                  color={getEstadoColor(estadoViaje)}
                  className="text-sm font-bold uppercase px-3 py-1 border-0 rounded"
                >
                  {estadoViaje.toUpperCase()}
                </Tag>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Operational Segment */}
        <Col xs={24} md={12}>
          <Card title="📋 Segmento Operativo" size="small" className="shadow-sm rounded-lg">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Fecha Planificada">
                <Text className="font-mono">{fechaFormatted}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Hora Estimativa">
                <Text className="font-mono">{horaFormatted}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Chofer de Unidad">
                <Text strong className="text-blue-600">{choferNombre}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tipo de Servicio">
                <Tag color="cyan">{trayecto}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Punto de Retiro (Origen)">
                <Text>{origen}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Punto de Entrega (Destino)">
                <Text>{destino}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Carga Pasajeros">
                <Text>
                  {pAdultos} Adultos
                  {pMenores > 0 && ` · ${pMenores} Menores`}
                  {pInfantes > 0 && ` · ${pInfantes} Infantes`}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Pricing Segment */}
        <Col xs={24} md={12}>
          <Card title="💰 Segmento Comercial y Cobros" size="small" className="shadow-sm rounded-lg">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Importe Total USD">
                <Text strong className="text-lg text-emerald-600 font-mono">
                  {Number(viaje?.importe_usd ?? 0) > 0 ? `$${Number(viaje?.importe_usd).toFixed(2)}` : "—"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Importe Pesos UYU">
                <Text strong className="text-lg text-blue-600 font-mono">
                  {Number(viaje?.importe_pesos ?? 0) > 0
                    ? `$${Number(viaje?.importe_pesos).toLocaleString("es-UY")}`
                    : "—"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Retención de Comisión (USD)">
                <Text type="danger" className="font-mono">
                  {Number(viaje?.comision_usd ?? 0) > 0 ? `$${Number(viaje?.comision_usd).toFixed(2)}` : "—"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Método de Cobro">
                {viaje?.metodo_cobro ? (
                  <Tag color="purple">{String(viaje.metodo_cobro).toUpperCase()}</Tag>
                ) : "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Modalidad Pasajero">
                {viaje?.paga_viajero ? (
                  <Badge status="warning" text="Pasajero abona directo al Chofer" />
                ) : (
                  <Badge status="default" text="Cobranza corporativa centralizada" />
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Association Segment */}
        <Col xs={24} md={12}>
          <Card title="🔗 Relaciones de Entidades" size="small" className="shadow-sm rounded-lg">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Cliente Contratante">
                <Text>{clienteData?.nombre_fantasia ? String(clienteData.nombre_fantasia) : "—"}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Proveedor / Tercero">
                <Text>{proveedorData?.nombre_fantasia ? String(proveedorData.nombre_fantasia) : "—"}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Empresa Emisora">
                <Tag color="geekblue">{empresaNombre}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Remarks Section */}
        <Col xs={24} md={12}>
          <Card title="📝 Observaciones Detalladas" size="small" className="shadow-sm rounded-lg">
            <Divider orientation="left" plain className="!m-1 text-[11px] uppercase tracking-wider text-muted-foreground">Logística / Internas</Divider>
            <Text className="block min-h-11 text-slate-600 p-2 bg-muted/20 border border-slate-100 rounded">
              {viaje?.obs_internas ? String(viaje.obs_internas) : "Ninguna anotación interna registrada."}
            </Text>

            <Divider orientation="left" plain className="!mt-4 !mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">Cobranzas / Pasarelas</Divider>
            <Text className="block min-h-11 text-slate-600 p-2 bg-muted/20 border border-slate-100 rounded">
              {viaje?.obs_cobros ? String(viaje.obs_cobros) : "Ninguna anotación mercantil registrada."}
            </Text>

            <Divider orientation="left" plain className="!mt-4 !mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">Generales / Pasajeros</Divider>
            <Text className="block min-h-11 text-slate-600 p-2 bg-muted/20 border border-slate-100 rounded">
              {viaje?.observaciones ? String(viaje.observaciones) : "Ninguna anotación general registrada."}
            </Text>
          </Card>
        </Col>
      </Row>
    </Show>
  );
};
