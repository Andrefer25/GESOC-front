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
            visibleSide: show
        });
    }

    render() {
        return (
            <div>
                <Navigation handleSidebar={this.showSidebar} />
                <Row className="rowSite">
                    <Col className="colSidebar" md="auto">
                        <SideNavbar handleSidebar={this.showSidebar} visible={this.state.visibleSide} />
                    </Col>
                    <Col>
                        <Switch>
                            <Route exact path={this.props.match.path} component={Home}/>
                            <Route path={`${this.props.match.path}/ingresos`} component={Home2}/>
                            <Route path={`${this.props.match.path}/egresos`} component={Home2}/>
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Site;
