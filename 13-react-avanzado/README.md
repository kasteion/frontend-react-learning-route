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

Al final pues solo ejecuté

> vercel

Y eso publica el proyecto (Nota, lee lo que esté publicado en el directorio de public)

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

Primero vamos a instalar la dependencia de styled-compoents

> npm install styled-components

Vamos a crear el componente App.js

```javascript
import React from "react";
import {Category} from './componets/Category'

const App = () => (<Category />)
```

Así ahora podemos renderizar el componente App en el index.js

Creamos una carpeta llamada components y dentro otra carpeta llamada Category y allí creamos un archivo index.js

```javascript
import React from 'react';
import { Anchor, Image } from './styles';

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg';

export const Category = ({ cover = DEFAULT_IMAGE, path, emoji= '?'}) => (
  <Anchor href={path}>
    <Image src={cover} />
    {emoji}
  </Anchor>
)
```

Así como hemos creado las carpetas vamos a crear otro archivo llamado styles.js dentro de la carpeta Category, en este archivo van los estilos de nuestro compoente

```javascript
import styled from 'styled-components'

export const Anchor = styled.a`
  display: flex;
  flex-direction: column;
  text-aling: center;
  text-decoration: none;
  width: 75px;
`

export const Image = styled.img`
  border: 1px solid #ddd;
  box-shadows: 0px 10px 14px rgba(0, 0, 0, .2);
  border-radius: 50%;
  height: auto;
  overflow: hidden;
  object-fit: cover;
  height: 75px;
  width: 75px;
`
```

Para conseguir que el editor resalte bien la sintaxis dentro de la cadena de styled components debemos instalar una extensión de styled components. 

## Creando ListOfCategories y estilos globales

Pues las categorías no van solas sino que son una lista.

Creamos una nueva carpeta dentro de components llamada ListOfCategories, dentro creamos un index.js y un styles.js

```javascript
import styled from 'styled-components'

export const List = styled.ul`
  display: flex;
  overflow: scroll;
  width: 100%;
`

export const Item = styled.li`
  padding: 0 8px;
`
```

```javascript
import React from 'react'
import { Category } from "../Category"
import { List, Item } from "./styles" 

export const ListOfCategories = () => {
  return (
    <List>
      {
        [1, 2].map(category => <Item key={category}><Category /></Item>)
      }
    </List>
  )
}
```

Styled Components ofrece una forma de tener estilos globales en nuestra aplicación, para hacer esto debemos crear el archivo src/GlobalStyles.js

```javascript
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
        html {
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        *, *::before, *::after {
                box-sizing: inherit;
        }
        
        ul, li, h1, h2, h3, p, button {
                margin: 0;
        }

        ul {
                list-style: none;
        }

        button {
                background: transparent;
                border: 0;
                outline: 0;
        }

        body {
                background: #fefefe;
                height: 100vh;
                margin: 0 auto;
                max-width: 500px;
                overscroll-behavior: none;
                width: 100%;
        }

        #app {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                overflow-x: hidden;
                min-height: 100vh;
                padding-bottom: 10px;
        }
`
```

Ahora para usar los estilos globales debemos trabajar en el archivo App.js

```javascript
import React from "react";
import { ListOfCategories } from './componets/ListOfCategories'
import { GlobalStyle } from './GlobalStyle'
const App = () => (
  <>
    <GlobalStyle />
    <ListOfCategories />
  </>
)
```

## Usar información real de las categorías

Todavía estamos dando los valores por defecto... pero ahora deberíamos presentar información real. Para esto podemos importar directamente el archivo db.js de las categorías

```javascript
import { categories } from '../../../api/db.json'

export const ListOfCategories = () => {
  return (
    <List>
      {
        categories.map(category => <Item key={category.id}><Category {...category}/></Item>)
      }
    </List>
  )
}
```

## Creando PhotoCard y usando react-icon

Ahora el componente PhotoCard para ver las fotos de los animalitos y darle like a las fotos.

Necesitaremos instalar react-icons

> npm install react-icons

Creamos una carpeta llamada PhotoCard y dentro index.js y styles.js

```javascript
import styled from 'styled-components'

export const ImgWrapper = styled.div`
  border-radius: 10px;
  display: block;
  height: 0;
  overflow: hidden;
  padding: 56.25% 0 0 0;
  position: relative;
  width: 100%;
`

export const Img = styled.img`
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2);
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;  
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding-top: 8px;

  & svg {
    margin-right: 4px;
  }
`
```

```javascript
import React from 'react'
import {ImgWrapper, Img, Button} from './styles'
import { MdFavoriteBorder } from 'react-icons/md'

const DEFAULT_IMAGE = 'https://una-imagen/';

export const PhotoCard = ({ id, likes = 0, src }) => {
  return (
    <ImgWraper>
      <a href={`/detail/${id}`}>
        <div>
          <Img src={src}/>
        </div>
      </a>
      <Button>
        <MdFavoriteBorder size='32px'/>{ likes } likes!
      </Button>
    </ImgWraper>
  )
}
```

Creamos un componente llamado ListOfPhotoCards para renderizar varias PhotoCard.

Los iconos de react-icons aceptan la propiedad size para indicarle el tamaño del icono.

Ahora podemos importarla desde el componente App.js y lo renderizamos debajo de la lista de categorías.

```javascript
export const ListOfPhotoCards = () => {
  return (
    <ul>
      {[1, 2, 3].map(id => <PhotoCard key={id}/>)}
    </ul>
  )
}
```

## SVGR: de SVG a componentes de REactJS

Ahora debemos crear un logo...

Vamos a la página maketext.io cambiamos colores y eso y lo descargamos como svg.

https://maketext.io/

Luego nos pasamos a SVGOMG para optimizar nuestro logo y tener una mejor versión para nuestro proyecto. Desde esta página podemos descargarlo o solo copiar el código del svg para poner el código en un componente. Copiamos el código.

https://jakearchibald.github.io/svgomg/

El código copiado lo pasamos al SVGR aquí basicamente le pasamos un código svg y nos da un componente de react.

Copiamos lo que nos crea SVGR y creamos un nuevo componente. Creamos una carpeta llamada Logo y dentro el index.js y dentro copaimos el codigo del SVGR

https://react-svgr.com/playground/

Este componente Logo lo importamos en el App.js

Este Logo pues también tiene los estilos:

```javascript
import styled from 'styled-components'

export const Svg = styled.svg`
  width: 220px;
  margin-left: -10px;
  margin-top: -30px;
`
```
## Creando animaciones con keyframes

Vamos a crear una animación para mostrar las animaciones de una forma más gradual con un fade. Para eso nos vamos al styles.js de PhotoCard

```javascript
// Debemos importar keyframes además de styled
import styled, { keyframes } from 'styled-components'

// Creamos una nueva constante que nos permitira crear los keyframes de nuestra animación
const fadeInKeyframes = keyframes`
  from {
    filter: blur(5px);
    opacity: 0;
  }

  to {
    filter: blur(0);
    opacity: 1;
  }
`

// Y luego en el componente Img debemos indicarle que animación vams a utilizar

export const Img = styled.img`
  animation: 1s ${fadeInKeyframes} ease;
  // resto de estilos
`
```

Podemos crear una función para que esto sea más reutilizable:

```javascript
// Debemos importar css tambien
import styled, { css, keyframes } from 'styled-components'

const fadeIn = ({ time = '1s', type = 'ease'} = {}) => 
  css`animation: ${time} ${fadeInKeyframes} ${type};`

const fadeInKeyframes = keyframes`
  from {
    filter: blur(5px);
    opacity: 0;
  }

  to {
    filter: blur(0);
    opacity: 1;
  }
`

// Ahora el fadein lo podemos usar en la imagen
export const Img = styled.img`
  // ${fadeIn({ time: '5s' })}
  // resto de estilos
`
```

De hecho para asegurarnos de que esto sea totalmente reutilizable podemos sacar el método fadeIn y el keyframe.
Entonces podemos crear src/styles/animation.js

```javascript
import { css, keyframes } from 'styled-components'

export const fadeIn = ({ time = '1s', type = 'ease'} = {}) => 
  css`animation: ${time} ${fadeInKeyframes} ${type};`

const fadeInKeyframes = keyframes`
  from {
    filter: blur(5px);
    opacity: 0;
  }

  to {
    filter: blur(0);
    opacity: 1;
  }
```

Ahora ya podemos usarlo en los estilos del componente...

```javascript
// Ya no necesito ni los keyframes ni css
import styled from 'styled-components'
// Pero si necesito importar la función fadeIn
import { fadeIn } from '../../styles/animation'

// Y luego en el componente Img debemos indicarle que animación vams a utilizar

export const Img = styled.img`
  ${fadeIn()}
  // resto de estilos
`
```

Para tener todo más ordenado podemos mover GlobalStyles dentro de la misma carpeta styles

# Hooks

## ¿Qué son los Hooks?

Los react hooks estan disponible a partir de la versión 16.8.0 de React.

Los React Hooks son funciones que nos permiten acceder a **casi todas** las características de REact desde componentes funcionales.

**¿Por qué casi todas?**

No se puede utilizar getSnapshotBeforeUpdate, componentDidCatch por ahora.

**Hooks principales**

Y los más importantes y que se utilizarán en el 90% de los casos son:

- useState: Para añadir estado locar en el componente.

```javascript
import React, { useState } from 'react'

export default function Counter () {
  const [counter, setCounter ] = useState(0)

  return (
    <div>
      <span>{counter}</span>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter(counter - 1)}>-</button>
    </div>
  )
}
```
- useEffect: Nos permitira ejecutar una función cada vez que renderizamos nuestro componente.
- useContext: Nos permite acceder a la context api para acceder a valores que tendremos en toda nuestra aplicación sin necesidad de pasar todo por props

**Hooks auxiliares**

Nos permiten acceder a otras funcionalidad.

- useReducer: Nos permite actualizar el estado de nuestro componente como lo haríamos con Redux.
- useCallback
- useMemo
- useRef: Nos permite cojer referencias del DOM
- useImperativeHandle
- useLayoutEffect
- useDebugValue: Nos permite acceder a valores sin hacer console.log

**Custom Hooks**

Podemos crear hooks para poder reutilizar la lógica en multiples componentes.

**Ventajas**

- Separación de conceptos: Nos permite separar los conceptos en diferentes hooks.
- 100% retrocompatilbes. No tenemos que volver a escribir todo para adaptarlos a hooks.
- Mejora transpilación con Babel. El código resultante queda muy largo al trabajar con babel, pero es más simple para babel hacerlo con funciones.
- Mejor performance.

Podemos empezar agregando state con el componente ListOfCategories.

```javascript
import React, { useState, useEffect } from 'react'
// import { categories as mockCategories} from '../../../api/db.json'

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    window.fetch('http://localhost:3500/categories')
    .then(res => res.json())
    .then(data => setCategories(data))
  }, [])
}
```
## useEffect: limpiando eventos

Queremos que la lista de categorías no sigua para que el usuario pueda seguir navegando.

En el componente ListOfCategories

```javascript
import React, { useState, useEffect } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

export const ListOfCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    window.fetch('http://localhost:3500/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  // 1. Sacamos el render a una función
  /*
  const renderList = () => (
    <List>
      {
        categories.map(category =>
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        )
      }
    </List>
  )
  */
  // 3. Le agregamos a la función el parametro fixed y un classname con una ternaria
  const renderList = (fixed) => (
    <List className={fixed ? 'fixed' : ''}>
      {
        categories.map(category =>
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        )
      }
    </List>
  )

  return (
    <>
    {
      //2. Aquí cambiamos por la función de renderList() pues lo que queremos es tener dos tipos de listas, una que siempre estará arriba y otra que queremos que este fija cuando estemos haciendo scroll.
      // <List>
      // {
      //   categories.map(category =>
      //     <Item key={category.id}>
      //       <Category {...category} />
      //     </Item>
      //   )
      // }
      // </List>
      renderList()
      renderList(true)
    }
    </>
  )
}
```

Hasta aquí tendríamos dos veces la lista de categorías renderizada... vamos a styles.js

```javascript
import styled from 'styled-components'

// 4. Le agregamos un selector & para la clase fixed
export const List = styled.ul`
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  width: 100%;

  & .fixed {
    background: #fff;
    border-radius: 60px;
    box-shadow 0 0 20px rgba(0,0,0, 0.3);
    left: 0;
    margin: 0 auto;
    max-width: 400px;
    padding: 5px;
    position: fixed;
    top: -20px;
    transform: scale(.5);
    z-index: 1;
  }
`

export const Item = styled.li`
  padding: 0 8px;
`
```

Seguimos teniendo dos veces la lista de categorías, para hacer que una aparezca cuando la otra desaparezca debemos agregar otro useEffect()

```javascript
// 1. Necesito agregar un stado de showFixed
const [showFixed, setShowFixed] = useState(false)

useEffect(() => {
  const onScroll = e => {
    const newShowFixed = window.scrollY  > 200
    showFixed !== newShowFixed ??  setShowFixed(newShowFixed)
  }

  document.addEventListener('scroll', onScroll)

  return () => document.removeEventListener('scroll', onScroll)
}, [showFixed])

return (
    <>
    {renderList()}
    {showFixed && renderList(true)}
    </>
```

## useCategoriesData

Vamos a ver algunas buenas prácticas para hacer el fetch de nuestras categorías y que todo funcione correctamente y que más adelante no tengamos sorpresas. 

1. Pasar el estilo fixed por className no es correcto con styled components así que debemos pasarlo por props

```javascript
  const renderList = (fixed) => (
    {/*<List className={fixed ? 'fixed' : ''}>*/}
    <List fixed={fixed}>
      {
        categories.map(category =>
          <Item key={category.id}>
            <Category {...category} />
          </Item>
        )
      }
    </List>
  )
```

En los estilos en lugar de usar el classname vamos a evaluar las props.

```javascript
// 1. Tenemos que importar css
import styled, {css} from 'styled-components'

export const List = styled.ul`
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  width: 100%;

  // Aquí evaluamos la prop

  ${props => props.fixed && css`
    background: #fff;
    border-radius: 60px;
    box-shadow 0 0 20px rgba(0,0,0, 0.3);
    left: 0;
    margin: 0 auto;
    max-width: 400px;
    padding: 5px;
    position: fixed;
    top: -20px;
    transform: scale(.5);
    z-index: 1;
  `}
`
```

Haciendolo de esta forma no vamos a tener ninguna colisión con los classNames y aprovechamos las cosas buenas de styled-components.

2. El fetching de datos con las categorías lo podemos hacer con buenas practicas creando un custom hook

```javascript
const useCategoriesData = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    window.fetch('http://localhost:3500/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  return { categories }
}
```

Y en ListOfCategories podemos hacer:

```javascript
export const ListOfCategories = () => {
  const { categories } useCategoriesData();
}
```

El custom hook nos permite hacer más cosas como por ejemplo tener más estados (loading, error)

```javascript
const useCategoriesData = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    window.fetch('http://localhost:3500/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
  }, [])

  return { categories, loading }
}
```

## Usando Intersection Observer

Hasta aquí el problema puede ser que estamos renderizando la ListOfPhotoCards todos las fotografías que nos llegan en la consulta, en lugar de ir renderizandolas de 3 en 3 o por partes conforme el usuario hace scroll para esto se puede hacer un custom hook.

```javascript
// 1. Primero importamos 3 hooks de react
import React, { useEffect, useRef, useState} from 'react'
import { ImgWrapper, Img, Button } from './styles'
import { MdFavoriteBorder } from 'react-icons/md'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  // 2. Vamos a empezar utilizando useRef para obtener la referencia del elemento en el dom, el valor inicial del useRef es null
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // console.log(ref.current)
    // 3. Aquí vamos a crear un IntersectionObserver
    const observer = new window.IntersectionObserver((entries) => {
      //console.log(entries)
      // 5. La propiedad que nos interesa es isIntersecting
      const { isIntersecting } = entries[0]
      // console.log(isIntersecting);
      if (isIntersecting){
        setShow(true)
        // Una vez que el elemento se intersecta desconectamos el observer.
        observer.disconnect()
      }
    })

    // 4. Inicializamos el Intersection Observer
    observer.observe(element.current)
  }, [ref])

  return (
    { /* La prop ref es especial de react y nos permite guradar la referencia del dom*/}
    <article ref={ref}>
        { show && 
          <>
          <a href={`/detail/${id}`}>
          <ImgWrapper>
            <Img src={src} />
          </ImgWrapper>
          </a>
          <Button>
            <MdFavoriteBorder size='32px' />{likes} likes!
          </Button>
          </>
        }
    </article>
  )
}
```

Es necesario estilar el Article porque al no mostrar nada dentro del mismo entonces al cargar todos los articles estan visibles en el viewport... entonces necesitariamos estilar el article con styled-components.

```javascript
import styled from 'styled-components'

export const Article = styled.article`
  min-height: 200px;
`
```

## Uso de polyfill de Intersection Observer e imports dinámicos

Según el profesor el uso de Intersection Observer no está muy extendido en todos los navegadores... pero podemos utilizar un polyfill

> npm install intersection-observer

Luego en el componente PhotoCard pero como queremos hacerlo como un import dinamico

> npm install --save-dev @babel/plugin-syntax-dynamic-import

Y en el webpack.config.js

```javascript
use: {
          loader: 'babel-loader',
          options: {
            // Debemos agregar el plugin aquí
            plugins: ['@babel/plugin-syntax-dynamic-import'],
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
```

```javascript
useEffect(() => {
  // En lugar de hacer el import directamente al principio haremos un import dinamico, este import dinamico devuelve una promesa. 
    import('intersection-observer')
      .then(() => {
        const observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting){
        setShow(true)
        observer.disconnect()
      }
      })
    })
```

Aquí el problema sería que estaríamos cargando este polyfill aún cuando no sea necesario. Entonces es mejor hacerlo así:

```javascript
useEffect(() => {
    Promise.resolve(
      // Haciendolo de esta forma primero verificamos si el navegador ya soporta IntersectionObserver
      typeof window.IntersectionObserver !== 'undefined'
        ? window.IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
        const observer = new window.IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting){
        setShow(true)
        observer.disconnect()
      }
      })
    })
```

El linter da un error en la sintaxis del import('intersection-observer') esto es porque debemos isntalar otro parseador diferente al que usa el linter por defecto e indicarle al linter que queremos utilizar otro parseador:

> npm install --save-dev babel-eslint

Y una vez instalado cambiamos una configuración en el package.json

```json
"eslintConfig": {
    "parser": "babel-eslint",
    "extends": [
      "./node_modules/standard/eslintrc.json"
    ]
  }
```

## Usando el localStorage para guardar los likes

El boton de likes todavía no hace nada... así que debemos trabajar en PhotoCard

```javascript
// De material design deberíamos tener otro logo
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

export const PhotoCard = ({id, likes = 0, src = DEFAULT }) => {
  // ...
  const [liked, setLiked] = useState(false)

  // Una constante para setear el icono
  const Icon = liked ? MdFavorite : MdFavoriteBorder

  // Y al button
  return (
    <Button onClick={() => setLiked(!liked)}>
      <Icon size='32px' />
    </Button>
  )
}
```

El like se pierde al refrescar la página así que tratemos de almacenar el like en el local storage

```javascript
export const PhotoCard = ({id}) => {
  const key = `like-${id}`
// Al useState le pasamos una función
const [liked, setLiked] = useState(() => {
  try {
    const like = window.localStorage.getItem(key)
    return like
  } catch (e) {
    return false
  }
})

// Una función para setear el local storage
  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, value)
      setLiked(value)
    } catch (e) {
      console.error(e)
    }
  }

  // En el botón
  return (
    <Button onClick={() => setLocalStorage(!liked)}>
      <Icon size='32px' />
    </Button>
  )
}
```

Y tenemos que asegurarnos que a la ListOfPhotoCards al componente PhotoCard le pasemos el id

```javascript
export const ListOfPhotoCards = () => {
  return (
    <ul>
      {
        [1, 2, 3].map(id => <PhotoCard key={id} id={id}/>)
      }
    </ul>
  )
}

```

## Custom Hooks: useNearScreen y useLocalStorage

Separando las funcionalidades en hooks y en su propia carpeta para seguir con mejores prácticas.

El hook de useLocalStorage quedaría así:

```javascript
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch(e) {
      return initialValue
    }
  })

  const setLocalStorage = value => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    } catch (e) {
      console.error(e)
    }
  }

  return [storedValue, setLocalStorage]
}
```

Y en el componente PhotoCard

```javascript
export const PhotoCard = ({id}) => {
  //...
  const key = `like-${id}`
  const [liked, setLiked] = useLocalStorage(key, false)

  // Y en el botton
  return (
    <Button onClick={() => setLiked(!liked)}>
      <Icon size='32px' />
    </Button>
  )
}
```

Estos Hooks deben ir en su propio archivo y carpeta... creamos la carpeta hooks y un archivo useLocalStorage y allí creamos el hook, en photo card importamos useLocalStorage igual con el Intersection Observer.

El useNearScreen.js

```javascript
import { useEffect, useState, useRef } from 'react'

export const useNearScreen = () => {
  const element = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined'
        ? window.IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      const observer = new window.IntersectionObserver((entries) => {
        const {isIntersecting} = entries[0]
        if (isIntesecting) {
          setShow(true)
          observer.disconect()
        }
      })
      observer.observe(element.current)
    })
  }, [element])

  return [show, element]
}
```

Para utilizar el useNearScreen debemos importarlo

```javascript
import { useNearScreen } from '../../hooks/useNearScreen'

export const PhotoCard = () => {
  //...
  const [show, element] = useNearScreen()
}
```

Así podemos reutilizar estos custom hooks en nuestra aplicación en diferentes lados de la misma y separar la lógica de la aplicación de sus componentes.

# GraphQL y React Apollo

## ¿Qué es GraphQL y ReactApollo? Inicializando React Apollo Client y primer HoC

GraphQL es un lenguaje creado por facebook que nos permite recuperar los datos que necesitamos en nuestra aplicación. Nos permite describir nuestros datos, indicando cada campo que tipo tiene y de esta forma las validaciones ocurriran tanto en el cliente como en el servidor.

Podemos recuperar justo la información que necesitamos para optimizar los recursos de nuestra red. Y también vamos a tener resultados predecibles porque nosotros mismos vamos a definir que es lo que necesitamos para nuestra aplicación.

```
{
  hero {
    name
    height
    mass
  }
}
```

Podemos pedir lo que necesitamos y no tenemos porque pedir todos los datos que vienen en una API Rest y luego filtrarlos en el cliente. 

GraphQL no sustituye las REST APIs, porque GraphQL es un lenguaje que se puede conectar a cualquier tipo de API.

- GraphQL --> Es un Lenguaje | REST --> Es una Arquitectura
- GraphQL --> Un sólo endpoint | REST --> Múltiples endpoints
- GraphQL --> Fetching justo | REST --> Over y underfetching
- GraphQL --> Conexión a otras APIs | REST --> Conexión directa con base de datos

**React Apollo**

Apollo es un cliente que nos permite conectarnos a un servidor de GraphQL. Y React Apollo es el mismo cliente con las conexiones perfectas con la biblioteca React.

1. Instalando dependencias

- apollo-boost: Para iniciar nuestra conexión con un servidor de graphql muy rápidamente y sin configuración.
- react apollo: Integración de react con el cliente de apollo.
- graphql

> npm install --save apollo-boost react-apollo graphql 

En el punto de entrada de nuestra aplicación debemos configurar para conectarnos a nuestro servidor. El punto de entrada es el index.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
// Importamos unas librearías para conectarnos
import ApolloClient from 'apollo-boost'
// Este será un componente en el que envolveremos nuestra aplicación
import { ApolloProvider } from 'react-apollo'
import { App } from './App'

// Tenemos que iniciar el ApolloCliente, este client lo vamos a utilizar en el ApolloProvider
const client = new ApolloClient({
  uri: 'https://localhost:3500/graphql'

})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root'))
```

Una Query
```
query getPhotos {
  photos {
    id
    categoryId
    src
    likes
    userId
    liked
  }
}
```

Ahora la primera query que debemos hacer será en la ListOfPhotoCards...

```javascript
import React from 'react'
import { PhotoCard } from '../PhotoCard'
// Importamos graphql de react-apollo
import { graphql } from 'react-apollo'
// Importamos gql para que nos permita escribir las queries como string y que apollo las entienda
import { gql } from 'apollo-boost'

const withPhotos = graphql(gql`
  query getPhotos {
  photos {
    id
    categoryId
    src
    likes
    userId
    liked
  }
  }
`)

export const ListOfPhotoCards = () => {
  return (
    <ul>
      {
        [1, 2, 3, 4, 5, 6, 7].map(id => <PhotoCard key={id} id={id} />)
      }
    </ul>
  )
}
```

A este patron:

```javascript
const withPhotos = graphql(gql`
  query getPhotos {
  photos {
    id
    categoryId
    src
    likes
    userId
    liked
  }
  }
`)
```

Se le llama componente de orden superior ya que es una función que se le pasa un componente como parametros y devuelve otro componente con mejoras o props inyectadas.

Vamos a envolver el componete ListOfCards

```javascript
// Los imports...

const withPhotos = graphql(gql`
  query getPhotos {
  photos {
    id
    categoryId
    src
    likes
    userId
    liked
  }
  }
`)

// Le quitamos el export y le cambiamos el nombre a ListOfPhotoCardsComponent
//const ListOfPhotoCardsComponent = (props) => {
  //console.log(props)
const ListOfPhotoCardsComponent = ({ data: { photos = [] } } = {})
  return (
    <ul>
      {
        photos.map(photo => <PhotoCard key={photo.id} id={...photo} />)
      }
    </ul>
  )
}

export const ListOfPhotoCards = withPhotos(ListOfPhotocardsComponent)
```

**Un Aporte con respecto a los hooks**

> npm install apollo-boost @apollo/react-hooks graphql

En el index.js

```javascript
// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

// Components
import { App } from './App'

const client = new ApolloClient({
  uri: 'https://petgram-server-jrmfsd-okxluew9o.now.sh/graphql'
})

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
)
```

En ListOfPhotoCards

```javascript
import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { PhotoCard } from '../PhotoCard'
import { DotSpinner } from '../Spinner'

const getPhotos = gql`
  query getPhotos {
    photos {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`

export const ListOfPhotoCards = () => {
  const { loading, error, data } = useQuery(getPhotos)

  if (loading) return <DotSpinner />
  if (error) return <p>Error</p>

  return (
    <ul>
      {data.photos.map((photoCard, id) => (
        <PhotoCard key={id} {...photoCard} />
      ))}
    </ul>
  )
}
```

## Parámetros para un query con GraphQL

Derrepente quiero poder filtrar por categoría.

```javascript
// Aquí añadimos a la Query que vamos a filtrar por categoria, entonces les pasamos un categoryId de tipo ID.
const getPhotos = gql`
  query getPhotos($categoryId: ID) {
    photos(categoryId: $categoryId) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`
```

Entonces aquí la idea es pasar el categoryId como una prop del componente ListOfPhotoCards, en App.js

```javascript
import React from 'react'
import { ListOfCategories } from './components/ListOfCategories'
import { GlobalStyle } from './styles/GlobalStyles'
import { ListOfPhotoCards } from './components/ListOfPhotoCards'
import { Logo } from './components/Logo'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <ListOfCategories />
      <ListOfPhotoCards categoryId={2}/>
    </>
  )
}
```

Aquí se puede crear una carpeta llamada hoc (high order compoente) y dentro de esta un archivo llamado withPhotos.js en el que se puede colocar lo de graphql.

```javascript
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

export const withPhotos = graphql(gql`
  query getPhotos($categoryId: ID) {
    photos(categoryId: $categoryId){
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`)
```

Luego desde ListOfPhotoCards se puede 

```javascript
// Los imports...
import { withPhotos } from '../../hoc/withphotos';

const ListOfPhotoCardsComponent = ({ data: { photos = [] } } = {})
  return (
    <ul>
      {
        photos.map(photo => <PhotoCard key={photo.id} id={...photo} />)
      }
    </ul>
  )
}

export const ListOfPhotoCards = withPhotos(ListOfPhotocardsComponent)
```

También se puede extraer el concepto de container, un container sería un objeto que hace el fetching de nuestros datos. Crearíamos una carpeta container y dentro un container llamado ListOfPhotoCards.js

```javascript
import { withPhotos } from '../../hoc/withPhotos'
import ListOfPhotoCardsComponent from '../components/ListOfPhotoCards'

export ListOfPhotoCards = withPhotos(ListOfPhotoCardsComponent)
```
## Usar render Props para recuperar una foto

El patron que vimos es utilizar hoc para recuperar los datos y envolver un componente para inyectar estos datos y pasarselo por props.

Existe otro patrón, ahora es el más común y se llama render props. Las render props lo que hacen es tomar la prop especial Children y en lugar de renderizar un elemento como hariamos normalmente va a renderizar una función. Esta función lo que debe devolver es el componente que queremos renderizar. La gracia está en los parametros que recibe esta función. La render props en la función children recibe por parametros la información que queremos inyectar en ese componente que vamos a renderizar.

Primero vamos a cambiar el href del componente PhotoCard

```javascript
return (
    <Article ref={element}>
      {
        show &&
          <>
            <ImgWrapper>
              <a href={`?detail=${id}`}>
                <div>
                  <Img src={src} />
                </div>
              </a>
            </ImgWrapper>
            <Button onClick={() => setLiked(!liked)}>
              <Icon />{likes} likes!
            </Button>
          </>
      }
    </Article>
  )
```

En el App.js añadiremos el uso de urlParams

```javascript
import React from 'react'
import { ListOfCategories } from './components/ListOfCategories'
import { GlobalStyle } from './styles/GlobalStyles'
import { ListOfPhotoCards } from './containers/ListOfPhotoCards'
import { Logo } from './components/Logo'
// Aqui puedo usar el phtocardwithquery
import { PhotoCardWithQuery } from '../container/PhotoCardWithQuery'

export const App = () => {
  // 1. Añadimos urlParams
  const urlParams = new window.URLSearchParams(window.location.search)
  // 2. Así podemos obtener el parametro en la url
  const detailId = urlParams.get('detail')
  // 3. Solo para mostrar el valor
  console.log(detailId)
  return (
    <>
      <GlobalStyle />
      <Logo />
      {
        // 4. Ahora si tenemos un detailId 
        detailId ? <PhotoCardWithQuery id={detailId}/> : 
        <>
          <ListOfCategories />
          <ListOfPhotoCards />
        </PhotoCardWithQuery>
      }
    </h1>
  )
}
```

Creamos otro container en container/PhotoCardWithQuery.js porque query va a ser la petición que queremos hacer

```javascript
import React from 'react'
import { PhotoCard } from '../components/PhotoCard'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const query = gql`
  query getSinglePhoto($id:ID!) {
    photo(id:$id) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`

export const PhotoCardWithQuery = ({id}) => (
  <Query query={query} variables={{ id }}>
    {
      ({loading, error, data}) => {
        const { photo = {} } = data
        return <PhotoCard {...photo}/>
      }
    }
  </Query>
)
```
## Refactoriznado y usando variables de loading y error

Falta incorporar algunas buenas prácticas a nuestro código para asegurarnos que lo podremos mantener correctamente.

1. Es buena práctica ponerle un nombre descriptivo a los queries... no solo query... lo mismo en el componente de withPhotos estos queries también se podrían mover a su propia carpeta.

```javascript
// antes const query = gql`
const GET_SINGLE_PHOTO = gql`
  query getSinglePhoto($id:ID!) {
    photo(id:$id) {
      id
      categoryId
      src
      likes
      userId
      liked
    }
  }
`
```

2. Otra cosa es manejar los estados de loading y error.

```javascript
if (loading) return <p>Loading...</p>
if (error) return <p>Error!</p>
```

3. Otra buena práctica es dejar las render props fuera del componente, para extraerlas podemos hacer esto en PhotoCardWithQuery.js

```javascript

const renderProp = ({loading, error, data}) => {
  const { photo = {} } = data
  return <PhotoCard {...photo}/>
}

export const PhotoCardWithQuery = ({id}) => (
  <Query query={query} variables={{ id }}>
    {
      renderProp
    }
  </Query>
)
```

**Aporte sobre crear un placeholder**

```javascript
//...
import ReactPlaceholder from "react-placeholder"
import { TextBlock, RectShape, RoundShape } from "react-placeholder/lib/placeholders"

//...

  const photoCardSkeleton = (
    <React.Fragment>
      <RectShape color="#eee" style={{ height: "400px", marginBottom: 10 }} />
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <RoundShape
          color="#eee"
          style={{ width: 50, height: 50, marginLeft: 10, marginRight: 10 }}
        />
        <TextBlock color="#eee" rows={1} style={{ width: 120 }} />
      </div>
    </React.Fragment>
  )

return (
    <Article ref={element}>
      {show && (
        <ReactPlaceholder
          ready={!loading}
          showLoadingAnimation={true}
          customPlaceholder={photoCardSkeleton}
        >
          <React.Fragment>
            <a href={`/?detail=${id}`}>
              <ImgWrapper>
                <Img src={src} />
              </ImgWrapper>
            </a>
            <Button onClick={() => setLiked(!liked)}>
              <Icon size="32px" /> {likes} likes!
            </Button>
          </React.Fragment>
        </ReactPlaceholder>
      )}
    </Article>
  )
```
## Usando las mutaciones con los likes

El componente de `mutation` es otro componente importante en una aplicación Apollo. Es un componente React que proporciona una función para ejecutar una mutación de GraphQL para así alterar la data. Además, rastrea el estado de carga, finalización y error de la mutación.

Para esto vamos a extraer el botón de like que tenemos en PhotoCard a nu nuevo componente, así que creamos un folder en src/components/FavButton y dentro un index.js

```javascript
import React from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

export const FavButton = ({ liked, likes, onClick}) => {
  const Icon = liked ? MdFavorite: MdFavoriteBorder
  
  return <Button onClick={onClick}>
    <Icon size='32px' />{likes} likes!
  </Button>
}
```

Añadimos un archivo Styles.js y lo extraemos del botón de PhotoCard Ahora en PhotoCard importamos favButton y lo cambiamos por el button anterior.

```javascript
const handelFavClick = () => setLiked(!liked)

return <FavButton liked={liked} likes={likes} onClick={handleFavClick}>
```

Una vez separado el componente podemos crear nuestra primera mutación. Para ello creamos en la carpeta container un nuevo archivo llamado ToggleLikeMutation.js

```javascript
import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const LIKE_PHOTO = gql`
mutation likeAnonymousPhoto($input: LikePhoto!) {
  likeAnonymousPhoto(input: $input) {
    id,
    liked,
    likes
  }
}
`

export const ToggleLikeMutation = ({ children }) => {
  return <Mutation mutation={LIKE_PHOTO}>
  { children }
  </Mutation>
}
```

Ahora en el componente PhotoCard importamos el container ToogleLikeMutation

```javascript
import { ToggleLikeMutation } from '../../container/ToggleLikeMutation'

// El componente lo utilizamos envolviendo el button FavButton

return <ToogleLikeMutation>
{
  (toogleLike) => {
    const handleFavClick = () => {
      !like && toggleLike({ variables: { input: { id } } } )
      setLiked(!liked)
    }
    return <FavButton liked={liked} likes={likes} onClick={handleFavClick} />
  }
}
</ToogleLikeMutation>
```

**Un Aporte sobre @apollo/client**

```javascript
import { useMutation, gql } from '@apollo/client'
const MUTATION_LIKE_PHOTO = gql`
mutation likeAnonymousPhoto($input: LikePhoto!) {
    likeAnonymousPhoto(input: $input) {
      id,
      liked,
      likes
    }
  }
`
export const useMuationToogleLike = () => {
  const [mutation, { loading: mutationLoading, error: mutationError }] = useMutation(MUTATION_LIKE_PHOTO)
  return { mutation, mutationLoading, mutationError }
}
```

Para usarlo se hace así:

```javascript
import React from 'react'
import { ImgWrapper, Img, Article } from './styles'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useNearScreen } from '../hooks/useNearScreen'
import { useMuationToogleLike } from '../hooks/useMutationToogleLike'
import { FavButton } from '../FavButton'
const DEFAULT_IMAGE = 'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png'

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const [show, element] = useNearScreen()
  const { mutation, mutationLoading, mutationError } = useMuationToogleLike()
  const key = `like-${id}`
  const [liked, setLiked] = useLocalStorage(key, false)
  const handleFavClick = () => {
    !liked && mutation({
      variables: {
        input: { id }
      }
    })
    setLiked(!liked)
  }
  // console.log('{ mutation, mutationLoading, mutationError }', { mutation, mutationLoading, mutationError })

  return (
    <Article ref={element}>
      {
        show && <>
          <a href={`/?detail=${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>
          <FavButton
            liked={liked} likes={likes}
            onClick={handleFavClick} />
        </>
      }

    </Article>
  )
}
```
# Reach Router

## ¿Qué es Reach Router? Creando la ruta Home

Reach Router es una versión simplificada y mejor optimizada de REact Router, su creador es Ryan Florence el mismo creador de React Router. Se anunció que los dos paquetes se iban a unir, pero su API se va a parecer más a Reach Router. 

Como es una SPA necesitamos una forma de crear rutas sin recargar páginas.

Reach Router es un poco más simple, con mejores prácticas.

Para esto creamos una carpeta src/pages y dentro pondremos todas las páginas de nuestra aplicación.

Home.js

```javascript
import React from 'react'
// Importar ListOfCateogories & ListOfPhotoCards también...

export const Home = ({id}) => {
  return (
    <>
      <ListOfCategories />
      <ListOfPhotoCards categoryId={id}/>
    </>
  )
}
```

Así instalamos @reach/router

> npm install @reach/router

Un comentario dice que

> npm install @reach/router --legacy-peer-deps

Entonces ya en App.js podemos hacer

```javascript
//... imports
// Para determinar las rutas de nuestra aplicación.
import { Router } from '@reach/router'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      {
        detailId
          ? <PhotoCardWithQuery id={detailId} />
          : <Router>
            <Home path='/' />
            <Home path='/pet/:id' />
          </Router>
      }
    </>
  )
}
```

En el ListOfCategories construimos el path

```javascript
<Category {...category} path={`/pet/${category.id}`}>
```

Hay que hacer unos cambio en el package.json en el script

```json
"scripts": {
  "dev": "webpack-dev-server --history-api-fallback
}
```

O en un aporte agregarlo al webpack.config.js hay que agregar el publicPath y el historyApiFallback.

```javascript
output: {
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    },
    liveReload: true
  },
```
## Usando Link para evitar recargar la página

Utilizaremos el componente `Link` para hacer que nuestros enlaces no hagan que la página se recarge y funcione como una SPA. Recuerda siempre que puedas utilizar `Link` en lugar de `a` para tener una mejor experiencia de usuario y que no recargue la página.

En el styles.js del componente Category podemos hacer lo siguiente:

```javascript
import styled from 'styled-components'
// Link da las mismas funcionalidades que anchor pero sin recargar.
import { Link } from '@reach/router' 

// styled lo podemos usar así con cualquier componente que acepte classname
export const Anchor = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  width: 75px;
`
```

Entonces en el index.js del componente ya podemos hacerlo así:

```javascript
import React from 'react'
import { Anchor, Image } from './styles'

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg'

// path = '#' para que no de un error :P
export const Category = ({ cover = DEFAULT_IMAGE, path = '#', emoji = '?' }) => (
  { /*Cambiamos el href por to */}
  <Anchor to={path}>
    <Image src={cover} />
    {emoji}
  </Anchor>
)
```

Recomendaciones...

```javascript
import styled from 'styled-components'
// Importarlo así
import { Link as LinkRouter } from '@reach/router' 

// Llamarle Link para tener claro que es...
export const Link = styled(LinkRouter)`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  width: 75px;
`
```

Hacer lo mismo en el link del logo

## Creando la página Detail

Creamos la página Detail en src/pages/Detail.js

```javascript
import React from 'react'
import { PhotoCardWithQuery } from '../container/PhotoCardWithQuery'

export const Detail = ( { detailId } ) => (
  <PhotoCardWithQuery id={detailId}>
)
```

Y en el App.js

```javascript
import { Detail } from './pages/Detail'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
      </Router>
    </>
  )
}
```

En la PhotoCard hay que cambiar el anchor y el href para que mande a la ruta correcta.

## Agregando un NavBar a nuestra app

Vamos a agregar un NavBar en la parte de abajo de nuestra aplicación.

Creamos src/components/NavBar/index.js

```javascript
import React from 'react'

export const NavBar = () => {
  return (
    <nav>
      <button>Home</button>
      <button>Favs</button>
      <button>User</button>
    </nav>
  )
}
```

Este componente ya lo podríamos usar en la App.js

```javascript
import { NavBar } from './components/NavBar'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
      </Router>
      <NavBar />
    </>
  )
}
```

Creamos un archivo styled.js para el NavBar

```javascript
import styled from 'styled-components'

export const Nav = styled.nav`
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #e0e0e0;
  bottom: 0;
  display: flex;
  height: 50px;
  justify-content: space-around;
  left: 0;
  margin: 0 auto;
  max-width: 500px;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 1000;
`
```

right 0, left 0 y margin 0 auto hace que quede todo centrado.

```javascript
import React from 'react'
import { Nav } from './styles'

export const NavBar = () => {
  return (
    <Nav>
      <button>Home</button>
      <button>Favs</button>
      <button>User</button>
    </Nav>
  )
}
```

Ahora siempre en los styles.js

```javascript
import { Link as LinkRouter } from '@reach/router'

export const Link = styled(LinkRouter)`
  align-items: center;
  color: #888;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;
`
```

Ahora volvemos a la NavBar

```javascript
import React from 'react'
import { Link, Nav } from './styles'
import { MdHome, MdFavoriteBorder, MdPersonOutline } from 'react-icons/md'

const SIZE = '32px'

export const NavBar = () => {
  return (
    <Nav>
      <Link to='/'><MdHome size={SIZE} /></Link>
      <Link to='/favs'><MdFavoriteBorder size={SIZE} /></Link>
      <Link to='/user'><MdPersonOutline size={SIZE} /></Link>
    </Nav>
  )
}
```
## Estilando las páginas activas

La NavBar nos debería indicar de alguna forma en que sección nos encontramos. reach/router nos ayuda de alguna forma al agregarle un coponente aria-current al link que nos lleva a donde estamos actualmente.

Podemos trabajar en los styles del NavBar 

Ahora siempre en los styles.js

```javascript
import { Link as LinkRouter } from '@reach/router'
import { fadeIn } from '../../styles/animation';

export const Link = styled(LinkRouter)`
  align-items: center;
  color: #888;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  text-decoration: none;
  width: 100%;

  // Agregamos esto
  &[aria-current] {
    color: #000;

    // Agregamos un pseudo elemento
    &:after {
      ${fadeIn({ time: '0.5s'})};
      content: '.';
      bottom: 0;
      font-size: 34px;
      line-height: 20px;
    }
  }
`
```
## Rutas protegidas

Vamos a trabajar la parte de como mostrar las páginas que solo se pueden mostrar cuando hicimos login.

Creamos la pages/Favs.js y pages/User.js y pages/NotRegisteredUser.js

```javascript
import React from 'react'

const Favs = () => {
  return <h1>Favs</h1>
}
```

Las 3 iguales que solo retornen un h1 con el nombre de la pagina. Estas 3 paginas las agregamos al App.js

```javascript

1. // UserLogged es un componente con reder prop...
const UserLogged = ({ children }) => {
  return children({ isAuth: false })
}

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
      </Router>
      <UserLogged>
        {
          ({ isAuth }) => isAuth 
            ? <Router> 
                <Favs path='/favs' />
                <User path='/user' />
              </Router>
            : <Router>
                <NotRegisteredUser path='/favs'/>
                <NotRegisteredUser path='/user'/>
              </Router>
        }
      </UserLogged>
      <NavBar />
    </>
  )
}
```

# Gestión de usuarios

## Introducción a React.Context

Context API es una característica que tiene React para poder pasar datos en nuestra aplicación sin necesidad de usar las Props.

Para crear un contexto vamos a importar el método `createContext` de la librería React. El contexto que creemos no va a dejar de ser un componente de React, por ello debe llevar mayúscula al inicio.

El Context que creemos nos va a proporcionar 2 componentes:
- Provider: componente que debe envolver a nuestra aplicación.
- Consumer: nos va a permitir acceder a las render props que declaremos en el Provider.

Creamos el archivo src/Context.js

```javascript
// Importamos createContext de react
import { createContext } from 'react'

// Context es un componente así que lleva mayúscula
const Context = createContext()

// Exportado y listo para usar
export default Context
```

Este Context se usa en el src/index.js para envolver nuestra App

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
// Importamos Context
import Context from './Context'
import { App } from './App'

const client = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
})

ReactDOM.render(
  <Context.Provider value={ { isAuth: false } }>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('root'))
```

Ahora regresamos al App.js

```javascript
// 2. IMportamos el Context
import Context from './Context'

// 1. Eliminamos esta función porque vamos a utilizar en context
// const UserLogged = ({ children }) => {
//   return children({ isAuth: false })
// }
export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
      </Router>
      { /*En lugar del componente <UserLogged> usamos <Context.Consumer> que tiene la misma render prop del componente que estabamos usando antes.*/ }
      <Context.Consumer>
        {
          ({ isAuth }) => isAuth 
            ? <Router> 
                <Favs path='/favs' />
                <User path='/user' />
              </Router>
            : <Router>
                <NotRegisteredUser path='/favs'/>
                <NotRegisteredUser path='/user'/>
              </Router>
        }
      </Context.Consumer>
      <NavBar />
    </>
  )
}
```

Ahora para poder cambiar nuestro contexto de forma dinámica en el Context.js

```javascript
// 1. Importamos React y useState
import React, { createContext, useState } from 'react'

const Context = createContext()

// Creamos un componente Provider
const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const value = {
    isAuth,
    activateAuth: () => {
      setIsAuth(true)
    }
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

// En lugar de exportar el Context completamente
// export default Context
export default {
  Provider,
  Consumer: Context.Consumer
}
```

Ahora en el src/index.js

```javascript
// Ya no necesito <Context.Provider value={ { isAuth: false } }> sino que sin el value
ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('root'))
```

Lo que podemos hacer es que la página de NotRegisteredUser nos de una forma de registrarnos así que cambiamos src/pages/NotRegisteredUser.js

```javascript
import React from 'react'
// 1. Importamos el Context
import Context from '../Context'

export const NotRegisteredUser = () => {
  // 2. Envolvemos lo que renderizamos en el contexto
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          return (
            <form onSubmit={activateAuth}>
              <button>Iniciar sesión</button>
            </form>
          )
        }
      }
    </Context.Consumer>
  )
}
```
## Creación de componente UserForm; y Hook useInputValue

Deberíamos tener un formulario completo para que el usuario pueda iniciar sesión y poner toda su información.

Creamos src/component/UserForm/index.js

```javascript
import React, { useState } from 'react'

export const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return <form onSubmit={onSubmit}>
    <input placeholder='Email' value={} onChange={e => setEmail(e.target.value)} />
    <input placeholder='Password' type='password' value={} onChange={e => setPassword(e.target.value)} />
    <button>Iniciar sesión</button>
  </form>
}
```

Entonces ya la page NotRegisteredUser.js podría quedar así:

```javascript
import React from 'react'
import Context from '../Context'
import { UserForm } from '../components/UserForm'

export const NotRegisteredUser = () => {
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          return (
            <UserForm onSubmit={activateAuth}/>
          )
        }
      }
    </Context.Consumer>
  )
}
```

Ahora modifiquemos un poco el UserForm

```javascript
import React, { useState } from 'react'

// 1. Creamos un hook para simplificar un pcoo como trabajamos con inputs

const useInputVAlue = initialValue => {
  const [value, setValue] = useState(initialValue)
  const onChange = e => setValue(e.target.value)
  return { value, onChange }
}


export const UserForm = ({ onSubmit }) => {
  // Antes:
  // const [email, setEmail] = useState('')
  // Despues:
  const email = useInputValue('')
  // Antes:
  // const [password, setPassword] = useState('')
  // Despues:
  const password = useInputValue('')

  // Se puede usar rest operator {...email} porque estamos pasando las props email.value, email.onChange, igual en password.
  return <form onSubmit={onSubmit}>
    <input placeholder='Email' {...email} />
    <input placeholder='Password' type='password' {...password}/>
    <button>Iniciar sesión</button>
  </form>
}
```

Ahora pues los hooks se pueden sacar a sus propios hooks, creamos el hook useInputValue.js

```javascript
import { useState } from 'react'

export const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue)
  const onChange = e => setValue(e.target.value)
  return { value, onChange }
}
```
## Estilando el formulario

Creamos src/components/UserForm/styles.js

```javascript
import styled from 'styled-components'

export const Form = styled.form`
  padding: 16px 0;
`

export const Input = styled.input`
  border: 1px solid #ccc
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 8px 4px;
  display: block;
  width: 100%
`

export const Button = styled.button`
  background: #8d00ff;
  border-radius: 3px;
  color: #fff;
  height: 32px;
  display: block;
  width: 100%;
  text-align: center;
`

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  padding: 8px 0;
`
```

Ahora el UserForm lo vamos a hacer un poco más general...

```javascript
import React, { useState } from 'react'
import { useInputValue } from '../hooks/useInputValue'
import {Form, Input, Button, Title} from './styles'

//1. Le agregamos un title
export const UserForm = ({ onSubmit, title }) => {
  const email = useInputValue('')
  const password = useInputValue('')


  return <><Title>{title}</Title><Form onSubmit={onSubmit}>
    <Input placeholder='Email' {...email} />
    <Input placeholder='Password' type='password' {...password}/>
    <Button>{title}</Button>
  </Form></>
}
```

Y ahora en UserNotRegistered

```javascript
import React from 'react'
import Context from '../Context'
import { UserForm } from '../components/UserForm'

export const NotRegisteredUser = () => {
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          return (
            <>
            <UserForm title="Registrarse" onSubmit={activateAuth}/>
            <UserForm title="Iniciar Sesión" onSubmit={activateAuth}/>
            </>
          )
        }
      }
    </Context.Consumer>
  )
}
```
## Mutaciones para registro

La mutación es:

```javascript
mutation signup($input: UserCredentials!) {
  signup (input: $input)
} 
```

Las query variables son:

```javascript
{
  "input": {
    "email": "curso-platzi@gmail.com",
    "password": "curso"
  }
}
```

Esto da como respuesta un JWT.

Creamos un container/RegisterMutation.js

```javascript
import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const REGISTER = gql`
  mutation signup($input: UserCredentials!) {
    signup (input: $input)
  } 
`

export const RegisterMutation = ({ children }) => {
  return <Mutation mutation={REGISTER}>
    { children }
  </Mutation>
}
```

Ahora pasamos a NotRegisteredUser.js

```javascript
import React from 'react'
import Context from '../Context'
import { UserForm } from '../components/UserForm'
// 1. Importamos el container
import { RegisteredMutation } from '../container/RegisterMutation'

export const NotRegisteredUser = () => {
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          // 2. Lo queremos utilizar envolviendo el componente UserForm
          return (
            <>
            <RegisterMutation>
              (register) => {
                const onSubmit = () => {
                  const input = { email, password }
                  const variables = { input }
                  // 3. El register es una mutación y devuelve una promesa.
                  register({ variables }).then(activateAuth)
                }
                return <UserForm title="Registrarse" onSubmit={activateAuth}/>
              }
            </RegisterMutation>

            <UserForm title="Iniciar Sesión" onSubmit={activateAuth}/>
            </>
          )
        }
      }
    </Context.Consumer>
  )
}
```

Hay que cambiar el UserForm/index.js

```javascript
export const UserForm = ({ onSubmit, title }) => {
  const email = useInputValue('')
  const password = useInputValue('')

  // 1. Creamos un handleSubmit que ejecuta el onSubmit y eso va también en el onSubmit del form
  const handleSubmit = (event) => {
    // Evitamos que haga su funcionamiento por defecto, que es un post.
    event.preventDefault()
    onSubmit({ email: email.value, password: password.value })
  }
  return <><Title>{title}</Title><Form onSubmit={handleSubmit}>
    <Input placeholder='Email' {...email} />
    <Input placeholder='Password' type='password' {...password}/>
    <Button>{title}</Button>
  </Form></>
}
```

**Utilizando Hooks**

NotRegisteredUser.js

```javascript
import React from 'react'
import Context from '../Context'
import { UserForm } from '../components/UserForm'
import { useRegisterMutation } from '../containers/RegisterMutation'


export const NotRegisteredUser = () => {
    const { registerMutation } = useRegisterMutation()
    
    return (
        <Context.Consumer>
            {
                ({activateAuth}) => {
                    const onSubmit = ({email, password}) => {
                        const input = { email, password }
                        const variables = { input }
                        registerMutation({ variables })
                        .then(activateAuth)
                    }
                    return <>
                        <UserForm onSubmit={onSubmit} title='Registrarse'/>
                        <UserForm onSubmit={activateAuth} title='Iniciar Sesion'/>
                    </>
                }
            }
        </Context.Consumer>
        // <h1>NotRegisteredUser</h1>
    )
}
```

useRegisterMutation.js

```javascript
import { gql, useMutation } from '@apollo/client'

const REGISTER = gql`
    mutation signup($input: UserCredentials!){
        signup(input: $input)
    }
`
export const useRegisterMutation = () => {
  const [registerMutation] = useMutation(REGISTER)

  return { registerMutation }
}
```
## Controlar estado de carga y error al registrar un usuario

No estamos controlando mientras se está cargando, realizando o si tiene error la mutación.

Esto se puede solucionar en NotRegisteredUser.js

```javascript
export const NotRegisteredUser = () => {
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          return (
            <>
            <RegisterMutation>
              {
                // Register es la mutación pero también se puede recibir { data, loading, error }
              (register, { data, loading, error}) => {
                const onSubmit = () => {
                  const input = { email, password }
                  const variables = { input }
                  register({ variables }).then(activateAuth)
                }
                // Aqui podemos agarrar el error message y pasarlo como prop al user form
                const errorMsg = error && 'El usuario ya existe o hay algún problema.'
                // Pasamos disabled y loading para deshabilitar el userform.
                return <UserForm disabled={loading} error={errorMsg} title="Registrarse" onSubmit={activateAuth}/>
              }
              }
            </RegisterMutation>
            <UserForm title="Iniciar Sesión" onSubmit={activateAuth}/>
            </>
          )
        }
      }
    </Context.Consumer>
  )
}
```

Este error hay que incluirlo en el index.js del componente UserForm y pues lo estilamos en los estilos

```javascript
export const Input = styled.input`
  // Otros estilos
  &[disabled] {
    opacity: .3;
  }
`

export const Button = styled.button`
  // Otros estilos
  &[disabled] {
    opacity: .3;
  }
`

export const Error = styled.span`
  color: red;
  font-size: 14px;
`
```

A los Input, Button y Form habría que mandarles un disabled={disabled} en sus props.

## Mutaciones para iniciar sesión

Vamos a hacer el inicio de sesión con un mutation

```javascript
mutation login($input: UserCredentials!) {
  login(input: $input)
}
```

Con estas query variables

```json
{
  "input": {
    "email": "curso-react@platzi.com",
    "password": "curso"
  }
}
```

Creamos el archivo src/container/LoginMutation.js

```javascript
import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const LOGIN = gql`
  mutation login($input: UserCredentials!) {
    login (input: $input)
  } 
`

export const LoginMutation = ({ children }) => {
  return <Mutation mutation={LOGIN}>
    { children }
  </Mutation>
}
```

Ahora en el NotRegisteredUser

```javascript
export const NotRegisteredUser = () => {
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          return (
            <>
            <RegisterMutation>
              {
               // Aquí esta todo el código anterior...
              }
            </RegisterMutation>
            <LoginMutation>
              {
                // Aquí pues ya con render props
                (login, { data, loading, error }) => {
                  const onSubmit = () => {
                    const input = { email, password }
                    const variables = { input }
                    login({ variables }).then(activateAuth)
                  }
                // Aqui podemos agarrar el error message y pasarlo como prop al user form
                  const errorMsg = error && 'La contraseña no es correcta o el usuario no existe'
                  return <UserForm disabled={loading} error={errorMsg} title="Iniciar Sesión" onSubmit={onSubmit}/>
                }
              }
            </LoginMutation>
            </>
          )
        }
      }
    </Context.Consumer>
  )
}
```
## Persistiendo datos en Session Storage

Cada vez que refrescamos nuestra aplicación se pierde la sesión y eso es un problema. Queremos evitar esto y que recuerde la aplicación que este usuario ya esta autentificado.

```javascript
export const NotRegisteredUser = () => {
  return (
    <Context.Consumer>
      {
        ( { activateAuth }) => {
          return (
            <>
            <RegisterMutation>
              {
               // Aquí esta todo el código anterior...
              }
            </RegisterMutation>
            <LoginMutation>
              {
                (login, { data, loading, error }) => {
                  const onSubmit = () => {
                    const input = { email, password }
                    const variables = { input }
                    // Cuando hacemos uso del login mutation nos devuelve una promesa, aquí podemos hacer uso del local storage.
                    login({ variables }).then(({ data }) => {
                      const { login } = data
                      // En el signup sería
                      // const { signup } = data
                      activateAuth(login)
                    })
                  }
                  const errorMsg = error && 'La contraseña no es correcta o el usuario no existe'
                  return <UserForm disabled={loading} error={errorMsg} title="Iniciar Sesión" onSubmit={activateAuth}/>
                }
              }
            </LoginMutation>
            </>
          )
        }
      }
    </Context.Consumer>
  )
}
```

En el Context.js hay que cambiar el metodo activateAuth porque ahora le llega como parametro el token...

```javascript
import React, { createContext, useState } from 'react'

export const Context = createContext()

const Provider = ({ children }) => {
  // El valor inicial de isAuth debe ser una función que busque la data en el sessionStorage.
  // Antes:
  // const [isAuth, setIsAuth] = useState(false)
  // Despues:
  const [isAuth, setIsAuth ] = useState(() => { 
    return window.sessionStorage.getItem('token')
  })
  const value = {
    isAuth,
    // Aquí ahora recibe el token
    activateAuth: ( token ) => {
      setIsAuth(true)
      // Usamos el local storage
      window.sessionStorage.setItem('token', token)
    }
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}
```

Ahora en la consola del browser podrías ver el token

> windows.sessionStorage.token

En las Chrome Tools en la pestaña Application podemos limpiar los storage.

En el NotRegisteredUser podemos utilizar el Hook de useContext.

```javascript
import React, { useContext } from 'react'
import { Context } from '../Context'

export const NotRegisteredUser = () => {
  const { activateAuth } = useContext(Context)

  return (
    { /* Aquí ya no se necesita el componete Context */ }
    <>
      {
        ( { activateAuth } ) => {
          return (
            <>
            <RegisterMutation>
              {
               // Aquí esta todo el código anterior...
              }
            </RegisterMutation>
            <LoginMutation>
              {
                // Aquí esta el código del Login Mutation...
              }
            </LoginMutation>
            </>
          )
        }
      }
    </>
  )
}
```
## Hacer like como usuario registrado

Un JSON Web Token (JWT) es un estándar abierto para crear tokens y asegurar que el envío de datos es confiable y seguro. Van a ser muy útiles para implementar la lógica de los likes pues solamente los usuarios autentificados podrán dar likes.

Un JWT se conforma de 3 partes:

1. Header: Es un objeto que define qué algoritmo y tipo tiene el token.
2. Payload: La información que almacenamos en el token.
3. Verify Signature: Una encriptación del header más el payload más tu llave secreta.

Para utilizar nuestro JWT necesitamso añadirlo al header `authorization` de las peticiones HTTP que hagamos con el texto `Bearer [token]`

La mutación likePhoto debe hacerse con un JWT

```javascript
mutation likePhoto {
  likePhoto(input: { id: 1 }) {
    id,
    liked,
    likes
  }
}
```

El JWT va en el HTTP Header

```json
{
  "authorization": "Bearer yeJhbGciOiJi..."
}
```

En el archivo ToggleLikeMutation.js teníamos la mutación likeAnonymousPhoto:

```javascript
import React from 'react'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

// Ahora ya no es likeAnonymousPhoto
const LIKE_PHOTO = gql`
mutation likePhoto($input: LikePhoto!) {
  likePhoto(input: $input) {
    id,
    liked,
    likes
  }
}
`
```

En el index.js de la aplicación:

```javascript
// 1. Donde creamos el ApolloClient aparte de la uri necesita un request que es una función
const client = new ApolloClient({
  uri: 'https://petgram-server.midudev.now.sh/graphql',
  request: operation => {
    // 2. Buscamon el token en el sessionStorage
    const token = windows.sessionStorage.getItem('token')
    // 3. Si hay token entonces devolvemos el Bearer token si no pues devolvemos vacío.
    const authorization = token ? `Bearer ${token}` : ''
    // 4. Configuramos el contexto con la autorización en el header
    operation.setContext({
      headers: {
        authorization
      }
    })
  }
})
```

Ahora, en el componente PhotoCard debemos quitar cualquier cosa que tenga que ver con el local storage para el like...

Ahora... los JWT expiran entonces para asegurarnos de que no tengamos problemas cuando expire el token, esto se hace siempre en el index.js de la aplicación.

```javascript
const client = new ApolloClient({
  uri: 'https://petgram-server.midudev.now.sh/graphql',
  request: operation => {
    const token = windows.sessionStorage.getItem('token')
    const authorization = token ? `Bearer ${token}` : ''
    operation.setContext({
      headers: {
        authorization
      }
    })
  },
  // 1. Hay que añadir un onError para cuando el token expire...
  onError: error => {
    const { networkError } = error
    if (networkError && networkError.result.code === 'invalid_token') {
      window.sessionStorage.removeItem('token')
      window.location.href = '/'
    }
  }
})
```

**Esto viene de un aporte**

```javascript
import { ApolloProvider, ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    operation.setContext({
      headers: {
        authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    })
  }
  return forward(operation);
})

const errorMiddleware = onError(
  ({ networkError }) => {
    if (networkError && networkError.result.code === 'invalid_token') {
      sessionStorage.removeItem('token')
      window.location = '/user'
    }
  }
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    errorMiddleware,
    authMiddleware,
    new HttpLink({
      uri: 'https://petgram-server-hmcpzh3ov.vercerl.app/graphql',
    })
  ])
})
```
## Mostrar favoritos y solucionar fetch policy

En la ruta favs debería mostrar los favoritos, con graphQl tenemos una forma de recuperar los favoritos:

```javascript
query getFavs {
  favs {
    id
    categoryId
    src
    likes
    userId
  }
}
```

Con el HTTP Header

```json
{
  "authorization": "bearer yeJhbGciOiJi..."
}
```

Creamos un nuevo Container en src/container/GetFavorites.js

```javascript
import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const GET_FAVS = gql`
  query getFavs {
  favs {
    id
    categoryId
    src
    likes
    userId
  }
}
`

const renderProp = ({ loading, error, data }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  const { favs } = data
  return favs.map(fav => <img key={fav.id} src={fav.src} />)
}

export const FavsWithQuery = () => (
  <Query query={GET_FAVS}>
    { renderProp }
  </Query>
)
```

Ahora en Favs.js

```javascript
import React from 'react'
import { FavsWithQuery} from '../container/GetFavorites'

export const Favs = () => (
  <>
    <h1>Favs</h1>
    <FavsWithQuery />
  </>
)
```

Aqui solo se ve la lista de imagenes... pero queremos utilizar hacerlo que se vea mejor, así que creamos un componente llamado src/components/ListOfFavs/index.js y un styles.js

```javascript
import styled from 'styled-components'
import { Link as LinkRouter } from '@reach/router'

export const Link = styled(LinkRouter)`
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, .3);
  display: inline-block;
  margin: 1%;
  overflow: hidden;
  position: relative;
  width: 31.33%;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`

export const Grid = styled.div`
  padding-top: 32px;
`

export const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  position: absolute;
`
```

```javascript
import React from 'react'
import { Grid, Image, Link} from './styles'

export const ListOfFavs = ({favs}) => {
  return <Grid>
    {
      favs.map(fav => <Link key={fav.id} to={`/detail/${fav.id}`}>
          <img src={fav.src} />
        </Link>
      )
    }
  </Grid>
}
```

Ahora simpre en el GetFavorites.js

```javascript
import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
// 1. Importamos aquí el list of favs
import { ListOfFavs } from '../components/ListOfFavs'

const GET_FAVS = gql`
  query getFavs {
  favs {
    id
    categoryId
    src
    likes
    userId
  }
}
`

const renderProp = ({ loading, error, data }) => {
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  const { favs } = data
  // 2. Ahora podemos utilizar ListOfFavs aquí
  return <ListOfFavs favs={favs} />
}

export const FavsWithQuery = () => (
  { /* fetchPolicy='network-only' es para que Apollo no use la cache... sino que siempre busque tambien se puede usar fetchPolicy=‘cache-and-network */ }
  <Query query={GET_FAVS} fetchPolicy='network-only'>
    { renderProp }
  </Query>
)
```

**Ahora con hooks**

```javascript
import { useQuery } from '@apollo/react-hooks';
import qgl from 'graphql-tag';


const GET_FAVORITES = qgl`
query getFavs {
    favs {
      id
      categoryId
      src
      likes
      userId
    }
  }
`;


const useGetFavorites = () => {
  const { data, error, loading } = useQuery(GET_FAVORITES, { fetchPolicy: 'cache-and-network' });
  return { data, loading, error };
};


export default useGetFavorites;
```

## Cerrar Sesión

Ahora pues regresamos al Context.js

```javascript
import React, { createContext, useState } from 'react'

const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth ] = useState(() => { 
    return window.sessionStorage.getItem('token')
  })
  const value = {
    isAuth,
    activateAuth: ( token ) => {
      setIsAuth(true)
      window.sessionStorage.setItem('token', token)
      // La siguiente linea viene de un comentario... 
      __APOLLO_CLIENT__.resetStore()
    },
    // Le agregamos para quitar la autenticación
    removeAuth: () => {
      setIsAuth(false)
      window.sessionStorage.removeItem('token')
      // La siguiente linea viene de un comentario... 
      __APOLLO_CLIENT__.resetStore()
    }
  }

  // Resto del código
}
```

Ahora en pages/User.js

```javascript
import React, { useContext } from 'react'
import { Context } from '../Context'

export const User = () => {
  const { removeAuth } = useContext(Context)
  return <>
    <h1>User</h1>
    <button onClick={removeAuth}>Cerrar sesión</button>
  </>
}
```

Ahora creamos un componente llamado SubmitButton en src/components/SubmitButton

En styles.js

```javascript
import styled from 'styled-components'

export const Button = styled.button`
  background: #8d00ff;
  border-radius: 3px;
  color: #fff;
  height: 32px;
  display: block;
  width: 100%;
  text-align: center;
  &[disabled] {
    opacity: .3;
  }
`
```

En index.js

```javascript
import React from 'react'
import { Button } from './styles'

export const SubmitButton = ({ children, disabled, onClick }) => {
  return <Button disabled={disabled} onClick={onClick}>{children}</Button>
}
```

Y ahora en el componente UserForm y User.js puedo utilizar directamente el componente SubmitButton de los componentes en lugar de los estilos...

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
