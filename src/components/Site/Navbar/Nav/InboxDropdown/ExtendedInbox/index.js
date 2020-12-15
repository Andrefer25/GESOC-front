import React from 'react';
import { Dialog } from 'primereact/dialog';


const ExtendedInbox = ({ visible, onHide }) => (
    <Dialog header={`Bandeja de mensajes`}  visible={visible} style={{ width: '30vw' }} onHide={() => onHide()}>
        <div>
            <h4>Mensaje 1</h4>
        </div>
        <div>
            <h4>Mensaje 1</h4>
        </div>
        <div>
            <h4>Mensaje 1</h4>
        </div>
        <div>
            <h4>Mensaje 1</h4>
        </div>
    </Dialog>
)

export default ExtendedInbox;