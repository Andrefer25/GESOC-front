import React from 'react';

export const idEgresoTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Egreso Asignado</span>
        {rowData.egresoAsignado}
    </React.Fragment>
);

export const monedaTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Moneda</span>
        {rowData.moneda}
    </React.Fragment>
);

export const descripcionTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Detalle</span>
        {rowData.detalles}
    </React.Fragment>
);

export const importeTemplate = rowData => (
    <React.Fragment>
        <span className="p-column-title">Importe</span>
        {`${rowData.importe}`}
    </React.Fragment>
);

export const statusBodyTemplate = ({estado}) => (
    <React.Fragment>
        <span className="p-column-title">Estado</span>
        <span className={`p-tag ${estado==='VALIDADO'?'p-tag-success':'p-tag-danger'}`}>
            {estado}
        </span>
    </React.Fragment>
);

export const statusItemTemplate = option => (
    <span className={`p-tag ${option==="VALIDADO"?'p-tag-success':'p-tag-danger'}`}>{option}</span>
);