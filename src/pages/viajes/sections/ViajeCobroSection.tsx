import React from "react";
import { Col, Divider, Form, InputNumber, Row, Select, Switch } from "antd";
import { METODOS_COBRO } from "../constants";

export const ViajeCobroSection: React.FC = () => {
  return (
    <>
      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Cargos y Financiamiento del Viaje
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <Form.Item label="Importe Total USD" name="importe_usd" initialValue={0}>
            <InputNumber
              min={0}
              prefix="US$"
              style={{ width: "100%" }}
              precision={2}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item label="Importe Pesos UYU" name="importe_pesos" initialValue={0}>
            <InputNumber
              min={0}
              prefix="UY$"
              style={{ width: "100%" }}
              precision={2}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item label="Comisión Externa (USD)" name="comision_usd" initialValue={0}>
            <InputNumber
              min={0}
              prefix="US$"
              style={{ width: "100%" }}
              precision={2}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={6}>
          <Form.Item label="Método de Cobro Sugerido" name="metodo_cobro">
            <Select placeholder="Seleccionar método" allowClear>
              {METODOS_COBRO.map((met) => (
                <Select.Option key={met.value} value={met.value}>
                  {met.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="¿Paga el Viajero directo al Chofer?"
            name="paga_viajero"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              checkedChildren="SÍ - El Chofer recauda en mano"
              unCheckedChildren="NO - Cobro centralizado por Oficina"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
