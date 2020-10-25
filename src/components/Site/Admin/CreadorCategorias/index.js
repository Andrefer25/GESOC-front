import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevaCategoria from './NuevaCategoria';

import './../../../../assets/css/gridList.css';

class CreadorCategorias extends Component {

    constructor() {
        super();
        this.state = {
            categorias: null,
            loading: false,
            globalFilter: null,
            showNewCategoria: false
        }
    }

    showNuevaCategoria = () => {
        this.setState({ showNewCategoria: !this.state.showNewCategoria });
    }

    render() {
        const header = (
            <div className="table-header">
                <Row>
                    <Col md={7}>
                        <h1>Categorias</h1>
                    </Col>
                    <Col md={5}>
                        <span className="p-input-icon-left" style={{marginTop: ".4em", marginRight: "1.5em", marginLeft: "2.5em"}}>
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Buscar categorias" />
                        </span>
                        <Button color="primary" style={{marginTop: "-.4em"}} onClick={this.showNuevaCategoria}><MdAddCircle/> Nueva Categoria</Button>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="box">
                <div className="boxInfo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.categorias}
                        header={header} emptyMessage={`No se encontraron categorias.`} loading={this.state.loading}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="nombreCriterio" header="Nombre"></Column>
                            <Column field="criterioPadre" header="Criterio Padre"></Column>
                        </DataTable>
                    </div>
                {   
                    this.state.showNewCategoria &&
                    <NuevaCategoria visible={this.state.showNewCategoria} onHide={this.showNuevaCategoria}/>
                } 
                </div>
            </div>
        )
    }
}

export default CreadorCategorias;