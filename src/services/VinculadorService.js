import Axios from 'axios';
import { vinculadorUrl } from '../constants/routes';


export default class VinculadorService {

    getEstadoVinculacion = async() => {
        try {
            let resp = await Axios.get(`${vinculadorUrl}/1`);
            return resp.data;
        }
        catch(e) {
            return null;
        }
    }


}