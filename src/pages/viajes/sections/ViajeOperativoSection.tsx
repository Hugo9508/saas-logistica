import React from "react";
import { Col, DatePicker, Divider, Form, Input, Row, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { ESTADOS_VIAJE, TIPOS_SERVICIO } from "../constants";

interface ViajeOperativoSectionProps {
  empresasSelectProps: any;
  choferesSelectProps: any;
  clientesSelectProps: any;
  proveedoresSelectProps: any;
}

export const ViajeOperativoSection: React.FC<ViajeOperativoSectionProps> = ({
  empresasSelectProps,
  choferesSelectProps,
  clientesSelectProps,
  proveedoresSelectProps,
}) => {
  return (
    <>
      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Empresa y Referencia Operativa
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Empresa"
            name="empresa_id"
            rules={[{ required: true, message: "La empresa es obligatoria" }]}
          >
            <Select {...empresasSelectProps} placeholder="Seleccionar empresa" showSearch />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Ref. Externa (BTC)" name="ref_externa">
            <Input placeholder="Ej: 13459 o MOZ8493668" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Estado" name="estado" initialValue="realizado">
            <Select placeholder="Seleccionar estado">
              {ESTADOS_VIAJE.map((est) => (
                <Select.Option key={est.value} value={est.value}>
                  {est.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Planificación de Fecha y Hora
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Fecha del Viaje"
            name="fecha"
            rules={[{ required: true, message: "La fecha del viaje es obligatoria" }]}
            getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
            normalize={(value) => value?.format("YYYY-MM-DD")}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder="DD/MM/AAAA" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Hora de Presentación"
            name="hora"
            getValueProps={(value) => ({ value: value ? dayjs(value, "HH:mm") : undefined })}
            normalize={(value) => value?.format("HH:mm")}
          >
            <TimePicker style={{ width: "100%" }} format="HH:mm" placeholder="HH:mm" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Asignación de Actores
      </Divider>
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            label="Chofer Asignado"
            name="chofer_id"
            rules={[{ required: true, message: "El chofer es obligatorio" }]}
          >
            <Select {...choferesSelectProps} placeholder="Seleccionar chofer" showSearch />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Cliente Solicitante o Agente" name="cliente_id">
            <Select
              {...clientesSelectProps}
              placeholder="Seleccionar cliente (opcional)"
              allowClear
              showSearch
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item label="Proveedor Externo / Tercerizado" name="proveedor_id">
            <Select
              {...proveedoresSelectProps}
              placeholder="Seleccionar proveedor (opcional)"
              allowClear
              showSearch
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left" className="!text-blue-500 !font-semibold">
        Detalle del Trayecto e Itinerario
      </Divider>
      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item
            label="Tipo de Servicio / Clasificación de Trayecto"
            name="trayecto"
            rules={[{ required: true, message: "El tipo de servicio es obligatorio" }]}
          >
            <Select placeholder="Seleccionar tipo o disposición">
              {TIPOS_SERVICIO.map((ts) => (
                <Select.Option key={ts.value} value={ts.value}>
                  {ts.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Dirección de Origen (Punto de Encuentro)"
            name="origen"
            rules={[{ required: true, message: "El punto de origen es obligatorio" }]}
          >
            <Input.TextArea rows={2} placeholder="Indique calle, hotel o terminal de origen" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Dirección de Destino Final"
            name="destino"
            rules={[{ required: true, message: "El punto de destino es obligatorio" }]}
          >
            <Input.TextArea rows={2} placeholder="Indique calle, bodega o punto final" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
