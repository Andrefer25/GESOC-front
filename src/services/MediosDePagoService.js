import Axios from 'axios';
import { mediosPagoUrl, monedasUrl } from './../constants/routes';


export default class MediosDePagoService {

    getMediosPago = async () => {
        try {
            let mediosPago = await Axios.get(`${mediosPagoUrl}`);
            if (mediosPago.data.length > 0)
                return mediosPago.data;
            else return null;
        }
        catch {
            return null;
        }
    }

    getMonedas = async() => {
        try {
            let monedas = await Axios.get(`${monedasUrl}`);
            if (monedas.data.length > 0)
                return monedas.data;
            else return null;
        }
        catch {
            return null;
        }
    }


}