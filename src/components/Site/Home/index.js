import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import EntidadJuridica from './EntidadJuridica';
import ChartEgreso from './ChartEgreso';
import ChartOperacion from './ChartOperacion';
import HomeController from '../../../controllers/HomeController';
import { Toast } from 'primereact/toast';
import EntidadJuridicaService from '../../../services/EntidadJuridicaService';
import VinculadorService from '../../../services/VinculadorService';
import ValidadorTransparenciaService from '../../../services/ValidadorTransparenciaService';

class Home extends Component {
    
    constructor() {
        super();
        this.controller = new HomeController();
        this.entJuridicaService = new EntidadJuridicaService();
        this.vinculadorService = new VinculadorService();
        this.validadorService = new ValidadorTransparenciaService();

        this.state = {
            vinculador: null,
            validador: null,
            entJuridica: null,
            criterios: null
        }
    }

    initHome = () => {
        this.controller.initHome().then(({entidadJuridica, validacion, vinculacion, criteriosVinculacion}) => {
            this.setState({
                vinculador: vinculacion,
                validador: validacion,
                entJuridica: entidadJuridica,
                criterios: criteriosVinculacion
            })
        });
    }

    getInfoEntidadJuridica = async () => {
        this.entJuridicaService.getEntidadJuridica().then(data => {
            this.setState({entJuridica: data});
        });
    }

    async componentDidMount() {
        await this.initHome();
    }

    validar = async() => {
        this.validadorService.validar().then(validacion => {
            if(validacion) {
                this.setState({
                    validador: validacion
                });
                this.showSuccess("Validación realizada correctamente");
            } else {
                this.showError("Se produjo un error en la validación");
            }
        }) 
    }

    vincular = async(lista) => {
        this.vinculadorService.vincular(lista).then(vinculacion => {
            if(vinculacion) {
                this.setState({
                    vinculador: vinculacion
                });
                this.showSuccess("Vinculación realizada correctamente");
            } else {
                this.showError("Se produjo un error en la vinculación");
            }
        })
    }
    
    editarEntidad = async (data) => {
        this.entJuridicaService.editarEntidadJuridica(data).then(async resultado => {
            if(resultado) {
                this.showSuccess("Entidad editada correctamente");
            } else {
                this.showError("Se produjo un error editando la entidad jurídica");
            }
            await this.getInfoEntidadJuridica();
        });
    }
    
    render() {
        return (
            <div className="box">
                <Toast ref={(el) => this.toast = el} />
                <EntidadJuridica data={this.state.entJuridica} edit={this.editarEntidad} />
                <Row className="validaciones" style={{ marginBottom: "6em" }}>
                    <Col md="6">
                        <ChartEgreso data={this.state.validador || null} validar={this.validar}/>
                    </Col>
                    <Col md="6">
                        <ChartOperacion data={this.state.vinculador || null} criterios={this.state.criterios} vincular={this.vincular}/>
                    </Col>
                </Row>
            </div>
        )
    }

    showSuccess = (message) => {
        this.toast.show({severity:'success', summary: 'Success', detail:message, life: 3000});
    }
    
    showError = (message) => {
        this.toast.show({severity:'error', summary: 'Error', detail:message, life: 3000});
    }
}

export default Home;