import React from 'react'
import CardLink from '../components/CardLink';
import Permiso from '../components/Permiso';
import Icon from '../components/Icon';
import Modal from '../components/Modal';

export default function Inicio() {

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1'>
      <CardLink label='Tipos de Vehículos' link='/tipo_vehiculos' icon='tipo_vehiculo' color='primary' />
      <CardLink label='Registrar Entrada' link='/registrar/entrada' icon='entrada' color='primary' />
      <CardLink label='Vehiculos' link='/vehiculos' icon='vehiculo' color='primary' />
      <CardLink label='Estancias' link='/estancias' icon='parqueo' color='primary' />
      <CardLink label='Registrar Salida' link='/registrar/salida' icon='salida' color='primary' />
      <CardLink label='Informe' link='/informe' icon='informe' color='primary' />
    </div>
  );
}
