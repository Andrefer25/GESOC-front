import React, { Component } from 'react';

class Inbox extends Component {
    constructor() {
        super();
        this.state = {
            title: "Bandeja de Mensajes"
        }
    }

    render() {
        return (
            <div className="box">
                Este es el componente {this.state.title}
            </div>
        )
    }
}

export default Inbox;