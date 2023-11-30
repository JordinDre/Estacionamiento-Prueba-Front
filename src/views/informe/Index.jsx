import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axioss from '../../utils/axios';
import Input from '../../components/Input';
import CustomButton from '../../components/Button';
import Title from '../../components/Title';
import CustomSelect from '../../components/CustomSelect';
import Spinner from '../../components/Spinner';
import Tabla from '../../components/Tabla';
import { formatearDinero, restarHoras } from '../../helpers';
import Toast from '../../components/Toast';

export default function Index() {

    const [cargando, setCargando] = useState(false)
    const [tiposVehiculos, setTiposVehiculos] = useState([])
    const [informe, setInforme] = useState([])
    const [errores, setErrores] = useState([])

    useEffect(() => {
        Promise.all([
            axioss.get('catalogo/tipos_vehiculos'),
        ])
            .then(function (responses) {
                setTiposVehiculos(responses[0].data);
            })
    }, []);

    const validationSchema = Yup.object({
        fecha_inicial: Yup.date().required('El campo es obligatorio'),
        fecha_final: Yup.date().required('El campo es obligatorio'),
    });

    const handleSubmit = (values) => {
        setCargando(true)
        axioss.get('reporte/pagos_residentes', {
            params: {
                fecha_inicial: values?.fecha_inicial,
                fecha_final: values?.fecha_final,
                tipo_vehiculo: values?.tipo_vehiculo.id,
            }
        }).then(response => {
            setInforme(response.data)
            setCargando(false);
        }).catch(error => {
            console.log(error)
        });
    };

    return (
        <div className='pb-10 mb-10'>
            {errores && (
                <>
                    {Object.keys(errores).map((e) => (
                        <Toast key={e} error>{errores[e][0]}</Toast>
                    ))}
                </>
            )}
            <div className='flex justify-between items-end'>
                <Title>Pagos Residentes</Title>
            </div>
            <Formik
                initialValues={{ fecha_inicial: '', fecha_final: '', tipo_vehiculo: [] }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className='md:flex md:gap-4 align-bottom items-end my-2 mb-5'>
                        <Input type='date' name="fecha_inicial" label="Fecha Inicial*" id='fecha' />
                        <Input type='date' name="fecha_final" label="Fecha Final*" id='fecha' />
                        <CustomSelect
                            label="Tipo Vehículo*"
                            name="tipo_vehiculo"
                            options={tiposVehiculos}
                            customOptions={['tipo_vehiculo']}
                        />
                        {cargando ? <Spinner spin /> : <CustomButton type='submit' color='primary' label='Aceptar' className='w-full mt-5 md:mb-1' />}
                        {(values.fecha_inicial && values.fecha_final) &&
                            <CustomButton color="danger" label='PDF' className='w-full mt-5 md:mb-1'
                                onClick={() => {
                                    setErrores([])
                                    axioss.get(`reporte/pagos_residentes_pdf`, {
                                        params: {
                                            fecha_inicial: values?.fecha_inicial,
                                            fecha_final: values?.fecha_final,
                                            tipo_vehiculo: values?.tipo_vehiculo.id,
                                        },
                                        responseType: 'blob',
                                    })
                                        .then(res => {
                                            const facturaBlob = new Blob([res.data], {
                                                type: "application/pdf",
                                            });
                                            const blobURL = URL.createObjectURL(facturaBlob);
                                            window.open(blobURL, "_blank");
                                        })
                                }}
                            />
                        }
                    </Form>
                )}
            </Formik>
            < Tabla
                isLoading={cargando}
                search={true}
                scroll={true}
                exportable={true}
                fileName={`Pagos Residentes`}
                columns={[
                    { header: "Num. Placa", field: "placa" },
                    { header: "Tipo Vehiculo", field: "tipo_vehiculo" },
                    { header: "Tiempo Estacionado (min.)", field: "tiempo_estacionado" },
                    { header: "Cantidad a Pagar", field: "cantidad_pagar" },
                ]}
                rows={informe?.map((item) => ({
                    placa: item.placa,
                    tipo_vehiculo: item.tipo_vehiculo,
                    tiempo_estacionado: item.duracion_total_minutos,
                    cantidad_pagar: formatearDinero(item.duracion_total_minutos * item.tarifa),
                }))}
            />
        </div>
    );
}
