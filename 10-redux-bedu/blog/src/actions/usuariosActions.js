import axios from "axios";
import {
  TRAER_TODOS,
  CARGANDO,
  ERROR,
  SET_PUBLICACION,
} from "../types/usuariosTypes";

// Esta es una función que retorna otra función
// export const traerTodos = () => {
//   return async (dispatch) => {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch({
//       type: "traer_usuarios",
//       payload: response.data,
//     });
//   };
// };

export const traerTodos = async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    //return response.data;
    dispatch({
      type: TRAER_TODOS,
      payload: response.data,
    });
  } catch (err) {
    // console.log(`Error ${err.message}`);
    dispatch({
      type: ERROR,
      payload: err.message,
    });
  }
};

export const setPublicacion = (payload, dispatch) => {
  dispatch({
    type: SET_PUBLICACION,
    payload,
  });
};
