import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import * as Columna from './Columnas';
import DetalleEgreso from './DetalleEgreso';
import NuevoEgreso from './NuevoEgreso';
import EgresoService from './../../../../services/EgresoService';
import { Calendar } from 'primereact/calendar';
import { es } from './../../../../helpers/spanishCalendar';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';

import './../../../../assets/css/gridList.css';
import { Button } from "reactstrap";

class ListaEgresos extends Component {
    constructor() {
        super();

        this.service = new EgresoService();
        this.state = {
            data: null,
            loading: true,
            selectedDate: null,
            selectedStatus: null,
            showDialog: false,
            selectedData: null,
            showNewEgreso: false,
        }

        this.statuses = [
            'VALIDADO', 'NO VALIDADO'
        ]
    }

    showSuccess = () => {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError = () => {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    getLista = async() => {
        this.setState({ loading: true });
        let listaEgresos = await this.service.getListaEgresos();
        this.setState({
            data: listaEgresos
        })
        this.setState({ loading: false });
    }

    componentDidMount = async () => {
        await this.getLista();
        this.setState({ loading: false });
    }

    crearEgreso = async(data) => {
        this.service.createEgreso(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }  
            this.hideNuevoEgreso();
            await this.getLista();
        })
    }

    editarIngreso = async(data) => {
        this.service.updateEgreso(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.handleDialog();
            await this.getLista();
        })
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    hideNuevoEgreso = () => {
        this.setState({ showNewEgreso: false });
    }

    showNuevoEgreso = () => {
        this.setState({ showNewEgreso: true });
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

    subirDocumento = async(doc, id) => {
        this.service.uploadDocument(doc, parseInt(id)).then(async response => {
            if(response) {
                this.showSuccess();
            } else {
                this.showError();
            }  
            this.handleDialog();
            await this.getLista();
        })
    }
    
    render() {
        const header = (
            <div className="table-header">
                <h1>
                    {this.props.nameList}
                </h1>
                <span className="p-input-icon-left">
                    <Button className="colorButton" onClick={this.showNuevoEgreso}><MdAddCircle className="buttonIcon" /> Nuevo Egreso</Button>
                </span>
            </div>
        );
        
        //const dateFilter = <Input type="datetime" name="datetime" id="exampleDatetime" dateFormat="dd-mm-yy" onChange={this.onDateChange} className="p-column-filter" placeholder="Filtrar por fecha" />
        const dateFilter = <Calendar locale={es} value={this.state.selectedDate} onChange={this.onDateChange} dateFormat="dd-mm-yy" className="p-column-filter" placeholder="Filtrar por fecha" />;
        const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={this.onStatusChange} itemTemplate={Columna.statusItemTemplate} placeholder="Seleccionar estado" className="p-column-filter" showClear />;

        return (
            <div>
                <div className="datatable-filter-demo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.data} paginator rows={10}
                            header={header} className="p-datatable-customers" selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                            emptyMessage={`No se encontraron ${this.props.nameList}.`} loading={this.state.loading}>
                            <Column field="numeroInstrumentoPago" header="Numero Instrumento" body={this.numeroInstrumentoTemplate} filter filterPlaceholder="Filtrar por numero" filterMatchMode="contains" />
                            <Column field="descripcion" header="Descripcion" body={Columna.descripcionTemplate} filter filterPlaceholder="Filtrar por detalle" filterMatchMode="contains" />
                            <Column field="importe" header="Importe" body={Columna.importeTemplate} filter filterPlaceholder="Filtrar por importe" />
                            <Column field="fechaEgreso" header="Fecha" body={Columna.dateBodyTemplate} filter filterElement={dateFilter} filterFunction={Columna.filterDate} />
                            <Column field="validado" header="Estado" body={Columna.statusBodyTemplate} filter filterElement={statusFilter} />
                        </DataTable>
                        <Toast ref={(el) => this.toast = el} />
                    </div>
                </div>
                { this.state.selectedData &&
                    <DetalleEgreso data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} subirDocumento={this.subirDocumento} onSubmit={this.editarIngreso} />
                }
                {   
                    this.state.showNewEgreso &&
                    <NuevoEgreso visible={this.state.showNewEgreso} onHide={this.hideNuevoEgreso} crearEgreso={this.crearEgreso} />
                }
            </div>
        )
    }
}

export default ListaEgresos;