import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Badge, Space, Table, Tag } from "antd";

export const ChoferesList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: { initial: [{ field: "nombre", order: "asc" }] },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">

        <Table.Column dataIndex="nombre" title="Nombre" sorter />

        <Table.Column dataIndex="telefono" title="Teléfono" render={(v) => v ?? "—"} />

        <Table.Column dataIndex="email" title="Email" render={(v) => v ?? "—"} />

        <Table.Column
          dataIndex="tipo"
          title="Tipo"
          render={(v) => (
            <Tag color={v === "propio" ? "blue" : "purple"}>
              {v === "propio" ? "👤 Propio" : "🤝 Proveedor"}
            </Tag>
          )}
        />

        <Table.Column
          dataIndex="comision_default"
          title="Comisión USD"
          render={(v) => (v > 0 ? `$${Number(v).toFixed(2)}` : "—")}
        />

        <Table.Column
          dataIndex="activo"
          title="Estado"
          render={(v) =>
            v ? (
              <Badge status="success" text="Activo" />
            ) : (
              <Badge status="error" text="Inactivo" />
            )
          }
        />

        <Table.Column
          title="Acciones"
          fixed="right"
          width={120}
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
