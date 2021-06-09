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

- useParams: nos permite acceder a un objeto con la información de los parámetros que tendremso en la ruta que estamos navegando, por ejemplo, el slug de un blogpost.

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

## Maquetación y estilos del home

## Maquetación y estilos de la lista de productos

## Maquetación y estilos del formulario de checkout

## Maquetación y estilos de la información del usuario

## Maquetación y estilos del flujo de pago

## Integración de íconos y conexión con React Router

# Integración de React Hooks en Platzi Conf Merch

## Creando nuestro primer custom hook

## Implementando useContext en Platzi Conf Merch

## useContext en la página de checkout

## useRef en la página de checkout

## Integrando third party custom hooks en Platzi Conf Merch

# configura mapas y pagos con PayPal y Google Maps

## Paso a paso para conectar tu aplicación con la API de PayPal

## Integración de pagos con la API de PayPal

## Completando la integración de pagos con la API de PayPal

## Paso a paso para conectar tu aplicación con la API de Google Maps

## Integración de Google Maps en el mapa de checkout

## Creando un Custom Hook para Google Maps

# Estrategias de deployment profesional

## Continuous integration y continuous delivery con GitHub Actions

## Compra del dominio y despliega con Cloudflare

# Optimización de aplicaciones web con React

## Integración de React Helmet para mejorar el SEO con meta etiquetas

## Análisis de performance con Google Lighthouse

## Convierte tu aplicación de React en PWA

# Bonus: trabaja con Strapi CMS para crear tu propia API

## Crea una API con strapi CMS y consúmela con React.js

# ¿Qué sigue en tu carrera profesional?

## Próximos pasos para especializarte en frontend

```

```
