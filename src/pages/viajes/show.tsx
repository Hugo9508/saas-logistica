import { Show } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Badge, Card, Col, Descriptions, Divider, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const estadoColor: Record<string, string> = {
  realizado: "green",
  pendiente: "orange",
  cancelado: "red",
  en_curso: "blue",
};

export const ViajesShow = () => {
  const { query } = useShow();
  const viaje = query?.data?.data;

  const choferResponse = useOne({
    resource: "choferes",
    id: viaje?.chofer_id ?? "",
    queryOptions: { enabled: !!viaje?.chofer_id },
  }) as any;
  const choferData = choferResponse?.query?.data ?? choferResponse?.data;

  const clienteResponse = useOne({
    resource: "clientes",
    id: viaje?.cliente_id ?? "",
    queryOptions: { enabled: !!viaje?.cliente_id },
  }) as any;
  const clienteData = clienteResponse?.query?.data ?? clienteResponse?.data;

  const proveedorResponse = useOne({
    resource: "proveedores",
    id: viaje?.proveedor_id ?? "",
    queryOptions: { enabled: !!viaje?.proveedor_id },
  }) as any;
  const proveedorData = proveedorResponse?.query?.data ?? proveedorResponse?.data;

  const empresaResponse = useOne({
    resource: "empresas",
    id: viaje?.empresa_id ?? "",
    queryOptions: { enabled: !!viaje?.empresa_id },
  }) as any;
  const empresaData = empresaResponse?.query?.data ?? empresaResponse?.data;

  // Safe variables to prevent rendering objects
  const refExterna = viaje?.ref_externa ? String(viaje.ref_externa) : String(viaje?.id ?? "").substring(0, 8);
  const empresaNombre = empresaData?.data?.nombre ? String(empresaData.data.nombre) : "—";
  const estadoViaje = viaje?.estado ? String(viaje.estado) : "pendiente";
  
  const fechaFormatted = viaje?.fecha ? dayjs(String(viaje.fecha)).format("DD/MM/YYYY") : "—";
  const horaFormatted = viaje?.hora ? String(viaje.hora) : "—";
  const choferNombre = choferData?.data?.nombre ? String(choferData.data.nombre) : "—";
  const trayecto = viaje?.trayecto ? String(viaje.trayecto) : "—";
  const origen = viaje?.origen ? String(viaje.origen) : "—";
  const destino = viaje?.destino ? String(viaje.destino) : "—";
  
  const pAdultos = Number(viaje?.pasajeros_adultos ?? 0);
  const pMenores = Number(viaje?.pasajeros_menores ?? 0);
  const pInfantes = Number(viaje?.pasajeros_infantes ?? 0);

  return (
    <Show breadcrumb={false} title="Detalle del Viaje">
      <Row gutter={[16, 16]}>

        {/* ── ENCABEZADO ── */}
        <Col xs={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  🚗 Viaje #{refExterna}
                </Title>
                <Text type="secondary">{empresaNombre}</Text>
              </Col>
              <Col>
                <Tag
                  color={estadoColor[estadoViaje] ?? "default"}
                  style={{ fontSize: 14, padding: "4px 12px" }}
                >
                  {estadoViaje.toUpperCase()}
                </Tag>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* ── DATOS OPERATIVOS ── */}
        <Col xs={24} md={12}>
          <Card title="📋 Datos Operativos" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Fecha">
                <Text>{fechaFormatted}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Hora">
                <Text>{horaFormatted}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Chofer">
                <Text strong>{choferNombre}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tipo de Servicio">
                <Tag>{trayecto}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Origen">
                <Text>{origen}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Destino">
                <Text>{destino}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Pasajeros">
                <Text>
                  {pAdultos} adultos
                  {pMenores > 0 && ` · ${pMenores} menores`}
                  {pInfantes > 0 && ` · ${pInfantes} infantes`}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* ── DATOS DE COBRO ── */}
        <Col xs={24} md={12}>
          <Card title="💰 Cobro" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Importe USD">
                <Text strong style={{ color: "#52c41a", fontSize: 16 }}>
                  {Number(viaje?.importe_usd ?? 0) > 0 ? `$${Number(viaje?.importe_usd).toFixed(2)}` : "—"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Importe Pesos">
                <Text strong>
                  {Number(viaje?.importe_pesos ?? 0) > 0
                    ? `$${Number(viaje?.importe_pesos).toLocaleString("es-UY")}`
                    : "—"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Comisión USD">
                <Text type="danger">
                  {Number(viaje?.comision_usd ?? 0) > 0 ? `$${Number(viaje?.comision_usd).toFixed(2)}` : "—"}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Método de Cobro">
                {viaje?.metodo_cobro ? (
                  <Tag color="blue">{String(viaje.metodo_cobro).toUpperCase()}</Tag>
                ) : "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Paga Viajero">
                {viaje?.paga_viajero ? (
                  <Badge status="warning" text="Sí — cobra el chofer" />
                ) : (
                  <Badge status="default" text="No" />
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* ── RELACIONES ── */}
        <Col xs={24} md={12}>
          <Card title="🔗 Relaciones" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Cliente">
                <Text>{clienteData?.data?.nombre_fantasia ? String(clienteData.data.nombre_fantasia) : "—"}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Proveedor">
                <Text>{proveedorData?.data?.nombre_fantasia ? String(proveedorData.data.nombre_fantasia) : "—"}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Empresa">
                <Tag color="purple">{empresaNombre}</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* ── OBSERVACIONES ── */}
        <Col xs={24} md={12}>
          <Card title="📝 Observaciones" size="small">
            <Divider orientation="left" plain style={{ fontSize: 12 }}>Internas</Divider>
            <Text type="secondary">{viaje?.obs_internas ? String(viaje.obs_internas) : "Sin observaciones internas"}</Text>

            <Divider orientation="left" plain style={{ fontSize: 12 }}>Cobros</Divider>
            <Text>{viaje?.obs_cobros ? String(viaje.obs_cobros) : "Sin observaciones de cobro"}</Text>

            <Divider orientation="left" plain style={{ fontSize: 12 }}>Generales</Divider>
            <Text>{viaje?.observaciones ? String(viaje.observaciones) : "Sin observaciones generales"}</Text>
          </Card>
        </Col>

      </Row>
    </Show>
  );
};
