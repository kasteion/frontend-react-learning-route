import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Fatal from "../Fatal/Fatal";
import * as tareasActions from "../../actions/tareasActions";

class Tareas extends Component {
  componentDidMount() {
    const { tareas } = this.props.tareasReducer;
    const { cargando, traerTodas } = this.props;
    if (!Object.keys(tareas).length && !cargando) traerTodas();
  }

  // componentDidUpdate() {
  //   const { tareas } = this.props.tareasReducer;
  //   const { cargando, traerTodas } = this.props;
  //   if (!Object.keys(tareas).length && !cargando) traerTodas();
  // }

  ponerTareas = (usu_id) => {
    const { tareas } = this.props.tareasReducer;
    const por_usuario = { ...tareas[usu_id] };
    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => this.props.cambioCheck(usu_id, tar_id)}
        />
        {por_usuario[tar_id].title}
        <button className="m_left">
          <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>Editar</Link>
        </button>
        <button
          className="m_left"
          onClick={() => {
            this.props.eliminar(tar_id);
          }}
        >
          Eliminar
        </button>
      </div>
    ));
  };
  mostrarContenido = () => {
    const { cargando, error, tareas } = this.props.tareasReducer;
    if (cargando) return <Loader />;
    if (error.length > "") return <Fatal error={error} />;
    return (
      <>
        <h1>Tareas</h1>
        {Object.keys(tareas).map((usu_id) => (
          <div key={usu_id}>
            <h2>Usuario {usu_id}</h2>
            <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
          </div>
        ))}
      </>
    );
  };

  render() {
    console.log(this.props.tareasReducer.tareas);
    return (
      <>
        <button>
          <Link to="/tareas/guardar">Agregar</Link>
        </button>
        {this.mostrarContenido()}
      </>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => {
  return { tareasReducer };
};

export default connect(mapStateToProps, tareasActions)(Tareas);
