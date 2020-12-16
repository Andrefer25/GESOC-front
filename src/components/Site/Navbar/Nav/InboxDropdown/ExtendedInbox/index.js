import React from 'react';
import { Dialog } from 'primereact/dialog';


const ExtendedInbox = ({ visible, onHide, data }) => {
    console.log(data)

    const renderMensaje = (data) => {
        return data.slice(0,10).map(e => {
            return (
                <div className="mensaje">
                    <p><span className="asuntoMensaje">{`${e.asunto}`}</span><span className="fechaMensaje">{e.fechaCreacion}</span></p>
                    <p className="contenidoMensaje">{e.contenido}</p>
                </div>
            )
        })
    }

    return (
        <Dialog header={`Bandeja de mensajes`}  visible={visible} style={{ width: '30vw' }} onHide={() => onHide()}>
            {renderMensaje(data.reverse())}
        </Dialog>
    )
}

export default ExtendedInbox;