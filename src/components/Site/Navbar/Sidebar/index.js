import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaRegLaughWink } from 'react-icons/fa';
import { BiCollapse, BiExpand, BiHome, BiDollarCircle } from 'react-icons/bi';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';

const SideNavbar = ({ collapsed, handleSidebar }) => {
    const hideSideNavbar = () => {
        handleSidebar();
    }

    const userRole = localStorage.getItem('role');

    return (
        <div className="sidebar">
            <ProSidebar
            image={false}
            collapsed={collapsed}
            toggled={true}
            breakPoint="md"
            >
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<BiHome />}
                        >
                            <Link to="/">Home</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<BiCollapse />}>
                            <Link to="/ingresos">Ingresos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<BiExpand />}>
                            <Link to="/egresos">Egresos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<BiDollarCircle />}>
                            <Link to="/egresos">Presupuestos</Link>
                        </MenuItem>
                    </Menu>
                    { (userRole === 'admin') && 
                        <Menu iconShape="circle">
                            <SubMenu
                                title="Admin menu"
                                icon={<FaRegLaughWink />}
                            >   
                                <MenuItem>
                                    <Link to="/crearCategoria">
                                        Crear categorías
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/crearCriterio">
                                        Crear criterios
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/crearEntidadBase">
                                        Crear entidades base
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/recategorizarEntidadJuridica">
                                        Recategorizar entidades jurídicas
                                    </Link>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    }
                </SidebarContent>
                <SidebarFooter>
                    <Menu iconShape="circle" >
                        <MenuItem onClick={hideSideNavbar} icon={collapsed? <FiChevronRight className="menuIcon"/> : <FiChevronLeft className="menuIcon"/>}>
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
      );
}

export default SideNavbar;