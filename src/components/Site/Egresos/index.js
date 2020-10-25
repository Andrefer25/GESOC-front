import React from 'react';
import ListaEgresos from './ListaEgresos';

const Egresos = () => {
    return (
        <div className="box">
            <div className="boxInfo">
                <ListaEgresos nameList="Egresos" />
            </div>
        </div>
    )
}

export default Egresos;