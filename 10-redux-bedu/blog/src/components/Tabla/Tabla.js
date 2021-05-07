import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./tabla.css";

const Tabla = () => {
  const { usuarios } = useSelector((state) => state.usuariosReducer);
  return (
    <>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Enlace</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((usuario) => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.website}</td>
                <td>
                  <Link
                    to={`/publicaciones/${usuario.id}`}
                    className="user-link"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Tabla;
