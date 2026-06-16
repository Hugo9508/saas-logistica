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

export const ViajesList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [{ field: "id", order: "desc" }],
    },
  });

  const chofereIds = [
    ...new Set(
      tableProps?.dataSource?.map((item) => item.chofer_id).filter(Boolean)
    ),
  ];

  const choferesResponse = useMany({
    resource: "choferes",
    ids: chofereIds,
    queryOptions: { enabled: chofereIds.length > 0 },
  }) as any;
  const choferesData = choferesResponse.data;

  const estadoColor: Record<string, string> = {
    realizado: "green",
    pendiente: "orange",
    cancelado: "red",
    en_curso: "blue",
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id" scroll={{ x: 1400 }}>

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
          width={70}
        />

        <Table.Column
          dataIndex="chofer_id"
          title="Chofer"
          width={150}
          render={(value) => {
            const chofer = choferesData?.data?.find((c: any) => c.id === value);
            return chofer?.nombre ?? "—";
          }}
        />

        <Table.Column
          dataIndex="trayecto"
          title="Tipo de Servicio"
          width={200}
          render={(value) => (
            <Tooltip title={value}>
              <span style={{ cursor: "help" }}>
                {value?.length > 35 ? value.substring(0, 35) + "…" : value ?? "—"}
              </span>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="origen"
          title="Origen"
          width={160}
          render={(value) => (
            <Tooltip title={value}>
              <span>{value?.length > 25 ? value.substring(0, 25) + "…" : value ?? "—"}</span>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="destino"
          title="Destino"
          width={160}
          render={(value) => (
            <Tooltip title={value}>
              <span>{value?.length > 25 ? value.substring(0, 25) + "…" : value ?? "—"}</span>
            </Tooltip>
          )}
        />

        <Table.Column
          dataIndex="pasajeros_adultos"
          title="Pax"
          width={60}
          render={(adultos, record: BaseRecord) =>
            `${adultos ?? 0}+${record.pasajeros_menores ?? 0}`
          }
        />

        <Table.Column
          dataIndex="importe_usd"
          title="USD"
          width={80}
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
          title="$UYU"
          width={90}
          render={(value) =>
            value > 0 ? (
              <span style={{ fontWeight: 600 }}>
                ${Number(value).toLocaleString("es-UY")}
              </span>
            ) : "—"
          }
        />

        <Table.Column
          dataIndex="paga_viajero"
          title="Paga Viajero"
          width={100}
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
          width={100}
          render={(value) =>
            value ? <Tag>{value.toUpperCase()}</Tag> : "—"
          }
        />

        <Table.Column
          dataIndex="estado"
          title="Estado"
          width={110}
          render={(value) => (
            <Tag color={estadoColor[value] ?? "default"}>
              {value?.toUpperCase() ?? "—"}
            </Tag>
          )}
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