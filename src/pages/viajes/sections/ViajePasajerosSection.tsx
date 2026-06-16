import React from "react";
import { Col, Divider, Form, InputNumber, Row } from "antd";

export const ViajePasajerosSection: React.FC = () => {
  return (
    <>
      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Detalle de Pasajeros (PAX)
      </Divider>
      <Row gutter={16}>
        <Col xs={8} sm={8}>
          <Form.Item
            label="Adultos (+12 años)"
            name="pasajeros_adultos"
            initialValue={1}
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} precision={0} />
          </Form.Item>
        </Col>
        <Col xs={8} sm={8}>
          <Form.Item
            label="Menores (2 a 12 años)"
            name="pasajeros_menores"
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: "100%" }} precision={0} />
          </Form.Item>
        </Col>
        <Col xs={8} sm={8}>
          <Form.Item
            label="Infantes (0 a 2 años)"
            name="pasajeros_infantes"
            initialValue={0}
          >
            <InputNumber min={0} style={{ width: "100%" }} precision={0} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
