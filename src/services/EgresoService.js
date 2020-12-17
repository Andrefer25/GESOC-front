import Axios from 'axios';
import { egresosUrl, uploadUrl } from './../constants/routes';
import { parsearEgreso } from './../helpers/parser';


export default class EgresoService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getListaEgresos = async () => {
        let egresos = await Axios.get(`${egresosUrl}/${this.entidadId}`, 
            { 
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin', 
            });
        if (egresos.data.length > 0)
            return parsearEgreso(egresos.data);
        else return null;
    }

    createEgreso = async(data) => {
        try {
            let resp = await Axios.post(`${egresosUrl}/${this.entidadId}`, data, 
            { 
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin', 
            });
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
            let url = `${uploadUrl}/${name}/${id}/pdf`;
            console.log(url);
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