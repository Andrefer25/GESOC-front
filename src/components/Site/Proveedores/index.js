import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevoProveedor from './NuevoProveedor';
import ProveedorService from './../../../services/ProveedorService';
import DetalleProveedor from "./DetalleProveedor";

import './../../../assets/css/gridList.css';

class Proveedores extends Component {

    constructor() {
        super();
        this.service = new ProveedorService();
        this.state = {
            proveedores: null,
            loading: true,
            globalFilter: null,
            showNewProveedor: false,
            showDialog: false,
            selectedData: null
        }
    }

    showSuccess() {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    getListaproveedores = async() => {
        let proveedores = await this.service.getListaProveedores();
        this.setState({
            proveedores,
            loading: false
        })
    }

    componentDidMount = async () => {
        await this.getListaproveedores();
    }

    crearNuevoProveedor = async data => {
        this.service.createProveedor(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.showNuevoProveedor();
            await this.getListaproveedores();
        })
    }

    editarProveedor = async(data) => {
        this.service.updateProveedor(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.handleDialog();
            await this.getListaproveedores();
        })
    }

    showNuevoProveedor = () => {
        this.setState({ showNewProveedor: !this.state.showNewProveedor });
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    onRowSelect = event => {
        this.setState({ showDialog: true, selectedData: event.data });
    }

    render() {
        const header = (
            <div className="table-header">
                <Row>
                    <Col md={7}>
                        <h1>Proveedores</h1>
                    </Col>
                    <Col md={5}>
                        <span className="p-input-icon-left" style={{marginTop: ".4em", marginRight: "1.5em", marginLeft: "3em"}}>
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Buscar proveedores" />
                        </span>
                        <Button color="primary" style={{marginTop: "-.4em"}} onClick={this.showNuevoProveedor}><MdAddCircle/>Nuevo Proveedor</Button>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="box">
                <div className="boxInfo">
                    <div className="card">
                        <Toast ref={(el) => this.toast = el} />
                        <DataTable ref={(el) => this.dt = el} value={this.state.proveedores} 
                        selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                        header={header} emptyMessage={`No se encontraron proveedores.`} loading={this.state.loading}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="nombre" header="Nombre" sortable></Column>
                            <Column field="cuit" header="CUIT" sortable></Column>
                        </DataTable>
                    </div>
                {   
                    this.state.showNewProveedor &&
                    <NuevoProveedor visible={this.state.showNewProveedor} 
                    onHide={this.showNuevoProveedor} onSubmit={this.crearNuevoProveedor}/>
                } 
                </div>
                { this.state.selectedData &&
                    <DetalleProveedor data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} onSubmit={this.editarProveedor} />
                }
            </div>
        )
    }
}

export default Proveedores;