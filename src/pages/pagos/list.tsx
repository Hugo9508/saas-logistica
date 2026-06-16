import {
  CreateButton,
  DateField,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Space, Table, Tag } from "antd";
import type { BaseRecord } from "@refinedev/core";

const origenColor: Record<string, string> = {
  PAGO_FIJO: "purple",
  PROVEEDOR: "orange",
  CLIENTE: "cyan",
  CHOFER: "blue",
  IMPUESTO: "red",
};

const estadoColor: Record<string, string> = {
  pagado: "green",
  pendiente: "orange",
  vencido: "red",
};

export const PagoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: { initial: [{ field: "fecha_pago", order: "desc" }] },
  });

  const empresaIds = (
    tableProps?.dataSource?.map((p: any) => p.empresa_id).filter(Boolean) ?? []
  );

  const empresasResult = useMany({
    resource: "empresas",
    ids: empresaIds,
    queryOptions: { enabled: empresaIds.length > 0 },
  }) as any;
  const empresasData = empresasResult?.query?.data ?? empresasResult?.data;

  const getEmpresa = (id: string) =>
    empresasData?.data?.find((e: any) => e.id === id);

  return (
    <List headerButtons={<CreateButton />}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="fecha_pago"
          title="Fecha Pago"
          width={120}
          render={(v) => v ? <DateField value={v} format="DD/MM/YYYY" /> : "—"}
        />
        <Table.Column
          dataIndex="empresa_id"
          title="Empresa"
          render={(v) => {
            const emp = getEmpresa(v);
            return emp ? <Tag color="blue">{emp.nombre}</Tag> : <Tag>{String(v ?? "").slice(0, 8)}</Tag>;
          }}
        />
        <Table.Column
          dataIndex="origen_tipo"
          title="Origen"
          render={(v) => <Tag color={origenColor[v] ?? "default"}>{v}</Tag>}
        />
        <Table.Column
          title="Monto"
          render={(_, record: BaseRecord) => (
            <span>
              ${Number(record.monto ?? 0).toFixed(2)}{" "}
              <Tag style={{ fontSize: 10 }}>{record.moneda}</Tag>
            </span>
          )}
        />
        <Table.Column
          dataIndex="metodo"
          title="Método"
          render={(v) => <Tag>{v?.toUpperCase()}</Tag>}
        />
        <Table.Column
          dataIndex="estado"
          title="Estado"
          render={(v) => <Tag color={estadoColor[v] ?? "default"}>{v?.toUpperCase()}</Tag>}
        />
        <Table.Column
          title="Acciones"
          fixed="right"
          width={110}
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
