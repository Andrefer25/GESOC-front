import Axios from 'axios';
import { itemUrl } from '../constants/routes';


export default class ItemService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
    }

    getItems = async () => {
        let items = await Axios.get(`${itemUrl}/${this.entidadId}`);
        if (items.data.length > 0)
            return items.data
        else return null;
    }

    createItem = async(data) => {
        try {
            let resp = await Axios.post(`${itemUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateItem = async(data, id) => {
        try {
            let resp = await Axios.put(`${itemUrl}/${this.entidadId}/${id}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}