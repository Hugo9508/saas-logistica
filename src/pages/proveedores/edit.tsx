import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form } from "antd";
import { ProveedorInformacionSection } from "./sections/ProveedorInformacionSection";
import { ProveedorFinancieroSection } from "./sections/ProveedorFinancieroSection";

export const ProveedoresEdit: React.FC = () => {
  const { formProps, saveButtonProps, query } = useForm();
  const proveedor = query?.data?.data;

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
    defaultValue: proveedor?.empresa_id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps} title="Modificar Ficha de Proveedor">
      <Form {...formProps} layout="vertical">
        <ProveedorInformacionSection empresasSelectProps={empresasSelectProps} />
        <ProveedorFinancieroSection />
      </Form>
    </Edit>
  );
};
