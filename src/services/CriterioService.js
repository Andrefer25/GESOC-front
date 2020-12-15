import Axios from 'axios';
import { criterioUrl } from './../constants/routes';

export default class CriterioService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaCriterios = async () => {
        let criterios = await Axios.get(`${criterioUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        if (criterios.data.length > 0)
            return criterios;
        else return null;
    }

    createCriterio = async(data) => {
        try {
            let resp = await Axios.post(`${criterioUrl}/${this.entidadId}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateCriterio = async(data) => {
        try {
            let resp = await Axios.put(`${criterioUrl}/${this.entidadId}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}