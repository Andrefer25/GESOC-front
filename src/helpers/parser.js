
export const parsearValidacion = data => {
    return data.map(e => {
        let status = e.validado? 'VALIDADO': 'NO VALIDADO';
        e.validado = status;

        return e;
    });
}

const parsearFecha = date => {
    return `${date.day}-${date.month}-${date.year}`;
}

const parsearFechaEgreso = data => {
    return data.map(e => {
        let date = parsearFecha(e.fechaEgreso)
        e.fechaEgreso = date;

        return e;
    })
}

const parsearFechaIngreso = data => {
    return data.map(e => {
        if(e.fechaIngreso) {
            let date = parsearFecha(e.fechaIngreso)
            e.fechaIngreso = date;
        }
        return e;
    })
}

export const parsearEgreso = data => {
    return parsearValidacion(parsearFechaEgreso(data));
}

export const parsearIngreso = data => {
    return parsearValidacion(parsearFechaIngreso(data));
}