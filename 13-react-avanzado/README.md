# Curso Avanzado de React

## Introducción

- Trabajar en tener componentes totalmente reutilizables, independientemente del producto.
- Tener un stack tecnológico común que permita adaptarnos a los cambios del mercado.

**React**

React es una biblioteca de vistas creada por facebook. (Vistas en la web, vistas en react native, vistas en terminal, vistas en realidad virtual)

Tiene dos caracteristicas básicas:

1. Esta basado en componentes
   - Lo separamos todo en componentes, toda la UI separada en trozos más pequeños que son los componentes.
   - En React todo es un componente, la página es un componente compuesta de otros componentes, compuestos a la vez de otros componentes.
2. Es declarativo
   - No es imperativo, cuando algo es imperativo tenemos que declarar todos los pasos necesarios para llegar al estado que queremos. Cuando algo es declarativo solo le decimos a que estado queremos llegar y React se encarga de llevarnos allí.

**¿Por qué React Avanzado?**

1. Porque actualmente es la tecnología web más demandada del mercado.
2. Por todas las posibilidades que todavía tiene:
   - División de código utilizando React Lazy
   - Compartir la lógica entre diferentes componentes usando componentes de orden superior
   - Render props
   - Custom hooks

## Proyecto y tecnologías que usaremos

**El proyecto**

Una aplicación parecida a instagram.

**Tecnologías**

- Base: React
- Empaquetador y transpilador: Webpack y Babel
- Estilado con CSS in JS: styled-components.
- Linter: Standard JS
- Fetching de datos: GraphQL y el cliente React Apollo
- Enrutado de la SPA: No vamos a usar React Router sino su alternativa ReachRouter.
- Buenas prácticas: Lighthouse (reporte de metricas) y Cypers para pruebas end to end.
- SEO, PWA y Deploy: React Helmet, Workbox, Vercel.

# Preparando el entorno de desarrollo

## Iniciando el proyecto, instlando webpack

https://github.com/midudev/curso-platzi-react-avanzado/blob/master/api/adapter.js

Debería clonar el repo... pero no lo voy a hacer

> npm init -y
>
> npm install --save-dev webpack webpack-cli
>
> mkdir src
>
> touch src/index.js

```javascript
console.log("Empezamos");
```

> ./node_modules/.bin/webpack src/index.js
>
> node dist/main.js
>
> npm install --save-dev html-webpack-plugin

Creamos un archivo webpack.config.js

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    filename: "app.bundle.js",
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

Ahora podemos agregar un script al package.json

```json
"scripts": {
    "build": "webpack"
}
```

> npm install --save-dev webpack-dev-server

Ahora podemos agregar un script al package.json

```json
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
}
```

> npm run dev

## Instalación de React y Babel

> npm install --save react react-dom

Modificamos el index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hola</h1>, document.getElementById("root"));
```

> npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react

Y el webpack.confg.js queda así:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
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
  },
};
```

## Zeit es ahora Vercel

https://vercel.com/docs

## Linter, extensiones y deploy con Vercel

Vamos a utilizar StandardJS como Linter

> npm install standard --save-dev

Agregamos un script a package.json

```json
"scripts": {
    "build": "webpack",
    "dev": "webpack serve",
    "lint": "standard",
    "lint-fix": "standard --fix",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Y siempre en el package.json, despues de las dependencias:

```json
"standard": {
    "ignore": ["/api**"]
}
```

Para que el linter vaya indicandonos que errores nos puede detectar, podemos agregar esto al final del package.json

```json
"eslintConfig": {
    "extends": [
        "./node_modules/standard/eslintrc.json"
    ]
}
```

En visual studio code habría que instalar ESLint, Prettier y configurar:

- Format On Save: false
- Prettier: Eslint integration: true
- Eslint: Auto Fix On Save: true

> npm run lint

Ahora para hacer deploy podemos utilizar Vercel, podemos iniciar sesión en vercel con github.

El profesor crea un archivo vercel.json (Pero me parece que no es necesario)

```json
{
  "version": 2,
  "name": "petgram",
  "builds": [
    {
      "use": "@now/static-build",
      "src": "package.json"
    }
  ],
  "routes": [
    {
      "src": "(.*).js",
      "dest": "/$1.js"
    },
    {
      "src": "(.*).json",
      "dest": "/$1.json"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
}
```

Y luego en la raiz el proyecto ejecutamos

> vercel

En el package json debemos crear un nuev script

```json
"scripts": {
    "now-build": "npm run build",
    "build": "webpack",
    "lint": "standard",
    "dev": "webpack serve"
}
```

# Creando la interfaz con styled-components

## ¿Qué es CSS-in-JS?

Hasta hace poco todo el desarrollo web era centrado en html. Poco a poco hemos pasado a un desarrollo centrado en JavaScript.

CSS-in-JS permite que no solo generemos el markup de nuestro html en JavaScript sino que también sus estilos. Esto tiene algunas ventajas como:

- Que no vamos a tener que preocuparnos por la colisión de classnames.
- Vamos a tener el css crítico más facilmente.
- Vamos a tener css más optimizado.

stiled-components es una biblioteca pensada principalmente para React que nos permite estilizar directamente los elementos del marcado html.

Ejemplo:

```javascript
const Button = styled.a`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
    `}
`;
```

Hay una extensión de VSCode llamada vscode-styled-components.

## Creando nuestro primer componente: Category

## Creando ListOfCategories y estilos globales

## Usar información real de las categorías

## Creando PhotoCard y usando react-icon

## SVGR: de SVG a componentes de REactJS

## Creando animaciones con keyframes

# Hooks

## ¿Qué son los Hooks?

## useEffect: limpiando eventos

## useCategoriesData

## Usando Intersection Observer

## Uso de polyfill de Intersection Observer e imports dinámicos

## Usando el localStorage para guardar los likes

## Custom Hooks: useNearScreen y useLocalStorage

# GraphQL y React Apollo

## ¿Qué es GraphQL y ReactApollo? Inicializando React Apollo Client y primer HoC

## Parámetros para un query con GraphQL

## Usar render Props para recuperar una foto

## Refactoriznaod y usando variables de loading y error

## Usando las mutaciones con los likes

# Reach Router

## ¿Qué es Reach Router? Creando la ruta Home

## Usando Link para evitar recargar la página

## Creando la página Detail

## Agregando un NavBar a nuestra app

## Estilando las páginas activas

## Rutas protegidas

# Gestión de usuarios

## Introducción a React.Context

## Creación de componente UserForm; y Hook useInputVAlue

## Estilando el formulario

## Mutaciones para registro

## Controlar estado de carga y error al registrar un usuario

## Mutaciones para iniciar sesión

## Persistiendo datos en Session Storage

## Hacer like como usuario registrado

## Mostrar favoritos y solucionar fetch policy

## Cerrar Sesión

# Mejores prácticas, SEO y recomendaciones

## Último retoques a las rutas de nuestra aplicación

## React Helmet

## Midiendo el performance de nuestra app y usando React.memo()

## React.lazy() y componente Suspense

## Usando PropTypes para validar las props

## PWA: generando el manifest

## PWA: soporte offline

## Testing con Cypress

# Conclusiones

## ¡Felicidades!
