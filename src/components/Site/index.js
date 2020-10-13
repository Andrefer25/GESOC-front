import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import Navigation from './Nav';
import SideNavbar from './Sidebar';
import Home from './Home';
import Ingresos from './Ingresos';
import Egresos from './Egresos';
import Inbox from './Inbox';
import { Route, Switch, Redirect } from 'react-router-dom';

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
                            <Route exact path="/" component={Home}/>
                            <Route path="/ingresos" component={Ingresos}/>
                            <Route path="/egresos" component={Egresos}/>
                            <Route path="/bandejaMensajes" component={Inbox}/>
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Site;
