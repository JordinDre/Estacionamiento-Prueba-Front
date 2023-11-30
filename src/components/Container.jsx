import React from 'react'
import useAuth from "../hooks/useAuth"
import { Link } from 'react-router-dom'
import Navigation from "./Navigation"
import Spinner from './Spinner'
import Permiso from './Permiso'
import Modal from './Modal'
import Button from './Button'
import CambiarContraseña from '../views/configuracion/CambiarContraseña'

export default function Container({ children }) {

    const { logout, cargando } = useAuth()
    const ROLE = localStorage.getItem('ROLE');
    const NAME = localStorage.getItem('NAME');
    const EMAIL = localStorage.getItem('EMAIL');

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-gray-700">
                    <div className="flex-none">
                        <label htmlFor="my-drawer" className="btn btn-square bg-blue-600 hover:bg-blue-700 sm:ml-3 md:ml-4 lg:ml-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="text-white inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <Link to="/" className="flex ml-1 md:mr-24 bg-white p-2 rounded-md">
                            <h1 className='text-md font-bold text-blue-800'>Estaciona<span className='text-cyan-700'>miento</span></h1>
                        </Link>
                    </div>
                    <h1 className='text-white font-bold mr-2 md:flex md:flex-col hidden'>
                        <span className='tex'>{NAME}</span>
                        <span className='font-normal text-sm'>{EMAIL}</span>
                    </h1>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal flex gap-1">
                            <div className="dropdown dropdown-end sm:mr-8">
                                <label tabIndex={0} className="btn bg-blue-600 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60">
                                    <h1 className='text-black font-bold mr-2 flex flex-col md:hidden text-center'>
                                        <span className='tex'>{NAME}</span>
                                        <span className='font-normal text-sm'>{EMAIL}</span>
                                    </h1>
                                    <h1 className='font-bold text-center text-indigo-700 my-2 uppercase border p-1 border-indigo-600'>{ROLE}</h1>
                                    {/* <Modal title={`Cambiar Contraseña`} button={'Cambiar Contraseña'} size='xs' color='dark'>
                                        <CambiarContraseña />
                                    </Modal> */}
                                    <Button onClick={logout} label='Cerrar Sesión' color='danger' className='mt-3' />
                                </ul>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="h-screen bg-white py-0 px-0.5 mb-5 sm:py-1 md:py-3 lg:py-5 sm:px-5 md:px-6 lg:px-10">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu w-64 md:w-72 lg:w-80 bg-blue-700 text-base-content">
                    <Navigation />
                </ul>
            </div>
        </div>
    )
}
