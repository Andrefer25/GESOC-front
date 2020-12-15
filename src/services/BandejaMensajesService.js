import Axios from 'axios';
import { bandejaMensajesUrl } from '../constants/routes';


export default class BandejaMensajesService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getMessages = async () => {
        let messages = await Axios.get(`${bandejaMensajesUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        if (messages.data.length > 0)
            return messages.data
        else return null;
    }

}