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

const parsearFecha2 = date => {
    return `${date.day}/${date.month}/${date.year}`;
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

export const parsearFechaMensaje = data => {
    if(data && data.length > 0) {
        return data.map(e => {
            if(e.fechaCreacion) {
                let date = parsearFecha2(e.fechaCreacion)
                e.fechaCreacion = date;
            }
            return e;
        })
    } else return [];
}

export const parsearEgreso = data => {
    return parsearCriteriosEgreso(parsearValidacion(parsearFechaEgreso(data)));
}

export const parsearCriteriosEgreso = data => {
    if(data && data.length > 0) {
        return data.map(e => {
            if(e.criterios.length>0) {
                let criterios = "";
                e.criterios.forEach(c => {
                    criterios += `${c.nombreCriterioPresupuesto} `;
                });
                e.nombreCriterios = criterios;
            }
            return e;
        })
    } else return [];
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

const getCriterio = (index, lista) => {
    let crPadre = "";
    lista.forEach(e => {
        if(e.idcriteriopresupuesto === index)
            crPadre = e.descripcion;
            return;
    })
    return crPadre;
}

export const parsearCriterios = data => {
    return data.map(e => {
        e.criterioPadre = (e.criterioPadre !== 0)? getCriterio(e.criterioPadre, data) : " ";
        return e;
    });
}

export const parsearCategorias = (data, criterios) => {
    return data.map(e => {
        e.criterioDetalle = getCriterio(e.criteriopresupuesto, criterios);
        return e;
    })
}