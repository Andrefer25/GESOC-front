import Axios from 'axios';
import { parsearCategorias } from '../helpers/parser';
import { categoriaUrl } from './../constants/routes';
import CriterioService from './CriterioService';

export default class CategoriaService {

    constructor() {
        this.entidadId = localStorage.getItem("entJuridica");
        this.service = new CriterioService();
    }

    getListaCategorias = async () => {
        let categorias = await Axios.get(`${categoriaUrl}/${this.entidadId}`);
        let criterios = await this.service.getListaCriterios();
        if (categorias.data.length > 0)
            return {"categorias": parsearCategorias(categorias.data, criterios), "criterios": criterios} ;
        else return null;
    }

    createCategoria = async(data) => {
        try {
            let resp = await Axios.post(`${categoriaUrl}/${this.entidadId}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

    updateCategoria = async(data, id) => {
        try {
            let resp = await Axios.put(`${categoriaUrl}/${this.entidadId}/${id}`, data);
            if(resp.data) {
                return true;
            }
        }
        catch(e) {
            return false;
        }
    }

}