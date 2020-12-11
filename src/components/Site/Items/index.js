import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevoItem from './NuevoItem';
import ItemService from './../../../services/ItemService';
import DetalleItem from "./DetalleItem";

import './../../../assets/css/gridList.css';

class Items extends Component {

    constructor() {
        super();
        this.service = new ItemService();
        this.state = {
            items: null,
            loading: true,
            globalFilter: null,
            showNewItem: false,
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

    getListaItems = async() => {
        let items = await this.service.getItems();
        this.setState({
            items,
            loading: false
        })
    }

    componentDidMount = async () => {
        await this.getListaItems();
    }

    crearNuevoItem = async data => {
        this.service.createItem(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.showNuevoItem();
            await this.getListaItems();
        })
    }

    editarItem = async(data) => {
        this.service.updateItem(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.handleDialog();
            await this.getListaItems();
        })
    }

    showNuevoItem = () => {
        this.setState({ showNewItem: !this.state.showNewItem });
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
                        <h1>Items</h1>
                    </Col>
                    <Col md={5}>
                        <span className="p-input-icon-left" style={{marginTop: ".4em", marginRight: "1.5em", marginLeft: "5em"}}>
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Buscar Items" />
                        </span>
                        <Button color="primary" style={{marginTop: "-.4em"}} onClick={this.showNuevoItem}><MdAddCircle/>Nuevo Item</Button>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="box">
                <div className="boxInfo">
                    <div className="card">
                        <Toast ref={(el) => this.toast = el} />
                        <DataTable ref={(el) => this.dt = el} value={this.state.items} 
                        selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                        header={header} emptyMessage={`No se encontraron items.`} loading={this.state.loading}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="idItem" header="ID"></Column>
                            <Column field="descripcion" header="Nombre"></Column>
                            <Column field="productoServicio" header="Tipo"></Column>
                            <Column field="valorUnitario" header="Valor Unitario"></Column>
                        </DataTable>
                    </div>
                {   
                    this.state.showNewItem &&
                    <NuevoItem visible={this.state.showNewItem} 
                    onHide={this.showNuevoItem} onSubmit={this.crearNuevoItem}/>
                } 
                </div>
                { this.state.selectedData &&
                    <DetalleItem data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} onSubmit={this.editarItem} />
                }
            </div>
        )
    }
}

export default Items;