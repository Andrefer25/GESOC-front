import Axios from 'axios';
import { entidadesBaseUrl } from '../constants/routes';

export default class EntidadBaseService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getEntidadBase = async () => {
        let entidad = await Axios.get(`${entidadesBaseUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        return entidad.data;
    }

    createEntidadBase = async(data) => {
        try {
            let resp = await Axios.post(`${entidadesBaseUrl}/${this.entidadId}`, {
                descripcion: data.desc,
                nombreFicticio: data.nombre,
                entidadjuridica: {idEntidadJuridica: this.entidadId}
            }, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }
    

}