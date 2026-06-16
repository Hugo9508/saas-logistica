import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Col, Divider, Form, Input, Row, Select, Switch } from "antd";

export const ClientesEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const cliente = query?.data?.data;

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
    defaultValue: cliente?.empresa_id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Divider orientation="left">Identificación</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Empresa" name="empresa_id" rules={[{ required: true }]}>
              <Select {...empresasSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Nombre / Fantasía" name="nombre_fantasia" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Razón Social" name="razon_social">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item label="RUT / Doc. Fiscal" name="rut">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="País" name="pais">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Teléfono" name="telefono">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Condiciones Comerciales</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item label="Tipo de Cierre" name="tipo_cierre">
              <Select>
                <Select.Option value="semanal">📅 Semanal</Select.Option>
                <Select.Option value="quincenal">📅 Quincenal</Select.Option>
                <Select.Option value="mensual">📅 Mensual</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Moneda" name="moneda">
              <Select>
                <Select.Option value="USD">💵 USD</Select.Option>
                <Select.Option value="UYU">🇺🇾 Pesos</Select.Option>
                <Select.Option value="AMBAS">💱 Ambas</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="¿Requiere Factura?" name="requiere_factura" valuePropName="checked">
              <Switch checkedChildren="SÍ" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Activo" name="activo" valuePropName="checked">
              <Switch checkedChildren="SÍ" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Forma de Pago</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Método de Pago" name={["datos_pago", "metodo"]}>
              <Select allowClear>
                <Select.Option value="transferencia">🏦 Transferencia</Select.Option>
                <Select.Option value="efectivo">💵 Efectivo</Select.Option>
                <Select.Option value="link">🔗 Link de pago</Select.Option>
                <Select.Option value="plataforma">💻 Plataforma</Select.Option>
                <Select.Option value="cheque">📄 Cheque</Select.Option>
                <Select.Option value="otro">📋 Otro</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Detalle de Pago / Cuenta" name={["datos_pago", "detalle"]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Contactos</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Contacto Operaciones" name="contacto_operaciones">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Contacto Administrativo" name="contacto_administrativo">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Observaciones</Divider>
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item label="Observaciones" name="observaciones">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Edit>
  );
};
