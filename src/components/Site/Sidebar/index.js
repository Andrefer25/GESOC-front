import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub, FaRegLaughWink } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';

const SideNavbar = ({ visible }) => {

    return (
        <div className="sidebar">
            <ProSidebar
            image={false}
            collapsed={visible}
            toggled={true}
            breakPoint="md"
            >
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        >
                            <Link to="/site">Home</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaGem />}>
                            <Link to="/site/ingreso">Ingreso</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaGem />}>
                            <Link to="/site/egreso">Egreso</Link>
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            title="withSuffix"
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>Submenu 1</MenuItem>
                            <MenuItem>Submenu 2</MenuItem>
                            <MenuItem>Submenu 3</MenuItem>
                        </SubMenu>
                        <SubMenu
                            suffix={<span className="badge yellow">3</span>}
                            title="withSuffix"
                            icon={<FaRegLaughWink />}
                        >
                            <MenuItem>Submenu 1</MenuItem>
                            <MenuItem>Submenu 2</MenuItem>
                            <MenuItem>Submenu 3</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                    >
                    <a
                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span>viewSource</span>
                    </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div>
      );
}

export default SideNavbar;