import Axios from 'axios';
import { ingresosUrl } from './../constants/routes';
import { parsearIngreso } from './../helpers/parser';

export default class IngresoService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaIngreso = async () => {
        let ingresos = await Axios.get(`${ingresosUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        if(ingresos.data.length > 0) {
            return parsearIngreso(ingresos.data);
        } else return null;
    }

    createIngreso = async(data) => {
        try {
            let resp = await Axios.post(`${ingresosUrl}/${this.entidadId}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
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
            let resp = await Axios.put(`${ingresosUrl}/${this.entidadId}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
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
            let resp = await Axios.delete(`${ingresosUrl}/${this.entidadId}/${id}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}