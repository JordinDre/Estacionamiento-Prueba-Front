import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Toast from '../../components/Toast';
import CustomSelect from '../../components/CustomSelect';
import Title from '../../components/Title';
import Swal from 'sweetalert2';
import axioss from '../../utils/axios';

export default function RegistrarEntrada() {
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState([]);
    const [tiposVehiculos, setTiposVehiculos] = useState([]);
    const [sugerenciasPlaca, setSugerenciasPlaca] = useState([]);
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

    useEffect(() => {
        Promise.all([
            axioss.get('catalogo/tipos_vehiculos'),
        ])
            .then(function (responses) {
                setTiposVehiculos(responses[0].data);
                setCargando(false);
            });
    }, []);

    const buscarPlaca = async (texto) => {
        if (!texto) {
            setSugerenciasPlaca([]);
            setVehiculoSeleccionado(null);
            return;
        }
        try {
            const response = await axioss.get(`/vehiculos/buscar/${texto}`);
            setSugerenciasPlaca(response.data);
        } catch (error) {
            console.error("Error al buscar placas:", error);
        }
    };

    const seleccionarPlaca = async (placa, setFieldValue) => {
        try {
            const response = await axioss.get(`/vehiculos/${placa}`);
            setVehiculoSeleccionado(response.data);
            setFieldValue("placa", placa);
            setMostrarSugerencias(false);
        } catch (error) {
            console.error("Error al seleccionar la placa:", error);
            setVehiculoSeleccionado(null);
        }
    };


    const handleSubmit = async (values, { resetForm }) => {
        setCargando(true);
        setErrores([]);

        try {
            const response = await axioss.post(`estancias`, values);
            Swal.fire({
                title: 'Entrada Registrada',
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
        placa: Yup.string().required('El campo es obligatorio'),
    });

    const initial = {
        placa: '',
        tipo_vehiculo: ''
    };
    return (
        <>
            {errores && (
                <>
                    {Object.keys(errores).map((e) => (
                        <Toast key={e} error>{errores[e][0]}</Toast>
                    ))}
                </>
            )}
            <Title>Registrar Entrada</Title>
            <Formik
                initialValues={initial}
                validationSchema={validate}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ setFieldValue, handleChange }) => (
                    <Form>
                        <div className="relative my-4">
                            <label htmlFor='placa' className="cursor-pointer text-md font-semibold">
                                Placa
                            </label>
                            <Field
                                name="placa"
                                as="input"
                                className="bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                autoComplete="off"
                                placeholder="Ingrese la placa"
                                onChange={(e) => {
                                    handleChange(e);
                                    buscarPlaca(e.target.value);
                                    setMostrarSugerencias(true);
                                }}
                                onFocus={() => setMostrarSugerencias(true)}
                            />
                            {mostrarSugerencias && sugerenciasPlaca.length > 0 && (
                                <div className="absolute z-10 w-full border border-gray-300 bg-white rounded-md shadow-lg">
                                    {sugerenciasPlaca.map((sugerencia, index) => (
                                        <div
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => seleccionarPlaca(sugerencia.placa, setFieldValue)}
                                        >
                                            {sugerencia.placa}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {(!vehiculoSeleccionado || !vehiculoSeleccionado.tipo_vehiculo_id) && (
                            <CustomSelect
                                label="Tipo de Vehiculo*"
                                name="tipo_vehiculo"
                                options={tiposVehiculos}
                                customOptions={['tipo_vehiculo']}
                            />
                        )}
                        {cargando ? <Spinner /> : <Button type='submit' className='mt-4' label='Guardar' color='blue' />}
                    </Form>
                )}
            </Formik>
        </>
    );
}
