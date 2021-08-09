# Introducción a Gatsby

## ¿Qué es Gatsby?

Gatsby es un framework open source increiblemente rápido, tanto en desarrollo como en producción. Trabaja con un stack innovador, ya que integra tecnologías como React y GraphQL con diferentes fuentes de información como Wordpress o Sanity.io.

Gatsby usa GraphQL para recolectar la información de nuestro sitio web desde diferentes fuentes: APIs, CMS o nuestro sistema de archivos. Y teniendo lista la información, renderiza nuestras vistas en React.js para construir sitios estáticos muy optimizados.

Entre muchas otras aplicacioens, la documentación oficial de React.js está construida con Gatsby: Reactjs.org

## ¿Por qué Gatsby? Seguridad y Velocidad

En cada nueva aplicación o proyecto debemos hacer una decisión de que tecnologías o bibliotecas utilizar. Vue o React para crear una SPA, una SPA tiene un solo archivo html y muchos archivos javascript que Webpack empaqueta para crear un bundle de nuestra aplicación. Esto causa una carga inicial lenta pero una navegación muy fluida después de la carga. Además de que perdemos punteo en buscadores.

Hay técnicas de para solventar estas desventajas como es el SSR. Hay Herramientas que hacen SSR para ambas Vue y React como serían Nuxt y Next. El SSR nos dá mejor SEO y mejor carga inicial pero la navegación se vuelve un poco más lenta.

Gatsby funciona como un generador de sitios estáticos, se apoya de plugins para traer información y agregar funcionalidad. Utilizar GraphQL y React para generar nuestra vista. Cada ruta forma parte de un componente, luego Gatsby y Webpack empaquetan para crear un sitio estático. Gatsby utiliza Node para que con React, GraphQL y Webpack generé páginas estáticas.

Gatsby se apoya de los plugins para obtener datos de diferentes fuentes como puede ser Firebase, una API (Rest o GraphQL), CMS (Wordpress, Sanity o Contentfull). Estas conexiones llenas nuestra aplicación de contenido pero la conexión se hace en tiempo de construcción.

WordPress - (Manejo manual del DOM, Rendimiento a mano, Refresh para ver los cambios)

Gatsby - VirtualDOM, Componentes, HotReloading, Code Splitting e imágenes responsivas.

El despliegue de las aplicaciones con Gatsby es simple, dado que es un sitio estático podemos alojarlo en Vercel, Netlify o Github Pages.

Como Gatsby accede a la información en tiempo de construcción y nos genera páginas con la información ya incluida. Generandonos páginas con todo lo que necesita para funcionar nuestra aplicación.

## Diferencias entre SPA, SSR y Gatsby

Gatsby no solo es rápido, también es seguro.

Para entenderlo mejor debes conocer las diferencias entre Server Side Render y Single Page Applications.

**React en Single Page Applications**
Este tipo de aplicacioines es muy común cuando trabajamos con React.js.

Las SPAs son páginas que siempre cargan el mismo archivo HTML. Este, a su vez, carga un archivo gigante de JavaScript con toda la lógica de nuestra aplicación (por ejemplo, usando React.js).

Estas páginas tienen una carga inicial muy lenta, ya que no podemos ver la información importante hasta que termine de cargar el archivo de JavaScript. Pero una vez termina la carga inicial, las SPAs son muy rápidas, incluso al navegar pro difernetes secciones de nuestra aplicación.

Como el archivo de JavaScript tiene todo el código de nuestra aplicación, el tiempo de navegación pasa de segundos a milisegundos. No necesitamos hacer más requests al servidor. Pero en muchos casos debemos esperar algunos segundos para que termine la carga inicial y podamos utilizar la aplicación.

**React en Server Side Rendering**
Diferentes herramientas como Next.js nos ayudan a utilizar React en el servidor para no afectar el SEO y disminuir el tiempo de carga de nuestra aplicación, todo esto sin perder interactividad.

El Server Side Rendering tradicional es muy común en aplicaciones construidas con WordPress, por ejemplo. Aunque estas páginas tienen un tiempo de carga muy corto, la carga debe repetirse cada vez que el usuario navega por nuestra aplicación, es decir, casi todas las veces que damos click en un link o botón.

Las herramientas de SSR con React.js son muy conscientes de este problema, por lo que convierten nuestra apolicación en una SPA inmediatamente después de que termina la carga inicial. Es decir, utilizan SSR en la primera carga y luego se convierten en SPAs para mejorar la navegación e interactividad de nuestro sitio.

**React en Gatsby: lo mejor de ambos mundos**
Gatsby es un generador de sitios estáticos. Esto quiere decir que en vez de renderizar desde el servidor, lo que sucede cada vez que un usuario entra a nuestra aplicación, Gatsby renderiza el contenido solo una vez en la etapa de desarrollo. Nuestro servidor no debe renderizar todo el tiempo, solo envía el HTML inicial (ya renderizado) para que más adelante el navegador se encargue de cargar el código JavaScript que nos ayudará a que nuestra página funcione como una SPA.

De esta forma obtendremos todos los beneficios: por ser una SPA, seguimos teniendo una alta interactividad y navegación muy rápida, y además conseguimos una carga inicial muy rápida, en algunos casos incluso superor a la del SSR.

**Gatsby vs. Wordpress**
Gatsby también nos ayuda a consumir información desde un CMS como Wordpress. De esta forma podemos editar nuestro contenido desde una plataforma que ya conocemos sin que esto afecte al rendimiento de nuestra aplicación.

**Gatsby**

- Utiliza el Virtual DOM (más velocidad)
- Componentes
- Hot Reloading
- Code Splitting e imágenes responsivas

**WordPress**

- Manejo manual del DOM
- Debemos copiar y pegar para reutilizar código (aunque las buenas prácticas nos pueden ayudar bastante)
- Refresh para ver los cambios

# Preparando el entorno

## Requisitos previos y herramientas de desarrollo

Cursos: Javascript, NodeJS, npm, React, GraphQL.

Plugins: Prettier, ESLint, ES7 React/Redux/GraphQL/React-Native snippets.

## Gatsby y Gatsby CLI y Starters

> mkdir primersitiogatsby
>
> cd primersitiogatsby
>
> npm init -y
>
> code .
>
> npm install --save react react-dom gatsby

Agregamos un script en el package.json

```json
"scripts": {
    "develop": "gatsby develop"
}
```

> mkdir -p src/pages
>
> touch src/pages/index.js

```javascript
import React from "react";

const Index = () => {
  return (
    <div>
      <h1>Mi primer sitio de Gatsby</h1>
    </div>
  );
};

export default Index;
```

> npm run development

Lo anterior sería para crear un proyecto a mano pero podemos utilizar el gatsby cli

> npm i -g gatsby-cli
>
> gatsby new gatsbycliproject
>
> cd gatsbycliproject
>
> gatsby develop

Gatsby tiene una comunidad increible y tambíen existen los starters, que son proyectos que ya vienen configurados, solo para agregar nuestro contenido.

> gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog

## Configuración de ESLint

**¿Qué es ESLint?**
ESLint es un herramienta de linting para Javascript. Un linter es un programa que se encarga de revisar el código escrito y que es capaz de señalar errores y posibles bugs que podemos corregir para mejorar nuestros programas, de esta manera tenemos acceso a los errores incluso antes de que sucedan.

**¿Por qué usar ESLint?**
Gracias a que JavaScript es un lenguaje dinámico y débilmente tipado, expecialmente propenso a errores por parte del programador es que ESLint es muy útil. Esta herramienta nos ayuda a prevenir la manera de antaño para encontrar errores en este lenguaje.

El objetivo de ESLint es encontrar errores mucho antes de que sucedan, de manera automática y sin necesidad de ejecutar el código. Esto nos permite reparar los errores muy rápido y agilizar nuestro tiempo de desarrollo.

ESLint está basado en reglas configurables y viene con un conjunto prestablecido que podemos como punto de inicio y más adelante poder habilitar o deshabilitar ciertas reglas considerando nuestro estilo de código o incluso una convención en nuestro equipo de desarrollo.

**ESLint y Gatsby**
Gatsby incluye una configuración integrada de ESLint. Para la mayoría de los usuarios, la configuración incorporada de ESLint es todo lo que necesitan. Sin embargo, si tienes una configuración personalizada o una convención en tu equipo de trabajo podemos configurarlo.

**Instalación**
Ya que Gatsby viene con ESLint configurado de base podemos añadir nuestra configuración inicializnado desde la herramienta en node_modules

> ./node_modules/.bin/eslint --lint

Este comando va a lanzar un proceso de ayuda para configurar ESLint paso a paso, revisemos los elementos:

1. How would you like to use ESLint?
   - To check syntax and find problems
2. What type of modules does your project use?
   - JavaScript modules (import/export)
3. Which framework does your project use?
   - React
4. Where does your code run?
   - Browser
5. What format do you want your config file to be in?
   - JavaScript
6. The config that you've selected requires the following dependencies: eslint-plugin-react@latest eslint@lates. Would you like to install them now with npm?
   - Yes

El resultado de este proceso es un archivo llamado .eslint.js con el siguiente contenido

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
```

Vamos a cambiar la propiedad extends, que nos ayuda a heredar una serie de configuraciones establecidas y recomendadas. El proceso de init nos ayudó a instlar un plugin para react, vamos a heredar de él en extends.

```javascript
{
    extends: ["eslint:recommended", "plugin:react/recommended"]
}
```

Por último, vamos a revisar la opción de rules, esta sección nos permite configurar reglas en particular. Podemos habilitar o deshabilitar reglas para el linter, por ejemplo, que nos notifique con un error o advertencia si no colocamos los punto y coma en el proyecto.

```javascript
{
  rules: {
    "semi": "warning",
  }
}
```

Gracias a que tenemos configurado el plugin de React y React busca mejores prácticas también hay reglas orientadas al desarrollo de React, podemos modificarlas de igual manera, por ejemplo, remover el linter para prop-types:

```javascript
{
  rules: {
    "semi": "warning",
    "react/prop-types": 0,
    "react/display-name": 0,
  }
}
```

# Fundamentos de Gatsby

## Presentación y Estructura de Archivos de nuestro proyecto: Platziswag

El proyecto fue iniciado con el comando gatsby new.

En el package.json están las dependencias y los comandos para trabajar con gatsby.

En el archivo gatsby-config.js hay configuración importante del sitio de Gatsby, entre ellas metadatos. Y allí pues podemos cambiar el titulo, descripción y autor del proyecto. También aquí tenemos los plugins y su configuración.

En el archivo gatsby-browser.js, mucho del código que escribimos sucederá en el servido y mucho en el cliente. gatsby-browser tienen metodos para ejecutar algo cuando mi proyecto está en el cliente. Podemos generar vistas, agregar redux, agregar google maps.

En el archivo gatsby-node.js puedo tomar piezas de graphql y generar vistas. Y consumir una api y darsela a grapql para que forme parte de la info de mi sitio.

En el archivo gatsby-ssr.js se configura la lógica que sucede en tiempo de build, cuando estoy preparando mi sitio y voy a entregarselo a mi cliente. Aquí también puedo colocar mi store de redux o context api.

Y pues también está el src/ y sus carpetas con componentes, imagenes, pages, styles y utils.

https://github.com/Jossdz/Gatsby-platzi

## Ecosistema de plugins

Los plugins son piezas de código de Gatsby que alguien más de la comunidad escribió por nosotros para que podamos configurar nuestra aplicación lo más ágil y rápido posible.

Los plugins pueden ayudarnos de 3 formas:

- **Plugins como Componentes**: Cuando instalamos el plugin obtenemos un componente que debemos integrar a nuestra aplicación para obtener algún beneficio.

- **Plugins como Funcionalidades**: Nos ayudan a transformar información o implementar una funcionalidad en concreto. Por ejemplo: gatsby-image nos ayuda a crear nuevas versiones de nuestras imágenes con menor calidad para mejorar la carga inicial de nuestro sitio web.

- **Plugins como Fuentes de Datos**: Estos plugins utilizan Node.js y GraphQL para construir la información de algún lugar o herramienta como Firebase, WordPress, APIs Rest, entre otras. Como gatsby-source-filesystem para tomar la información que tenemos en alguna carpeta y ponerlo disponible en graphql.

## Usando React para manejar la parte visual e interactiva de nuestra aplicación

Es necesrio instalar styled-components

> npm install --save installed-components

# Creando la vista con React

## Router en Gatsby y Componente Link

Gatsby nos facilita mucho la creación de páginas de nuestra aplicación. Solo debemos crear un archivo en la carpeta src/pages con el nombre de la página y automáticamente tendremos esa ruta disponible con el contenido del archivo.

Por ejemplo: Podemos ver el contenido del archivo src/pages/index-..js en la ruta / y el contenido del archivo src/pages/about.js en la ruta /about.

Además, Gatsby nos provee un componente Link para navegar entre nuestra páginas. Funciona muy parecido a una etiqueta a, pero al dar click no recargaremos la página ni haremos peticiones al servidor, en cambio , podremos visualizar inmediatamente el contenido de la página a la cual queremos navegar. Todo esto gracias a que Gatsby tienen todas las funcioanlidades de una Single Page Application.

Recuerda que estas funcioanlidades del componente Link solo funcionan en las páginas de nuestras aplicaciones con Gatsby. NO podemos usarlo para navegar a otras aplicaciones.

```javascript
import { Link } from "gatsby";
```

Creamos src/pages/gracias.js

```javascript
import React from "react";
import { SEO } from "../components";
import { Button, Purchase } from "../styles/components";
import { Link } from "gatsby";

function gracias() {
  return (
    <div>
      <SEO title="Compra Exitosa" />
      <Purchase>
        <h2>Compra Exitosa</h2>
        <p>Espero que disfrutes tu swag, lucel con orgullo</p>
        <p>¡Te esperamos de vuelta, no pares de aprender!</p>
        <span role="img" aria-label="emoji">
          ❤
        </span>
        <Link to="/">
          <Button>Volver al catalogo</Button>
        </Link>
      </Purchase>
    </div>
  );
}

export default gracias;
```

## Layout en Gatsby

# Graphql en Gatsby

## ¿Cómo funciona GraphQL en Gatsby?

## Accediendo a nuestros datos en Gatsby desde GraphQL

## Queries, Edge (conexiones) y Nodos en Gatsby

## Consultas en GraphQL desde React

# Usando plugins en Gatsby

## Instalación y configuración de plugins

## Imágenes como fuente de datos

## Plugins de transformación

## Estilizando nuestros componentes con styled-components

## Estilos Globales con styled-components

# Stripe checkout

## Introducción a la API de Stripe Checkout

## Agregando productos a nuestra tienda en linea

## Productos en React

# Generando páginas programáticamente

## Creando páginas en función de los datos

## Manejo de Gatsby Templates

## Terminando la Vista de Detalle de los Productos

## StaticQuery vs. useStaticQuery

## Construyendo el Carrito de Compras: useContext

## Construyendo el Carrito de Compras: Vista

## Construyendo el Carrito de Compras: Agregar productos al carrito

## Comprando productos

# Gatsby a producción

## Gatsby build para compilar nuestro proyecto

## Deploy a Netlify
