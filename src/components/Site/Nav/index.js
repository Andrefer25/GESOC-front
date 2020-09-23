import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from 'primereact/button';

const Navigation = ({handleSidebar}) => {
  const showSidebar = () => {
    handleSidebar(true);
  }

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.href='/login';
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Button icon="pi pi-arrow-right" onClick={showSidebar} className="p-mr-2" />
      <Navbar.Brand href="#home">GESOC</Navbar.Brand>
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
