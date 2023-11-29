import React, { useState, useEffect } from 'react'
import axioss from '../../utils/axios';
import Title from '../../components/Title';
import Modal from '../../components/Modal';
import Formulario from './Formulario';
import Toast from '../../components/Toast';
import Icon from '../../components/Icon';
import Tabla from '../../components/Tabla';
import { formatearDinero, restarHoras } from '../../helpers';
import Badge from '../../components/Badge';

export default function Index() {

  const [tipoVehiculos, setTipoVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [refresh, setRefresh] = useState(false)

  function Accions(props) {
    return (
      <div className='flex'>
        <Modal title={props.row.tipo_vehiculo} button={<Icon icon='ver' />} tooltip="Ver" size='sm' color='info'>
          <Formulario {...props.row} accion={1} setMensaje={setMensaje} />
        </Modal>

        <Modal title={`Editar ${props.row.tipo_vehiculo}`} button={<Icon icon='editar' />} tooltip="Editar" size='sm' color='warning'>
          <Formulario  {...props.row} accion={2} setMensaje={setMensaje} setRefresh={setRefresh} refresh={refresh} />
        </Modal>

        <Modal title={`Eliminar ${props.row.tipo_vehiculo}`} button={<Icon icon='eliminar' />} tooltip="Eliminar" size='xs' color='danger'>
          <Formulario  {...props.row} accion={3} setMensaje={setMensaje} setRefresh={setRefresh} refresh={refresh} />
        </Modal>
      </div>
    );
  }

  useEffect(() => {
    setCargando(true);
    axioss.get('tipos_vehiculos')
      .then(function (res) {
        setTipoVehiculos(res.data);
        setCargando(false);
      })
  }, [refresh]);

  return (
    <>
      <div className='flex justify-between my-2'>
        <Title>Tipos de Vehículos</Title>
        <Modal title='Agregar Tipo de Vehíulo' button='Agregar Tipo de Vehíulo' size='sm' color='primary'>
          <Formulario accion={0} setMensaje={setMensaje} setRefresh={setRefresh} refresh={refresh} />
        </Modal>
      </div>
      {mensaje && <Toast color='success'>{mensaje}</Toast>}
      <Tabla
        isLoading={cargando}
        search={true}
        fileName={'tipo_vehiculos'}
        columns={[
          { header: 'ID', field: 'id' },
          { header: 'Estado', field: 'estado' },
          { header: 'Tipo de Vehíulo', field: 'tipo_vehiculo' },
          { header: 'Tarifa', field: 'tarifa' },
          { header: 'Fecha', field: 'fecha' },
          { header: 'Acciones', field: 'acciones' }
        ]}
        rows={tipoVehiculos?.map((item) => ({
          id: item.id,
          estado: item.estado ? <Badge label='Habilitado' color='success' /> : <Badge label='Desabilitado' color='danger' />,
          tipo_vehiculo: item.tipo_vehiculo,
          tarifa: formatearDinero(item.tarifa),
          fecha: restarHoras(item.created_at, 6),
          acciones: <Accions row={item} />
        }))}
      />
    </>
  )
}

