import React, { Component } from 'react';
import uuid from 'uuid';

const stateInicial = { 
    cita : {
        mascota : '',
        propietario : '',
        fecha : '',
        hora : '',
        sintomas : ''
    },
    error: false
}

class NuevaCita extends Component {
    state = { ...stateInicial }
    //este handleChange se puede usar en cualquier proyecto de la misma manera para cargar datos al state
    //para que funcione el name debe ser igual que la propiedad del objeto en el state
     
    //Cuando el usuario escribe en los inputs
    handleChange = (e) => {
        //console.log(e.target.name + ':' + e.target.value);

        //colocar lo que el usuario escribe en el state
        this.setState({
            cita : {
                //el ...this.state.cita toma una copia del state y reescribe el valor que se esta cambiando mientras mantiene los demas
                ...this.state.cita,
                [e.target.name] : e.target.value
            }

        })
         
    }

    //Cuando el usuario envia el formulario-validacion
    handleSubmit = (e) => {
       e.preventDefault();

       //extraer los valores del state
       const { mascota, propietario, fecha, hora, sintomas} = this.state.cita

       //validar que todos los campos esten llenos
       if (mascota ==='' || propietario ==='' || fecha === '' || hora === '' || sintomas === '') {
            this.setState({
            error: true
            });

           //detener la ejecucion
           return;
       }

       //generar objeto con los datos
       const nuevaCita ={...this.state.cita};
       nuevaCita.id = uuid();
          

       //Agregar la cita al state de app si los datos son correctos
       this.props.crearNuevaCita(nuevaCita)

       //Colocar en el state el stateInicial
       this.setState({
           ...stateInicial
        })
    }

    render() { 
        
        //extraer valor del state
        const { error } = this.state;

        return ( 
            <div className="card mt-5 py-5">
                <h2 className="card-title text-center mb-5">
                    Llena el formulario para crear una nueva cita
                </h2>

                {/* el condicional de abajo es un operador ternario, indica que si error es true debe mostrarse el alerta: "todos los cmapos son obligatorios" en caso de que no queda como null*/}
                { error ? <div className="alert alert-danger mt-2 mb-5 text-center">Todos los campos son obligatorios</div> : null} 

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                        <div className="col-sm-8 col-lg-10">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombre Mascota"
                                name="mascota" //mismo nombre que la propiedad en el state
                                onChange={this.handleChange} //cuando el usuario cambia el valor(evento) se ejecuta este metodo(handleChange)
                                value={this.state.cita.mascota}
                            />
                        </div>
                    </div> {/* form-group*/}

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Nombre propietario
                        </label>
                        <div className="col-sm-8 col-lg-10">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombre propietario"
                                name="propietario" //mismo nombre que la propiedad en el state
                                onChange={this.handleChange} //cuando el usuario cambia el valor(evento) se ejecuta este metodo(handleChange)
                                value={this.state.cita.propietario}
                            />
                        </div>
                    </div> {/* form-group*/}
                    
                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                        <div className="col-sm-8 col-lg-4">
                            <input 
                                type="date"
                                className="form-control"
                                name="fecha" //mismo nombre que la propiedad en el state
                                onChange={this.handleChange} //cuando el usuario cambia el valor(evento) se ejecuta este metodo(handleChange)
                                value={this.state.cita.fecha}
                            />
                        </div>
                   
                        <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                        <div className="col-sm-8 col-lg-4">
                            <input 
                                type="time"
                                className="form-control"
                                name="hora" //mismo nombre que la propiedad en el state
                                onChange={this.handleChange} //cuando el usuario cambia el valor(evento) se ejecuta este metodo(handleChange)
                                value={this.state.cita.hora}
                            />
                        </div>
                    </div> {/* form-group*/}

                    <div className="form-group row">
                        <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                        <div className="col-sm-8 col-lg-10">
                            <textarea 
                                className="form-control"
                                name="sintomas" //mismo nombre que la propiedad en el state
                                placeholder="Describe los sintomas"
                                onChange={this.handleChange} //cuando el usuario cambia el valor(evento) se ejecuta este metodo(handleChange)
                                value={this.state.cita.sintomas}
                            ></textarea>
                         </div>
                    </div> {/* form-group*/}


                    <input type="submit" className="py-3 mt-2 btn btn-success btn-block" value="Agregar nueva cita" />
                                    
                </form>
            </div>
         );
    }
}
 
export default NuevaCita;