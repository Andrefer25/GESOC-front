
class EgresoService {

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
    
        return egresosPrueba.map(e => {
            let status = e.validado? 'VALIDADO': 'NO VALIDADO'; 
            e.validado = status;
            return e;
        });
    }

    editEgresoById = (id, value) => {
        //blablabla
    }

}

export default EgresoService;