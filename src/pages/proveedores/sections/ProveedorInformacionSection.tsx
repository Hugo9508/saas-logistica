import React from "react";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";

interface ProveedorInformacionSectionProps {
  empresasSelectProps: any;
}

export const ProveedorInformacionSection: React.FC<ProveedorInformacionSectionProps> = ({
  empresasSelectProps,
}) => {
  return (
    <>
      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Identificación y Datos de Empresa
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Empresa Vinculada (SaaS Multiempresa)"
            name="empresa_id"
            rules={[{ required: true, message: "La empresa vinculada es obligatoria" }]}
          >
            <Select {...empresasSelectProps} placeholder="Seleccionar empresa" showSearch optionFilterProp="label" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Nombre de Fantasía o Comercial"
            name="nombre_fantasia"
            rules={[{ required: true, message: "El nombre de fantasía es obligatorio" }]}
          >
            <Input placeholder="Ej: Remises del Plata" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item label="Razón Social (Legal)" name="razon_social">
            <Input placeholder="Ej: Transportes del Plata S.A." />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="RUT / Identificación Fiscal" name="rut">
            <Input placeholder="Ej: 214563820019" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Información de Contacto directiva
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item label="Persona de Contacto" name="nombre_contacto">
            <Input placeholder="Nombre del referente" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Teléfono de Contacto" name="telefono">
            <Input placeholder="Ej: +598 99 123 456" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Correo Electrónico"
            name="email"
            rules={[{ type: "email", message: "Debe ingresar un correo válido" }]}
          >
            <Input placeholder="Ej: proveedores@correo.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={18}>
          <Form.Item label="Dirección Física u Oficina" name="direccion">
            <Input placeholder="Calle, Número, Apto, Ciudad" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item
            label="¿Proveedor Operativo Activo?"
            name="activo"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch checkedChildren="ACTIVO" unCheckedChildren="INACTIVO" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
