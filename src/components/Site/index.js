import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import Navigation from './Nav';
import SideNavbar from './Sidebar';
import Home from './Home';
import Home2 from './Home2';
import { Route, Switch } from 'react-router-dom';

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
                            <Route path="/ingresos" component={Home2}/>
                            <Route path="/egresos" component={Home2}/>
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Site;
