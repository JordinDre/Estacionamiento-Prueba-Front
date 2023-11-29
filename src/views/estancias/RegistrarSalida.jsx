import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Toast from '../../components/Toast';
import CustomSelect from '../../components/CustomSelect';
import Title from '../../components/Title';
import Swal from 'sweetalert2';

export default function RegistrarSalida() {
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get('catalogo/vehiculos_adentro'),
        ])
            .then(function (responses) {
                setVehiculos(responses[0].data);
                setCargando(false);
            });
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        setCargando(true);
        setErrores([]);

        try {
            const response = await axios.put(`estancias/${values.vehiculo.id}`);
            Swal.fire({
                title: 'Salida Registrada',
                html: response.data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                resetForm();
            });
        } catch (error) {
            setErrores(error.response.data.errors);
        } finally {
            setCargando(false);
        }
    };

    const validate = Yup.object().shape({
    });

    const initial = {
        placa: [],
    };
    return (
        <>
            {errores.length > 0 && errores.map((e, index) => (
                <Toast key={index} error>{e}</Toast>
            ))}
            <Title>Registrar Salida</Title>
            <Formik
                initialValues={initial}
                validationSchema={validate}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, handleChange }) => (
                    <Form>
                        <CustomSelect
                            label="Placa*"
                            name="vehiculo"
                            options={vehiculos}
                            customOptions={['vehiculo.placa']}
                        />
                        {cargando ? <Spinner /> : <Button type='submit' className='mt-4' label='Guardar' color='blue' />}
                    </Form>
                )}
            </Formik>
        </>
    );
}
