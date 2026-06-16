import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form } from "antd";
import { ViajeOperativoSection } from "./sections/ViajeOperativoSection";
import { ViajePasajerosSection } from "./sections/ViajePasajerosSection";
import { ViajeCobroSection } from "./sections/ViajeCobroSection";
import { ViajeObservacionesSection } from "./sections/ViajeObservacionesSection";

export const ViajesCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  // Load selection details with proper active conditions
  const { selectProps: choferesSelectProps } = useSelect({
    resource: "choferes",
    optionLabel: "nombre",
    optionValue: "id",
    filters: [{ field: "activo", operator: "eq", value: true }],
  });

  const { selectProps: clientesSelectProps } = useSelect({
    resource: "clientes",
    optionLabel: "nombre_fantasia",
    optionValue: "id",
    filters: [{ field: "activo", operator: "eq", value: true }],
  });

  const { selectProps: proveedoresSelectProps } = useSelect({
    resource: "proveedores",
    optionLabel: "nombre_fantasia",
    optionValue: "id",
    filters: [{ field: "activo", operator: "eq", value: true }],
  });

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps} title="Registrar Alta de Viaje">
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
    </Create>
  );
};
