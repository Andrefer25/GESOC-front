import React from 'react';
import { Dialog } from 'primereact/dialog';


const ExtendedInbox = ({ visible, onHide, data }) => {

    const renderMensaje = (data) => {

        if(data && data.length > 0) {
            return data.reverse().slice(0,10).map((e,index) => {
                return (
                    <div className="mensaje" key={index}>
                        <p><span className="asuntoMensaje">{`${e.asunto}`}</span><span className="fechaMensaje">{e.fechaCreacion}</span></p>
                        <p className="contenidoMensaje">{e.contenido}</p>
                    </div>
                )
            })
        }
    }

    return (
        <Dialog header={`Bandeja de mensajes`}  visible={visible} style={{ width: '30vw' }} onHide={() => onHide()}>
            {
                data && data.length > 0?
                renderMensaje(data) :
                <div>
                    No hay mensajes en la bandeja
                </div>
            }
        </Dialog>
    )
}

export default ExtendedInbox;