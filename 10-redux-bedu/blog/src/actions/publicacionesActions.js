import axios from "axios";
import {
  CARGANDO,
  CARGANDO_COMENTARIOS,
  ERROR,
  ERROR_COMENTARIOS,
  TRAER_COMENTARIOS,
  TRAER_POR_USUARIO,
  TOGLE_COMENTARIOS,
} from "../types/publicacionesTypes";

//import * as usuariosTypes from "../types/usuariosTypes";
//const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

// export const traerTodos = async (dispatch) => {
//   dispatch({
//     type: CARGANDO,
//   });
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     dispatch({
//       type: TRAER_TODOS,
//       payload: response.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: ERROR,
//       payload: err.message,
//     });
//   }
// };

export const traerPorUsuario = async (id, dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    const nuevas = response.data.map((publicacion) => ({
      ...publicacion,
      mostrar_comentarios: false,
      comentarios: [],
    }));
    // const publicaciones_actualizadas = [...publicaciones, response.data];
    // const publicaciones_keys = publicaciones_actualizadas.length - 1;
    // const usuarios_actualizados = [...usuarios]
    // usuarios_actualizados[key] = { ...usuarios[key], publicaciones_key }
    // dispatch({ type: USUARIOS_TRAER_TODOS, payload: usuarios_actualizados })
    dispatch({
      type: TRAER_POR_USUARIO,
      payload: nuevas,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message,
    });
  }
};

/*
export const traerPorUsuario = (key) => async (dispatch, getState) => {
  const { usuarios } = getState().usuariosReducer;
  const usuario_id = usuarios[key].id;
  const respuesta = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`
  );
  dispatch({
    type: TRAER_POR_USUARIO,
    payload: response.data,
  });
}
*/

export const traerComentarios = async (postId, dispatch) => {
  dispatch({
    type: CARGANDO_COMENTARIOS,
  });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = { postId, comments: response.data };
    //console.log(data);
    dispatch({
      type: TRAER_COMENTARIOS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_COMENTARIOS,
      payload: err.message,
    });
  }
};

export const toglecomentarios = (postId, dispatch) => {
  dispatch({
    type: TOGLE_COMENTARIOS,
    payload: { postId },
  });
};
