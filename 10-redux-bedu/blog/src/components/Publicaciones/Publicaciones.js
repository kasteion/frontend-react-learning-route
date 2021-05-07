import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../Loader/Loader";
import Fatal from "../Fatal/Fatal";
import Comentarios from "../Comentarios";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const Publicaciones = (props) => {
  const { key } = useParams();
  const usuario = useSelector((state) =>
    state.usuariosReducer.usuarios.find((user) => user.id === parseInt(key))
  );
  const publicaciones = useSelector((state) => {
    //console.log(state.publicacionesReducer);
    return state.publicacionesReducer.publicaciones.filter(
      (pubs) => pubs.userId === (usuario?.id ?? 0)
    );
  });
  const { cargando: userLoading, error: userError } = useSelector(
    (state) => state.usuariosReducer
  );
  const {
    cargando: publicacionesLoading,
    error: publicacionesError,
  } = useSelector((state) => state.publicacionesReducer);
  const dispatch = useDispatch();

  const loadUsuario = useCallback(async () => {
    if (!usuario) {
      await usuariosActions.traerTodos(dispatch);
    }
    // publicacionesActions
    //   .traerPorUsuario(key, dispatch)
    //   .then((data) => console.log(data));
    // if (usuario && !("publicacion_id" in usuario)) {
    //   // if (usuario) {
    //   //   const modifiedUser = {
    //   //     ...usuario,
    //   //     publicacion_id: publicaciones.length,
    //   //   };
    //   //   usuariosActions.setPublicacion(modifiedUser, dispatch);
    //   // }
    // }
  }, [dispatch, usuario]);

  const loadPublicaciones = useCallback(async () => {
    if (publicaciones.length === 0) {
      await publicacionesActions.traerPorUsuario(key, dispatch);
    }
  }, [dispatch, key, publicaciones.length]);

  useEffect(() => {
    loadUsuario();
  }, [loadUsuario]);

  useEffect(() => {
    loadPublicaciones();
  }, [loadPublicaciones]);

  const ponerUsuario = () => {
    if (userLoading) return <Loader></Loader>;
    if (userError) return <Fatal error={userError}></Fatal>;
    return <h1>Publicaciones de {usuario?.name}</h1>;
  };

  const togleComentarios = async (postId) => {
    const mostrar = publicaciones.find(
      (publicacion) => publicacion.id === postId
    );
    if (mostrar?.comentarios.length === 0) {
      await publicacionesActions.traerComentarios(postId, dispatch);
    }
    publicacionesActions.toglecomentarios(postId, dispatch);
  };

  const ponerComentarios = (postId) => {
    const mostrar = publicaciones.find(
      (publicacion) => publicacion.id === postId
    );
    if (mostrar.mostrar_comentarios)
      return <Comentarios comentarios={mostrar.comentarios} />;
    return <></>;
  };

  const ponerPublicaciones = () => {
    if (publicacionesLoading) return <Loader></Loader>;
    if (publicacionesError) return <Fatal error={publicacionesError}></Fatal>;
    return publicaciones.map((publicacion) => (
      <div
        onClick={async () => {
          togleComentarios(publicacion.id);
        }}
        className="pub-title"
        key={publicacion.id}
      >
        <h2>{publicacion.title}</h2>
        <p>{publicacion.body}</p>
        {ponerComentarios(publicacion.id)}
      </div>
    ));
  };

  return (
    <div>
      {ponerUsuario()}
      {ponerPublicaciones()}
      {}
    </div>
  );
};

export default Publicaciones;
