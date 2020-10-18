import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const InboxDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="marginButtons">
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
            >
              <span className="p-overlay-badge p-mr-5">
                <Button type="button" badge="1" icon="pi pi-envelope" className="colorButton p-button-rounded p-button-info p-button-outlined" badgeClassName="p-badge-danger"/>
              <span className="p-badge colorBadge">2</span>
              </span>
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