import React, { Component } from "react";
import { Button } from 'primereact/button';
import ExtendedInbox from './ExtendedInbox';

class InboxDropdown extends Component {

  constructor() {
    super();
    this.state = {
      showBandeja: false,
      cantMensajes: 0
    }
  }

  showBandejaMensaje = async() => {
    await this.props.marcarLeidos();
    this.setState({ showBandeja: !this.state.showBandeja, cantMensajes: 0 })
  }

  componentDidMount = () => {
    this.setState({ cantMensajes: this.props.messages.cantidadMensajesNuevos })
  }

  render() {

    let { mensajes } = this.props.messages;

    return (
        <span className="p-overlay-badge p-mr-5" style={{ marginRight:"1em" }} onClick={this.showBandejaMensaje}>
          <Button type="button" badge="1" icon="pi pi-envelope" className="colorButton p-button-rounded p-button-info p-button-outlined" badgeClassName="p-badge-danger"/>
          {
            (this.state.cantMensajes > 0) &&
            <span className="p-badge colorBadge">{this.state.cantMensajes}</span>
          }
          {
            this.state.showBandeja &&
            <ExtendedInbox visible={this.state.showBandeja} onHide={this.showBandejaMensaje} data={mensajes} />
          }
        </span>
    )
  }

}

export default InboxDropdown;