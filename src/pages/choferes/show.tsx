import { DateField, List, Show, useTable } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Badge, Card, Col, Descriptions, Row, Table, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export const ChoferesShow = () => {
  const { query } = useShow();
  const chofer = query?.data?.data;

  const empresaResponse = useOne({
    resource: "empresas",
    id: chofer?.empresa_id ?? "",
    queryOptions: { enabled: !!chofer?.empresa_id },
  }) as any;
  const empresaData = empresaResponse.data;

  const { tableProps: viajesTableProps } = useTable({
    resource: "viajes",
    syncWithLocation: false,
    filters: {
      permanent: [
        { field: "chofer_id", operator: "eq", value: chofer?.id },
      ],
    },
    sorters: { initial: [{ field: "fecha", order: "desc" }] },
    queryOptions: { enabled: !!chofer?.id },
  });

  return (
    <Show breadcrumb={false}>
      <Row gutter={[16, 16]}>

        {/* ── ENCABEZADO ── */}
        <Col xs={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  👤 {chofer?.nombre}
                </Title>
                <Text type="secondary">{empresaData?.data?.nombre}</Text>
              </Col>
              <Col>
                {chofer?.activo ? (
                  <Badge status="success" text="Activo" />
                ) : (
                  <Badge status="error" text="Inactivo" />
                )}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* ── DATOS DEL CHOFER ── */}
        <Col xs={24} md={12}>
          <Card title="📋 Datos del Chofer" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Nombre">
                <Text strong>{chofer?.nombre}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Teléfono">
                {chofer?.telefono ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {chofer?.email ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Tipo">
                <Tag color={chofer?.tipo === "propio" ? "blue" : "purple"}>
                  {chofer?.tipo === "propio" ? "👤 Propio" : "🤝 Proveedor"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Comisión default">
                {(chofer?.comision_default ?? 0) > 0
                  ? `$${Number(chofer?.comision_default ?? 0).toFixed(2)} USD`
                  : "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Empresa">
                <Tag color="purple">{empresaData?.data?.nombre ?? "—"}</Tag>
              </Descriptions.Item>
              {chofer?.metadata?.observaciones && (
                <Descriptions.Item label="Observaciones">
                  {chofer?.metadata?.observaciones}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* ── HISTORIAL DE VIAJES ── */}
        <Col xs={24}>
          <Card title="🚗 Historial de Viajes" size="small">
            <Table {...viajesTableProps} rowKey="id" size="small">
              <Table.Column
                dataIndex="fecha"
                title="Fecha"
                width={110}
                render={(v) => <DateField value={v} format="DD/MM/YYYY" />}
              />
              <Table.Column dataIndex="hora" title="Hora" width={70} />
              <Table.Column dataIndex="trayecto" title="Tipo" width={180}
                render={(v) => <Tag>{v}</Tag>}
              />
              <Table.Column dataIndex="origen" title="Origen" />
              <Table.Column dataIndex="destino" title="Destino" />
              <Table.Column
                dataIndex="importe_usd"
                title="USD"
                width={80}
                render={(v) => v > 0 ? `$${Number(v).toFixed(2)}` : "—"}
              />
              <Table.Column
                dataIndex="estado"
                title="Estado"
                width={110}
                render={(v) => (
                  <Tag color={v === "realizado" ? "green" : v === "pendiente" ? "orange" : "red"}>
                    {v?.toUpperCase()}
                  </Tag>
                )}
              />
            </Table>
          </Card>
        </Col>

      </Row>
    </Show>
  );
};