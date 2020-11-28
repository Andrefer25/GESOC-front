import Axios from 'axios';
import { egresosUrl, egresoPresupuestosUrl } from './../constants/routes';
import { parsearEgreso, parsearValidacion } from './../helpers/parser';


export default class EgresoService {

    getEgresos = () => {
        let egresosPrueba = [
            {
                "descripcion": "soy una descripcion",
                "ingresos": ["a","b","c"],
                "idEgreso": 0,
                "listaEgresxItem": [],
                "listaPresupuestos": [],
                "validado": true,
                "revisores": ["juan"],
                "categoriaPresupuestos": ["Saavedra"],
                "fechaEgreso": "20-03-2020",
                "importe": 500,
                "numeroInstrumentoPago": 0,
                "resultadoValidacions": "Si esta bien we"
            },
            {
                "descripcion": "soy una descripcion",
                "ingresos": ["a","b","c"],
                "idEgreso": 1,
                "listaEgresxItem": [],
                "listaPresupuestos": [],
                "validado": false,
                "revisores": ["juan"],
                "categoriaPresupuestos": ["Vicente Lopez"],
                "fechaEgreso": "21-09-2020",
                "importe": 520,
                "numeroInstrumentoPago": 0,
                "resultadoValidacions": "No esta bien we"
            },
            {
                "descripcion": "soy una descripcion",
                "ingresos": ["a","b","c"],
                "idEgreso": 3,
                "listaEgresxItem": [],
                "listaPresupuestos": [],
                "validado": true,
                "revisores": ["juan"],
                "categoriaPresupuestos": ["San Isidro"],
                "fechaEgreso": "19-07-2019",
                "importe": 800,
                "numeroInstrumentoPago": 2,
                "resultadoValidacions": "Si esta bien we"
            },
        ]
    
        return parsearValidacion(egresosPrueba);
    }

    getListaEgresos = async () => {
        let egresos = await Axios.get(`${egresosUrl}/1`);
        if (egresos.data.length > 0)
            return parsearEgreso(egresos.data);
        else return null;
    }

    createEgreso = async(data) => {
        try {
            let resp = await Axios.post(`${egresoPresupuestosUrl}/1`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateEgreso = async(data) => {
        try {
            let resp = await Axios.put(`${egresosUrl}/1`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}