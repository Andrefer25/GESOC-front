import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import { BiHome } from 'react-icons/bi';
import { IoMdCash } from 'react-icons/io';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { GiTakeMyMoney } from 'react-icons/gi'

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
                    <Menu iconShape="circle" className="marginSideBar">
                        <MenuItem icon={<BiHome />}>
                            <Link to="/">Home</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle" className="marginSideBar">
                        <MenuItem icon={<IoMdCash />}>
                            <Link to="/ingresos">Ingresos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle" className="marginSideBar">
                        <MenuItem icon={<GiTakeMyMoney />}>
                            <Link to="/egresos">Egresos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle" className="marginSideBar">
                        <MenuItem icon={<GiTakeMyMoney />}>
                            <Link to="/presupuestos">Presupuestos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle" className="marginSideBar">
                        <MenuItem icon={<GiTakeMyMoney />}>
                            <Link to="/proveedores">Proveedores</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle" className="marginSideBar">
                        <MenuItem icon={<GiTakeMyMoney />}>
                            <Link to="/items">Items</Link>
                        </MenuItem>
                    </Menu>
                    { (userRole === 'admin') && 
                        <Menu iconShape="circle">
                            <SubMenu
                                title="Admin menu"
                                icon={<RiMenuUnfoldLine />}
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