import React from 'react';
import { Dialog } from 'primereact/dialog';


const ExtendedInbox = ({ visible, onHide, data }) => {

    const renderMensaje = (data) => {

        if(data && data.length > 0) {
            return data.reverse().slice(0,10).map(e => {
                return (
                    <div className="mensaje">
                        <p><span className="asuntoMensaje">{`${e.asunto}`}</span><span className="fechaMensaje">{e.fechaCreacion}</span></p>
                        <p className="contenidoMensaje">{e.contenido}</p>
                    </div>
                )
            })
        }
    }

    return (
        <Dialog header={`Bandeja de mensajes`}  visible={visible} style={{ width: '30vw' }} onHide={() => onHide()}>
            {renderMensaje(data)}
        </Dialog>
    )
}

export default ExtendedInbox;