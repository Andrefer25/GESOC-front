import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import * as Columna from './Columnas';
import DetalleEgreso from './DetalleIngreso';
import NuevoIngreso from './NuevoIngreso';
import IngresoService from './../../../../services/IngresoService';
import { Calendar } from 'primereact/calendar';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';

import './../../../../assets/css/gridList.css';
import { Button } from "reactstrap";

class ListaIngresos extends Component {
    constructor() {
        super();

        this.service = new IngresoService();
        this.state = {
            data: null,
            loading: true,
            selectedDate: null,
            selectedStatus: null,
            showDialog: false,
            selectedData: null,
            showNewIngreso: false
        }

        this.statuses = [
            'VALIDADO', 'NO VALIDADO'
        ]
    }

    getLista = async () => {
        let ingresos = await this.service.getListaIngreso();
        this.setState({
            data: ingresos,
            loading: false
        })
    }

    componentDidMount = async () => {
        await this.getLista();
    }

    crearIngreso = async (data) => {
        this.service.createIngreso(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.hideNuevoIngreso();
            await this.getLista();
        })
    }

    editarIngreso = async(data) => {

        this.service.updateIngreso(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.handleDialog();
            await this.getLista();
        })
    }

    borrarIngreso = async(id) => {
        
        let resultado = await this.service.deleteIngreso(id);
        if(resultado) {
            this.showSuccess();
        } else {
            this.showError();
        }
        this.handleDialog();
        await this.getLista();
    }

    showSuccess = () => {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError = () => {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    hideNuevoIngreso = () => {
        this.setState({ showNewIngreso: false });
    }

    showNuevoIngreso = () => {
        this.setState({ showNewIngreso: true });
    }

    onDateChange = (e) => {
        this.dt.filter(e.value, 'fechaEgreso', 'custom');
        this.setState({ selectedDate: e.value });
    }

    onStatusChange = (e) => {
        this.dt.filter(e.value, 'validado', 'equals');
        this.setState({ selectedStatus: e.value })
    }

    onRowSelect = event => {
        this.setState({ showDialog: true, selectedData: event.data });
    }
    
    render() {
        const header = (
            <div className="table-header">
                <h1>
                    {this.props.nameList}
                </h1>
                <span className="p-input-icon-left">
                    <Button className="colorButton" onClick={this.showNuevoIngreso}><MdAddCircle className="buttonIcon" /> Nuevo Ingreso</Button>
                </span>
            </div>
        );
        
        const dateFilter = <Calendar value={this.state.selectedDate} onChange={this.onDateChange} dateFormat="dd-mm-yy" className="p-column-filter" placeholder="Filtrar por fecha" />;
        const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={this.onStatusChange} itemTemplate={Columna.statusItemTemplate} placeholder="Seleccionar estado" className="p-column-filter" showClear />;

        return (
            <div>
                <div className="datatable-filter-demo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.data} paginator rows={10}
                            header={header} className="p-datatable-customers" selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                            emptyMessage={`No se encontraron ${this.props.nameList}.`} loading={this.state.loading}>
                            <Column field="idIngreso" header="ID" body={Columna.idIngresoTemplate} filter filterPlaceholder="Filtrar por ID" filterMatchMode="contains" />
                            <Column field="importe" header="Importe" body={Columna.importeTemplate} filter filterPlaceholder="Filtrar por importe" />
                            <Column field="fechaEgreso" header="Fecha" body={Columna.dateBodyTemplate} filter filterElement={dateFilter} filterFunction={Columna.filterDate} />
                            <Column field="descripcion" header="Descripcion" body={Columna.descripcionTemplate} filter filterPlaceholder="Filtrar por descripcion" filterMatchMode="contains" />
                            <Column field="validado" header="Estado" body={Columna.statusBodyTemplate} filter filterElement={statusFilter} />
                        </DataTable>
                    </div>
                    <Toast ref={(el) => this.toast = el} />
                </div>
                { this.state.selectedData &&
                    <DetalleEgreso data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} onSubmit={this.editarIngreso} borrarIngreso={this.borrarIngreso} />
                }
                {   
                    this.state.showNewIngreso &&
                    <NuevoIngreso visible={this.state.showNewIngreso} onHide={this.hideNuevoIngreso} onSubmit={this.crearIngreso}/>
                }
            </div>
        )
    }
}

export default ListaIngresos;