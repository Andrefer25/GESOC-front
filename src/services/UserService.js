import Axios from 'axios';
import { revisorUrl, usuarioUrl } from '../constants/routes';


export default class UsuarioService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getUsuarios = async () => {
        let proveedores = await Axios.get(`${usuarioUrl}/${this.entidadId}`);
        if (proveedores.data.length > 0)
            return proveedores.data;
        else return null;
    }

    insertRevisores = async (data, id) => {
        try {
            console.log(data);
            let resp = await Axios.post(`${revisorUrl}/${this.entidadId}/${id}`, data);
            if (resp.data) {
                return true;
            }
        }
        catch (e) {
            return false;
        }
    }

}