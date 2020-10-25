import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevoCriterio from './NuevoCriterio';

import './../../../../assets/css/gridList.css';

class CreadorCriterios extends Component {

    constructor() {
        super();
        this.state = {
            criterios: null,
            loading: false,
            globalFilter: null,
            showNewCriterio: false
        }
    }

    showNuevoCriterio = () => {
        this.setState({ showNewCriterio: !this.state.showNewCriterio });
    }

    render() {
        const header = (
            <div className="table-header">
                <Row>
                    <Col md={7}>
                        <h1>Criterios</h1>
                    </Col>
                    <Col md={5}>
                        <span className="p-input-icon-left" style={{marginTop: ".4em", marginRight: "1.5em", marginLeft: "2.5em"}}>
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Buscar criterios" />
                        </span>
                        <Button color="primary" style={{marginTop: "-.4em"}} onClick={this.showNuevoCriterio}><MdAddCircle/> Nuevo Criterio</Button>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="box">
                <div className="boxInfo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.criterios}
                        header={header} emptyMessage={`No se encontraron criterios.`} loading={this.state.loading}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="nombreCriterio" header="Nombre"></Column>
                            <Column field="criterioPadre" header="Criterio Padre"></Column>
                        </DataTable>
                    </div>
                {   
                    this.state.showNewCriterio &&
                    <NuevoCriterio visible={this.state.showNewCriterio} onHide={this.showNuevoCriterio}/>
                } 
                </div>
            </div>
        )
    }
}

export default CreadorCriterios;