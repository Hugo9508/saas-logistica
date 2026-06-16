import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Badge, Space, Table, Tag } from "antd";

export const ClientesList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: { initial: [{ field: "nombre_fantasia", order: "asc" }] },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">

        <Table.Column dataIndex="nombre_fantasia" title="Cliente" sorter />

        <Table.Column dataIndex="pais" title="País" width={100} render={(v) => v ?? "—"} />

        <Table.Column
          dataIndex="tipo_cierre"
          title="Cierre"
          width={110}
          render={(v) => (
            <Tag color={v === "semanal" ? "blue" : v === "quincenal" ? "orange" : "green"}>
              {v?.toUpperCase()}
            </Tag>
          )}
        />

        <Table.Column
          dataIndex="moneda"
          title="Moneda"
          width={90}
          render={(v) => <Tag>{v}</Tag>}
        />

        <Table.Column
          dataIndex="requiere_factura"
          title="Factura"
          width={90}
          render={(v) =>
            v ? <Badge status="warning" text="Sí" /> : <Badge status="default" text="No" />
          }
        />

        <Table.Column dataIndex="contacto_operaciones" title="Contacto" render={(v) => v ?? "—"} />

        <Table.Column
          dataIndex="activo"
          title="Estado"
          width={90}
          render={(v) =>
            v ? <Badge status="success" text="Activo" /> : <Badge status="error" text="Inactivo" />
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
