import Axios from 'axios';
import { presupuestoUrl, uploadPresupuestoUrl, egresoFilterUrl } from '../constants/routes';
import { parsearPresupuesto } from '../helpers/parser';
import EgresoService from './EgresoService';
import MediosDePagoService from './MediosDePagoService';


export default class PresupuestoService {

    constructor() {
        this.monedas = new MediosDePagoService();
        this.egresos = new EgresoService();
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaPresupuestos = async () => {
        const data = await new Promise((resolve, reject) => {
            const result = {};
            Axios.get(`${presupuestoUrl}/${this.entidadId}`).then(presupuestos => {
                result.presupuestos = presupuestos.data;
                return result;
            }).then(result => {
                this.monedas.getMonedas().then(monedas => {
                    result.monedas = monedas;
                    resolve(result);
                })
            }).catch(e => {
                reject(e);
            })
        });
        if (data.presupuestos.length > 0)
            return parsearPresupuesto(data.presupuestos, data.monedas);
        else return null;
    }
    
    getFilteredPresupuestos = async () => {
        const data = await new Promise((resolve, reject) => {
            const result = {};
            Axios.get(`${egresoFilterUrl}/${this.entidadId}`).then(presupuestos => {
                result.presupuestos = presupuestos.data;
                return result;
            }).then(result => {
                this.monedas.getMonedas().then(monedas => {
                    result.monedas = monedas;
                    resolve(result);
                })
            }).catch(e => {
                reject(e);
            })
        });
        if (data.presupuestos.length > 0)
            return parsearPresupuesto(data.presupuestos, data.monedas);
        else return null;
    }

    createPresupuesto = async(data) => {
        try {
            let resp = await Axios.post(`${presupuestoUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updatePresupuesto = async(data) => {
        try {
            let resp = await Axios.put(`${presupuestoUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    uploadDocument = async(file, id) => {
        try {
            let formData = new FormData();
            let name = file.name.trim().split(".")[0];
            formData.append(
                name,
                file,
                name
            )
            let url = `${uploadPresupuestoUrl}/${name}/${id}/pdf`;
            let resp = await Axios.post(url, formData, 
            { 
                headers: {
                    "Content-Type": "multipart/form-data"
                } 
            });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}
