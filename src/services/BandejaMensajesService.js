import Axios from 'axios';
import { bandejaMensajesUrl } from '../constants/routes';
import { parsearFechaMensaje } from './../helpers/parser';

export default class BandejaMensajesService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
        this.userId = localStorage.getItem("idUsuario");
    }

    getMessages = async () => {
        let messages = await Axios.get(`${bandejaMensajesUrl}/${this.userId}`);
        if (messages.data)
            return {cantidadMensajesNuevos: messages.data.cantidadMensajesNuevos,
            mensajes: parsearFechaMensaje(messages.data.mensajes)} 
        else return null;
    }

}