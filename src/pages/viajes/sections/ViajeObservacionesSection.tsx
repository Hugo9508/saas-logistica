import React from "react";
import { Col, Divider, Form, Input, Row } from "antd";

export const ViajeObservacionesSection: React.FC = () => {
  return (
    <>
      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Notas y Anotaciones Adicionales
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item label="Observaciones Internas (Vigilancia / Logística)" name="obs_internas">
            <Input.TextArea rows={3} placeholder="Instrucciones privadas para oficina o chofer..." />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Observaciones de Cobro (PIX, Depósitos)" name="obs_cobros">
            <Input.TextArea rows={3} placeholder="Códigos de transferencia, estados en PIX..." />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Observaciones Generales" name="observaciones">
            <Input.TextArea rows={3} placeholder="Cualquier información complementaria del trayecto..." />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
