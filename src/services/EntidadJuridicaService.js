import Axios from 'axios';
import { entidadJuridicaUrl, recategorizadorUrl, configEntUrl, validadorUrl, vinculadorUrl } from '../constants/routes';

export default class EntidadJuridicaService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getEntidadJuridica = async () => {
        let entidad = await Axios.get(`${entidadJuridicaUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        return entidad.data;
    }

    editarEntidadJuridica = async(data) => {
        try {
            let resp = await Axios.post(`${recategorizadorUrl}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    getConfiguracionEnt = async () => {
        let config = await Axios.get(`${configEntUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        return config.data;
    }

    updateConfiguracionEnt = async (data) => {
        try {
            let resp = await Axios.put(`${configEntUrl}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    getEstadoValidacion = async() => {
        try {
            let resp = await Axios.get(`${validadorUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            return resp.data;
        }
        catch(e) {
            console.log(e)
            return null;
        }
    }

    getEstadoVinculacion = async() => {
        try {
            let resp = await Axios.get(`${vinculadorUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }

}