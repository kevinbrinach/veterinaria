import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';
import PropTypes from 'prop-types';


class App extends Component {
  state = {  
      citas : []
    
  }

  //Cuando la aplicacion carga busca si hay algo en el storagelocal para mostrarlo en las citas hechas
  componentDidMount () {
    const citasLS = localStorage.getItem('citas');
    if(citasLS) {
      this.setState({
        citas : JSON.parse(citasLS)
      })
    }
  }

  //Cuando eliminamos o agregamos una nueva cita
  componentDidUpdate() {
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita= datos => {
      //copiar el state actual
      const citas =[...this.state.citas, datos];

      //agregar el nuevo state
      this.setState({
        citas
      })
  }

  //elimina las citas del state
  eliminarCita = id => {
    //primero se debe tomar una copia del state
    const citasActuales = [...this.state.citas];

    //despues se usa filter para sacar el elemento @id del arreglo, con el filter el arreglo citas pasaria a obtener todas las citas que no tengan un id igual al que el usuario esta pasando
    //filter extrae un elemento, entonces si se pone !== se extraen todos los elementos excepto el que se desea eliminar
    const citas = citasActuales.filter(cita => cita.id !== id)

    //por ultimo hay que actualizar el state
    this.setState({
      citas
    })
    
  }

  render() { 
    return ( 
      <div className="container">
          <Header
            titulo = 'Administrador Pacientes veterinaria'
          />

          <div className="row">
            <div className="col-md-10 mx-auto">
              <NuevaCita 
                crearNuevaCita={this.crearNuevaCita}
              />  
            </div>
            <div className="mt-5 col-md-10 mx-auto">
              <ListaCitas 
                 citas={this.state.citas}
                 eliminarCita={this.eliminarCita}
              />

            </div>
          </div>
          
      </div>
     
     );
  }
}

NuevaCita.propTypes = {
  crearNuevaCita : PropTypes.func.isrequired
}


export default App;
