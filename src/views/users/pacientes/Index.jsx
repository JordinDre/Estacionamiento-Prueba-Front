import React, { useState, useEffect } from 'react'
import axioss from '../../../utils/axios';
import Title from '../../../components/Title';
import Modal from '../../../components/Modal';
import Formulario from './Formulario';
import Toast from '../../../components/Toast';
import Icon from '../../../components/Icon';
import Tabla from '../../../components/Tabla';
import Badge from '../../../components/Badge';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Ver from './Ver';
import { Formik, Form } from 'formik';

export default function Index() {

  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [errores, setErrores] = useState([])

  function Accions(props) {
    return (
      <div className='flex'>
        <Modal title={`Información de ${props.row.name}`} button={<Icon icon='ver' />} tooltip="Ver" size='xl' color='info'>
          <Ver {...props.row} />
        </Modal>

        <Link to={`/paciente/${props.row.id}`} state={props.row} >
          <Button label={<Icon icon='editar' />} tooltip="Editar" color='warning' />
        </Link>

        <Modal title={`Eliminar a ${props.row.name}`} button={<Icon icon='eliminar' />} tooltip="Eliminar" size='xs' color='danger'>
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              setCargando(true)
              setErrores([])
              setMensaje('')
              await axioss.delete(`pacientes/${props?.row?.id}`)
                .then(function (res) {
                  setRefresh(!refresh)
                  setMensaje(res.data.message)
                  setCargando(false)
                })
                .catch(function (err) {
                  setErrores(err.response.data.errors)
                  setCargando(false)
                })
            }}
          >
            <Form >
              <p className='font-bold text-center text-lg my-4'>Seguro que quieres eliminar al Paciente {`${props?.row?.name}`}?</p>
              {cargando ? <Spinner /> : <Button type='submit' color='danger' label='Si' />}
            </Form>
          </Formik>
        </Modal>
      </div>
    );
  }

  useEffect(() => {
    setCargando(true);
    axioss.get('pacientes')
      .then(function (res) {
        setPacientes(res.data);
        setCargando(false);
      })
  }, [refresh]);

  return (
    <>
      {mensaje && <Toast color='success'>{mensaje}</Toast>}
      {errores && (
        <>
          {Object.keys(errores).map((e) => (
            <Toast key={e} error>{errores[e][0]}</Toast>
          ))}
        </>
      )}
      <div className='flex justify-between my-2'>
        <Title>Pacientes</Title>
        <Link to={`/paciente`}  >
          <Button label='Agregar Paciente' color='primary' />
        </Link>
      </div>

      <Tabla
        isLoading={cargando}
        search={true}
        scroll={true}
        exportable={true}
        fileName={'Pacientes'}
        columns={[
          { header: 'Código', field: 'codigo' },
          { header: 'Estado', field: 'estado' },
          { header: 'Nombre Completo', field: 'name' },
          { header: 'DPI', field: 'dpi' },
          { header: 'Dirección', field: 'direccion' },
          { header: 'Teléfono', field: 'telefono' },
          { header: 'Acciones', field: 'acciones' }
        ]}
        rows={pacientes?.map((item) => ({
          codigo: item.codigo,
          estado: item.estado ? <Badge label={"ACTIVO"} color="success" /> : <Badge label={"INACTIVO"} color="danger" />,
          name: item.name,
          dpi: item.dpi,
          telefono: item.telefono,
          direccion: item.direccion + ', zona ' + item.zona + ', ' + item.municipio.municipio + ', ' + item.municipio.departamento.departamento,
          acciones: <Accions row={item} />
        }))}
      />
    </>
  )
}
