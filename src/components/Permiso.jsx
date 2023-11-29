import React from 'react';

export default function Permiso({ roles, permissions, children }) {
  const rolActivo = localStorage.getItem('ROLE');
  const permisosActivos = JSON.parse(localStorage.getItem('PERMISOS') || "[]"); // Convertir la cadena JSON a un array

  const tieneRol = roles ? roles.includes(rolActivo) : true; // Si roles no está definido, entonces siempre es true
  const tienePermiso = permissions ? permissions.some(perm => permisosActivos.includes(perm)) : true;

  if (!tieneRol || !tienePermiso) {
    return null; // Ocultar el contenido si no tiene el rol o permiso adecuado
  }

  return <>{children}</>; // Mostrar el contenido si tiene rol y permiso adecuado
}
