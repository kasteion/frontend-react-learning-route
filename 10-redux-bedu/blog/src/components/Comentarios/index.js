import React from "react";

const Comentarios = ({ comentarios }) => {
  return (
    <div>
      <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id}>
            <h3>{comentario.name}</h3>
            <h4>{comentario.email}</h4>
            <p>{comentario.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comentarios;
