import Axios from 'axios';
import { validadorUrl } from '../constants/routes';


export default class ValidadorTransparenciaService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getEstadoValidacion = async() => {
        try {
            let resp = await Axios.get(`${validadorUrl}/estado/${this.entidadId}`);
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }

    validar = async() => {
        try {
            let resp = await Axios.get(`${validadorUrl}/ejecutar/${this.entidadId}`);
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }


}