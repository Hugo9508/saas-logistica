import React from "react";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Badge, Space, Table, Tag, Tooltip } from "antd";
import { ESTADOS_VIAJE } from "./constants";

export const ViajesList: React.FC = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [{ field: "id", order: "desc" }],
    },
  });

  // Optimize driver loading using useMany to resolve ID relations in a single high-performance query
  const choferIds = [
    ...new Set(
      tableProps?.dataSource?.map((item) => item.chofer_id).filter(Boolean)
    ),
  ];

  const { data: choferesResponse } = useMany({
    resource: "choferes",
    ids: choferIds,
    queryOptions: { enabled: choferIds.length > 0 },
  }) as any;

  const choferesData = choferesResponse?.data;

  // Faster lookup indexing
  const getEstadoBadgeColor = (estado: string) => {
    return ESTADOS_VIAJE.find((item) => item.value === estado)?.color || "default";
  };

  return (
    <List title="Listado General de Viajes y Despacho">
      <Table {...tableProps} rowKey="id" scroll={{ x: 1400 }} size="middle">
        <Table.Column
          dataIndex="fecha"
          title="Fecha"
          width={110}
          sorter
          render={(value) => <DateField value={value} format="DD/MM/YYYY" />}
        />

        <Table.Column
          dataIndex="hora"
          title="Hora"
          width={80}
        />

        <Table.Column
          dataIndex="chofer_id"
          title="Chofer"
          width={160}
          render={(value) => {
            const chofer = choferesData?.find((c: any) => c.id === value);
            return chofer?.nombre ?? "—";
          }}
        />

        <Table.Column
          dataIndex="trayecto"
          title="Tipo de Servicio / Trayecto"
          width={220}
          render={(value) => (
            <Tooltip title={value}>
              <span style={{ cursor: "help" }}>
                {value && value.length > 30 ? `${value.substring(0, 30)}…` : value ?? "—"}
              </span>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="origen"
          title="Origen"
          width={170}
          render={(value) => (
            <Tooltip title={value}>
              <span>{value && value.length > 22 ? `${value.substring(0, 22)}…` : value ?? "—"}</span>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="destino"
          title="Destino"
          width={170}
          render={(value) => (
            <Tooltip title={value}>
              <span>{value && value.length > 22 ? `${value.substring(0, 22)}…` : value ?? "—"}</span>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="pasajeros_adultos"
          title="Pax"
          width={70}
          render={(adultos, record: BaseRecord) =>
            `${adultos ?? 0}+${record.pasajeros_menores ?? 0}`
          }
        />

        <Table.Column
          dataIndex="importe_usd"
          title="Costo USD"
          width={90}
          render={(value) =>
            value > 0 ? (
              <span style={{ fontWeight: 600, color: "#52c41a" }}>
                ${Number(value).toFixed(2)}
              </span>
            ) : "—"
          }
        />

        <Table.Column
          dataIndex="importe_pesos"
          title="Monto $UYU"
          width={100}
          render={(value) =>
            value > 0 ? (
              <span style={{ fontWeight: 600, color: "#1890ff" }}>
                ${Number(value).toLocaleString("es-UY")}
              </span>
            ) : "—"
          }
        />

        <Table.Column
          dataIndex="paga_viajero"
          title="Mano"
          width={90}
          render={(value) =>
            value ? (
              <Badge status="warning" text="Sí" />
            ) : (
              <Badge status="default" text="No" />
            )
          }
        />

        <Table.Column
          dataIndex="metodo_cobro"
          title="Método"
          width={110}
          render={(value) =>
            value ? <Tag color="blue">{String(value).toUpperCase()}</Tag> : "—"
          }
        />

        <Table.Column
          dataIndex="estado"
          title="Estado"
          width={110}
          render={(value) => (
            <Tag color={getEstadoBadgeColor(value)}>
              {value ? String(value).toUpperCase() : "—"}
            </Tag>
          )}
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
