import Axios from 'axios';
import { entidadJuridicaUrl, recategorizadorUrl, configEntUrl } from '../constants/routes';

export default class EntidadJuridicaService {

    getEntidadJuridica = async () => {
        let entidad = await Axios.get(`${entidadJuridicaUrl}/1`);
        return entidad.data;
    }

    editarEntidadJuridica = async(data) => {
        try {
            let resp = await Axios.post(`${recategorizadorUrl}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    getConfiguracionEnt = async () => {
        let config = await Axios.get(`${configEntUrl}/1`);
        return config.data;
    }

    updateConfiguracionEnt = async (data) => {
        try {
            let resp = await Axios.put(`${configEntUrl}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}