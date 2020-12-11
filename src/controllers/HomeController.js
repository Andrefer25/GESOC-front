import EntidadJuridicaService from "../services/EntidadJuridicaService";
import ValidadorTransparenciaService from "../services/ValidadorTransparenciaService";
import VinculadorService from "../services/VinculadorService";
import Promise from "promise";

export default class HomeController {

    constructor() {
        this.validador = new ValidadorTransparenciaService();
        this.vinculador = new VinculadorService();
        this.entJuridica = new EntidadJuridicaService();
    }

    async initHome() {
        const data = await new Promise((resolve, reject) => {
            const result = {};
            this.validador.getEstadoValidacion().then(validacion => {
                result.validacion = validacion;
                return result;
            }).then(result => {
                this.vinculador.getEstadoVinculacion().then(vinculacion => {
                    result.vinculacion = vinculacion;
                    return result;
                }).then(result => {
                    this.entJuridica.getEntidadJuridica().then(entidadJuridica => {
                        result.entidadJuridica = entidadJuridica;
                        resolve(result);
                    })
                })
            }).catch(e => {
                reject(e);
            })
        });
        return data;
    }

}