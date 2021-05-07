import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Usuarios from "./Users/Users";
import Tareas from "./Tareas/Tareas";
import Menu from "./Menu";
import Publicaciones from "./Publicaciones/Publicaciones";
import TareasGuardar from "./Tareas/Guardar";

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <div className="margen">
        <Route exact path="/" component={Usuarios} />
        <Route exact path="/tareas" component={Tareas} />
        <Route exact path="/publicaciones/:key" component={Publicaciones} />
        <Route exact path="/tareas/guardar" component={TareasGuardar} />
        <Route
          exact
          path="/tareas/guardar/:usu_id/:tar_id"
          component={TareasGuardar}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
