import { Navigate, Outlet } from "react-router-dom";
import Container from "./Container";

export default function ProtectedRoute({
    children,
    redirectWhenUnauthenticated = '/login',
    redirectWhenAuthenticated = '/inaccesible',
    allowedRoles,
    allowedPermissions,
    onlyUnauthenticated = false,
    isAllowed
}) {
    const currentRole = localStorage.getItem('ROLE');
    const currentPermissions = JSON.parse(localStorage.getItem('PERMISOS') || "[]");

    const hasPermission = (permissions) => {
        return permissions.some(perm => currentPermissions.includes(perm));
    };

    if (onlyUnauthenticated && isAllowed) {
        return <Navigate to={redirectWhenAuthenticated} />;
    } else if (
        !onlyUnauthenticated &&
        (!isAllowed ||
            (allowedRoles && !allowedRoles.includes(currentRole)) ||
            (allowedPermissions && !hasPermission(allowedPermissions)))
    ) {
        return <Navigate to={redirectWhenUnauthenticated} />;
    }

    return (
        <>
            {children ? children : <Container><Outlet /></Container>}
        </>
    );
}
