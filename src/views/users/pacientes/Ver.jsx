import React from 'react'
import ListText from '../../../components/ListText'
import SubTitle from '../../../components/SubTitle'
import { calcularEdad, formatearDinero } from '../../../helpers'
import Tabla from '../../../components/Tabla'
import Badge from '../../../components/Badge'

export default function Ver(props) {

    return (
        <>
            <div className='md:flex md:gap-5 w-full md:flex-row mb-5'>
                <ul className='mt-5 flex-1'>
                    <SubTitle >Datos Generales</SubTitle>
                    <ListText title='Código' value={props?.codigo} />
                    <ListText title='Nombre Completo' value={props?.name} />
                    <ListText title='Estado' value={props?.estado ? <Badge label={"ACTIVO"} color="success" /> : <Badge label={"INACTIVO"} color="danger" />} />
                    <ListText title='DPI' value={props?.dpi} />
                    <ListText title='Fecha de Nacimiento' value={props?.fecha_nacimiento} />
                    <ListText title='Edad' value={calcularEdad(props?.fecha_nacimiento)} />
                    <ListText title='Teléfono' value={props?.telefono} />
                    <ListText title='Género' value={props?.genero} />
                    <ListText title='Estado Civil' value={props?.estado_civil} />
                    <ListText title='Lateralidad' value={props?.lateralidad} />
                    <ListText title='Profesión' value={props?.profesion} />
                    <ListText title='Ocupación' value={props?.ocupacion} />
                    <ListText title='Dirección' value={props?.direccion + ', zona ' + props?.zona + ', ' + props?.municipio.municipio + ', ' + props?.municipio.departamento.departamento} />
                    <ListText title='Fecha de Creación' value={props?.created_at} />
                </ul>
                <ul className='mt-5 flex-1'>
                    <SubTitle >Antecedentes</SubTitle>
                    <ListText title='Remitido Por' value={props?.remitido_por} />
                    <ListText title='Diagnóstico Médico' value={props?.diagnostico_medico} />
                    <ListText title='Motivo de la Consulta' value={props?.antecedentes?.motivo} />
                    <ListText title='Patológicos' value={props?.antecedentes?.patologicos} />
                    <ListText title='Quirúrgicos' value={props?.antecedentes?.quirurgicos} />
                    <ListText title='Traumatológicos' value={props?.antecedentes?.traumatologicos} />
                    <ListText title='Farmacológicos' value={props?.antecedentes?.farmacologicos} />
                    <ListText title='Alérgicos' value={props?.antecedentes?.alergicos} />
                    <ListText title='Ginecoobstetras' value={props?.antecedentes?.ginecoobstetras} />
                    <ListText title='Otros' value={props?.antecedentes?.otros} />
                    <ListText title='Hábitos y Costumbres' value={props?.antecedentes?.habitos_costumbres} />
                    <ListText title='Fuma' value={props?.antecedentes?.fuma ? <Badge label={"POSITIVO"} color="success" /> : <Badge label={"NEGATIVO"} color="danger" />} />
                    <ListText title='Alcohol' value={props?.antecedentes?.alcohol ? <Badge label={"POSITIVO"} color="success" /> : <Badge label={"NEGATIVO"} color="danger" />} />
                </ul>
            </div>
            <div className='md:flex md:gap-5 w-full md:flex-row mb-5'>
                <ul className='mt-5 flex-1'>
                    <SubTitle >Evaluación</SubTitle>
                    <ListText title='Cronología de la Patología' value={props?.evaluacion?.cronologia_patologia} />
                    <ListText title='Dolor' value={props?.evaluacion?.dolor} />
                    <ListText title='Reflejos Osteotendinosos' value={props?.evaluacion?.refelejos_osteotendinosos} />
                    <ListText title='Sensibilidad' value={props?.evaluacion?.sensibilidad} />
                    <ListText title='Marcha' value={props?.evaluacion?.marcha} />
                    <SubTitle >Longitud de Miembros</SubTitle>
                    <ListText title='Superiores' value={props?.evaluacion?.superiores} />
                    <ListText title='Inferiores' value={props?.evaluacion?.inferiores} />
                </ul>
            </div>
           {/*  <div className='md:flex md:gap-5 w-full md:flex-row mb-5'>
                <ul className='mt-5 flex-1'>
                    <SubTitle >Evoluciones</SubTitle>
                </ul>
            </div> */}

        </>
    )
}


