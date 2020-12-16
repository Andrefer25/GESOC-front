import Axios from 'axios';
import { bandejaMensajesUrl } from '../constants/routes';
import { parsearFechaMensaje } from './../helpers/parser';

export default class BandejaMensajesService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getMessages = async () => {
        let messages = await Axios.get(`${bandejaMensajesUrl}/1`);
        if (messages.data)
            return {cantidadMensajesNuevos: messages.data.cantidadMensajesNuevos,
            mensajes: parsearFechaMensaje(messages.data.mensajes)} 
        else return null;
    }

}