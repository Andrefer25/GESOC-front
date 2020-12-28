import Axios from 'axios';
import { egresosUrl, uploadEgresoUrl } from './../constants/routes';
import { parsearEgreso } from './../helpers/parser';


export default class EgresoService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaEgresos = async () => {
        let egresos = await Axios.get(`${egresosUrl}/${this.entidadId}`);
        if (egresos.data.length > 0) 
            return parsearEgreso(egresos.data);
        else return null;
    }

    createEgreso = async(data) => {
        try {
            let resp = await Axios.post(`${egresosUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateEgreso = async(data) => {
        try {
            let resp = await Axios.put(`${egresosUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    uploadDocument = async(file, id) => {
        try {
            let formData = new FormData();
            let name = file.name.trim().split(".")[0];
            formData.append(
                name,
                file,
                name
            )
            let url = `${uploadEgresoUrl}/${name}/${id}/pdf`;
            let resp = await Axios.post(url, formData, 
            { 
                headers: {
                    "Content-Type": "multipart/form-data"
                } 
            });
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}