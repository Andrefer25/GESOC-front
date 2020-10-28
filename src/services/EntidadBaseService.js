import Axios from 'axios';
import { entidadesBaseUrl } from '../constants/routes';

export default class EntidadBaseService {

    getEntidadBase = async () => {
        let entidad = await Axios.get(`${entidadesBaseUrl}/1`);
        return entidad.data;
    }

    createEntidadBase = async(data) => {
        try {
            let resp = await Axios.post(`${entidadesBaseUrl}/1`, {
                descripcion: data.desc,
                nombreFicticio: data.nombre,
                entidadjuridica: {idEntidadJuridica: 1}
            });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }
    

}