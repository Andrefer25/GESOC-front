import React from 'react';
import ListaIngresos from './ListaIngresos';

const Ingresos = () => {
    return (
        <div className="box">
            <div className="boxInfo">
                <ListaIngresos nameList="Ingresos" />
            </div>
        </div>
    )
}

export default Ingresos;