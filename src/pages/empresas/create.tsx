import { Create, useForm } from "@refinedev/antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";

const NOMBRE_OPTIONS = [
  { label: "FREEDAM", value: "FREEDAM" },
  { label: "CS_UNIP", value: "CS_UNIP" },
  { label: "SG_SAS", value: "SG_SAS" },
  { label: "ROSMARI_PERAZZA", value: "ROSMARI_PERAZZA" },
  { label: "CRISTIAN_SAFIE", value: "CRISTIAN_SAFIE" },
];

export const EmpresaCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps} breadcrumb={false}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
              <Select options={NOMBRE_OPTIONS} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Razón Social" name="razon_social">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="RUT" name={["metadata", "rut"]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Datos de Contacto</Divider>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item label="Teléfono" name={["metadata", "datos_contacto", "telefono"]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Email" name={["metadata", "datos_contacto", "email"]}>
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item label="Dirección" name={["metadata", "datos_contacto", "direccion"]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Cuentas Bancarias</Divider>
        <Form.List name={["metadata", "cuentas_bancarias"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card size="small" key={key} style={{ marginBottom: 12 }}>
                  <Row gutter={16} align="middle">
                    <Col xs={24} md={9}>
                      <Form.Item
                        {...restField}
                        name={[name, "banco"]}
                        label="Banco"
                        rules={[{ required: true, message: "Requerido" }]}
                      >
                        <Input placeholder="Ej. BROU" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={9}>
                      <Form.Item
                        {...restField}
                        name={[name, "nro_cuenta"]}
                        label="Nro. Cuenta"
                        rules={[{ required: true, message: "Requerido" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={4}>
                      <Form.Item
                        {...restField}
                        name={[name, "moneda"]}
                        label="Moneda"
                        rules={[{ required: true, message: "Requerido" }]}
                      >
                        <Select options={[{ label: "USD", value: "USD" }, { label: "UYU", value: "UYU" }]} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={2}>
                      <Button
                        type="dashed" danger icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        style={{ width: "100%", marginTop: 30 }}
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Añadir Cuenta Bancaria
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Create>
  );
};
