import Axios from 'axios';
import { ingresosUrl } from './../constants/routes';
import { parsearIngreso, parsearValidacion } from './../helpers/parser';

export default class IngresoService {

    getIngresos = () => {
        let ingresosPrueba = [
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
    
        return parsearValidacion(ingresosPrueba);
    }

    getListaIngreso = async () => {
        let ingresos = await Axios.get(`${ingresosUrl}/1`);
        if(ingresos.data.length > 0) {
            return parsearIngreso(ingresos.data);
        } else return null;
    }

    createIngreso = async(data) => {
        try {
            let resp = await Axios.post(`${ingresosUrl}/1`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateIngreso = async(data) => {
        try {
            let resp = await Axios.put(`${ingresosUrl}/1`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    deleteIngreso = async(id) => {
        try {
            let resp = await Axios.delete(`${ingresosUrl}/1/${id}`);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}