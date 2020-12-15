import React, { useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { Button } from 'primereact/button';

const UserDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("entJuridica");
        window.location.href='/';
    }

    const userData = localStorage.getItem("user");

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={dropdownOpen}
            >
              <Button type="button" icon="pi pi-user" className="colorButton p-button-rounded p-button-info p-button-outlined" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>{userData}</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem>Ver perfil</DropdownItem>
              <DropdownItem>Configuracion</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={logOut}>Cerrar Sesión</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserDropdown;