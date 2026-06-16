import { Create, useForm, useSelect } from "@refinedev/antd";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";

export const ClientesCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Divider orientation="left">Identificación</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Empresa" name="empresa_id" rules={[{ required: true }]}>
              <Select {...empresasSelectProps} placeholder="Seleccionar empresa" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Nombre / Fantasía" name="nombre_fantasia" rules={[{ required: true }]}>
              <Input placeholder="Ej: Viator" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Razón Social" name="razon_social">
              <Input placeholder="Razón social legal" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item label="RUT / Doc. Fiscal" name="rut">
              <Input placeholder="RUT o número fiscal" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="País" name="pais" initialValue="Uruguay">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Teléfono" name="telefono">
              <Input placeholder="+598 99 000 000" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Email" name="email">
              <Input placeholder="admin@cliente.com" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Condiciones Comerciales</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item label="Tipo de Cierre" name="tipo_cierre" initialValue="mensual">
              <Select>
                <Select.Option value="semanal">📅 Semanal</Select.Option>
                <Select.Option value="quincenal">📅 Quincenal</Select.Option>
                <Select.Option value="mensual">📅 Mensual</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Moneda" name="moneda" initialValue="USD">
              <Select>
                <Select.Option value="USD">💵 USD</Select.Option>
                <Select.Option value="UYU">🇺🇾 Pesos</Select.Option>
                <Select.Option value="AMBAS">💱 Ambas</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="¿Requiere Factura?" name="requiere_factura" valuePropName="checked" initialValue={false}>
              <Switch checkedChildren="SÍ" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Activo" name="activo" valuePropName="checked" initialValue={true}>
              <Switch checkedChildren="SÍ" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Forma de Pago</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Método de Pago" name={["datos_pago", "metodo"]}>
              <Select placeholder="¿Cómo paga este cliente?" allowClear>
                <Select.Option value="transferencia">🏦 Transferencia</Select.Option>
                <Select.Option value="efectivo">💵 Efectivo</Select.Option>
                <Select.Option value="link">🔗 Link de pago</Select.Option>
                <Select.Option value="plataforma">💻 Plataforma (Viator, Booking, etc.)</Select.Option>
                <Select.Option value="cheque">📄 Cheque</Select.Option>
                <Select.Option value="otro">📋 Otro</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Detalle de Pago / Cuenta" name={["datos_pago", "detalle"]}>
              <Input placeholder="CBU, alias, instrucciones de pago, etc." />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Contactos</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Contacto Operaciones" name="contacto_operaciones">
              <Input placeholder="Nombre y teléfono del contacto operativo" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Contacto Administrativo" name="contacto_administrativo">
              <Input placeholder="Nombre y teléfono del contacto admin" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Observaciones</Divider>
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item label="Observaciones" name="observaciones">
              <Input.TextArea rows={3} placeholder="Reglas especiales, condiciones particulares, notas internas..." />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Create>
  );
};
