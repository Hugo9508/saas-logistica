import { DateField, Show, useTable } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import {
  Badge,
  Card,
  Col,
  Descriptions,
  Row,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

const { Title, Text } = Typography;

export const ClientesShow = () => {
  const { query } = useShow();
  const cliente = query?.data?.data;

  const empresaResponse = useOne({
    resource: "empresas",
    id: cliente?.empresa_id ?? "",
    queryOptions: { enabled: !!cliente?.empresa_id },
  }) as any;
  const empresaData = empresaResponse.data;

  // Cuenta corriente del cliente
  const { tableProps: ccTableProps } = useTable({
    resource: "cuenta_corriente",
    syncWithLocation: false,
    filters: {
      permanent: [
        { field: "entidad_id", operator: "eq", value: cliente?.id },
        { field: "entidad_tipo", operator: "eq", value: "cliente" },
      ],
    },
    sorters: { initial: [{ field: "periodo", order: "desc" }] },
    queryOptions: { enabled: !!cliente?.id },
  });

  // Historial de viajes del cliente
  const { tableProps: viajesTableProps } = useTable({
    resource: "viajes",
    syncWithLocation: false,
    filters: {
      permanent: [
        { field: "cliente_id", operator: "eq", value: cliente?.id },
      ],
    },
    sorters: { initial: [{ field: "fecha", order: "desc" }] },
    queryOptions: { enabled: !!cliente?.id },
  });

  // Calcular totales de cuenta corriente
  const ccData = ccTableProps?.dataSource ?? [];
  const totalDeudorUSD = ccData.reduce((acc: number, r: any) => acc + (r.saldo_usd > 0 ? r.saldo_usd : 0), 0);
  const totalDeudorPesos = ccData.reduce((acc: number, r: any) => acc + (r.saldo_pesos > 0 ? r.saldo_pesos : 0), 0);

  return (
    <Show breadcrumb={false}>
      <Row gutter={[16, 16]}>

        {/* ── ENCABEZADO ── */}
        <Col xs={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  🏢 {cliente?.nombre_fantasia}
                </Title>
                <Text type="secondary">
                  {cliente?.razon_social} · {empresaData?.data?.nombre}
                </Text>
              </Col>
              <Col>
                <Tag color={cliente?.tipo_cierre === "semanal" ? "blue" : cliente?.tipo_cierre === "quincenal" ? "orange" : "green"}>
                  Cierre {cliente?.tipo_cierre?.toUpperCase()}
                </Tag>
                <Tag>{cliente?.moneda}</Tag>
                {cliente?.activo
                  ? <Badge status="success" text="Activo" />
                  : <Badge status="error" text="Inactivo" />}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* ── SALDOS ── */}
        <Col xs={24} sm={6}>
          <Card size="small">
            <Statistic
              title="Saldo a Cobrar USD"
              value={totalDeudorUSD}
              precision={2}
              prefix="$"
              valueStyle={{ color: totalDeudorUSD > 0 ? "#52c41a" : "#999" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card size="small">
            <Statistic
              title="Saldo a Cobrar Pesos"
              value={totalDeudorPesos}
              precision={0}
              prefix="$"
              valueStyle={{ color: totalDeudorPesos > 0 ? "#52c41a" : "#999" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card size="small">
            <Statistic
              title="Períodos registrados"
              value={ccData.length}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card size="small">
            <Statistic
              title="Viajes registrados"
              value={viajesTableProps?.dataSource?.length ?? 0}
            />
          </Card>
        </Col>

        {/* ── FICHA ── */}
        <Col xs={24} md={12}>
          <Card title="📋 Ficha del Cliente" size="small">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="RUT">{cliente?.rut ?? "—"}</Descriptions.Item>
              <Descriptions.Item label="País">{cliente?.pais ?? "—"}</Descriptions.Item>
              <Descriptions.Item label="Teléfono">{cliente?.telefono ?? "—"}</Descriptions.Item>
              <Descriptions.Item label="Email">{cliente?.email ?? "—"}</Descriptions.Item>
              <Descriptions.Item label="Requiere Factura">
                {cliente?.requiere_factura ? <Badge status="warning" text="Sí" /> : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Método de Pago">
                {cliente?.datos_pago?.metodo
                  ? <Tag>{cliente.datos_pago.metodo.toUpperCase()}</Tag>
                  : "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Detalle Pago">
                {cliente?.datos_pago?.detalle ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Contacto Operaciones">
                {cliente?.contacto_operaciones ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Contacto Administrativo">
                {cliente?.contacto_administrativo ?? "—"}
              </Descriptions.Item>
              {cliente?.observaciones && (
                <Descriptions.Item label="Observaciones">
                  {cliente.observaciones}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

        {/* ── CUENTA CORRIENTE ── */}
        <Col xs={24}>
          <Card title="📒 Cuenta Corriente" size="small">
            <Table {...ccTableProps} rowKey="id" size="small">
              <Table.Column
                dataIndex="periodo"
                title="Período"
                width={110}
                render={(v) => <DateField value={v} format="MM/YYYY" />}
              />
              <Table.Column dataIndex="nro_factura" title="Factura" width={120} render={(v) => v ?? "—"} />
              <Table.Column
                dataIndex="importe_usd"
                title="Importe USD"
                render={(v) => v > 0 ? `$${Number(v).toFixed(2)}` : "—"}
              />
              <Table.Column
                dataIndex="pagos_usd"
                title="Pagado USD"
                render={(v) => v > 0 ? `$${Number(v).toFixed(2)}` : "—"}
              />
              <Table.Column
                dataIndex="saldo_usd"
                title="Saldo USD"
                render={(v) => (
                  <Text strong style={{ color: v > 0 ? "#fa8c16" : "#52c41a" }}>
                    {v > 0 ? `$${Number(v).toFixed(2)}` : "✅ Saldado"}
                  </Text>
                )}
              />
              <Table.Column
                dataIndex="importe_pesos"
                title="Importe $UYU"
                render={(v) => v > 0 ? `$${Number(v).toLocaleString("es-UY")}` : "—"}
              />
              <Table.Column
                dataIndex="saldo_pesos"
                title="Saldo $UYU"
                render={(v) => (
                  <Text strong style={{ color: v > 0 ? "#fa8c16" : "#52c41a" }}>
                    {v > 0 ? `$${Number(v).toLocaleString("es-UY")}` : "✅ Saldado"}
                  </Text>
                )}
              />
              <Table.Column
                dataIndex="fecha_pago"
                title="Fecha Pago"
                render={(v) => v ? <DateField value={v} format="DD/MM/YYYY" /> : "—"}
              />
              <Table.Column
                dataIndex="estado"
                title="Estado"
                render={(v) => (
                  <Tag color={v === "pagado" ? "green" : v === "conciliado" ? "blue" : "orange"}>
                    {v?.toUpperCase()}
                  </Tag>
                )}
              />
            </Table>
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
              <Table.Column dataIndex="trayecto" title="Tipo" render={(v) => <Tag>{v}</Tag>} />
              <Table.Column dataIndex="origen" title="Origen" />
              <Table.Column dataIndex="destino" title="Destino" />
              <Table.Column
                dataIndex="importe_usd"
                title="USD"
                width={80}
                render={(v) => v > 0 ? `$${Number(v).toFixed(2)}` : "—"}
              />
              <Table.Column
                dataIndex="rentabilidad_usd"
                title="Rentab. USD"
                width={100}
                render={(v) => (
                  <Text style={{ color: v > 0 ? "#52c41a" : v < 0 ? "#ff4d4f" : "#999" }}>
                    {v != null ? `$${Number(v).toFixed(2)}` : "—"}
                  </Text>
                )}
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