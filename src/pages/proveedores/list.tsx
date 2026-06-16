import React from "react";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Badge, Space, Table, Tag } from "antd";
import { ESTADOS_PROVEEDOR } from "./constants";

export const ProveedoresList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [{ field: "id", order: "desc" }],
    },
  });

  const getEstadoBadge = (activo: boolean) => {
    const matched = ESTADOS_PROVEEDOR.find((item) => item.value === activo);
    return matched ? (
      <Badge status={matched.color as any} text={matched.label} />
    ) : (
      <Badge status="default" text="—" />
    );
  };

  return (
    <List title="Catálogo de Proveedores / Transportistas">
      <Table {...tableProps} rowKey="id" scroll={{ x: 1200 }} size="middle">
        <Table.Column
          dataIndex="nombre_fantasia"
          title="Nombre de Fantasía"
          width={180}
          sorter
          render={(value) => <span className="font-semibold text-slate-800">{value}</span>}
        />

        <Table.Column
          dataIndex="razon_social"
          title="Razón Social"
          width={180}
        />

        <Table.Column
          dataIndex="rut"
          title="RUT"
          width={140}
          render={(value) => <span className="font-mono text-xs">{value ?? "—"}</span>}
        />

        <Table.Column
          dataIndex="telefono"
          title="Teléfono"
          width={140}
        />

        <Table.Column
          dataIndex="email"
          title="Correo Electrónico"
          width={180}
        />

        <Table.Column
          dataIndex="banco_nombre"
          title="Banco"
          width={110}
          render={(value) => (value ? <Tag color="orange">{value}</Tag> : "—")}
        />

        <Table.Column
          dataIndex="comision_porcentaje"
          title="Comisión (%)"
          width={110}
          render={(value) => (value !== undefined ? <span className="font-semibold font-mono">{value}%</span> : "—")}
        />

        <Table.Column
          dataIndex="activo"
          title="Estado"
          width={110}
          render={(value) => getEstadoBadge(value)}
        />

        <Table.Column
          title="Acciones"
          fixed="right"
          width={120}
          render={(_, record: BaseRecord) => (
            <Space size="small">
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
