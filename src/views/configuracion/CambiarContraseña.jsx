import React, { useState, useEffect } from 'react'
import axioss from '../../utils/axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Toast from '../../components/Toast';
import useAuth from '../../hooks/useAuth';

export default function CambiarContraseña(props) {

    const [cargando, setCargando] = useState(false)
    const [errores, setErrores] = useState([])
    const [mensaje, setMensaje] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [usuario, setUsuario] = useState({});
    const { logout } = useAuth()
    const ID = localStorage.getItem('ID');


    const validate = Yup.object().shape({
        email: Yup.string().email('El Email no cumple con la estructura correcta'),
        primer_password: Yup.string().required('Este campo es requerido'),
        segundo_password: Yup.string().oneOf([Yup.ref('primer_password'), null], 'Las contraseñas deben coincidir').required('Este campo es requerido'),
    });

    const initial = {
        email: usuario.email ? usuario.email : '',
        primer_password: '',
        segundo_password: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        setCargando(true)
        setErrores([])
        setMensaje('')
        await axioss.put(`users/${ID}`, values)
            .then(function (res) {
                setRefresh(!props.refresh)
                setMensaje(res.data.message)
                setCargando(false)
                resetForm();
                logout();
            })
            .catch(function (err) {
                console.log(err)
                setErrores(err.response.data.errors)
                setCargando(false)
            })
    }

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
            <Formik
                initialValues={initial}
                validationSchema={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Input type="password" name="primer_password" id="primer_password" label="Nueva Contraseña*" />
                    <Input type="password" name="segundo_password" id="segundo_password" label="Confirme Nueva Contraseña*" />
                    {cargando ? <Spinner /> : <Button type='submit' className='mt-4' label='Aceptar' color='primary' />}
                </Form>
            </Formik>
        </>
    )
}
