import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import Navigation from './Navbar/Nav';
import SideNavbar from './Navbar/Sidebar';
import Home from './Home';
import Ingresos from './Ingresos';
import Egresos from './Egresos';
import Presupuestos from './Presupuestos';
import CreadorCategorias from './Admin/CreadorCategorias';
import CreadorCriterios from './Admin/CreadorCriterios';
import CreadorEntidadesBase from './Admin/CreadorEntidadesBase';
import Inbox from './Inbox';
import { PrivateRoute, AdminRoute } from './../../_components';
import { Switch, Redirect } from 'react-router-dom';
import Items from './Items';
import Proveedores from './Proveedores';

class Site extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visibleSide: false
        }
    }

    showSidebar = show => {
        this.setState({
            visibleSide: !this.state.visibleSide
        });
    }

    render() {
        return (
            <div>
                <Navigation handleSidebar={this.showSidebar} />
                <Row className="rowSite">
                    <Col className="colSidebar" md="auto">
                        <SideNavbar handleSidebar={this.showSidebar} collapsed={this.state.visibleSide} />
                    </Col>
                    <Col>
                        <Switch>
                            <PrivateRoute exact path="/" component={Home}/>
                            <PrivateRoute path="/ingresos" component={Ingresos}/>
                            <PrivateRoute path="/egresos" component={Egresos}/>
                            <PrivateRoute path="/presupuestos" component={Presupuestos}/>
                            <PrivateRoute path="/items" component={Items}/>
                            <PrivateRoute path="/bandejaMensajes" component={Inbox}/>
                            <PrivateRoute path="/proveedores" component={Proveedores}/>
                            <AdminRoute path="/crearCategoria" component={CreadorCategorias}/>
                            <AdminRoute path="/crearCriterio" component={CreadorCriterios}/>
                            <AdminRoute path="/crearEntidadBase" component={CreadorEntidadesBase}/>
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Site;