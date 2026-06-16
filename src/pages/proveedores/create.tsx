import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form } from "antd";
import { ProveedorInformacionSection } from "./sections/ProveedorInformacionSection";
import { ProveedorFinancieroSection } from "./sections/ProveedorFinancieroSection";

export const ProveedoresCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: empresasSelectProps } = useSelect({
    resource: "empresas",
    optionLabel: "nombre",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps} title="Registrar Alta de Proveedor">
      <Form {...formProps} layout="vertical">
        <ProveedorInformacionSection empresasSelectProps={empresasSelectProps} />
        <ProveedorFinancieroSection />
      </Form>
    </Create>
  );
};
