import Axios from 'axios';
import { parsearCriterios } from '../helpers/parser';
import { criterioUrl } from './../constants/routes';

export default class CriterioService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaCriterios = async () => {
        let criterios = await Axios.get(`${criterioUrl}/${this.entidadId}`);
        if (criterios.data.length > 0)
            return parsearCriterios(criterios.data);
        else return null;
    }

    createCriterio = async(data) => {
        try {
            let resp = await Axios.post(`${criterioUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateCriterio = async(data, id) => {
        try {
            let resp = await Axios.put(`${criterioUrl}/${this.entidadId}/${id}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}