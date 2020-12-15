import Axios from 'axios';
import { bandejaMensajesUrl } from '../constants/routes';


export default class BandejaMensajesService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getMessages = async () => {
        let messages = await Axios.get(`${bandejaMensajesUrl}/${this.entidadId}`);
        if (messages.data.length > 0)
            return messages.data
        else return null;
    }

}