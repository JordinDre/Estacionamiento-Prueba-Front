import React from 'react'
import CardLink from '../components/CardLink';
import Permiso from '../components/Permiso';
import Icon from '../components/Icon';
import Modal from '../components/Modal';

export default function Inicio() {

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1'>
      <CardLink label='Tipos de Vehículos' link='/tipo_vehiculos' icon='tipo_vehiculo' color='primary' />
      
    </div>
  );
}
