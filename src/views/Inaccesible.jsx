// Inaccesible.js
import React from 'react';
import { Link } from "react-router-dom";

export default function Inaccesible() {
    const isLogged = localStorage.getItem('ROLE');  
    
    return (
        <div className='text-center font-bold text-lg'>
            <h2>Ruta Inaccesible</h2>
            <p>No tienes permisos para acceder a esta página.</p>

            {isLogged ? (
                <Link className='text-blue-700 cursor-pointer hover:p-2 hover:rounded-lg hover:text-white hover:bg-blue-700' to="/">Ir al Inicio</Link>
            ) : (
                <Link className='text-blue-700 cursor-pointer hover:p-2 hover:rounded-lg hover:text-white hover:bg-blue-700' to="/login">Iniciar Sesión</Link>
            )}
        </div>
    );
}
