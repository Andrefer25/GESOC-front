import Axios from 'axios';
import { criterioVinculadorUrl, validarUrl, vinculadorUrl } from '../constants/routes';


export default class VinculadorService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getEstadoVinculacion = async() => {
        try {
            let resp = await Axios.get(`${vinculadorUrl}/${this.entidadId}`);
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }

    getCriteriosVinculacion = async() => {
        try {
            let resp = await Axios.get(`${criterioVinculadorUrl}/${this.entidadId}`);
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }

    vincular = async(list) => {
        try {
            let resp = await Axios.post(`${validarUrl}/${this.entidadId}`, list);
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }

}