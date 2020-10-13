import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserDropdown from "./UserDropdown";
import InboxDropdown from "./InboxDropdown";

import './../../../assets/css/index.css';

const Navigation = () => {

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

export default Navigation;
