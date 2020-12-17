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

export const getMoneda = (list, mon) => {
    let i = '';
    list.forEach(e => {
        if(e.idMoneda === mon)
            i = `${e.descripcion} (${e.simbolo})`;
            return;
    });
    return i;
}

export const getEgreso = (list, egr) => {
    let i = '';
    list.forEach(e => {
        if(e.idMoneda === egr)
            i = `${e.idEgreso} - ${e.descripcion}`;
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
        res.push({ name: nameToString(e), prop: e });
    }
    return res;
}

export const getBuffer = data => {
    var myBuffer = [];
    var buffer = new Buffer(data, 'utf16le');
    for (var i = 0; i < buffer.length; i++) {
        myBuffer.push(buffer[i]);
    }
    return myBuffer;
}