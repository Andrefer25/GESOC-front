import { getMoneda } from "./utils";

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

export const parsearPresupuesto = (data, monedas) => {
    return data.map(e => {
        let status = e.estado? 'VALIDADO': 'NO VALIDADO';
        let moneda = e.moneda? getMoneda(monedas, e.moneda): '';
        e.estado = status;
        e.idMoneda = e.moneda;
        e.moneda = moneda;
        return e;
    });
}

export const parsearIngreso = data => {
    return parsearValidacion(parsearFechaIngreso(data));
}