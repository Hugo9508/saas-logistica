import { DateField, Show } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Badge, Button, Card, Col, Descriptions, Image, Row, Tag, Typography } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, LinkOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const estadoBadge: Record<string, { status: "success" | "warning" | "error" }> = {
  pagado: { status: "success" },
  pendiente: { status: "warning" },
  vencido: { status: "error" },
};

const metodoPago: Record<string, string> = {
  transferencia: "Transferencia Bancaria",
  debito_auto: "Débito Automático",
  cheque: "Cheque",
  efectivo: "Efectivo",
};

export const PagoShow = () => {
  const { query } = useShow();
  const pago = query?.data?.data;

  const empresaResult = useOne({
    resource: "empresas",
    id: pago?.empresa_id ?? "",
    queryOptions: { enabled: !!pago?.empresa_id },
  }) as any;
  const empresaData = empresaResult?.query?.data ?? empresaResult?.data;

  const estado = pago?.estado ?? "pendiente";
  const badgeStatus = estadoBadge[estado]?.status ?? "warning";
  const esImagen = pago?.comprobante_url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);

  return (
    <Show breadcrumb={false}>
      <Row gutter={[16, 16]}>
        {/* Header tipo Recibo */}
        <Col xs={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    color: estado === "pagado" ? "#52c41a" : estado === "vencido" ? "#ff4d4f" : "#faad14",
                  }}
                >
                  ${Number(pago?.monto ?? 0).toFixed(2)}{" "}
                  <Tag style={{ fontSize: 13 }}>{pago?.moneda}</Tag>
                </Title>
                <Text type="secondary">
                  {pago?.fecha_pago ? <DateField value={pago.fecha_pago} format="DD/MM/YYYY" /> : "—"}
                </Text>
              </Col>
              <Col>
                <Badge
                  status={badgeStatus}
                  text={<Title level={4} style={{ margin: 0 }}>{estado.toUpperCase()}</Title>}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Detalles */}
        <Col xs={24} md={12}>
          <Card title="📄 Detalles del Pago" size="small" style={{ height: "100%" }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Empresa">
                <Tag color="blue">{empresaData?.data?.nombre ?? "—"}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Tipo de Origen">
                <Tag>{pago?.origen_tipo ?? "—"}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ID Origen">
                <Text code style={{ fontSize: 11 }}>{pago?.origen_id ?? "—"}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Método">
                {metodoPago[pago?.metodo] ?? pago?.metodo ?? "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Moneda">
                <Tag color={pago?.moneda === "USD" ? "green" : "blue"}>{pago?.moneda}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de Pago">
                {pago?.fecha_pago ? <DateField value={pago.fecha_pago} format="DD/MM/YYYY" /> : "—"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Comprobante */}
        <Col xs={24} md={12}>
          <Card title="🧾 Comprobante" size="small" style={{ height: "100%" }}>
            {pago?.comprobante_url ? (
              <Row gutter={[8, 8]} align="middle">
                {esImagen ? (
                  <Col xs={24}>
                    <Image
                      src={pago.comprobante_url}
                      alt="Comprobante de pago"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  </Col>
                ) : (
                  <Col xs={24}>
                    <Button
                      type="primary"
                      icon={<LinkOutlined />}
                      href={pago.comprobante_url}
                      target="_blank"
                      block
                    >
                      Abrir Comprobante
                    </Button>
                  </Col>
                )}
              </Row>
            ) : (
              <Text type="secondary">Sin comprobante adjunto.</Text>
            )}
          </Card>
        </Col>

        {/* Trazabilidad */}
        <Col xs={24}>
          <Card title="🔍 Trazabilidad" size="small">
            <Descriptions column={2} size="small">
              <Descriptions.Item label="ID del Registro">
                <Text code style={{ fontSize: 11 }}>{pago?.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de Creación">
                {pago?.created_at ? <DateField value={pago.created_at} format="DD/MM/YYYY HH:mm" /> : "—"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Show>
  );
};
