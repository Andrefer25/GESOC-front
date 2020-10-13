import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { Button } from 'primereact/button';

const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    
    const logOut = () => {
        localStorage.removeItem("user");
        window.location.href='/';
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
            >
              <Button type="button" label="Usuario" icon="pi pi-user" className="p-button-info userButton" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Ver perfil</DropdownItem>
              <DropdownItem>Configuracion</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={logOut}>Cerrar Sesión</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserDropdown;