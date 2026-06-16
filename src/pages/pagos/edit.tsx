import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Alert } from "antd";
import dayjs from "dayjs";

export const PagoEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const pagoData = query?.data?.data;
  const isPagado = pagoData?.estado === "pagado";

  const { selectProps: empresaSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  // Normalizar fecha_pago para DatePicker
  const formPropsWithDate = {
    ...formProps,
    initialValues: formProps.initialValues
      ? {
          ...formProps.initialValues,
          fecha_pago: formProps.initialValues.fecha_pago
            ? dayjs(formProps.initialValues.fecha_pago)
            : undefined,
        }
      : undefined,
  };

  return (
    <Edit saveButtonProps={saveButtonProps} breadcrumb={false}>
      {isPagado && (
        <Alert
          message="Pago Conciliado"
          description="Este pago ya está marcado como PAGADO. Los campos financieros están bloqueados para mantener la integridad contable."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form {...formPropsWithDate} layout="vertical">
        <Divider orientation="left">Identificación</Divider>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Empresa" name="empresa_id" rules={[{ required: true }]}>
              <Select {...empresaSelectProps} disabled={isPagado} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Tipo de Origen" name="origen_tipo" rules={[{ required: true }]}>
              <Select
                disabled={isPagado}
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
            <Form.Item label="ID de Origen (UUID)" name="origen_id">
              <Input disabled={isPagado} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Monto y Fecha</Divider>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item label="Monto" name="monto" rules={[{ required: true }]}>
              <InputNumber disabled={isPagado} min={0} step={0.01} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Moneda" name="moneda" rules={[{ required: true }]}>
              <Select
                disabled={isPagado}
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
                  { label: "Pagado ✅", value: "pagado" },
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
              tooltip="Adjunta el comprobante de pago para conciliar"
            >
              <Input placeholder="https://..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
