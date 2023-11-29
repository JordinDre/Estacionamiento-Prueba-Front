export const formatearDinero = valor => {
    // Verifica que valor no sea undefined o null
    if (valor !== undefined && valor !== null) {
        // Si el valor es una cadena, conviértelo a número
        if (typeof valor === 'string') {
            valor = parseFloat(valor);
        }
        // Formatear el número a un string de moneda
        const formattedValue = valor.toLocaleString('es-US', {
            style: 'currency',
            currency: 'USD'
        });
        // Eliminar el espacio entre la moneda y el valor
        return formattedValue.replace(/\s/g, '');
    }
    // Retornar '0' formateado si valor es undefined o null
    return (0).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    }).replace(/\s/g, '');
};



export const formatearFecha = fecha => {
    if (!fecha) return ''; // Si no se proporciona fecha, devuelve una cadena vacía

    const partesFecha = fecha.split('/');
    if (partesFecha.length !== 3) {
        // Si la fecha no tiene el formato esperado (d/m/Y), devuelve la fecha original
        return fecha;
    }

    const anio = partesFecha[2];
    const mes = partesFecha[1].padStart(2, '0');
    const dia = partesFecha[0].padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
};


export function abreviar(str, num) {
    if (!str) {  // Si str es null, undefined, o una cadena vacía, se devuelve una cadena vacía.
        return "";
    }
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
}


export const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return ''; // Si no se proporciona una fecha de nacimiento, devuelve una cadena vacía

    // Divide la fecha de nacimiento en partes
    const partesFecha = fechaNacimiento.split('/');
    if (partesFecha.length !== 3) {
        // Si la fecha de nacimiento no tiene el formato esperado ("día/mes/año"), devuelve un mensaje de error
        return 'Fecha de nacimiento no válida';
    }

    // Convierte las partes de la fecha en números enteros
    const diaNacimiento = parseInt(partesFecha[0], 10);
    const mesNacimiento = parseInt(partesFecha[1], 10);
    const anioNacimiento = parseInt(partesFecha[2], 10);

    // Verifica que la fecha sea válida
    if (isNaN(diaNacimiento) || isNaN(mesNacimiento) || isNaN(anioNacimiento)) {
        return 'Fecha de nacimiento no válida';
    }

    const hoy = new Date();
    const diaActual = hoy.getDate();
    const mesActual = hoy.getMonth() + 1; // Suma 1 porque los meses en JavaScript van de 0 a 11
    const anioActual = hoy.getFullYear();

    let anios = anioActual - anioNacimiento;
    let meses = mesActual - mesNacimiento;
    let dias = diaActual - diaNacimiento;

    if (dias < 0) {
        // Corregir si los días son negativos
        meses--;
        const ultimoDiaMesAnterior = new Date(anioActual, mesActual - 1, 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        // Corregir si los meses son negativos
        anios--;
        meses += 12;
    }

    if (anios === 0 && meses === 0) {
        return `${dias} ${dias === 1 ? 'día' : 'días'}`;
    } else if (anios === 0) {
        return `${meses} ${meses === 1 ? 'mes' : 'meses'} ${dias} ${dias === 1 ? 'día' : 'días'}`;
    } else {
        return `${anios} ${anios === 1 ? 'año' : 'años'} ${meses} ${meses === 1 ? 'mes' : 'meses'} ${dias} ${dias === 1 ? 'día' : 'días'}`;
    }
};



export function restarHoras(dateStr, horas) {
    const parts = dateStr.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');

    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
    date.setHours(date.getHours() - horas);

    return date.toLocaleString('en-GB').replace(',', '');
}


