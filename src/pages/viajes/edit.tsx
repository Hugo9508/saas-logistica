import { Edit, useForm, useSelect } from "@refinedev/antd";
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  TimePicker,
} from "antd";
import dayjs from "dayjs";

export const ViajesEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const viaje = query?.data?.data;

  const { selectProps: choferesSelectProps } = useSelect({
    resource: "choferes",
    optionLabel: "nombre",
    optionValue: "id",
    defaultValue: viaje?.chofer_id,
    filters: [{ field: "activo", operator: "eq", value: true }],
  });

  const { selectProps: clientesSelectProps } = useSelect({
    resource: "clientes",
    optionLabel: "nombre_fantasia",
    optionValue: "id",
    defaultValue: viaje?.cliente_id,
    filters: [{ field: "activo", operator: "eq", value: true }],
  });

  const { selectProps: proveedoresSelectProps } = useSelect({
    resource: "proveedores",
    optionLabel: "nombre_fantasia",
    optionValue: "id",
    defaultValue: viaje?.proveedor_id,
    filters: [{ field: "activo", operator: "eq", value: true }],
  });

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
    defaultValue: viaje?.empresa_id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Divider orientation="left">Empresa y Referencias</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Empresa" name="empresa_id" rules={[{ required: true }]}>
              <Select {...empresasSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Ref. Externa (BTC)" name="ref_externa">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Estado" name="estado">
              <Select>
                <Select.Option value="realizado">✅ Realizado</Select.Option>
                <Select.Option value="pendiente">⏳ Pendiente</Select.Option>
                <Select.Option value="en_curso">🔄 En curso</Select.Option>
                <Select.Option value="cancelado">❌ Cancelado</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Fecha y Hora</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Fecha"
              name="fecha"
              rules={[{ required: true }]}
              getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
              normalize={(value) => value?.format("YYYY-MM-DD")}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Hora"
              name="hora"
              getValueProps={(value) => ({ value: value ? dayjs(value, "HH:mm") : undefined })}
              normalize={(value) => value?.format("HH:mm")}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Asignación</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Chofer" name="chofer_id" rules={[{ required: true }]}>
              <Select {...choferesSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Cliente" name="cliente_id">
              <Select {...clientesSelectProps} allowClear />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Proveedor" name="proveedor_id">
              <Select {...proveedoresSelectProps} allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Servicio</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Tipo de Servicio / Trayecto" name="trayecto" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="REMISE">🚗 Remise</Select.Option>
                <Select.Option value="TRASLADO_REGULAR_BODEGAS">🍷 Traslado Regular Bodegas</Select.Option>
                <Select.Option value="TRASLADO_VUELTA_BODEGA">🔄 Traslado Vuelta Bodega</Select.Option>
                <Select.Option value="MOVIMIENTO_ENTRE_BODEGAS">↔️ Movimiento entre Bodegas</Select.Option>
                <Select.Option value="SHUTTLE">🚌 Shuttle Compartido</Select.Option>
                <Select.Option value="CITY_TOUR">🗺️ City Tour</Select.Option>
                <Select.Option value="DISPOSICION">📍 Disposición</Select.Option>
                <Select.Option value="MINIVAN">🚐 Minivan</Select.Option>
                <Select.Option value="OTRO">📋 Otro</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Origen" name="origen" rules={[{ required: true }]}>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Destino" name="destino" rules={[{ required: true }]}>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Pasajeros</Divider>
        <Row gutter={16}>
          <Col xs={8} sm={4}>
            <Form.Item label="Adultos" name="pasajeros_adultos">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={8} sm={4}>
            <Form.Item label="Menores" name="pasajeros_menores">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={8} sm={4}>
            <Form.Item label="Infantes" name="pasajeros_infantes">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Cobro</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item label="Importe USD" name="importe_usd">
              <InputNumber min={0} prefix="$" style={{ width: "100%" }} precision={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Importe Pesos" name="importe_pesos">
              <InputNumber min={0} prefix="$" style={{ width: "100%" }} precision={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Comisión USD" name="comision_usd">
              <InputNumber min={0} prefix="$" style={{ width: "100%" }} precision={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item label="Método de Cobro" name="metodo_cobro">
              <Select allowClear>
                <Select.Option value="efectivo">💵 Efectivo</Select.Option>
                <Select.Option value="pix">📱 PIX</Select.Option>
                <Select.Option value="link">🔗 Link de pago</Select.Option>
                <Select.Option value="transferencia">🏦 Transferencia</Select.Option>
                <Select.Option value="plataforma">💻 Plataforma</Select.Option>
                <Select.Option value="otro">📋 Otro</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={6}>
            <Form.Item label="¿Paga el Viajero directo?" name="paga_viajero" valuePropName="checked">
              <Switch checkedChildren="SÍ" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Observaciones</Divider>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Obs. Internas" name="obs_internas">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Obs. de Cobros" name="obs_cobros">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Observaciones Generales" name="observaciones">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </Edit>
  );
};
