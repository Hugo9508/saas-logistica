import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form } from "antd";
import { ViajeOperativoSection } from "./sections/ViajeOperativoSection";
import { ViajePasajerosSection } from "./sections/ViajePasajerosSection";
import { ViajeCobroSection } from "./sections/ViajeCobroSection";
import { ViajeObservacionesSection } from "./sections/ViajeObservacionesSection";

export const ViajesEdit: React.FC = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const viaje = query?.data?.data;

  // Load selection details with active conditions, defaulting to previously selected values if inactive
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
    <Edit saveButtonProps={saveButtonProps} title="Modificar Datos de Viaje">
      <Form {...formProps} layout="vertical">
        {/* Modular dispatch details section */}
        <ViajeOperativoSection
          empresasSelectProps={empresasSelectProps}
          choferesSelectProps={choferesSelectProps}
          clientesSelectProps={clientesSelectProps}
          proveedoresSelectProps={proveedoresSelectProps}
        />

        {/* Modular passenger configuration section */}
        <ViajePasajerosSection />

        {/* Modular payment and pricing details section */}
        <ViajeCobroSection />

        {/* Modular notes section */}
        <ViajeObservacionesSection />
      </Form>
    </Edit>
  );
};
