import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaRegLaughWink } from 'react-icons/fa';
import { BiCollapse, BiExpand, BiHome } from 'react-icons/bi';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';

const SideNavbar = ({ collapsed, handleSidebar }) => {
    const hideSideNavbar = () => {
        handleSidebar();
    }

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
                            <Link to="/ingreso">Ingresos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<BiExpand />}>
                            <Link to="/egreso">Egresos</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title="Submenu 1"
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>Submenu 1</MenuItem>
                            <MenuItem>Submenu 2</MenuItem>
                            <MenuItem>Submenu 3</MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title="Submenu 2"
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>Submenu 1</MenuItem>
                            <MenuItem>Submenu 2</MenuItem>
                            <MenuItem>Submenu 3</MenuItem>
                        </SubMenu>
                    </Menu>
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