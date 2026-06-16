import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Col, Divider, Form, Input, InputNumber, Row, Select, Switch } from "antd";

export const ChoferesEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const chofer = query?.data?.data;

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
    defaultValue: chofer?.empresa_id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Divider orientation="left">Datos Personales</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Nombre completo" name="nombre" rules={[{ required: true }]}>
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

        <Divider orientation="left">Configuración</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Empresa" name="empresa_id" rules={[{ required: true }]}>
              <Select {...empresasSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Tipo" name="tipo">
              <Select>
                <Select.Option value="propio">👤 Propio</Select.Option>
                <Select.Option value="proveedor">🤝 Proveedor</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Comisión default USD" name="comision_default">
              <InputNumber min={0} prefix="$" precision={2} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={4}>
            <Form.Item label="Activo" name="activo" valuePropName="checked">
              <Switch checkedChildren="SÍ" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Notas</Divider>
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item label="Observaciones" name={["metadata", "observaciones"]}>
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Edit>
  );
};
