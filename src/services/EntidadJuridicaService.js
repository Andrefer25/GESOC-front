import Axios from 'axios';
import { entidadJuridicaUrl } from '../constants/routes';

export default class EntidadJuridicaService {

    getEntidadJuridica = async () => {
        let entidad = await Axios.get(`${entidadJuridicaUrl}/1`);
        return entidad.data;
    }

}