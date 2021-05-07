import {
  TRAER_TODOS,
  CARGANDO,
  ERROR,
  SET_PUBLICACION,
} from "../types/usuariosTypes";

const INITIAL_STATE = {
  usuarios: [],
  cargando: false,
  error: "",
};

const usuariosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODOS:
      return { ...state, usuarios: action.payload, cargando: false, error: "" };
    case CARGANDO:
      return { ...state, cargando: true, error: "" };
    case ERROR:
      return { ...state, cargando: false, error: action.payload };
    case SET_PUBLICACION:
      const modifiedUsers = state.usuarios.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
      return { ...state, usuarios: modifiedUsers, cargando: false, error: "" };
    default:
      return state;
  }
};

export default usuariosReducer;
