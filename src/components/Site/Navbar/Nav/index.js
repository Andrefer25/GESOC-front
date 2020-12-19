import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserDropdown from "./UserDropdown";
import InboxDropdown from "./InboxDropdown";
import BandejaMensajesService from "../../../../services/BandejaMensajesService";
import { Button } from 'primereact/button';
import Logo from "./../../../../assets/img/gesocNavbar.png";

class Navigation extends Component {

  constructor() {
    super();
    this.service = new BandejaMensajesService();
    this.state = {
      messages: null
    }
  }

  componentDidMount = async () => {
    setTimeout(async() => {
      await this.getMessages();
      console.log("hola");
    }, 10000)
  }

  getMessages = async () => {
    let messages = await this.service.getMessages();
    this.setState({ messages });
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" className="gesocNav" variant="dark">
        <Navbar.Brand href="/">
          <img src={Logo} style={{ "marginLeft":"0.5em", "marginTop":"0" }} width="150" alt="GESOC"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            { this.state.messages?
              <InboxDropdown messages={this.state.messages} /> :
              <span className="p-overlay-badge p-mr-5" style={{ marginRight:"1em" }}>
                <Button type="button" badge="1" icon="pi pi-envelope" className="colorButton p-button-rounded p-button-info p-button-outlined" badgeClassName="p-badge-danger"/>
              </span>
            }
            <UserDropdown/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
