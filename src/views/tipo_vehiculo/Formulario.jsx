import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import axioss from "../../utils/axios";
import * as Yup from 'yup';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
import TextArea from '../../components/TextArea';

export default function Formulario(props) {

  const [cargando, setCargando] = useState(false)
  const [errores, setErrores] = useState([])

  const validate = Yup.object().shape({
    tipo_vehiculo: Yup.string().required('El campo es obligatorio'),
    tarifa: Yup.string().required('El campo es obligatorio'),
  });

  const initial = {
    tipo_vehiculo: props?.tipo_vehiculo || '',
    tarifa: props?.tarifa || '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    props?.accion === 2 ? editar(values, props?.id) :
      props?.accion === 3 ? eliminar(props?.id) : crear(values, { resetForm })
  }

  const crear = async (values, { resetForm }) => {
    setCargando(true)
    setErrores([])
    props.setMensaje('')
    await axioss.post('tipos_vehiculos', values)
      .then(function (res) {
        props.setRefresh(!props.refresh)
        props.setMensaje(res.data.message)
        props.cerrarModal()
        setCargando(false)
        resetForm();
      })
      .catch(function (err) {
        setErrores(err.response.data.errors)
        setCargando(false)
      })

  }

  const editar = async (values, id) => {
    setCargando(true)
    setErrores([])
    props.setMensaje('')
    await axioss.put(`tipos_vehiculos/${id}`, values)
      .then(function (res) {
        props.cerrarModal()
        props.setRefresh(!props.refresh)
        props.setMensaje(res.data.message)
        setCargando(false)
      })
      .catch(function (err) {
        setErrores(err.response.data.errors)
        setCargando(false)
      })
  }

  const eliminar = async (id) => {
    setCargando(true)
    setErrores([])
    props.setMensaje('')
    await axioss.delete(`tipos_vehiculos/${id}`)
      .then(function (res) {
        props.cerrarModal()
        props.setRefresh(!props.refresh)
        props.setMensaje(res.data.message)
        setCargando(false)
      })
      .catch(function (err) {
        setErrores(err.response.data.errors)
        setCargando(false)
      })
  }

  return (
    <>
      {errores && (
        <>
          {Object.keys(errores).map((e) => (
            <Toast key={e} error>{errores[e][0]}</Toast>
          ))}
        </>
      )}
      <Formik
        initialValues={initial}
        validationSchema={validate}
        onSubmit={handleSubmit}
      >
        <Form >
          {props?.accion !== 3 ?
            <>
              <Input name="tipo_vehiculo" label="Tipo de Vehículo*" id='tipo_vehiculo' disabled={props?.accion === 1 && true} />
              <Input type='number' name="tarifa" label="Tarifa*" id='tarifa' disabled={props?.accion === 1 && true} />
              {cargando ? <Spinner /> : props?.accion !== 1 && <Button className='pt-4' type='submit' label='Aceptar' color='primary' disabled={props?.accion === 1 && true} />}
            </>
            :
            <>
              <p className='font-bold text-center text-lg my-4'>Seguro que quieres desabilitar el Tipo de Vehículo {`${props?.tipo_vehiculo}`}?</p>
              {cargando ? <Spinner /> : <Button type='submit' color='danger' label='Si' />}
            </>
          }
        </Form>

      </Formik>
    </>

  )
}

