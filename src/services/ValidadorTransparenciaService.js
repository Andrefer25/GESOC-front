import Axios from 'axios';
import { validadorUrl } from '../constants/routes';


export default class ValidadorTransparenciaService {

    getEstadoValidacion = async() => {
        try {
            let resp = await Axios.get(`${validadorUrl}/1`);
            return resp.data;
        }
        catch(e) {
            console.log(e)
            return null;
        }
    }


}