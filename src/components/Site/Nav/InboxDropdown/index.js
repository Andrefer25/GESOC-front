import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const InboxDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
            >
              <Button type="button" label="Bandeja" badge="1" icon="pi pi-envelope" className="p-button-info"/>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Ultimos mensajes</DropdownItem>
              <DropdownItem>NUEVO MENSAJEEEEEEE</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem divider/>
              <Link className="inboxButton" to="/bandejaMensajes">
                <DropdownItem>Ver mas</DropdownItem>
              </Link>
            </DropdownMenu>
        </Dropdown>
    )
}

export default InboxDropdown;