import MediosDePagoService from "../services/MediosDePagoService";

export const getIndexMoneda = (list, mon) => {
    let i = -1;
    list.forEach((e,index) => {
        if(e.idMoneda === mon)
            i = index;
            return;
    });
    return i;
}

export const getIndexMonedaServ = async mon => {
    let serv = new MediosDePagoService();
    let lista = await serv.getMonedas();
    
    return getIndexMoneda(lista, mon);
}

const nameToString = n => (
    n.toString().split(/(?=[A-Z])/).join(" ")
);

export const getAttrName = obj => {
    let res = {};
    for(let e in obj) {
        console.log(nameToString(e));
        res.push({ name: nameToString(e), prop: e });
    }
    return res;
}