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
import { Button } from "reactstrap";
import CategoriaService from "../../../../services/CategoriaService";
import './../../../../assets/css/gridList.css';
import { Select } from 'antd';
import CriterioService from "../../../../services/CriterioService";
const { Option } = Select;

class ListaEgresos extends Component {
    constructor() {
        super();
        this.service = new EgresoService();
        this.categoriaService = new CategoriaService();
        this.criterioService = new CriterioService();
        this.state = {
            data: null,
            loading: true,
            selectedDate: null,
            selectedStatus: null,
            showDialog: false,
            selectedData: null,
            showNewEgreso: false,
            categorias: null,
            criterios: null,
            globalFilter: null
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

    getCategorias = async() => {
        let categorias = await this.categoriaService.getCategorias();
        this.setState({
            categorias
        })
    }

    getCriterios = async() => {
        let criterios = await this.criterioService.getListaCriterios();
        this.setState({
            criterios
        })
    }

    componentDidMount = () => {
        this.getLista().then(async () => {
            this.getCriterios().then(async () => {
                await this.getCategorias();
            })
        });
    }

    renderItems = (data) => {
        let options = [];
        options.push(<Option value={""} key={"a"}></Option>);
        if(data.length > 0) {
            data.forEach(e => (
                options.push(<Option value={`${e.descripcion}`} key={e.idcriteriopresupuesto}>{`${e.descripcion}`}</Option>)
            ));
        }
        return options;
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
        });
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

    revisores = async () => {
        this.handleDialog();
        await this.getLista();
    }
    
    render() {
        const header = (
            <div className="table-header">
                <h1>
                    {this.props.nameList}
                </h1>
                <span className="p-input-icon-left" style={{ marginLeft: "24em"}}>
                    {
                        this.state.criterios && this.state.criterios.length>0 &&
                        <Select
                            id="idItem"
                            showSearch
                            style={{width:"240px"}}
                            placeholder="Búsqueda por criterio"
                            optionFilterProp="children"
                            onChange={(value) => this.setState({ globalFilter: value })}
                            bordered={true}
                        >
                            {
                                this.renderItems(this.state.criterios)
                            }
                        </Select>
                    }
                </span>
                <span className="p-input-icon-left">
                    <Button className="colorButton" onClick={this.showNuevoEgreso}><MdAddCircle className="buttonIcon" />Nuevo Egreso</Button>
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
                            emptyMessage={`No se encontraron ${this.props.nameList}.`} globalFilter={this.state.globalFilter} loading={this.state.loading}>
                            <Column field="idEgreso" header="Numero de operación" body={this.numeroInstrumentoTemplate} filter filterPlaceholder="Filtrar por número" filterMatchMode="contains" sortable />
                            <Column field="nombreCriterios" header="Criterios" style={{display:"none"}} body={Columna.descripcionTemplate} filter filterPlaceholder="Filtrar por detalle" filterMatchMode="contains" sortable />
                            <Column field="descripcion" header="Descripción" body={Columna.descripcionTemplate} filter filterPlaceholder="Filtrar por detalle" filterMatchMode="contains" sortable />
                            <Column field="fechaEgreso" header="Fecha" body={Columna.dateBodyTemplate} filter filterElement={dateFilter} filterFunction={Columna.filterDate} sortable />
                            <Column field="importe" header="Importe" body={Columna.importeTemplate} filter filterPlaceholder="Filtrar por importe" sortable />
                            <Column field="validado" header="Estado" body={Columna.statusBodyTemplate} filter filterElement={statusFilter} sortable />
                        </DataTable>
                        <Toast ref={(el) => this.toast = el} />
                    </div>
                </div>
                { (this.state.selectedData && this.state.categorias) &&
                    <DetalleEgreso data={this.state.selectedData} visible={this.state.showDialog} onHide={this.handleDialog} subirDocumento={this.subirDocumento} onSubmit={this.editarIngreso} revisores={this.revisores} listaCategorias={this.state.categorias} />
                }
                {   
                    (this.state.showNewEgreso && this.state.categorias) &&
                    <NuevoEgreso visible={this.state.showNewEgreso} onHide={this.hideNuevoEgreso} crearEgreso={this.crearEgreso} listaCategorias={this.state.categorias} />
                }
            </div>
        )
    }
}

export default ListaEgresos;