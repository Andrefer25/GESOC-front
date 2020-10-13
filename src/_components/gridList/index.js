import React, { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

import './gridList.css';

class Listado extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            filteredData: null,
            loading: false,
            selectedDate: null,
            globalFilter: null,
            selectedStatus: null
        }

        this.statuses = [
            'Validado', 'No Validado'
        ]
    }

    componentDidMount() {
        //aca traemos del back dependiendo de las props
        //se guarda en data y en filteredData
    }

    nameBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </React.Fragment>
        );
    }

    
    filterDate(value, filter) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value === this.formatDate(filter);
    }

    countryBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Country</span>
                <img alt="flag" src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    statusBodyTemplate({status}) {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                <span className={`p-tag ${status==="Validado"?'p-tag-success':'p-tag-danger'}`}>{status}</span>
                
            </React.Fragment>
        );
    }

    statusItemTemplate(option) {
        return <span className={`p-tag ${option==="Validado"?'p-tag-success':'p-tag-danger'}`}>{option}</span>;
    }

    dateBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <span className="p-column-title">Date</span>
                <span>{rowData.date}</span>
            </React.Fragment>
        );
    }

    
    render() {
        const header = (
            <div className="table-header">
                {this.props.nameList}
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder={`Buscar ${this.props.nameList}`} />
                </span>
            </div>
        );
        
        const dateFilter = <Calendar value={this.state.selectedDate} onChange={(e) => this.setState({ selectedDate: e.value })} dateFormat="dd-mm-yy" className="p-column-filter" placeholder="Filtrar por fecha"/>;
        const statusFilter = <Dropdown value={this.state.selectedStatus} options={this.statuses} onChange={(e) => this.setState({ selectedStatus: e.value })} itemTemplate={this.statusItemTemplate} placeholder="Seleccionar estado" className="p-column-filter" showClear />;

        return (
            <div>
                {/*Renderizamos en el listado los datos filtrados*/}
                <div className="datatable-filter-demo">
                    <div className="card">
                        <DataTable ref={(el) => this.dt = el} value={this.state.data} paginator rows={10}
                            header={header} className="p-datatable-customers"
                            globalFilter={this.state.globalFilter} emptyMessage={`No se encontraron ${this.props.nameList}.`} loading={this.state.loading}>
                            <Column field="numeroInstrumento" header="Numero Instrumento" body={this.nameBodyTemplate} filter filterPlaceholder="Filtrar por numero" />
                            <Column field="fecha" header="Fecha" body={this.dateBodyTemplate} filter filterElement={dateFilter} filterFunction={this.filterDate} />
                            <Column field="presupuesto" header="Presupuesto" body={this.countryBodyTemplate} filter filterPlaceholder="Filtrar por presupuesto" filterMatchMode="contains" />
                            <Column field="revisores" header="Revisores" body={this.nameBodyTemplate} filter filterPlaceholder="Filtrar por revisores" />
                            <Column field="categoria" header="Categoria" body={this.statusBodyTemplate} filter filterElement={statusFilter}/>
                            <Column field="estado" header="Estado" body={this.statusBodyTemplate} filter filterElement={statusFilter}/>
                        </DataTable>
                    </div>
                </div>
            </div>
        )
    }
}

export default Listado;