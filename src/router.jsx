import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./views/auth/Login";
import Inicio from "./views/Inicio";
import Inaccesible from "./views/Inaccesible";

import TipoVehiculo from "./views/tipo_vehiculo/Index";
import RegistrarEntrada from "./views/estancias/RegistarEntrada";
import RegistrarSalida from "./views/estancias/RegistrarSalida";
import Estancias from "./views/estancias/Index";
import Vehiculos from "./views/vehiculos/Index";
import PagosResidentes from "./views/pagos_residentes/Index";

const routesConfig = [
    {
        path: "/",
        component: Inicio,
        allowedRoles: ['administrador']
    },
    {
        path: "tipo_vehiculos",
        component: TipoVehiculo,
        allowedRoles: ['administrador']
    },
    {
        path: "registrar/entrada",
        component: RegistrarEntrada,
        allowedRoles: ['administrador']
    },
    {
        path: "registrar/salida",
        component: RegistrarSalida,
        allowedRoles: ['administrador']
    },
    {
        path: "vehiculos",
        component: Vehiculos,
        allowedRoles: ['administrador']
    },
    {
        path: "estancias",
        component: Estancias,
        allowedRoles: ['administrador']
    },
    {
        path: "pagos_residentes",
        component: PagosResidentes,
        allowedRoles: ['administrador']
    },
];

export default function Router() {
    const role = localStorage.getItem('ROLE');

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute isAllowed={!!role} />}>
                    {routesConfig.map((config, index) => (
                        <Route
                            key={index}
                            path={config.path}
                            element={
                                <ProtectedRoute
                                    isAllowed={!!role}
                                    allowedRoles={config.allowedRoles}
                                    allowedPermissions={config.allowedPermissions}
                                >
                                    <config.component />
                                </ProtectedRoute>
                            }
                        />
                    ))}
                    <Route path="inaccesible" element={<Inaccesible />} />
                </Route>
                <Route path="/login" element={<ProtectedRoute onlyUnauthenticated={true} isAllowed={!!role}><Login /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

