import React from "react";
import { Col, Divider, Form, Input, InputNumber, Row, Select } from "antd";
import { BANCOS_URUGUAY } from "../constants";

export const ProveedorFinancieroSection: React.FC = () => {
  return (
    <>
      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Detalle Bancario y Liquidaciones
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item label="Banco de Destino" name="banco_nombre">
            <Select placeholder="Seleccionar Entidad Bancaria" allowClear>
              {BANCOS_URUGUAY.map((banco) => (
                <Select.Option key={banco.value} value={banco.value}>
                  {banco.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={16}>
          <Form.Item label="Detalles de Cuenta Bancaria (Nro Cuenta, Tipo, Sucursal, Titular)" name="cuenta_bancaria">
            <Input placeholder="Ej: Cuenta Corriente $ 123456-7890 a nombre de..." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item label="Porcentaje de Comisión Base (%)" name="comision_porcentaje">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => (value ? Number(value.replace("%", "")) : 0) as any}
              style={{ width: "100%" }}
              placeholder="Ej: 10%"
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Notas y Cláusulas del Acuerdo comercial
      </Divider>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item label="Notas Internas / Condiciones Generales" name="notas">
            <Input.TextArea rows={3} placeholder="Condiciones de pago, plazos acordados, tarifas negociadas..." />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
