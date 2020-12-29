import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdAddCircle } from 'react-icons/md';
import { Toast } from 'primereact/toast';
import { Button, Col, Row } from "reactstrap";
import { InputText } from 'primereact/inputtext';
import NuevaCategoria from './NuevaCategoria';

import './../../../../assets/css/gridList.css';
import CategoriaService from '../../../../services/CategoriaService';
import CriterioService from '../../../../services/CriterioService';
import DetalleCategoria from './DetalleCategoria';
import { parsearCriterios } from '../../../../helpers/parser';

class CreadorCategorias extends Component {

    constructor() {
        super();
        this.service = new CategoriaService();
        this.criterioService = new CriterioService();
        this.state = {
            categorias: null,
            criterios: null,
            loading: true,
            globalFilter: null,
            showNewCategoria: false,
            showDialog: false
        }
    }

    showNuevaCategoria = () => {
        this.setState({ showNewCategoria: !this.state.showNewCategoria });
    }

    showSuccess() {
        this.toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }

    getCategorias = async () => {
        this.service.getListaCategorias().then(({categorias, criterios}) => {
            categorias.forEach(categoria => {
                categoria.criterioDetalle = categoria.criterios.map(numCriterio => {
                    let criterio = criterios.find(criterio => criterio.idcriteriopresupuesto == numCriterio)
                        if(criterio != null){
                            return criterio.descripcion
                        }
                        return " "
                    
                }).join(", ");
            })
            this.setState({
                categorias,
                criterios,
                loading: false
            })
        });
    }

    crearNuevaCategoria = async data => {
        this.service.createCategoria(data).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.showNuevaCategoria();
            await this.getCategorias();
        })
    }

    editarCategoria = async (data,id) => {
        this.service.updateCategoria(data, id).then(async resultado => {
            if(resultado) {
                this.showSuccess();
            } else {
                this.showError();
            }
            this.showNuevaCategoria();
            await this.getCategorias();
        })
    }

    onRowSelect = event => {
        this.setState({ showDialog: true, selectedData: event.data });
    }

    handleDialog = () => {
        this.setState({ showDialog: false });
    }

    componentDidMount = async () => {
        await this.getCategorias();
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
                        selectionMode="single" dataKey="id" onRowSelect={this.onRowSelect}
                        globalFilter={this.state.globalFilter} paginator rows={10}>
                            <Column field="descripcion" header="Descripción" sortable></Column>
                            <Column field="criterioDetalle" header="Criterio" sortable></Column>
                        </DataTable>
                    </div>
                {   
                    (this.state.showNewCategoria && this.state.criterios) &&
                    <NuevaCategoria visible={this.state.showNewCategoria} criterios={this.state.criterios} onHide={this.showNuevaCategoria} agregarCategoria={this.crearNuevaCategoria}/>
                } 
                </div>
                { this.state.selectedData &&
                    <DetalleCategoria dataInfo={this.state.selectedData} data={this.state.criterios} visible={this.state.showDialog} onHide={this.handleDialog} actualizarCategoria={this.editarCriterio} />
                }
                <Toast ref={(el) => this.toast = el} />
            </div>
        )
    }
}

export default CreadorCategorias;