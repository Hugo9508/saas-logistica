import {
  CreateButton,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table, Tag } from "antd";

export const EmpresaList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: { initial: [{ field: "nombre", order: "asc" }] },
  });

  return (
    <List headerButtons={<CreateButton />}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="nombre"
          title="Nombre"
          render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column dataIndex="razon_social" title="Razón Social" />
        <Table.Column
          dataIndex={["metadata", "rut"]}
          title="RUT"
          render={(v) => v ?? "—"}
        />
        <Table.Column
          dataIndex={["metadata", "datos_contacto", "email"]}
          title="Email de Contacto"
          render={(v) => v ?? "—"}
        />
        <Table.Column
          title="Acciones"
          fixed="right"
          width={130}
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
