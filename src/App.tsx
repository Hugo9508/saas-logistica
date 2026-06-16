import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayout,
  ThemedSider,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import {
  CarOutlined,
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  BookOutlined,
  CalendarOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import authProvider from "./providers/auth";
import { dataProvider } from "./providers/data";
import { supabaseClient } from "./providers/supabase-client";

// Módulos
import { ViajesList, ViajesCreate, ViajesEdit, ViajesShow } from "./pages/viajes";
import { ChoferesList, ChoferesCreate, ChoferesEdit, ChoferesShow } from "./pages/choferes";
import { ClientesList, ClientesCreate, ClientesEdit, ClientesShow } from "./pages/clientes";
import { EmpresaList, EmpresaCreate, EmpresaEdit, EmpresaShow } from "./pages/empresas";
import { PagoList, PagoCreate, PagoEdit, PagoShow } from "./pages/pagos";
// import { ProveedoresList, ProveedoresCreate, ProveedoresEdit, ProveedoresShow } from "./pages/proveedores";
// import { CuentaCorrienteList } from "./pages/cuenta-corriente";
// import { PagosFijosList } from "./pages/pagos-fijos";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerProvider}
                notificationProvider={useNotificationProvider}
                resources={[
                  // ── OPERATIVA ──────────────────────────────────────────
                  {
                    name: "viajes",
                    list: "/viajes",
                    create: "/viajes/create",
                    edit: "/viajes/edit/:id",
                    show: "/viajes/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Viajes",
                      icon: <CarOutlined />,
                    },
                  },
                  {
                    name: "choferes",
                    list: "/choferes",
                    create: "/choferes/create",
                    edit: "/choferes/edit/:id",
                    show: "/choferes/show/:id",
                    meta: {
                      canDelete: false,
                      label: "Choferes",
                      icon: <UserOutlined />,
                    },
                  },
                  // ── COMERCIAL ──────────────────────────────────────────
                  {
                    name: "clientes",
                    list: "/clientes",
                    create: "/clientes/create",
                    edit: "/clientes/edit/:id",
                    show: "/clientes/show/:id",
                    meta: {
                      canDelete: false,
                      label: "Clientes",
                      icon: <TeamOutlined />,
                    },
                  },
                  {
                    name: "proveedores",
                    list: "/proveedores",
                    create: "/proveedores/create",
                    edit: "/proveedores/edit/:id",
                    show: "/proveedores/show/:id",
                    meta: {
                      canDelete: false,
                      label: "Proveedores",
                      icon: <ShopOutlined />,
                    },
                  },
                  // ── FINANCIERO ─────────────────────────────────────────
                  {
                    name: "cuenta_corriente",
                    list: "/cuenta-corriente",
                    create: "/cuenta-corriente/create",
                    edit: "/cuenta-corriente/edit/:id",
                    show: "/cuenta-corriente/show/:id",
                    meta: {
                      canDelete: false,
                      label: "Cuenta Corriente",
                      icon: <BookOutlined />,
                    },
                  },
                  {
                    name: "pagos_fijos",
                    list: "/pagos-fijos",
                    create: "/pagos-fijos/create",
                    edit: "/pagos-fijos/edit/:id",
                    show: "/pagos-fijos/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Pagos Fijos",
                      icon: <CalendarOutlined />,
                    },
                  },
                  {
                    name: "pagos",
                    list: "/pagos",
                    create: "/pagos/create",
                    edit: "/pagos/edit/:id",
                    show: "/pagos/show/:id",
                    meta: {
                      canDelete: false,
                      label: "Pagos",
                      icon: <DollarOutlined />,
                    },
                  },
                  // ── MAESTROS ──────────────────────────────────────────
                  {
                    name: "empresas",
                    list: "/empresas",
                    create: "/empresas/create",
                    edit: "/empresas/edit/:id",
                    show: "/empresas/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Empresas",
                      icon: <BankOutlined />,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "AyaO4w-cmGiOT-QJhu3m",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout
                          Header={Header}
                          Sider={(props) => <ThemedSider {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="viajes" />}
                    />

                    <Route path="/viajes">
                      <Route index element={<ViajesList />} />
                      <Route path="create" element={<ViajesCreate />} />
                      <Route path="edit/:id" element={<ViajesEdit />} />
                      <Route path="show/:id" element={<ViajesShow />} />
                    </Route>

                    <Route path="/choferes">
                      <Route index element={<ChoferesList />} />
                      <Route path="create" element={<ChoferesCreate />} />
                      <Route path="edit/:id" element={<ChoferesEdit />} />
                      <Route path="show/:id" element={<ChoferesShow />} />
                    </Route>

                    <Route path="/clientes">
                      <Route index element={<ClientesList />} />
                      <Route path="create" element={<ClientesCreate />} />
                      <Route path="edit/:id" element={<ClientesEdit />} />
                      <Route path="show/:id" element={<ClientesShow />} />
                    </Route>

                    <Route path="/empresas">
                      <Route index element={<EmpresaList />} />
                      <Route path="create" element={<EmpresaCreate />} />
                      <Route path="edit/:id" element={<EmpresaEdit />} />
                      <Route path="show/:id" element={<EmpresaShow />} />
                    </Route>

                    <Route path="/pagos">
                      <Route index element={<PagoList />} />
                      <Route path="create" element={<PagoCreate />} />
                      <Route path="edit/:id" element={<PagoEdit />} />
                      <Route path="show/:id" element={<PagoShow />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  {/* Rutas públicas */}
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
