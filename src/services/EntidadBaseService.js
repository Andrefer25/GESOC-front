import Axios from 'axios';
import { entidadesBaseUrl } from '../constants/routes';

export default class EntidadBaseService {

    getEntidadBase = async () => {
        let entidad = await Axios.get(`${entidadesBaseUrl}/1`);
        return entidad.data;
    }


}