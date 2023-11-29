import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routes = [
    {
        title: 'Control Médico',
        links: [
            { to: '/control_medico', text: 'Control Médico', roles: ['administrador'] },
            { to: '/medicamentos', text: 'Medicamentos', roles: ['administrador'] },
            { to: '/planes_educacionales', text: 'Planes Educacionales', roles: ['administrador'] },
        ],
    },
    {
        title: 'Tratamientos',
        links: [
            { to: '/tratamientos', text: 'Tratamientos', roles: ['administrador'] },
            { to: '/tipos_tratamientos', text: 'Tipos de Tratamientos', roles: ['administrador'] },
        ],
    },
    {
        title: 'Usuarios',
        links: [
            { to: '/pacientes', text: 'Pacientes', roles: ['administrador'] },
        ],
    },
    {
        title: 'Agendar Cita',
        links: [
            { to: '/citas', text: 'Citas', roles: ['administrador'] },
        ],
    },
];


export default function Navigation() {
    function closeDrawer() {
        document.getElementById('my-drawer').click();
    }
    const location = useLocation();
    const currentPath = location.pathname;
    const ROLE = localStorage.getItem('ROLE');
    let PERMISSIONS = localStorage.getItem('PERMISOS');

    try {
        PERMISSIONS = JSON.parse(PERMISSIONS);
    } catch (error) {
        PERMISSIONS = [];
    }

    function hasPermission(link) {
        if (!link.permissions) return true;
        return link.permissions.some(permission => PERMISSIONS.includes(permission));
    }


    return (
        <div className="h-full mt-5 mb-14 overflow-y-auto">
            {routes.map((route) => {
                const linksWithRequiredRolesAndPermissions = route.links.filter(
                    link => link.roles.includes(ROLE) && hasPermission(link)
                );

                if (linksWithRequiredRolesAndPermissions.length === 0) {
                    return null;
                }

                return (
                    <div key={route.title}>
                        <div className="flex justify-between pl-6 w-full p-3 text-xl text-gray-100 transition duration-75 group font-extrabold bg-gray-700">
                            {route.title}
                        </div>
                        {linksWithRequiredRolesAndPermissions.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={closeDrawer}
                                className={
                                    currentPath === link.to
                                        ? 'flex justify-between pl-6 w-full py-2 text-base transition duration-75 group bg-white text-black font-normal'
                                        : 'flex justify-between pl-6 w-full py-2 text-base text-gray-100 transition duration-75 group hover:bg-white hover:text-black font-normal'
                                }
                            >
                                {link.text}
                            </Link>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
