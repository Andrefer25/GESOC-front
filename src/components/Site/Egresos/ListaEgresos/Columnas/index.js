import React from 'react';

export const idEgresoTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">ID</span>
        {rowData.idEgreso}
    </React.Fragment>
);

export const numeroInstrumentoTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Numero Instrumento</span>
        {rowData.numeroInstrumentoPago}
    </React.Fragment>
);

export const descripcionTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Descripcion</span>
        {rowData.descripcion}
    </React.Fragment>
);

export const importeTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Importe</span>
        {`$ ${rowData.importe}`}
    </React.Fragment>
);

export const statusBodyTemplate = ({validado}) => (
    <React.Fragment>
        <span className="p-column-title">Estado</span>
        <span className={`p-tag ${validado==='VALIDADO'?'p-tag-success':'p-tag-danger'}`}>
            {validado}
        </span>
    </React.Fragment>
);

export const statusItemTemplate = option => (
    <span className={`p-tag ${option==="VALIDADO"?'p-tag-success':'p-tag-danger'}`}>{option}</span>
);

export const dateBodyTemplate = rowData =>  (
    <React.Fragment>
        <span className="p-column-title">Fecha Egreso</span>
        <span>{rowData.fechaEgreso}</span>
    </React.Fragment>
);


export const filterDate = (value, filter) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
    }

    else if (value === undefined || value === null) {
        return false;
    }

    else {
        let month = filter.getMonth() + 1;
        let day = filter.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return value === `${day}-${month}-${filter.getFullYear()}`
    }
}