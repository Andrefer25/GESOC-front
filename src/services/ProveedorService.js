import Axios from 'axios';
import { proveedorUrl } from '../constants/routes';


export default class ProveedorService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaProveedores = async () => {
        let proveedores = await Axios.get(`${proveedorUrl}/${this.entidadId}`, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
        if (proveedores.data.length > 0)
            return proveedores.data;
        else return null;
    }

    createProveedor = async(data) => {
        try {
            let resp = await Axios.post(`${proveedorUrl}/${this.entidadId}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateProveedor = async(data) => {
        try {
            let resp = await Axios.put(`${proveedorUrl}/${this.entidadId}`, data, { headers: {'X-Requested-With': 'XMLHttpRequest'} });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}