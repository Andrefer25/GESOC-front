import Axios from 'axios';
import { vinculadorUrl } from '../constants/routes';


export default class VinculadorService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
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