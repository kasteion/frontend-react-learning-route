# Curso Profesional de React Hooks

## ¿Qué son los React Hooks y cómo cambian el desarrollo con React?

Es una caracteristica de React que salio en la versión 16.8 en febrero 2019. Pero habían sido presentados con anterioridad en la React Conf. Son una alternativa para trabajar con React. Complementan el desarrollo, son opcionales pero vienen a cambiar el desarrollo web con React.js

Resuelven ciertos problemas del desarrollo con React. Por ejemplo que los componenetes eran algo complejos y no era facil compartir la lógica de estado entre los mismo. Existía un component hell. Con los hooks esto ya no es un problema.

Las clases también eran un problema, pues confunden a las personas y a las máquinas. Es más amigable y fácil de aprender a desarrollar con Hooks.

Un Hook es una función especial que nos permiten conectarnos con caracteristicas de React. Para poder trabajar metodos especiales como useState, useEffect, etc. Los hooks se pueden implementar en cualquier proyecto sin problema.

> npx create-react-app react-hooks
>
> cd react-hooks
>
> npm run start

# Introducción a React Hooks

## useState: estado en componentes creados como funciones

Este hook nos ayuda a manejar el estado en componentes creados como funciones.

> mkdir src/components
>
> touch Header.jsx

## useEffect: olvida el ciclo de vida, ahora piensa en efectos

Con useEffect nos olvidamos del ciclo de vida y empezamos a pensar en efectos. Nos permite manejar efectos que van a ser transmitidos dentro de nuestros componentes.

Podemos llamar a una API, traer la información que nos da y presentarla en nuestro componente.

> touch component/Characters.jsx;

## useContext: la fusión de React Hooks y React Context

Use context soluciona el paso de información entre componentes, tener que pasar por props la información y el solo poder pasar información de padre a hijo.

> mkdir src/context
>
> touch src/context/ThemeContext.js

```javascript
import React from "react";

const ThemeContext = React.createContext(null);

export default ThemeContext;
```

Y en el index.js debo importar ThemeContext y envolver la App en el Context provider

```javascript
...
import ThemeContext from "./context/ThemeContext";
...
<ThemeContext.Provider value="blue">
    <App />
</ThemeContext.Provider>
```

Y en Header.jsx puedo utilizar useContext para traer el contexto...

```javascript
import React, { useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
...
const color = useContext(ThemeContext);
...
<h1 style={{ color }}>ReactHooks</h1>
```

## useReducer: como useState, pero más escalable

useReducer implementa una forma más amigable y llena de caracteristicas para trabajar con el estado. Es un poco como Redux ya que tendremos un estado inicial, un reducer y un dispatch para enviar la información.

En el componente Characters.jsx

```javascript
import { useState, useEffect, useReducer } from "react";
...
// Creamos un initialState y un Reducer
const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

...
// Lo conectamos
const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

// Y hacemos un dispatch...
const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
};
```

## ¿Qué es memoization? Técnicas de optimización en programación funcional

La memoria en JavaScript no es infinita, existe un máximo de funciones y cálculos que podemos hacer. Incluso si no la usamos toda, gastarla excesivamente causará que nuestras aplicaciones corran lento, con mucho lag o sencillamente brinden una muy mala experiencia a los usuarios.

Nuestro código puede parecer pequeño cuando utilizamos técnicas de programación funcional como currying y recursividad. Pero no te dejes engañar. Así estemos llamando a la misma función genera nuevos "bloques" en la pila de ejecuciones que debe hacer JavaScript. Esto afecta a la memoria de JavaScript y puede estropear nuestra aplicación.

La buena noticia es que muy seguramente no tienes de qué preocuparte. Este "problema" no será realmente un problema a menos que construyas aplicaciones muy, muy grandes (por ejemplo, videojuegos en el navegador) donde la optimización de memoria es vital.

¡Pero tampoco te relajes! Tu responsabilidad como desarrollador web profesional es siempre prepararte para resolver cualquier problema de programación, incluso si require técnicas "avanzadas" de optimización para que nuestro programa funcione a la perfección y para todos nuestros usuarios.

La memoizaciión es una técnica muy útil para evitar cálculos innecesarios en nuestro código. Guardamos el resultado de nuestros cálculos cada vez que los hacemos para no tener que repetirlos en el futuro. En otras palabras, estamos ahorrando grandes cantidades de tiempo a cambio de "mucho" espacio de almacenamiento.

**Ejemplo Factorial**

```javascript
const memo = [];

function memoFactorial(n) {
  if (n === 1) {
    return 1;
  } else if (!memo[n]) {
    memo[n] = n * memoFactorial(n - 1);
  }
  return memo[n];
}
```

**Ejemplo Fibonacci**

```javascript
const memo = [];

function memoFibonacci(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else if (!memo[n]) {
    memo[n] = memoFibonacci(n - 1) + memoFibonacci(n - 2);
  }
  return memo[n];
}
```

## useMemo: evita cálculos innecesarios en componentes

useMemo nos permite dentro de la lógica de nuestros componentes evitar cálculos innecesarios aplicando memoization.

En Characters.jsx

```javascript
// Importing useMemo
import { useState, useEffect, useReducer, useMemo } from "react";

// Setting a search State
const [search, setSearch] = useState("");

// An arrow function to handle our Search
const handleSearch = (event) => {
  setSearch(event.target.value);
};

// Here we use the hook
const filteredUsers = useMemo(() =>
  characters.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )
);

// Inside the return
<div className="Search">
  <input type="text" value={search} onChange={handleSearch}></input>
</div>;
{
  filteredUsers.map((character) => {
    return (
      <div key={character.id}>
        <h2>{character.name}</h2>
        <button
          type="button"
          onClick={() => {
            handleClick(character);
          }}
        >
          Add to Favorite
        </button>
      </div>
    );
  });
}
```

## useRef: manejo profesional de inputs y formularios

Para manejar mucho mejor como hacemos referencia a nuestros inputs y formularios y manejarlos como todos unos profesionales.

En Characters.jsx

```javascript
import { useState, useEffect, useReducer, useMemo, useRef } from "react";

const searchInput = useRef(null);

const handleSearch = () => {
  setSearch(searchInput.current.value);
};

<div className="Search">
  <input
    type="text"
    value={search}
    ref={searchInput}
    onChange={handleSearch}
  ></input>
</div>;
```

## useCallback: evita cálculos innecesarios en funciones

useCallback es para evitar calculos inecesarios en funciones dentro de las aplicaciones de React.

```javascript
import {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";

const handleSearch = useCallback(() => {
  setSearch(searchInput.current.value);
}, []);

// En lugar de nuestro Search Original
<Search
  search={search}
  searchInput={searchInput}
  handleSearch={handleSearch}
/>;
```

Creamos el componente Search.jsx

```javascript
import React from "react";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
      <input
        type="text"
        value={search}
        ref={searchInput}
        onChange={handleSearch}
      ></input>
    </div>
  );
};

export default Search;
```

## Optimización de componentes en React con React.memo

No existe una sola forma de optimizar componentes, podemos construir nuestros componentes de diferentes formas y mostrar el mismo resultado. Pero podemos afectar el rendimiento en nuestros clientes.

Para optimizar debemos analizar los componentes de nuestro proyecto para mejorar el tiempo que tardamos en ejecutar cierto proceso o identificar procesos que estamos ejecutando en momentos innecesarios y le cuestan trabajo a la aplicación.

Hay dos herramientas oficiales de React para optimizar nuestros componentes. ¿Para qué tipo de optimización podemos usarlas?

**React.memo vs. React.PureComponent**

Vamos a evitar renders innecesarios causados por un mal manejo de props.

**¿Cómo funciona PureComponent?**

PureComponent es una clase de React muy parecida a la clase Component, pero su metodo shouldComponentUpdate compara las props viejas con las nuevas para determinar si el componente se debe actualizar. Esta comparación se llama Shallow Comparison.

**Cuándo debo usar React.PureComponent?**

Tenemos tres componentes, el componente padre App.js:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: 1, canEdit: true };
  }

  render() {
    console.log("Render App");

    const toggleCanEdit = () => {
      console.log("Click al botón de toggleCanEdit");
      this.setState(({ canEdit: oldCanEdit }) => {
        return { canEdit: !oldCanEdit };
      });
    };

    const countPlusPlus = () => {
      console.log("Click al botón de counter");
      this.setState((prevState) => {
        return { count: prevState.count + 1 };
      });
    };

    return (
      <>
        <button onClick={countPlusPlus}>Counter +1</button>
        <Counter count={this.state.count} />

        <button onClick={toggleCanEdit}>Toggle Can Edit</button>
        <Permissions canEdit={this.state.canEdit} />
      </>
    );
  }
}
```

El componente hijo (counter):

```javascript
class Counter extends React.Component {
  render() {
    console.log("Render Counter");
    const { count } = this.props;

    return (
      <form>
        <p>Counter: {count}</p>
      </form>
    );
  }
}
```

Otro componente hijo (Permissions):

```javascript
class Permissions extends React.Component {
  render() {
    console.log("Render Permissions");
    const { canEdit } = this.props;

    return (
      <form>
        <p>El usuario {canEdit ? "" : "no"} tiene permisos de editar...</p>
      </form>
    );
  }
}
```

Al dar click en cualquier botón, todos los componentes se vuelven a renderizar. A pesar de que la porp canEdit no tienen conexión con el componente Counter, ni la prop count con el componente Permissions, pero aún así, si cualquiera de las dos cambia los 3 compreonetes se renderizan.

Esto se puede optimizar cambiando React.Componente por React.PureComponent:

```javascript
class App extends React.PureComponent {
  /* … */
}
class Counter extends React.PureComponent {
  /* … */
}
class Permissions extends React.PureComponent {
  /* … */
}
```

**¿Cómo funciona y cuándo debo usar React.memo?**

Si useEffect es el "remplazo" del ciclo de vida en componentes funcionales de react, React.memo es el "remplazo" de PureComponent.

Convirtamos la aplicación a funciones:

```javascript
const App = function () {
  console.log("Render App");

  const [count, setCount] = React.useState(1);
  const [canEdit, setCanEdit] = React.useState(true);

  const countPlusPlus = () => {
    console.log("Click al botón de counter");
    setCount(count + 1);
  };

  const toggleCanEdit = () => {
    console.log("Click al botón de toggleCanEdit");
    setCanEdit(!canEdit);
  };

  return (
    <>
      <button onClick={countPlusPlus}>Counter +1</button>
      <Counter count={count} />

      <button onClick={toggleCanEdit}>Toggle Can Edit</button>
      <Permissions canEdit={canEdit} />
    </>
  );
};

const Permissions = function ({ canEdit }) {
  console.log("Render Permissions");

  return (
    <form>
      <p>Can Edit es {canEdit ? "verdadero" : "falso"}</p>
    </form>
  );
};

const Counter = function ({ count }) {
  console.log("Render Counter");

  return (
    <form>
      <p>Counter: {count}</p>
    </form>
  );
};
```

El resultado será el mismo que anteriormente, cualquier botón renderiza los 3 componentes. Pero podríamos utilizar React.memo así:

```javascript
const App = React.memo(function () {
  /* … */
});

const Permissions = React.memo(function ({ canEdit }) {
  /* … */
});

const Counter = React.memo(function ({ count }) {
  /* … */
});
```

**¿Cómo crear una comparación personalizada con React.memo o shouldComponentUpdate?**

En algunos casos puede que no necesitemos shallow comparison, sino una comparación personalizada. En este caso tendríamos que modificar el metodo shouldComponenteUpdate o mandarle un segundo parametro al React.memo.

En esta comparación si nuestro componente no debe renderizarse más veces y solo necesita la primera versión de las props para renderizarse:

```javascript
// Con clases
class Permissions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    /* … */
  }
}

// Con hooks
function memoStopIfPropsAreEqualOrNot(oldProps, newProps) {
  return true;
}

const Permissions = React.memo(function ({ canEdit }) {
  /* … */
}, memoStopIfPropsAreEqualOrNot);
```

En el caso anterior nuestro componente no vuelve a renderizar, pero que tal si debemos renderizar solo cuando alguna de nuestras props cambia:

```javascript
// Con clases
class Permissions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.input.value !== nextProps.input.value) {
      return true;
    } else {
      return false;
    }
  }
}

// Con hooks
function memoIsInputEqual(oldProps, newProps) {
  if (oldProps.input.value !== newProps.input.value) {
    return false;
  } else {
    return true;
  }
}

const Permissions = React.memo(function ({ canEdit }) {
  /* … */
}, memoIsInputEqual);
```

La función shouldComponentUpdate debe devolver true si queremos que nuestro componetne se vuelva a renderizar. En cambio, la función de evaluación de React.memo debe devolver false si nuestras props son diferentes y queremos permitir un nuevo render.

## Custom hooks: abstracción en la lógica de tus componentes

Podemos crear nuestros propios hooks personalizados para separar lógica y reutilizarla dentro de cualquier componente.

Vamos a separar el useEffect a un custom hook. Creamos una carpeta llamada hooks. Y creamos un nuevo archivo archivo llamado useCharacters.js

```javascript
import { useState, useEffect } from "react";

const useCharacters = (url) => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, [url]);
  return characters;
};

export default useCharacters;
```

Y en Characters.jsx

```javascript
import { useState, useReducer, useMemo, useRef, useCallback } from "react";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const API = "https://rickandmortyapi.com/api/character/";
// ...
const characters = useCharacters(API);
```

## Third Party Custom Hooks de Redux y React Router

Los React Hooks cambiaron tanto la forma de hacer nuestro código para crear aplicaciones que otras herramientas también han creado sus propios custom hooks, de forma que podemos usarlos para que nuestro código sea más legible y fácil de mantener.

**React Redux**

Seguramente conoces react-redux, aquí podrás encontrar dos custom hooks que son muy útiles al momento de usar esta biblioteca: useSelector y useDispatcher. Estos los encontrarás a partir de la versión 7.1.0 de la biblioteca y a continuación te explicaré para qué sirven:

- useSelector: Nos permite elegir de qué contenido en nuestro estado queremos leer información para usarla en nuestro componente.

```javascript
//Primero debemos importar el hook desde react-redux
import { useSelector } from "react-redux";

// El hook recibe una función y aquí indicamos qué parte del estado queremos
const myProperty = useSelector((state) => state.myProperty);
```

- useDispatcher: nos permite ejecutar las acciones hacia nuestro estado.

```javascript
// importamos el hook
import { useDispatcher } from "react-redux";

// Creamos una variable donde vivirá nuestro dispatcher
const dispatcher = useDispatcher();

// Ahora solo debemos pasarle la información de la acción que se ejecutará en nuestro reducer
dispatcher({ type: actionType, payload });
```

Seguir este tutorial:

https://platzi.com/tutoriales/2118-react-hooks/10726-redux-es-facil-si-usas-los-hooks-2/

**React Router**

React Router también contiene diferentes custom hooks para acceder a varias funcionalidades e información de la navegación del usuario en nuestra aplicación.

- useHistory: nos permite acceder a los métodos de navegación para movernos a través de ella de la forma que lo veamos más conveniente. Por ejemplo:

```javascript
import { useHistory } from "react-router-dom";
let history = useHistory();
history.push("/home");
```

- useLocation: nos permite acceder a la información de la URL actual en la que se encuentran nuestros usuarios.

```javascript
import { useLocation } from "react-router-dom";
let location = useLocation();
console.log(location.pathname);
```

- useParams: nos permite acceder a un objeto con la información de los parámetros que tendremos en la ruta que estamos navegando, por ejemplo, el slug de un blogpost.

```javascript
import { useParams } from "react-router-dom";
let { slug } = useParams();
console.log(slug);
```

- useRouteMatch: funciona al igual que los componentes `<Route>`, pero este hook también nor permitirá saber si existe algún match adicional que podremos usar para mostrar o no otra información en la misma vista.

```javascript
import { useRouteMatch } from "react-router-dom";
let match = useRouteMatch("/blog/:slug");
return (
  <div>
    <h1>Hello World</h1>
    {match && <p>Route matches</p>}
  </div>
);
```

# Configura un entorno de desarrollo profesional

## Proyecto: análisis y retos de Platzi Conf Store

> mkdir platzi-conf-merch
>
> cd platzi-conf-merch
>
> git init
>
> npm init -y
>
> npm install react react-dom

Crear la carpeta de components... y dentro App.jsx
Crear el archivo src/index.js
Crear el archivo public/index.html

## Instalación de Webpack y Babel: presets, plugins y loaders

> npm install --save-dev webpack webpack-cli webpack-dev-server
>
> npm install --save-dev html-webpack-plugin html-loader
>
> npm install --save-dev babel-loader @babel/preset-env @babel/preset-react @babel/core

## Configuración de Webpack 5 y webpack-dev-server

Creamos en la raiz del proyecto el archivo... webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Cual es el entrypoint de mi aplicación
  entry: "./src/index.js",
  // Hacia donde exporta nuestro proyecto (A la carpeta dist)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // Que extensiones voy a buscar
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3005,
  },
};
```

Creamos un archivo llamado .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Y agregamos unos scripts al package.json

```json
"scripts": {
  "start": "webpack serve",
  "build": "webpack --mode production"
}
```

## Configuración de Webpack 5 con loaders y estilos

> npm install --save-dev css-loader mini-css-extract-plugin

Y editamos el webpack.config.js

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module: {
  // Agregamos una regla
  rules: [
    ...,
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        "css-loader"
      ]
    }
  ]
},
// Agregamos un plugin
plugins: [
  ...,
  new MiniCssExtractPlugin({
    filename: "assets/[name].css",
  })
]
```

Ahora creamos una carpeta src/styles/components y creamos ./src/styles/components/app.css

```css
h1 {
  font-size: 48px;
  color: blue;
}
```

Y ahora ya podemos importar en App.jsx

```javascript
import "../styles/components/app.css";
```

Y ahora podemos ejecutar:

> npm run start

## Loaders de Webpack para Preprocesadores CSS

**Configuración de tu proyectos con Sass**

Primero debemos de instalar las dependencias necesarias para darle soporte a Sass dentro de nuestro proyecto:

> npm install --save-dev sass-loader node-sass

Una vez agregadas las dependencias necesarias, debemos agregar una nueva regla a la configuración de Webpack en la parte de rules

```javascript
{
  test: /\.scss$/,
  loader: [
    MiniCSSExtractPlugin.loader,
    "css-loader",
    "sass-loader",
  ]
}
```

Ahora se pueden agregar archivos Sass a cada componente y se tendrá el mismo resultado que configurar directamente CSS.

**Configuración de tu proyecto con Less**

Para darle soporte a Less dentro del proyecto debemos repetir los pasos anteriores pero con la configuración apropiada para utilizar Less.

> npm install --save-dev less less-loader

Agregar la configuración de Less a Webpck:

```javascript
{
  test: /\less$/,
  loader: [
    MiniCSSExtractPlugin.loader,
    "css-loader",
    "less-loader"
  ]
}
```

**Configuración de tu proyecto con Stylus**

Siguiendo el ejemplo de las configuraciones previas para Sass y Less vamos a repetir los pasos para agregar soporte a Stylus.

> npm install --save-dev stylus stylus-loader

Ahora agregamos la configuración de Stylus a Webpack:

```javascript
{
  test: /\.styl$/,
  loader: [
    MiniCSSExtractPlugin.loader,
    "css-loader",
    "stylus-loader"
  ]
}
```

## Flujo de desarrollo seguro y consistente con ESLint y Prettier

> npm install -g eslint
>
> npm install --save-dev eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

Creamos el archivo .eslintrc

```json
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "react/prop-types": 0,
    "no-underscore-dangle": 0,
    "import/imports-first": ["error", "absolute-first"],
    "import/newline-after-import": "error"
  },
  "globals": {
    "window": true,
    "document": true,
    "localStorage": true,
    "FormData": true,
    "FileReader": true,
    "Blob": true,
    "navigator": true
  },
  "parser": "babel-eslint"
}
```

> npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier

Creamos el archivo .prettierc

```json
{
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": true
}
```

Y ahora agregamos unos scripts al package.json

```json
"scripts": {
  "format": "prettier --write '{*.js, src/**/*.{js,jsx}}'",
  "lint": "eslint src/ --fix"
}
```

## Git Hooks con Husky

Para garantizar que se corren pruebas pertinentes en nuestro código y de esta forma no enviar un bug o inconsistencias al repositorio del proyecto.

> npm install --save-dev husky

Para integrar Husky a nuestro proyecto y garantizar que cada commit cumple con el estándar deseado debemos de agregar la integración dentro de nuestro archivo package.json

```json
"husky": {
  "hooks": {
    "pre-commit": "npm test",
    "pre-push": "npm test",
    "...": "..."
  }
}
```

Una vez agregada la configuración podemos estár seguros de que antes de agregar cada commit se ejecutarán estos hooks, los cuales validarán que las pruebas necesarias que agreguemos a nuestro proyecto tengan un resultado positivo

Si existe un error o las pruebas que incorporamos al proyecto no funcionan, en la consola podremos ver el resultado mostrando el error por el cual no se puede enviar el commit a nuestro repositorio.

# Estructura y creación de componentes para Platzi Conf Store

## Arquitectura de vistas y componentes con React Router DOM

Creamos una carpeta "src/containers" que tendrá nuestras vistas.

Creamos una carpeta "src/routes" que tendrá el archivo de configuracion de nuestras rutas.

Instalamos react-router-dom

> npm install --save react-router-dom

Creamos el archivo de configuración en src/routes/App.jsx

Vamos a tener una tienda con un home, checkout, información de nuestros datos y dirección, pagos, si el pago es exitoso vamos a success.

```javascript
import React from "react";

import { BrowserRouter, Switch, Router, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/checkout/information" component={Information} />
        <Route exact path="/checkout/payment" component={Payment} />
        <Route exact path="/checkout/success" component={Success} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
```

Ahora creamos en la carpeta Containers el container de Home, Checkout, Information, Payment, Success, NotFound... todos jsx.

Aqui para que esto funcione bien es necesario agregar una configuración a webpack.config.js

```javascript
//El output tiene que quedar con publicPath
output: {
  path: path.resolve(__dirname, "dist"),
  filename: "bundle.js",
  publicPath: "/"
}
//...
// Y en dev server agregar historyApiFallback
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  historyApiFallback: true,
  port: 3005
}
```

## Maquetación y estilos del home

## Maquetación y estilos de la lista de productos

## Maquetación y estilos del formulario de checkout

## Maquetación y estilos de la información del usuario

## Maquetación y estilos del flujo de pago

## Integración de íconos y conexión con React Router

# Integración de React Hooks en Platzi Conf Merch

## Creando nuestro primer custom hook

Creamos el directorio src/context y creamos el archivo AppContext.js

```javascript
import React from "react";

const AppContext = React.createContext({});

export default AppContext;
```

Ahora hagamos nuestro primer custom hook para la aplicación. Creamos un folder llamado src/hooks y un archivo llamado useInitialState.js

```javascript
import { useState } from "react";
import initialState from "../initialState";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((item) => item.id !== payload.id),
    });
  };

  return {
    addToCart,
    removeFromCart,
    state,
  };
};

export default useInitialState;
```

Ahora lo conectamos a nuestra aplicación desde src/routes/App.jsx

```javascript
// ...
import AppContext from "../context/AppContext";
import useInitialState from "../hooks/useInitialState";

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      {
        //... Resto de las rutas de la applicación...
      }
    </AppContext.Provider>
  );
};
```

## Implementando useContext en Platzi Conf Merch

Ahora debemos identificar los componentes que vamos a conectar a nuestro contexto, por ejemplo components/Products.jsx

```javascript
import React, { useContext } from "react";
import AppContext from "../context/AppContext";

const Products = () => {
  const { state, addToCart } = useContext(AppContext);
  const { products } = state;

  const handleAddToCart = (product) => () => {
    addToCart(product);
  };

  return (
    <div className="Products">
      <div className="Products-items">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
```

Y ahora en Product.jsx cambiamos el código del boton.

```javascript
//...
<button type="button" onClick={handleAddToCart(product)}>
  Comprar
</button>
```

Ahora podemos enlazar el context al Header para mostrar que productos están en el carrito. Cambiando componets/Header.jsx

```javascript
import React, { useContext } from "react";
import AppContext from "../context/AppContext";

//...

const Header = () => {
  const { state } = useContext(AppContext);
  const { cart } = state;
  return (
    <div classname="Header">
      {
        // ...
      }
      <div classname="Header-checkout">
        {cart.length > 0 && <div className="Header-alert">{cart.length}</div>}
      </div>
    </div>
  );
};
```

## useContext en la página de checkout

Ahora podemos enlazar el container/Checkout.jsx

```javascript
import React, { useContext } from "react";
//...
import AppContext from "../context/AppContext";

const Checkout = () => {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemoveFromCart = product => () => {
    removeFromCart(product);
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Checkout">
      <h3>{cart.length > 0 ? "Lista de pedidos:" : "Sin pedidos..."}</h3>
      {cart.map((item) => (
        <div>
          <h4>{item.title}</h4>
          <span>${item.price}</span>
        </div>
        <button type="button" onClick={handleRemoveFromCart(item)}>
          <i classname="fas fa-trash-alt" />
        </button>
      ))}

      { cart.length > 0 && (
        <div className="Checkout-sidebar">
        </div>
      )}
    </div>
  );
};
```

## useRef en la página de checkout

useRef sería para el manejo de formularios... digamos en el containers/Informations.jsx hay que agreagar useRef, useContext...

```javascript
import React, { useRef, useContext } from "react";
//...
import AppContext from "../context/AppContext";

const Information = () => {
  const { state, addToBuyer } = useContext(AppContext);
  const form = useRef(null);

  const { cart } = state;

  const handleSubmit = () => {
    const formData = new FormData(form.current);
    const buyer = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      apto: formData.get("apto"),
      city: formData.get("city"),
      country: formData.get("country"),
      state: formData.get("state"),
      cp: formData.get("cp"),
      phone: formData.get("phone"),
    };
    addToBuyer(buyer);
  };
  return (
    <div>
      <form ref={form}></form>
      <div className="Information-back">
        {/* Hay que cambiar el link de regresar */}
        <Link to="/checkout">Regresar</Link>
      </div>
      {/* Cambiamos el link de pagar por un botton */}
      <div className="Information-next">
        <button type="button" onClick={handleSubmit}>
          Pagar
        </button>
      </div>
      {
        // También hay que hacer la lógica de mostrar los items que estamos pidiendo...
        <div className="Information-sidebar">
          <h3>Pedido:</h3>
          {cart.map((item) => (
            <div>
              <h4>{item.title}</h4>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
```

Y en hooks/useInitialState.js hay que agregar el addToBuyer:

```javascript
const addToBuyer = (payload) => {
  setState({
    ...state,
    buyer: [...state.buyer, payload],
  });
};
```

Y debemos actualizar el initialState para agregar el elemento nuevo (buyer):

initialState.js

```javascript
export default {
  cart: [],
  buyer: [],
  products: [{}],
};
```

## Integrando third party custom hooks en Platzi Conf Merch

Vamos a utilizar History para pasar a la siguiente página, para hacer le pago luego de hacer el handle del Submit.

```javascript
import { Link, useHistory } from "react-router-dom";

const Information = () => {
  const { state, addToBuyer } = useContext(AddContext);
  const form = useRef(null);
  const history = useHistory();

  // Ahora ya podemos utilizarlo en el handleSubmit
  const handleSubmit = () => {
    //...
    addToBuyer(buyer);
    history.push("/checkout/payment");
  };
};
```

https://opensource.guide/es/how-to-contribute/

# configura mapas y pagos con PayPal y Google Maps

## Paso a paso para conectar tu aplicación con la API de PayPal

Para utilizar la API de PayPal para integrar pagos es necesario darse de alta en PayPal Developer. en este sitio podrás encontrar todos los recursos necesarios para empezar a integrar pagos en tus páginas web.

Una vez que te has registrado es necesario seguir los siguientes pasos para crear tu token de desarrollo y poderlo integrar en este proyecto.

**Crear "Sandbox Access Token"**

Dentro de tu cuenta como desarrollador debes dirigirte al apartado "My Apps & Credentials" y en la parte inferior encontrarás el apartado "Express Checkout via Braintree SDK - Sandbox Accounts" donde crearemos nuestro token para la aplicación.

Elegimos el tipo de cuenta que vamos a utilizar (Personal/Business)

Ahora que tenemos nuestro token generado debemos revisar a detalle la expiración, así como el manejo de divisas que vamos a utilizar.

Si no encuentras tu divisa, selecciona "United States Dollar" que serí la divisa por defecto.

Si queremos revisar, actualizar el token o hacer algún cambio podemos regresar a la sección "My Apps & Credentials" para ver los detalles de tu cuenta.

IMPORTANTE: Para efectos de pruebas es necesario tener tu token válido en modo "Sandbox". Si quieres habilitar tu token para tu proyecto en producción solo debes de seguir los mismos pasos pero eligiendo la opción de "Live" y creando una nueva App.

**Crear una app en PayPal para recibir pagos:**

Para habilitar PayPal como un método de pago válido y recibir transacciones en tu proyecto en producción debemos crear una aplicación a la cual estará ligado nuestro token.

Una vez creado este token ligado a tu cuenta principal podrás elegir las características a las cuales podmeos acceder, seleccionamos todas y le damos "save".

Es necesario especificar una URL de retorno cuando la transacción ha sido exitosa, es parte de los requerimientos para este proyecto. Ahora que tienes todos los requisitos tienes tu API token listo para producción.

**Ver mi traslaciones:**

En el apartado de "Sandbox" podrás ver las cuentas creadas, notificaciones, los llamados a la API, el simulador entre otras herramientas que te ayudarán a darle seguimiento a tus pruebas de integración con PayPal.

Para revisar tus llamados y eventos en tu API de producción solo debes de dirigirte al apartado "Live" donde encontrarás la información que estás solicitando para ver qué está pasando con cada evento ocurrido.

**Recomendación**

No olvides pasarte por la documentación para que puedas entender cada particularidad que te ofrece PayPal. Solo estamos utilizando uno de los recursos que nos provee, pero te invito a explorar a detalle la documentación y encontrar nuevas herramientas que se puedan incluir en este proyecto.

## Integración de pagos con la API de PayPal

Como vamos a utilizar el boton de paypal vamos a instalar un paquete con npm:

react-paypal-button?

react-paypal-button-v2 es el de react 17.

> npm install --save react-paypal-button-v2
>
> npm docs react-paypal-button

En el archivo containers/Payment.jsx es donde debemos trabajar:

```javascript
import React, { useContext } from "react";
import { PayPalButton } from "react-paypal-button";
import AppContext from "../context/AppContext";

//...
const Payment = ({ history }) => {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const paypalOptions = {
    clientId: "Aquí va el client id generado de Paypal",
    intent: "capture",
    currency: "USD",
  };

  const buttonStyles = {
    layout: "vertical",
    shape: "rect",
  };

  // Esto hay que enviarlo a una utilería src/utils/

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const handlePaymentSuccess = (data) => {
    // Dejamos esto por aquí para ver que sucede
    console.log(data);
    if (data.status === "COMPLETED") {
      // Aquí debemos crear una nueva orden dentro de nuestro backend...
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      // Esta función va en el Context e Initial State
      addNewOrder(newOrder);
      history.push("/checkout/success");
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {
          // En esta parte iteramos en el cart para mostrar un listado de lo que el cliente esta comprando.
          cart.map((item) => (
            <div className="Payment-item" key={item.title}>
              <div className="Payment-element">
                <h4>{item.title}</h4>
                <span>$ {item.price}</span>
              </div>
            </div>
          ))
        }
        <div className="Payment-button">
          {/* Y aqui ponemos el botón de paypal */}
          <PaypalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            ammount={handleSumTotal()}
            onPaymentStart={() => {
              console.log("Start");
            }}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
          />
          {/*paypalOptions={}
            buttonStyles={}
            amount={}
            onPaymentStart={() => console.log("Start Payment")}
            onPaymentSuccess={data => console.log(data)}
            onPaymentError={error => console.log(error)}
            onPaymentCancel={data => console.log(data)}*/}
        </div>
      </div>
      <div />
    </div>
  );
};
```

En el initialState.js

```javascript
export default {
  cart: [],
  buyer: [],
  // Agregamos orders
  orders: [],
  products: [{}, {}],
};
```

Y en el hook useInitialState.js

```javascript
const addNewOrder = (payload) => {
  setState({
    ...state,
    order: [...state.orders, payload],
  });
};
```

## Completando la integración de pagos con la API de PayPal

Hay una tarjeta que se puede utilizar en todas las aplicaciones como para probar los pagos, es una tarjeta dummy el número es:

Número: 4242 4242 4242 4242
Fecha: 12/24
CSC: 123

**Aparte de dotenv está dotenv-webpack**

> npm install --save-dev dotenv-webpack

Y en el webpack.config.js

```javascript
const Dotenv = require("dotenv-webpack")

module.exports = {
  ...
  plugins: [
    new Dotenv()
  ]
};
```

Y podemos crear un archivo .env

```
CLIENT_ID_PP=aksdjfaksjdfkajsdfkajsdkfjaskdf
```

Y así podemos llamarlas a un archivo config/index.js

```javascript
const config = {
  clientIdPaypal: String(process.env.CLIENT_ID_PP),
};

export default config;
```

## Paso a paso para conectar tu aplicación con la API de Google Maps

Para nuestro pryecto es importante que tengamos acceso a la API de JavaScript de Google Maps.

**Cómo obtener la API de JavaScript de Google Maps**

Los primero es tener una cuenta de Google para usar estos recursos. También es posible que pida validar la cuenta de facturación para hacer uso de este recurso en proyectos.

**Crear cuenta en Google Developers**

Para poder hacer uso de las API de Google debemos de registrarnos en https://developers.google.com para poder tener acceso a la consola administrativa que nos permitirá registrar los servicios que vamos a utilizar.

**Crear las llaves para utilizar la API de JavaScript para Google Maps**

Las llaves que utilizaremos es un identificad único que nos permite autenticarnos con los servicio de Google para poderlos utilizar en nuestros proyectos. En la consola de Google debemos crear un nuevo proyecto:

Una vez creado el proyecto nos movemos a la sección de "APIS & Services" y elegimos la opción de "Enable APIS and Services"

En esta sección nos encontramos con todas las API que Google dispone para habilitar. Utilizaremos el buscador para encontrar la API "Maps JavaScript API".

Seleccionamos la API y nos llevará a la pantalla donde habilitaremos el servicio y donde tambien podemos leer la documentación.

Seleccionamos "Enable" este proceso puede tardar un poco en lo que se habilitan los servicios disponibles para el uso de la API.

Ahora podemos ver la sección de métricas del uso de la API. Habilitar las credenciales para el uso de la API de JavaScript para Google Maps: Una vez habilitada la API podemos ver el menú lateral donde encontraremos la sección "Credentials". Seleccionamos "Create Credentials" y elegimos la opción "API Key".

Esta opción nos creará la API Key que utilizaremos dentro de nuestro proyecto. Cuando se aguegue la integración vamos a ver el código un poco similar a esta forma:

https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap

Documentación:

https://developers.google.com/maps/documentation/javascript/overview

Precios:

https://cloud.google.com/maps-platform/pricing/

## Integración de Google Maps en el mapa de checkout

Debemos instalar un paquete para tener Google Maps en nuestro proyecto.

> npm install --save @react-google-maps/api

Creamos un nuevos componente llamado Map en src/components/Map.jsx

```javascript
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 19.426761,
    lng: -99.1718796,
  };

  return (
    <LoadScript googleMapApiKey="(Aquí va el key de google maps)">
      <GoogleMap mapContainerStyle={mapStyles} zoom={9} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};
```

Ahora, en el container de Success.jsx

```javascript
// Importamos useContext
import React, { useContext } from "react";
// Importamos AppContext
import AppContext from "../context/AppContext";
import Map from "../components/Map";
import "../styles/components/Success.css";

const Success = () => {
  // Utilizamos el Hook
  const { state } = useContext(AppContext);
  const { buyer } = state;

  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer.name}, gracias por tu compra`}</h2>
        <span>Tu pedido llegara en 3 días a tu dirección</span>
        <div className="Success-map">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Success;
```

## Creando un Custom Hook para Google Maps

Esto es un custom hook para convertir de la información de dirección del formulario a un punto de google maps. Vamos a utilizar la API de GeoCode.

https://developers.google.com/maps/documentation/geocoding/overview

https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

Vamos a instalar Axios:

> npm install --save axios

Creamos un archivo en src/hooks/useGoogleAddress.js

```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const useGoogleAddress = (address) => {
  const [map, setMap] = useState({});
  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_API_KEY`;

  useEffect(async () => {
    const response = await axios(API);
    setMap(response.data.results[0].geometry.location);
  }, []);

  return map;
};

export default useGoogleAddress;
```

Ahora volvemos a Success.jsx

```javascript
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
//Importamos el hook
import useGoogleAddress from "../hooks/useGoogleAddress";
import Map from "../components/Map";
import "../styles/components/Success.css";

const Success = () => {
  const { state } = useContext(AppContext);
  const { buyer } = state;
  // Aquí utilizamos el custom Hook
  const location = useGoogleAddress(buyer[0].address);

  return (
    <div className="Success">
      <div className="Success-content">
        <h2>{`${buyer.name}, gracias por tu compra`}</h2>
        <span>Tu pedido llegara en 3 días a tu dirección</span>
        <div className="Success-map">
          {/*Y se lo mandamos al Map*/}
          <Map data={location} />
        </div>
      </div>
    </div>
  );
};

export default Success;
```

Ahora, map tiene que recibir esa data:

```javascript
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Aquí recibimos el data
const Map = ({ data }) => {
  const mapStyles = {
    height: "50vh",
    width: "100%",
  };

  const defaultCenter = {
    // Cambiamos los elementos del default center.
    lat: data.lat,
    lng: data.lng,
  };

  return (
    <LoadScript googleMapApiKey="(Aquí va el key de google maps)">
      <GoogleMap mapContainerStyle={mapStyles} zoom={9} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};
```

Se puede usar esto tambien

Esto para los mapas

https://react-leaflet.js.org/

Esto para el GeoCoding

https://positionstack.com/

# Estrategias de deployment profesional

## Continuous integration y continuous delivery con GitHub Actions

Ahora nuestra applicación sería un MVP... y podríamos llevarlo a producción y podemos utilizar GitHub Actions y Firebase para publicar este proyecto.

1. Creamos un nuevo proyecto en Firebase
2. Una vez creado el proyecto podemos ir a la pestaña de Hosting y podemos decirle Empezar.
3. Necesitaremos instalar firebase tools

> npm install -g firebase-tools
>
> firebase login
>
> firebase init

4. Elegimos la opcion de Hosting
5. What do you want to use as your public directory? dist
6. Configure as a single page app (rewrite all urls to /index.html)? Yes
7. Se up automatic builds and deploys with GitHub? No
8. File dist/index.html already exists. Overwrite? No
9. Ahora debemos enviar a nuestro repositorio.

> git add .
>
> git commit -m "add firebase hosting"
>
> git push origin main

Ahora vamos a usar GitHub Actions For Firebase

https://github.com/marketplace/actions/github-action-for-firebase

Para esto creamos las carpetas en la raíz llamadas .github/workflows y creamos un archivo llamado deploy-to-firebase.yml

```yml
name: Build and Deploy
on: [push]

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@main
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Archive Production Artifact
        uses: actions/upload-artifact@master
        with:
          name: dist
          path: dist
  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@main
      - name: Download Artifact
        uses: actions/download-artifact@master
        with:
          name: dist
          path: dist
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

El token se obtiene con el comando

> firebase login:ci

Ahora debemos ir al repositorio:

1. Settings
2. Secrets
3. Creamos un nuevo Secreto llamado FIREBASE_TOKEN y pegamos el token que nos dio el comando de firebase.
4. Mandamos los cambios nuevamente al repositorio

> git add .
>
> git commit -m "[Add] firebase config"

Una vez subidos estos cambios podemos ver la pestaña de Actions como se desencadena el job.

## Compra del dominio y despliega con Cloudflare

El dominio se puede comprar en namecheap.

Luego en Cloudflare podemos agregar nuestro dominio.

1. Agregamos nuestro domino al panel de cloudflare.
2. Podemos elegir la opción gratuita y continuar.
3. Cloudflare nos da un par de nombres de dominio
4. En NameCheap en NameServers de damos a custom DNS y allí metemos los DNS de cloudflare. Y nos regresamos a Cloudflare.
5. Reescrituras automaticas HTTPS. On
6. Usar Siempre HTTPS. On
7. Minificador automático. Check a todo (Javascript, CSS, Html)
8. Brotli, aplicar compresión. Si
9. Resumen y finalizar.

Ahora podemos configurar el dominio en Firebase Hosting.

1. Le damos a Añadir dominio personalizado. No va a redirigir a ningun sitio web.
2. Debemos verificar que nuestro dominio nos pertenece creando un nuevo registro:

TXT @ y el contenido es un google-site-verification(Y lo que nos de google que allí va)

3. Firebase nos indica que agregemos dos registros de tipo A. Al root @ y con una dirección ip. Agregamos esos dos registros a Cloudflare.

Este proceso de los dominios puede tardarse hasta un día entero pero lo normal es 2 horas.

# Optimización de aplicaciones web con React

## Integración de React Helmet para mejorar el SEO con meta etiquetas

Esto es para configurar el SEO de nuestro sitio, que nos encuentren los robots y los buscadores. Para esto instalamos react-helmet:

> npm install --save react-helmet

Ahora en el containers/Home.jsx

```javascript
import React from "react";
// Importamos React Helmet
import { Helmet } from "react-helmet";
import initialState from "../initialState";
import Products from "../components/Products";

const Home = () => {
  return (
    <>
      <Helmet>
        {/*Aquí podemos agregar meta etiquetas*/}
        <title>Platzi Conf Merch - Productos</title>
      </Helmet>
      <Products products={initialState.products} />
    </>
  );
};

export default Home;
```

Estas serían las meta tags que vamos a estas añadiendo:

```html
<title>Platzi Conf Merch - Productos</title>
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@TU_USER" />
<meta name="twitter:creator" content="@TU_USER" />
<meta name="twitter:title" content="Platzi Conf Store" />
<meta name="twitter:description" content="Platzi Conf Store" />
<meta
  name="twitter:image"
  content="https://s3.amazonaws.com/gndx.dev/gndxdev.png"
/>
<meta property="og:title" content="Platzi Conf Store" />
<meta property="og:description" content="Platzi Conf Store" />
<meta
  property="og:image"
  content="https://s3.amazonaws.com/gndx.dev/gndxdev.png"
/>
<meta property="og:url" content="platzistore.xyz" />
<meta property="og:site_name" content="Platzi Conf Store" />
<meta property="og:locale" content="es_ES" />
<meta property="og:type" content="article" />
<meta property="fb:app_id" content="ID_APP_FACEBOOK" />
```

> git add .
>
> git commit -m "[add] react-helmet"
>
> git push origin main

## Análisis de performance con Google Lighthouse

Ahora nos falta garantizar que nuestro sitio sea bueno, rápido y accesible. Utilizando Lighthouse para calificar nuestro sitio y que nos de una idea de que cosas mejorar.

Al abrir el sitio, Le damos Click Derecho --> Inspect

Allí hay una pestaña que se llama Lighthouse que permite generar un reporte. El reporte se puede generar para Movil y para Desktop.

## Convierte tu aplicación de React en PWA

**Preparemos nuestra aplicación para convertirla en una PWA**

Lo primero que tenemos que crear es nuestro service-worker.js dentro de la carpeta public:

```javascript
const doCache = false;
const CACHE_NAME = 'pwa-cache';
​
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log(`Deleting cache: ${key}`)
            return caches.delete(key);
          }
        }))
      )
  );
});
​
self.addEventListener('install', function (event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          fetch("manifest.json")
            .then(response => {
              response.json()
            })
            .then(assets => {
              const urlsToCache = [
                "/",
                assets["bundle.js"]
              ]
              cache.addAll(urlsToCache)
              console.log('cached');
            })
        })
    );
  }
});
​
self.addEventListener('fetch', function (event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});
```

La configuración previa nos permite registrar nuestra aplicación debidamente. Ahora vamos a crear el archivo de configuración donde podremos agregar el nombre de nuestra aplicación, ícono entre otras características importantes que describen la aplicación.

Crear el archivo manifest.json en la carpeta /public:

```json
{
  "short_name": "Platzi Conf Store",
  "name": "A simple Store",
  "icons": [
    {
      "src": "assets/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "background_color": "#222",
  "theme_color": "#222",
  "display": "standalone"
}
```

Descarga el ícono de REact de la sección de recursos y agrégalo a la carpeta /public.

**Configurando Webpack para copiar los archivos necesarios al compilar el proyecto**

Para continuar con el proceso de la construcción de la PWA es necesario instalar un plugin para webpack que nos ayudará a copiar los archivos de la carpeta /public a la carpeta de nuestro proyecto compilado.

> npm install copy-webpack-plugin --save-dev

Una vez instalado, es necesario agregar la configuración necesaria en el archivo webpack.config.js

Primero importamos copy-webpack-plugin en la parte superior del archivo.

```javascript
const CopyPlugin = require("copy-webpack-plugin");
```

Agregamos la configuración necesaria en la sección de plugins:

```javascript
new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '' },
        { from: 'public/service-worker.js', to: '' },
        { from: 'public/icon.png', to: 'assets' },
      ],
    }),
```

En este caso estamos agregando 3 elementos a la carpeta dist, el primero es nuestro archivo manifest, luego agrega el archivo service-worker.js y al final el archivo icon.png, de esta forma al compilar el proyecto podemos disponer de estos archivos dentro del compilado final.

**Agregar service worker a index.html**

Una de las tareas que tenemos que realizar antes de probar nuestra aplicación es agregar el soporte del service worker al proyecto creando la lógica siguiente dentro de index.html

```html
<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(
          function (registration) {
            console.log(
              "ServiceWorker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("ServiceWorker registration failed: ", err);
          }
        )
        .catch(function (err) {
          console.log(err);
        });
    });
  } else {
    console.log("service worker is not supported");
  }
</script>
```

Ahora debemos de agregar la referencia al archivo manifest.json dentro de la etiqueta head:

```html
<link rel="manifest" href="/manifest.json" />
```

Una vez agregado el script y la referencia la manifest dentro del archivo index.html procedemos a compilar el proyecto:

> npm run build

Cuando termina el proceso podemos revisar la carpeta /dist que ha generado Webpack y revisar que tenemos dentro el archivo manifest.json así como el archivo service-worker.js y dentro de assets el ícono que vamos a utilizar.

Ahora podemos correr el proyecto y comprobar que tenemos el registro del service worker y la información de nuestra aplicación:

> npm run start

Al inspeccionar en la pestaña Console:

`ServiceWorker registration successful with scope:`

Registro del manifest dentro de la aplicación, esto se ve en la pestaña Application.

Ahora se puede instalar en la computadora y aprovechar las ventajas de utilizar una PWA.

# Bonus: trabaja con Strapi CMS para crear tu propia API

## Crea una API con strapi CMS y consúmela con React.js

https://strapi.io/

Es necesario crear un proyecto nuevo:

> npx create-strapi-app platziconf-backend --quickstart

Strapi nos dará una interfaz para crear la api e ir creando nuestros productos. Strapi se puede desplegar en Heroku y en otras herramientas. Strapi trata de correr en el puerto 1337 pero se puede cambiar el puerto si entramos al proyecto y buscamos la carpeta config/server.js

> npm run develop

En Content-Types Builder se puede crear una nueva collection llamada products con title (Text), image (Media), price (Number), iud (uid), description(Rich Text).

En General -> Settings se pueden ver los permisos y roles. Hay dos roles: Authenticated y Public. En Public podemos darle permisos a todos para buscar (find) en nuestra endpoint de products.

Luego pues agregamos algunos productos.

Ahora el initialState.js ya no tendrá productos y quedará algo así.

```javascript
export default {
  cart: [],
  buyer: [],
  orders: [],
};
```

Luego en el hook useInitialState debemos llamar al API.

```javascript
// Vamos a importar useEffect para poner allí la llamada al API.
import { useState, useEffect } from "react";
// Importamos axios porque vamos a hacer una llamada a un api
import axios from "axios";
import initialState from "../initialState";

// El API de strapi
const API = "https://localhost:3006/products";

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  // utilizamos useState para products.
  const [products, setProducts] = useState([]);

  // Aquí esta la llamada al API
  useEffect(async () => {
    const response = await axios(API);
    setProducts(response.data);
  }, []);
  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((item) => item.id !== payload.id),
    });
  };

  const addToBuyer = (payload) => {
    setState({
      ...state,
      buyer: [...state.buyer, payload],
    });
  };

  // Es necesario también retornar products en el state
  return { addToCart, removeFromCart, addToBuyer, state, products };
};

export default useInitialState;
```

En App.jsx será necesario esperar a que el estado se llene...

```javascript
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppContext from "../context/AppContext";
import useInitialState from "../hooks/useInitialState";
import {
  Home,
  Checkout,
  Information,
  Payment,
  Success,
  NotFound,
} from "../containers";
import Layout from "../components/Layout";

const App = () => {
  const initialState = useInitialState();
  // Creamos una variable para saber si el estado esta vacio.
  const isEmpty = Object.keys(initialState.state).length;
  return (
    <>
      {isEmpty > 0 ? (
        <AppContext.Provider value={initialState}>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/checkout" component={Checkout} />
                <Route
                  exact
                  path="/checkout/information"
                  component={Information}
                />
                <Route exact path="/checkout/payment" component={Payment} />
                <Route exact path="/checkout/success" component={Success} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </AppContext.Provider>
      ) : (
        <h1> Cargando... </h1>
      )}
    </>
  );
};

export default App;
```

En Products.jsx

```javascript
// products viene directamente en el AppContext y no hay necesidad de destructurarlo de nuestro state.
const { products, addToCart } = useContext(AppContext);
```

En Product.jsx el image lo debemos llamar desde strapi

```javascript
<img
  src={`http://localhost:3006${product.image[0].url}`}
  alt={product.title}
></img>
```

# ¿Qué sigue en tu carrera profesional?

## Próximos pasos para especializarte en frontend

1.
useEffect nos permite:
Ejecutar acciones como respuesta a un nuevo llamado o render de nuestro componente. Es muy parecido a componentDidMount y componentDidUpdate.
2.
Un ejemplo correcto de cómo usar useState es:
const [state, setState] = React.useState(initialState);
3. Mala
¿Cuál React Hook es más eficiente para "escuchar" los cambios o efectos de nuestro componente cuando también utilizamos useRef?
useEffect
4.
¿Cuáles reglas debes seguir para crear tu propio custom hook?
Empezar el nombre de todos nuestros custom hooks con use.
5.
¿A partir de cuál versión de React.js podemos crear componentes con React Hooks?
A partir de la versión 16.8.
6.
useState nos permite:
Agregar estado a componentes creados como funciones.
7.
¿Qué es memoization?
Una técnica de optimización para evitar que realicemos los mismos cálculos una y otra vez.
8.
useContext nos permite:
Leer y modificar los mismos datos desde componentes en cualquier parte de la aplicación sin necesidad de props.
9.
¿El custom hook getHomeData cumple con las reglas y convenciones de los React Hooks?
Falso
10.
¿Cuál es la diferencia entre useEffect y useLayoutEffect?
useEffect se ejecuta después de que el componente renderizado se "pinte" en pantalla. useLayoutEffect se ejecuta antes del "pintado".
11.
¿Cuál de los siguientes React Hooks es un impostor (no es oficial de React.js)?
useLifecycle
12.
¿Cuál es el custom hook de React Router nos permite modificar o "empujar" la navegación de nuestra aplicación?
useHistory
13.
¿Es posible crear componentes con hooks y componentes con clases en un mismo proyecto?
Verdadero
14.
¿El custom hook useHomeData cumple con las reglas y convenciones de los React Hooks?
Verdadero
15.
¿En cuál de los siguientes ejemplos nos aseguramos de que nuestro efecto se ejecuta solo una vez (cuando "montamos" el componente)?
useEffect(() => { /* … */ }, []);
16. Mala
useRef nos permite:
Leer el valor de nuestros inputs directamente desde el DOM para poder actualizar nuestro estado con useState o useReducer.
REPASAR CLASE
17. Mala
¿Qué optimización podemos hacer con React.memo?
Aceleramos el render de nuestro componente porque evitamos hacer cálculos innecesarios.
18.
¿Cuál de las siguientes herramientas nos ayudan a manejar meta-etiquetas para trabajar el SEO de nuestra aplicación?
React Helmet
19.
¿Cuál es el custom hook de React Router que funciona igual que el componente Route?
useRouteMatch
20. Mala
useCallback nos permite:
Evitar que nuestro componente haga render cuando es una función.
REPASAR CLASE
21.
useMemo nos permite:
Ejecutar una función cuando el componente cumple ciertas condiciones y obtener su valor memoizado cuando no se cumplen.
22.
useReducer nos permite:
Agregar estado y modificarlo con reducers en componentes creados como funciones.
23. Mala
¿Cuál es el custom hook de Redux que nos permite elegir qué parte de nuestro estado leeremos en nuestro componente?
useSelection