import Axios from 'axios';
import { validadorUrl } from '../constants/routes';


export default class ValidadorTransparenciaService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getEstadoValidacion = async() => {
        try {
            let resp = await Axios.get(`${validadorUrl}/${this.entidadId}`);
            return resp.data;
        }
        catch(e) {
            console.log(e)
            return null;
        }
    }


}