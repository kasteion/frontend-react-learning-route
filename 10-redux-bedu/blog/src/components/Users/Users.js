import React, { useEffect } from "react";
//import { connect, useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Fatal from "../Fatal/Fatal";
import Tabla from "../Tabla/Tabla";
import * as usuariosActions from "../../actions/usuariosActions";

const Users = (props) => {
  const { usuarios, cargando, error } = useSelector(
    (state) => state.usuariosReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // usuariosActions.traerTodos().then((data) => {
    //   dispatch({
    //     type: TRAER_TODOS,
    //     payload: data,
    //   });
    // });
    if (usuarios.length === 0) {
      usuariosActions.traerTodos(dispatch);
    }
  }, [dispatch, usuarios.length]);

  if (cargando) {
    return <Loader></Loader>;
  }

  if (error) {
    return <Fatal error={error}></Fatal>;
  }

  return <Tabla></Tabla>;
};

// const mapStateToProps = (reducers) => {
//   return reducers.usuariosReducer;
// };
// export default connect(mapStateToProps, usuariosActions)(Users);
export default Users;
