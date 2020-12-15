import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserDropdown from "./UserDropdown";
import InboxDropdown from "./InboxDropdown";
import BandejaMensajesService from "../../../../services/BandejaMensajesService";

class Navigation extends Component {

  constructor() {
    super();
    this.service = new BandejaMensajesService();
    this.state = {
      messages: null
    }
  }

  componentDidMount = async () => {
    await this.getMessages();
  }

  getMessages = async () => {
    let messages = await this.service.getMessages();

    this.setState({ messages });
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" className="gesocNav" variant="dark">
        <Navbar.Brand href="/">GESOC</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <InboxDropdown />
            <UserDropdown/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
