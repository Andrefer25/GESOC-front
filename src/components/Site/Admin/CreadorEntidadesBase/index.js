import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevaEntidadBase from './NuevaEntidadBase';
import EntidadBaseService from './../../../../services/EntidadBaseService';

import './../../../../assets/css/gridList.css';

class CreadorEntidadesBase extends Component {

    constructor() {
        super();
        this.service = new EntidadBaseService();
        this.state = {
            entidades: null,
            loading: true,
            globalFilter: null,
            showNewEntidad: false
        }
    }

    componentDidMount = async () => {
        let entidadesBase = await this.service.getEntidadBase();
        this.setState({
            entidades: entidadesBase,
            loading: false
        })
    }

    showNuevaEntidad = () => {
        this.setState({ showNewEntidad: !this.state.showNewEntidad });
    }

    render() {
        const header = (
            <div className="table-header">
                <Row>
                    <Col md={7}>
                        <h1>Entidades Base</h1>
                    </Col>
                    <Col md={5}>
                        <span className="p-input-icon-left" style={{marginTop: ".4em", marginRight: "1.5em", marginLeft: "2.5em"}}>
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Buscar entidades base" />
                        </span>
                        <Button color="primary" style={{marginTop: "-.4em"}} onClick={this.showNuevaEntidad}><MdAddCircle/> Nueva Entidad</Button>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="box">
                <div className="boxInfo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.entidades}
                        header={header} emptyMessage={`No se encontraron entidades base.`} loading={this.state.loading}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="nombreFicticio" header="Nombre"></Column>
                            <Column field="descripcion" header="Descripcion"></Column>
                        </DataTable>
                    </div>
                {   
                    this.state.showNewEntidad &&
                    <NuevaEntidadBase visible={this.state.showNewEntidad} onHide={this.showNuevaEntidad}/>
                } 
                </div>
            </div>
        )
    }
}

export default CreadorEntidadesBase;