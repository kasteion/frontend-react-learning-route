import {
  CARGANDO,
  ERROR,
  TRAER_POR_USUARIO,
  CARGANDO_COMENTARIOS,
  ERROR_COMENTARIOS,
  TRAER_COMENTARIOS,
  TOGLE_COMENTARIOS,
} from "../types/publicacionesTypes";

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: "",
  cargando_comentarios: false,
  error_comentarios: "",
};

const publicacionesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_POR_USUARIO:
      // const pub = [];
      // pub.push(...state.publicaciones, action.payload);
      // return {
      //   ...state,
      //   publicaciones: pub,
      //   cargando: false,
      //   error: "",
      // };
      return {
        ...state,
        publicaciones: state.publicaciones.concat(action.payload),
        cargando: false,
        error: "",
      };
    case CARGANDO:
      return {
        ...state,
        cargando: true,
        error: "",
      };
    case ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload,
      };
    case CARGANDO_COMENTARIOS:
      return { ...state, cargando_comentarios: true, error_comentarios: "" };
    case ERROR_COMENTARIOS:
      return {
        ...state,
        cargando_comentarios: false,
        error_comentarios: action.payload,
      };
    case TRAER_COMENTARIOS:
      state.publicaciones.map((publicacion) => {
        if (publicacion.id === action.payload.postId) {
          publicacion.comentarios = action.payload.comments;
        }
        return publicacion;
      });
      return {
        ...state,
        cargando_comentarios: false,
        error_comentarios: action.payload,
      };
    case TOGLE_COMENTARIOS:
      state.publicaciones.map((publicacion) => {
        if (publicacion.id === action.payload.postId)
          publicacion.mostrar_comentarios = !publicacion.mostrar_comentarios;
        return publicacion;
      });
      return state;
    default:
      return state;
  }
};

export default publicacionesReducer;
