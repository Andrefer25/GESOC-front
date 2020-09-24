import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from 'primereact/button';

const Navigation = () => {

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.href='/login';
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="gesocNav" variant="dark">
      <Navbar.Brand href="/">GESOC</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          <Button type="button" label="Bandeja" icon="pi pi-envelope" className="p-button-info"/>
          <Button type="button" label="Usuario" icon="pi pi-user" className="p-button-info userButton" onClick={logOut}/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
