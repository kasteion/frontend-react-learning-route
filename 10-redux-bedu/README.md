# Repaso React

## ¿Qué es React y cómo funciona?

React es una librearía, es un conjunto de archivos o una herramienta que nos facilita mucho realizar una tarea. Y React, la tarea que nos facilita es la de crear interfaces. También React se basa en componentes, que creamos una sola vez y los reutilizamos.

**Alta demanda**

Es una librearía, con peso ligero y rendimiento muy alto. Además los creadores (facebook) siempre le dan mantenimiento constante.

**JSX**

Es la sintaxis con la que escribimos código dentro de React, es como una fusión entre html y javascript. Nos permite usar etiquetas de html dentro de JavaScript.

**ES6**

Cuando se libero React en 2015 también se liberó la versión de javascript conocida como ES6.

**Como funciona React**

React utiliza un virtual DOM. Nosotros tenemos el Browser DOM y el Virtual DOM como una copia. Y al utilizar JSX ya sabemos que cambio en el virtual DOM. Se actualiza el componente en el Virtual DOM y React ya sabe que corresponde cambiar en el Browser DOM.

## Creación de la app con React

> node -v
>
> npx create-react-app blog

Elíminamos dentro de src los archivos App.css, App.test.js, logo y serviceWorker.js

Creamos una nueva carpeta llamada components y movemos el App dentro de components.

## Ciclo de vida de React

Hay 4 fases por las que un componente pasa:

1. **Initialization**: Setup props and state.
2. **Mounting**:
   - componentWillMount()
   - render()
   - componentDidMount()
3. **Updation**
   - props
     - componentWillReceiveProps()
     - shoudComponentUpdate()
     - componentWillUpdate()
     - render()
     - componentDidUpdate()
   - states
     - shoudComponentUpdate()
     - componentWillUpdate()
     - render()
     - componentDidUpdate()
4. **Unmounting**
   - componentWillUnmount()

## Manejando promesas

> npm install axios

## React Router DOM

> npm install react-router-dom

# Introducción a Redux,

## ¿Qué es Redux, cuándo usarlo y por qué?

Redux es una herramienta de uso libre que nos deja almacenar todo nuestro estado de una aplicación en un solo lugar.

**Principios**

- Almacenamiento: Es para utilizarlo en los estados, que los estados se estén almacenando en un solo lugar.
- Inmutable: Los estados son inmutables... es decir siempre se están creando nuevos estados y nunca se sobreescriben.
- Centralizado: Todo nuestro estado se almacena en un solo lugar.

Sin Redux... los componentes algunos pueden tener estado, otros no. Pero si queremos compartir los estados tenemos que estarlos pasando de un componente a otro.

Con Redux almacenamos el estado en un solo lugar y todos los componentes compartene ese estado.

**Cuando utilizar Redux**

No todas las aplicaciones tienen que tener Redux. Se recomienda utilizar en aplicaciones grandes, en donde el flujo de la información tenga que compartirse por muchos componentes diferentes.

Redux también se utiliza para compartir información. Por ejemplo en un login, si la información del usuario debe utilizarse en muchos componentes entonces es mejor compartirla en React.

Es para manejar información y no formatos.

# Fases de Redux

## Introducción: a las fases de Redux

Los cuatro pilares que tiene Redux:

- **Store**: Almacenamiento. Aquí se almacena todo lo que necesitamos.
- **Reducers**: Son los estados. Depediendo del componente es la información que vamos a tener.
- **Action Creators**: Son las funciones. Las funciones que debemos ejecutar para pedir información, normalmente promesas.
- **Componente**: Es nuestró código JSX.

1. El componente se comunica con el Action Creator.
2. Y el Action Creator se va al reducer y le da la información que necesita.
3. El reducer le da al componente el nuevo estado.

Y el corazón de redux es el almacenamiento.

## Store

Vamos a comenazar a configurar nuestro ambiente para utilizar redux y utilizar un solo almacenamiento global.

> npm install redux react-redux

Luego de esto en el index.js

```javascript
// Importo lo necesario para redux

import { createStore } from "redux";
import { Provider } from "react-redux";

// Creo el store

const store = createStore(
  {}, // Todos los reducers
  {} // Estado inicial
);
```

El store tiene las siguientes responsabilidades:

- Contiene el estado de la aplicación.
- Permite el acceso al estado vía getState()
- Permite que el estado sea actualizado vía dispatch(action)
- Registra los listeners vía subscribe(listener)
- Maneja la anulación del registro de los listeners vía al retorno de la función de subscribe(listener)

## Reducers

1. Creamos la carpeta src/reducers/
2. Creamos el archivo src/reducers/index.js

En el index de reducers vamos a combinar todos los reducers para pasarselos a nuestra aplicación.

```javascript
import { combineReducers } from "redux";

export default combineReducers({});
```

Este ya es un reducer validao para pasarle a nuestro store. Entonces ya en el src/index.js podemos cambiar:

```javascript
//...
import reducers from "./reducers";

const store = createStore(reducers, {});

// Y ya le podemos pasar el store al app utilizando Provider store={store}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Ahora podemos crear nuestro primer reducer, llamado usuarios reducers.

```javascript
const INITIAL_STATE = {
  usuarios: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "traer_usuarios":
      return { ...state, usuarios: action.payload };
    default:
      return state;
  }
};
```

Y en el reducers/index.js ya puedo combinar este reducer allí.

```javascript
import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
  usuariosReducer,
});
```

Ahorita solo le dijimos a la aplicación, toma estos son los reducers.

Los Action Creators describen que algo pasó, pero no especifican cómo cambió el estado de la aplicación en respuesta. Esto es trabajo de los reducers.

El Provider es el componente de Redux en el cual encerraremos nuestra aplicación para que puedan comunicarse entre ellos.

## Conexión a un componente

Ahora vamos a asegurarnos de que si se estén reflejando los reducers a nuestro componente.

Vamos a conectar el componente Users... para esto cambiamos:

```javascript
import { connect } from "react-redux";

// resto del código

//El primer parametro que connect debe recibir son todos los reducers que el provider le va a entregar al usuario.

// mapStateToProps recibe todos los reducer y retorna los reducers que me le interesan al componete, en este caso, el componente de usuarios... los reducers de usuarios.
const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, {
  /*Aquí van las acciones...*/
})(Users);
```

## Action Creators

Ya creamos nuestros reducres, conectamos nuestro componente con nuestros reducers...

Falta traer la información, de esto se encargan los action creators.

1. Creamos la carpeta src/actions
2. Creamos el archivo src/actions/usuariosActions.js

```javascript
// Esta es una función que retorna otra función
export const traerTodos = () => {
  return (dispatch) => {
    dispatch({
      type: "traer_usuarios",
      payload: [1, 2, 3],
    });
  };
};
```

Ahora puedo usar estas acciones en el componente Users

```javascript
// ...
import * as usuariosActions from "../../actions/usuariosActions";
// ...
useEffect(() => {
  // const fetchData = async () => {
  //   const response = await getFilas();
  //   setFilas(response);
  // };

  // fetchData();
  props.traerTodos();
}, []);
//...
export default connect(mapStateToProps, usuariosActions)(Usuarios);
```

Da un error porque falta un middleware llamado redux thunk...

## Redux Thunk

> npm install redux-thunk

Luego en el src/index.js

```javascript
//...
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
```

Ahora la llamada al api de usuarios debemos hacerla desde dentro de usuariosActions.js

## Explicación teórica: ciclo completo de Redux

1. Tenemos el componente
2. El componente habla con las acciones, llama a las acciones (this.props.function)
3. Las acciones hablan con el reducer (Las acciones tienen la promesa... y hace el dispatch que modifica el reducer)
4. El reducer habla con el componente: El reducer crea un nuevo estado y este estado nuevo actualiza el JSX.

# Fases Extra

## Archivos Types

Ya tenemos nuestro ciclo de DevOps completo pero que pasa si al momento de ejecutar la acción y llamar al reducer le pongo "trear" en lugar de "traer". Es decir me equivoco en el action type. Falla y no me dice nada de cual es el error.

Creamos una carpeta src/types y un archivo src/types/usuariosTypes.js

```javascript
export const TRAER_TODOS = "traer_usuarios";
```

De esta forma ya puedo importarlo en el reducer y en donde despacho a acción.

```javascript
import { TRAER_TODOS } from "../types/usuariosTypes";
```

## Try Catch

Ahora tenemos nuestro archivo de actions así:

```javascript
import axios from "axios";
import { TRAER_TODOS } from "../types/usuariosTypes";

export const traerTodos = async (dispatch) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  dispatch({
    type: TRAER_TODOS,
    payload: response.data,
  });
};
```

Pero puede ser que al llamar al url tengamos un error en el get... entonces hay que ponerle un try y un catch:

```javascript
import axios from "axios";
import { TRAER_TODOS } from "../types/usuariosTypes";

export const traerTodos = async (dispatch) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: response.data,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
```

## Escenarios Asíncronos

La llamada al URL toma ciertos tiempo y esto debemos manejarlo también, el loading de usuarios y eso.

Entonces el userTypes quedaría algo como:

```javascript
export const TRAER_TODOS = "traer_usuarios";
export const CARGANDO = "cargando";
export const ERROR = "error";
```

Y en el reducer

```javascript
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosTypes";

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
    default:
      return state;
  }
};

export default usuariosReducer;
```

Y Usuarios actions

```javascript
import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosTypes";

export const traerTodos = async (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: true,
  });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: TRAER_TODOS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: err.message,
    });
  }
};
```

Y así ya estamos manejando los 3 estados que puede llegar a tener una llamada asíncrona:

1. Cargando
2. Éxito
3. Error

## Componente Spinner

https://loading.io/css

Creamos un componente Loader para cuando esta cargando la info.

## Componente Fatal

Creamos un componente Fatal para cuando hay un error.

## Tabla como componente

Creamos un componente Tabla que solo muestra una tabla...

# Compartir información en Redux

## Introducción Compartir información en Redux

Conceptos avanzados como compartir reducres, crear multiples reducres, inmutabilidad etc.

Vamos a crear un nuevo reducer para toda la info, vamos a crear dinamicamente nueva información a un reducer ya existente.

## Parámetros por URL

https://cssicon.space/#/

FontAwesome

React Icons esta mejor

https://react-icons.github.io/react-icons/

## Compartir Reducer

## Múltiples Reducers

Aquí creamos el publicacionesReducer.js que sería algo así:

```javascript
const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: "",
};

const publicacionesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default publicacionesReducer;
```

El reducers/index.js quedaría algo así:

```javascript
import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import publicacionesReducer from "./publicacionesReducer";

export default combineReducers({
  usuariosReducer,
  publicacionesReducer,
});
```

Y el componente publicaciones quedaría algo así (Como clase):

```javascript
import React, { Component } from "react";
import { connect } from "react-redux";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerTodos: publicacionesTraerTodos } = publicacionesActions;

class Publicaciones extends Component {
  componentDidMount() {
    if (!this.props.usuariosReducer.usuarios.length) {
      this.props.usuariosTraerTodos();
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Publicaciones de</h1>
        {this.props.match.params.key}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
```

Creamos también el archivo publicacionesActions.js

```javascript
import axios from "axios";

export const traerTodos = () => async (dispatch) => {
  const respuesta = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  dispatch({
    type: "traer_todos",
    payload: respuesta.data,
  });
};
```

## Llamando a múltiples reducers en una acción

Publicaciones reducers queda así:

```javascript
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/publicacionesTypes";

const INITIAL_STATE = {
  publicaciones: [],
  cargando: false,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODOS:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: "",
      };

    case CARGANDO:
      return { ...state, cargando: true };

    case ERROR:
      return { ...state, error: action.payload, cargando: false };

    default:
      return state;
  }
};
```

Hay que cambiar los types porque Redux le manda a todos los reducers que tenga en type que queremos....

```javascript
export const TRAER_TODOS = "usuarios_traer_todos";
export const CARGANDO = "usuarios_cargando";
export const ERROR = "usuarios_error";
```

```javascript
export const TRAER_TODOS = "publicaciones_traer_todos";
export const CARGANDO = "publicaciones_cargando";
export const ERROR = "publicaciones_error";
```

# Métodos HTTP

## Introducción a los métodos HTTP

La otra parte del proyecto son las tareas, y se pretende ver todo lo que tiene que ver con altas, bajas, cambios, etc. Todos los métodos HTTP para hacer esto.

## Nuevo ciclo Redux

Vamos a crear todo el ciclo de redux para las tareas

## Normalizar datos

## Mapear Objetos

## Componente para agregar tarea

## Manejar inputs con Reducer

## POST

## Deshabilitando botón

## Redireccionar

## Reutilizar componentes

## PUT

## delete

## Últimos detalles

# Conclusión

## Conocimientos adquiridos

```

```
