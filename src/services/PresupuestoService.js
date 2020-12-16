import Axios from 'axios';
import { presupuestoUrl } from '../constants/routes';
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
        let presupuestos = await Axios.get(`${presupuestoUrl}/${this.entidadId}`);
        let monedas = await this.monedas.getMonedas();
        if (presupuestos.data.length > 0)
            return parsearPresupuesto(presupuestos.data, monedas);
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

}