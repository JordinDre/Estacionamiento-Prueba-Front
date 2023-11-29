import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../components/Spinner';
import Toast from '../../components/Toast';

const validate = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

const initial = {
  email: '',
  password: '',
};

export default function Login() {

  const [errores, setErrores] = useState([])
  const { login, cargando } = useAuth()

  const handleSubmit = async (values) => {
    const datos = {
      email: values.email,
      password: values.password,
    }
    login(datos, setErrores)
    setErrores([])
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-blue-500'>
        <div className='w-96 p-8 shadow-lg bg-white rounded-md mx-10'>
          <h1 className='text-4xl font-bold text-blue-800'>Estaciona<span className='text-cyan-700'>miento</span></h1>
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
              <Input name="email" type="email" label="Email" id='email' />
              <Input name="password" type="password" label="Contraseña" id='password' />
              {cargando ? <Spinner /> : <Button className='mt-5' type='submit' label='Iniciar Sesión' color='primary' />}
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}
