import { Create, useForm, useSelect } from "@refinedev/antd";
import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select } from "antd";

export const PagoCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: empresaSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps} breadcrumb={false}>
      <Form {...formProps} layout="vertical" initialValues={{ estado: "pendiente" }}>
        <Divider orientation="left">Identificación</Divider>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Empresa" name="empresa_id" rules={[{ required: true }]}>
              <Select {...empresaSelectProps} placeholder="Seleccionar empresa" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Tipo de Origen" name="origen_tipo" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: "Pago Fijo", value: "PAGO_FIJO" },
                  { label: "Proveedor", value: "PROVEEDOR" },
                  { label: "Cliente", value: "CLIENTE" },
                  { label: "Chofer", value: "CHOFER" },
                  { label: "Impuesto", value: "IMPUESTO" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="ID de Origen (UUID)"
              name="origen_id"
              tooltip="UUID del pago fijo, proveedor, cliente o chofer vinculado"
            >
              <Input placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Monto y Fecha</Divider>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item label="Monto" name="monto" rules={[{ required: true }]}>
              <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Moneda" name="moneda" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: "USD", value: "USD" },
                  { label: "UYU", value: "UYU" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Fecha de Pago" name="fecha_pago" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Estado" name="estado" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: "Pendiente", value: "pendiente" },
                  { label: "Pagado", value: "pagado" },
                  { label: "Vencido", value: "vencido" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Método y Comprobante</Divider>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Método de Pago" name="metodo" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: "Transferencia", value: "transferencia" },
                  { label: "Débito Automático", value: "debito_auto" },
                  { label: "Cheque", value: "cheque" },
                  { label: "Efectivo", value: "efectivo" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              label="URL Comprobante"
              name="comprobante_url"
              tooltip="Link al comprobante de pago (Google Drive, Dropbox, etc.)"
            >
              <Input placeholder="https://..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
