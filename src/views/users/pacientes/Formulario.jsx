import React, { useState, useEffect } from 'react'
import axioss from "../../../utils/axios";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import Toast from '../../../components/Toast';
import CustomSelect from '../../../components/CustomSelect';
import { formatearFecha } from '../../../helpers';
import SubTitle from '../../../components/SubTitle';
import Title from '../../../components/Title';
import Checkbox from '../../../components/Checkbox';
import { useNavigate, useLocation } from "react-router-dom";

export default function Formulario(props) {

    const navigate = useNavigate()
    const location = useLocation();
    const [cargando, setCargando] = useState(false)
    const [errores, setErrores] = useState([])
    const [mensaje, setMensaje] = useState('')
    const [departamentos, setDepartamentos] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [edit, setEdit] = useState(location?.state != null ? true : false);

    const validate = Yup.object().shape({
        name: Yup.string().required('El Nombre es requerido'),
        dpi: Yup.string().matches(/^\d{13}$/, 'El DPI debe tener 13 dígitos'),
        telefono: Yup.string().required('El Teléfono es requerido').matches(/^\d{8}$/, 'El Teléfono debe llevar 8 dígitos'),
        fecha_nacimiento: Yup.date().required('La Fecha de Nacimiento es requerida'),
        genero: Yup.mixed().required('El Género es requerido'),
        lateralidad: Yup.mixed().required('La Lateralidad es requerida'),
        estado_civil: Yup.mixed().required('El Estado Civil es requerido'),
        departamento: Yup.mixed().required('El Departamento es requerido'),
        municipio: Yup.mixed().required('El Municipio es requerido'),
        direccion: Yup.string().required('La Dirección es requerida'),
        zona: Yup.string().max(2, 'El número no puede exceder de 2 dígitos').notOneOf(['0'], 'El número no puede ser 0'),
    });

    const initial = {
        name: location?.state?.name || '',
        telefono: location?.state?.telefono || '',
        dpi: location?.state?.dpi || '',
        fecha_nacimiento: formatearFecha(location?.state?.fecha_nacimiento) || '',
        genero: location?.state || '',
        lateralidad: location?.state || '',
        direccion: location?.state?.direccion || '',
        zona: location?.state?.zona || '',
        departamento: location?.state?.municipio?.departamento || [],
        municipio: location?.state?.municipio || [],
        estado_civil: location?.state || '',
        profesion: location?.state?.profesion || '',
        ocupacion: location?.state?.ocupacion || '',
        remitido_por: location?.state?.remitido_por || '',
        diagnostico_medico: location?.state?.diagnostico_medico || '',

        patologicos: location?.state?.antecedentes?.patologicos || '',
        quirurgicos: location?.state?.antecedentes?.quirurgicos || '',
        traumatologicos: location?.state?.antecedentes?.traumatologicos || '',
        farmacologicos: location?.state?.antecedentes?.farmacologicos || '',
        alergicos: location?.state?.antecedentes?.alergicos || '',
        ginecoobstetras: location?.state?.antecedentes?.ginecoobstetras || '',
        otros: location?.state?.antecedentes?.otros || '',
        familiares: location?.state?.antecedentes?.familiares || '',
        habitos_costumbres: location?.state?.antecedentes?.habitos_costumbres || '',
        fuma: location?.state?.antecedentes?.fuma || false,
        alcohol: location?.state?.antecedentes?.alcohol || false,
        motivo: location?.state?.antecedentes?.motivo || '',
    };

    useEffect(() => {
        Promise.all([
            axioss.get('catalogo/departamentos'),
        ])
            .then(function (responses) {
                setDepartamentos(responses[0].data);
                setCargando(false);
            })
    }, []);

    const handleSelectDepartamento = ({ values }) => {
        if (values && values.id) {
            axioss.get(`catalogo/municipios/${values.id}`)
                .then(function (res) {
                    setMunicipios(res.data);
                })
        }
    };

    const handleSubmit = async (values) => {
        setCargando(true);
        setErrores([]);
        const endpoint = edit ? `pacientes/${location.state.id}` : 'pacientes';

        try {
            const res = await axioss[edit ? 'put' : 'post'](endpoint, values);
            res.data.status && navigate('/pacientes')
        } catch (err) {
            setErrores(err.response.data.errors);
        }
        setCargando(false);
    };

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
            <Title >{edit ? 'Editar' : 'Crear'} Paciente</Title>
            <Formik
                initialValues={initial}
                validationSchema={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className={`bg-slate-200 rounded-md shadow-md mb-5 px-2 pb-4  grid grid-cols-1 gap-2 items-end w-full`}>
                        <div className='md:flex md:justify-center md:gap-5'>
                            <div className='md:basis-1/3'>
                                <Input name="name" id="name" label="Nombre Completo*" />
                                <Input name="telefono" id="telefono" label="Teléfono*" />
                                <Input name="dpi" id="dpi" label="DPI" />
                                <Input name="fecha_nacimiento" type='date' id="fecha_nacimiento" label="Fecha de Nacimiento*" />
                                <CustomSelect
                                    label="Género*"
                                    name="genero"
                                    options={[{ genero: 'Masculino' }, { genero: 'Femenino' }]}
                                    customOptions={['genero']}

                                />
                            </div>
                            <div className='md:basis-1/3'>
                                <CustomSelect
                                    label="Lateralidad*"
                                    name="lateralidad"
                                    options={[{ lateralidad: 'Derecho' }, { lateralidad: 'Izquierdo' }]}
                                    customOptions={['lateralidad']}

                                />
                                <Input name="direccion" id="direccion" label="Dirección*" />
                                <Input name="zona" id="zona" label="Zona" type="number" />
                                <CustomSelect
                                    label="Departamento*"
                                    name="departamento"
                                    options={departamentos}
                                    customOptions={['departamento']}

                                    onChange={(values) => { handleSelectDepartamento({ values }) }}
                                />
                                <CustomSelect
                                    label="Municipio*"
                                    name="municipio"
                                    options={municipios}
                                    customOptions={['municipio']}

                                />
                            </div>
                            <div className='md:basis-1/3'>
                                <CustomSelect
                                    label="Estado Civil*"
                                    name="estado_civil"
                                    options={[
                                        { estado_civil: 'Soltero' },
                                        { estado_civil: 'Casado' },
                                        { estado_civil: 'Unido' },
                                        { estado_civil: 'Viudo' },
                                        { estado_civil: 'Divorciado' }
                                    ]}
                                    customOptions={['estado_civil']}
                                />
                                <Input name="profesion" id="profesion" label="Profesión" />
                                <Input name="ocupacion" id="ocupacion" label="Ocupación" />
                                <Input name="remitido_por" id="remitido_por" label="Remitido Por" />
                                <Input name="diagnostico_medico" id="diagnostico_medico" label="Diagnóstico Médico" />
                            </div>
                        </div>
                        <SubTitle className='w-full text-center mt-4'>Antecedentes Personales</SubTitle>
                        <div className='md:flex md:justify-center md:gap-5'>
                            <div className='md:basis-1/2'>
                                <TextArea rows='1' name="patologicos" id="patologicos" label="Patológicos" />
                                <TextArea rows='1' name="traumatologicos" id="traumatologicos" label="Traumatológicos" />
                                <TextArea rows='1' name="otros" id="otros" label="Otros" />
                                <TextArea rows='1' name="familiares" id="familiares" label="Familiares" />
                            </div>
                            <div className='md:basis-1/2'>
                                <TextArea rows='1' name="quirurgicos" id="quirurgicos" label="Quirúrgicos" />
                                <TextArea rows='1' name="farmacologicos" id="farmacologicos" label="Farmacológicos" />
                                <div className='md:flex md:gap-2'>
                                    <TextArea rows='1' name="alergicos" id="alergicos" label="Alérgicos" />
                                    <TextArea rows='1' name="ginecoobstetras" id="ginecoobstetras" label="Ginecoobstetras" />
                                </div>
                                <div className='md:flex md:gap-10 md:pr-10'>
                                    <TextArea rows='1' name="habitos_costumbres" id="habitos_costumbres" label="Hábitos y Costumbres" />
                                    <Checkbox label="Fuma" name="fuma" />
                                    <Checkbox label="Alcohol" name="alcohol" />
                                </div>
                            </div>
                        </div>
                        <Input name="motivo" id="motivo" label="Motivo de la Consulta" />
                        {cargando ? <Spinner /> : <Button className='mt-4' type='submit' label={edit ? 'Actualizar' : 'Guardar'} color='primary' />}
                    </div>
                </Form>
            </Formik>
        </>
    )
}
