import { DateField, Show } from "@refinedev/antd";
import { useList, useShow } from "@refinedev/core";
import { Avatar, Card, Col, Descriptions, List, Row, Table, Tag, Typography } from "antd";
import { BankOutlined } from "@ant-design/icons";
import type { CuentaBancaria } from "../../types/finance";

const { Title, Text } = Typography;

export const EmpresaShow = () => {
  const { query } = useShow();
  const empresa = query?.data?.data;

  const viajesResult = useList({
    resource: "viajes",
    filters: [{ field: "empresa_id", operator: "eq", value: empresa?.id }],
    pagination: { pageSize: 5 },
    queryOptions: { enabled: !!empresa?.id },
  }) as any;
  const viajesData = viajesResult?.query?.data ?? viajesResult?.data;

  const pagosFijosResult = useList({
    resource: "pagos_fijos",
    filters: [{ field: "empresa_id", operator: "eq", value: empresa?.id }],
    queryOptions: { enabled: !!empresa?.id },
  }) as any;
  const pagosFijosData = pagosFijosResult?.query?.data ?? pagosFijosResult?.data;

  const cuentas: CuentaBancaria[] = empresa?.metadata?.cuentas_bancarias ?? [];
  const contacto = empresa?.metadata?.datos_contacto ?? {};

  return (
    <Show breadcrumb={false}>
      <Row gutter={[16, 16]}>
        {/* Header */}
        <Col xs={24}>
          <Card>
            <Row align="middle" gutter={16}>
              <Col>
                {empresa?.metadata?.logo_url ? (
                  <Avatar size={64} src={empresa.metadata.logo_url} />
                ) : (
                  <Avatar size={64} icon={<BankOutlined />} />
                )}
              </Col>
              <Col>
                <Title level={3} style={{ margin: 0 }}>{empresa?.nombre}</Title>
                <Text type="secondary">
                  {empresa?.razon_social} · RUT: {empresa?.metadata?.rut ?? "—"}
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Contacto */}
        <Col xs={24} md={8}>
          <Card title="📱 Datos de Contacto" size="small" style={{ height: "100%" }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Teléfono">{contacto.telefono ?? "—"}</Descriptions.Item>
              <Descriptions.Item label="Email">{contacto.email ?? "—"}</Descriptions.Item>
              <Descriptions.Item label="Dirección">{contacto.direccion ?? "—"}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Cuentas Bancarias */}
        <Col xs={24} md={16}>
          <Card title="🏦 Cuentas Bancarias" size="small" style={{ height: "100%" }}>
            {cuentas.length > 0 ? (
              <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={cuentas}
                renderItem={(item: CuentaBancaria) => (
                  <List.Item>
                    <Card size="small" type="inner" title={item.banco}>
                      <Descriptions column={1} size="small">
                        <Descriptions.Item label="Nro. Cuenta">
                          <Text copyable>{item.nro_cuenta}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="Moneda">
                          <Tag color={item.moneda === "USD" ? "green" : "blue"}>{item.moneda}</Tag>
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </List.Item>
                )}
              />
            ) : (
              <Text type="secondary">No hay cuentas bancarias registradas.</Text>
            )}
          </Card>
        </Col>

        {/* Ultimos Viajes */}
        <Col xs={24}>
          <Card title="🚗 Últimos Viajes" size="small">
            <Table
              dataSource={viajesData?.data ?? []}
              rowKey="id"
              size="small"
              pagination={{ pageSize: 5 }}
            >
              <Table.Column
                dataIndex="fecha"
                title="Fecha"
                render={(v) => v ? <DateField value={v} format="DD/MM/YYYY" /> : "—"}
              />
              <Table.Column dataIndex="ref_externa" title="Ref" />
              <Table.Column dataIndex="trayecto" title="Trayecto" />
              <Table.Column
                dataIndex="estado"
                title="Estado"
                render={(v) => <Tag color={v === "realizado" ? "green" : v === "pendiente" ? "orange" : "red"}>{v?.toUpperCase()}</Tag>}
              />
            </Table>
          </Card>
        </Col>

        {/* Pagos Fijos */}
        <Col xs={24}>
          <Card title="📅 Pagos Fijos" size="small">
            <Table
              dataSource={pagosFijosData?.data ?? []}
              rowKey="id"
              size="small"
              pagination={false}
            >
              <Table.Column dataIndex="categoria" title="Categoría" />
              <Table.Column dataIndex="detalle" title="Detalle" />
              <Table.Column dataIndex="valor_usd" title="USD" render={(v) => v > 0 ? `$${v}` : "—"} />
              <Table.Column dataIndex="valor_pesos" title="UYU" render={(v) => v > 0 ? `$${v}` : "—"} />
              <Table.Column dataIndex="dia_vencimiento" title="Día Vcto." />
            </Table>
          </Card>
        </Col>
      </Row>
    </Show>
  );
};
