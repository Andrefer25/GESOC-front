import React from 'react';
import ListaPresupuestos from './ListaPresupuestos';

const Presupuestos = () => {
    return (
        <div className="box">
            <div className="boxInfo">
                <ListaPresupuestos nameList="Presupuestos" />
            </div>
        </div>
    )
}

export default Presupuestos;