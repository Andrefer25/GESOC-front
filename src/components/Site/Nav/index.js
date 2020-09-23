import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

const Navigation = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Button type="button" label="Bandeja" icon="pi pi-envelope" className="p-button-info" badge="8" badgeClassName="p-badge-danger" />
    <Navbar.Brand href="#home">GESOC</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
        <Button type="button" label="Bandeja" icon="pi pi-envelope" className="p-button-info" badge="8" badgeClassName="p-badge-danger" />
        <Nav.Link href="#deets">Usuario</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
