import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR,
} from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const tareas = {};
    response.data.map(
      (tar) =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar,
          },
        })
    );
    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible.",
    });
  }
};

export const cambioUsuarioId = (event_value) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: event_value,
  });
};

export const cambioTitulo = (event_value) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: event_value,
  });
};

export const agregar = (nuevaTarea) => async (dispatch) => {
  console.log(nuevaTarea);
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nuevaTarea
    );
    //console.log(response.data);
    dispatch({
      type: GUARDAR,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde.",
    });
  }
};

export const editar = (tareaEditada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tareaEditada.id}`,
      tareaEditada
    );
    dispatch({
      type: GUARDAR,
      payload: response,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: "Intente más tarde",
    });
  }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const { tareas } = getState().tareasReducer;
  const seleccionada = tareas[usu_id][tar_id];
  const actualizadas = {
    ...tareas,
  };
  actualizadas[usu_id] = {
    ...tareas[usu_id],
  };
  actualizadas[usu_id][tar_id] = {
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed,
  };
  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  });
};

export const eliminar = (tar_id) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const tareas = {};
    response.data.map(
      (tar) =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar,
          },
        })
    );
    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: "Servicio no disponible.",
    });
  }
};

export const limpiarForma = () => (dispatch) => {
  dispatch({
    typeo: LIMPIAR,
  });
};
