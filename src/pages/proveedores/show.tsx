import React from "react";
import { Show } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Badge, Card, Col, Descriptions, Row, Tag, Typography } from "antd";
import { BANCOS_URUGUAY, ESTADOS_PROVEEDOR } from "./constants";

const { Title, Text } = Typography;

export const ProveedoresShow: React.FC = () => {
  const { query } = useShow();
  const proveedor = query?.data?.data;

  // Retrieve multiempresa company details
  const { data: empresaResponse } = useOne({
    resource: "empresas",
    id: proveedor?.empresa_id ?? "",
    queryOptions: { enabled: !!proveedor?.empresa_id },
  }) as any;
  const empresaData = empresaResponse?.data;

  const getBancoLabel = (bancoVal?: string) => {
    if (!bancoVal) return "—";
    const matched = BANCOS_URUGUAY.find((b) => b.value === bancoVal);
    return matched ? matched.label : bancoVal;
  };

  const getEstadoBadge = (activo: boolean) => {
    const matched = ESTADOS_PROVEEDOR.find((item) => item.value === activo);
    return matched ? (
      <Badge status={matched.color as any} text={matched.label} />
    ) : (
      <Badge status="default" text="—" />
    );
  };

  const fantName = proveedor?.nombre_fantasia ? String(proveedor.nombre_fantasia) : "—";
  const razonSoc = proveedor?.razon_social ? String(proveedor.razon_social) : "—";
  const contactName = proveedor?.nombre_contacto ? String(proveedor.nombre_contacto) : "—";
  const emailAddr = proveedor?.email ? String(proveedor.email) : "—";
  const phoneNum = proveedor?.telefono ? String(proveedor.telefono) : "—";
  const taxId = proveedor?.rut ? String(proveedor.rut) : "—";
  const addressPhys = proveedor?.direccion ? String(proveedor.direccion) : "—";
  const bankDetails = proveedor?.cuenta_bancaria ? String(proveedor.cuenta_bancaria) : "—";
  const notesText = proveedor?.notas ? String(proveedor.notas) : "—";

  return (
    <Show breadcrumb={false} title="Ficha Técnica de Control de Proveedor">
      <Row gutter={[16, 16]}>
        {/* Header Summary */}
        <Col xs={24}>
          <Card bordered={false} className="bg-gradient-to-r from-teal-900 to-slate-800 text-white rounded-lg shadow-sm">
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} className="!text-white !m-0">
                  🏢 {fantName}
                </Title>
                <Text className="text-teal-200 font-medium">Empresa: {empresaData?.nombre || "—"}</Text>
              </Col>
              <Col>{getEstadoBadge(!!proveedor?.activo)}</Col>
            </Row>
          </Card>
        </Col>

        {/* General details Card */}
        <Col xs={24} md={12}>
          <Card title="📋 Identificación Legal y Contacto" size="small" className="shadow-sm rounded-lg">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Razón Social">
                <Text strong>{razonSoc}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Identificador RUT / Fiscal">
                <Text className="font-mono text-xs">{taxId}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Referente o Administrador">
                <Text>{contactName}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Teléfono Directo">
                <Text>{phoneNum}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Casilla de Email">
                <Text>{emailAddr}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Oficinas / Dirección">
                <Text>{addressPhys}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Financial terms card */}
        <Col xs={24} md={12}>
          <Card title="💰 Finanzas, Banco y Aranceles" size="small" className="shadow-sm rounded-lg">
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Banco de Destino">
                <Tag color="cyan">{getBancoLabel(proveedor?.banco_nombre)}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Detalle de Cuenta">
                <Text className="font-mono text-xs block whitespace-pre-line">{bankDetails}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Comisión Base (%)">
                <Text strong className="text-xl text-emerald-600 font-mono">
                  {proveedor?.comision_porcentaje !== undefined ? `${proveedor.comision_porcentaje}%` : "—"}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Remarks and terms and conditions card */}
        <Col xs={24}>
          <Card title="📝 Notas y Acuerdos Particulares" size="small" className="shadow-sm rounded-lg">
            <Text className="block min-h-12 text-slate-600 p-3 bg-muted/20 border border-slate-100 rounded leading-relaxed whitespace-pre-line">
              {notesText}
            </Text>
          </Card>
        </Col>
      </Row>
    </Show>
  );
};
