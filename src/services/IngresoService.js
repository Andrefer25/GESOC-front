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
        console.log(ingresos.data);
        if(ingresos.data.length > 0) {
            return parsearIngreso(ingresos.data);
        } else return null;
    }

    getIngresoById = async (id) => {
        let idEntidadJuridica = localStorage.getItem("entidadJuridica");
        
        return await Axios.get(ingresosUrl+'/'+idEntidadJuridica+'/'+id);
    }

    updateIngreso = async (id, dataIngreso) => {
        let idEntidadJuridica = localStorage.getItem("entidadJuridica");
        Axios.post(ingresosUrl+'/'+idEntidadJuridica+'/'+id, {
            data: dataIngreso
        }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}