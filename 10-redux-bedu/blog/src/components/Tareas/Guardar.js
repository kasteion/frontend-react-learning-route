import { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";
import Loader from "../Loader/Loader";
import Fatal from "../Fatal/Fatal";
import { Redirect } from "react-router";

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id },
      },
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma,
    } = this.props;
    const { tareas } = this.props.tareasReducer;
    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }
  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value);
  };

  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  };

  guardar = () => {
    const { usuario_id, titulo, tareas } = this.props.tareasReducer;
    const {
      match: {
        params: { usu_id, tar_id },
      },
      agregar,
      editar,
    } = this.props;
    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };
    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tareaEditada = {
        ...nuevaTarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editar(tareaEditada);
    } else {
      agregar(nuevaTarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props.tareasReducer;
    if (cargando) return true;
    if (!usuario_id || !titulo) return true;
    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props.tareasReducer;
    if (cargando) return <Loader />;
    if (error) return <Fatal error={error} />;
  };
  render() {
    return (
      <>
        {this.props.tareasReducer.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.tareasReducer.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Titulo:
        <input
          value={this.props.tareasReducer.titulo}
          onChange={this.cambioTitulo}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => {
  return { tareasReducer };
};

export default connect(mapStateToProps, tareasActions)(Guardar);
