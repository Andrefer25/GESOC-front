import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevoCriterio from './NuevoCriterio';

import './../../../../assets/css/gridList.css';
import CriterioService from '../../../../services/CriterioService';
import EditarCriterio from './EditarCriterio';

class CreadorCriterios extends Component {

    constructor() {
        super();
        this.service = new CriterioService();
        this.state = {
            criterios: null,
            loading: true,
            globalFilter: null,
            showNewCriterio: false,
            showDialog: false
        }
    }

    showNuevoCriterio = () => {
        this.setState({ showNewCriterio: !this.state.showNewCriterio });
    }

    showSuccess() {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    getCriterios = async () => {
        let criterios = await this.service.getListaCriterios();
        this.setState({
            criterios,
            loading: false
        })
    }

    crearNuevoCriterio = async data => {
        this.service.createCriterio(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.showNuevoCriterio();
            await this.getCriterios();
        })
    }

    crearEditarCriterio = async (data,id) => {
        this.service.updateCriterio(data, id).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.showNuevoCriterio();
            await this.getCriterios();
        })
    }

    onRowSelect = event => {
        this.setState({ showDialog: true, selectedData: event.data });
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    componentDidMount = async () => {
        await this.getCriterios();
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
                        selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="descripcion" header="Nombre" sortable></Column>
                            <Column field="criterioPadre" header="Criterio Padre" sortable></Column>
                        </DataTable>
                    </div>
                {   
                    (this.state.showNewCriterio && this.state.criterios) &&
                    <NuevoCriterio visible={this.state.showNewCriterio} onHide={this.showNuevoCriterio} data={this.state.criterios} agregarItem={this.crearNuevoCriterio}/>
                } 
                </div>
                { this.state.selectedData &&
                    <EditarCriterio dataInfo={this.state.selectedData} data={this.state.criterios} visible={this.state.showDialog} onHide={this.handleDialog} actualizarItem={this.editarCriterio} />
                }
                <Toast ref={(el) => this.toast = el} />
            </div>
        )
    }
}

export default CreadorCriterios;