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

Los Layouts son componentes que nos ayudan a presentar un mismo estilo visual en todas las páginas de nuestra aplicación. Envuelven el contenido de nuestra página para mostrar, además del contenido, otros componentes como el Menú, Footer, entre otros.

Por defecto, debemos importar nuestro componente Layout desde todos los archivos de nuestras páginas, de otra forma solo veremos el contenido de la página sin los componentes que configuramos en el Layout.

Afortunadamente, Gatsby nos permite configurar componentes que envuelvan todas nuestras páginas al momento de hacer ender en el navegador. Para esto debemos configurar la opción exports.wrapRootElement del archivo gatsby-browser.js:

```javascript
// Importamos React así por ser con node
const React = require("react");
// Importamos el componente Layout y como tiene un export default
const Layout = require("./src/components/layout").default;

exports.wrapRootElement = ({ element }) => <Layout>{element}</Layout>;
```

Luego hay que reiniciar el servidor para que actualice la configuración.

Tuvimos que borrar el Layout de cada una de las páginas y modificar nuestro Layout para darles los estilos que queremos. Luego configuramos el archivo gatsby-browser.js que como es de Node entonces lo importamos todo con require.

# Graphql en Gatsby

## ¿Cómo funciona GraphQL en Gatsby?

GraphQL es un lenguaje tipado que facilita la comunicación entre servicios, pero los datos de nuestra aplicación pueden venir de diferentes lugares, así que GraphQL no tiene forma de acceder a todos estos datos para que podamos consumirlos desde un mismo lugar.

Gatsby recolecta toda la información de nuestra aplicación mientras desarrollamos en local y la almacena en un servidor de GraphQL interno. Luego, en la etapa de compilación, justo antes de pasar a producción , Gatsby guardará los datos de GraphQL junto al código, de esta forma los tendremos disponibles sin necesidad de hacer peticiones a las fuentes de datos originales.

Esto es por lo que se considera a Gatsby muy seguro pues las consultas suceden en tiempo de build y se generan vistas con la data ya cargada.

## Accediendo a nuestros datos en Gatsby desde GraphQL

Al iniciar nuestro servidor de desarrollo con Gatsby también iniciamos un servidor de GraphQL que almacena todos los datos de nuestra aplicación, incluyendo los datos que obtenemos por medio de los plugins.

Podemos visualizar todos estos datos y su documentación entrando a: `localhost:8000/__graphql`

Con grapql podemos obtener las imágenes en varios tamaños y formatos, también la data (digamos los productos) puede ir al servicio que tiene mi data (imagenes, info, etc)

En la url de graphql puedo probar queries y explorar, pero también tengo acceso a documentación autogenerada de graphql esta data de graphql normalmente se carga o se configura su carga desde el archivo gatsby-config.js pues allí están los plugins que cargan nuestros datos, de nuestro sistema de archivos, imagenes, etc.

Con Ctrl + Space me da recomendaciones de que más puedo pedir.

```graphql
query {
  allFile {
    totalCount
  }
}
```

## Queries, Edge (conexiones) y Nodos en Gatsby

Al trabajar con plugins de fuente de datos debemos entender dos conceptos:

- **Edges**: No podemos consumir la información de estos plugisn de la misma forma que otras consultas de GrapQL. En estos casos, la propiedad edges nos hace referencia a la conexión entre estos plugins y el servidor de GraphQL.
- **Nodos**: Son los elementos individuales de información que obtenemos al hacer una consulta con la propiedad edges.

Por ejemplo: Para conseguir la información de nuestras imágenes (guardadas en la carpeta src/images) usamos el plugin `gatsby-source-filesystem`.

En este caso podemos acceder a la información de nuestras imágenes con la siguiente consulta de GraphQL:

```graphql
query {
  allFile {
    edges {
      node {
        name
        relativePath
      }
    }
  }
}
```

La ruta que obtenemos con la propiedad relativePath es relativa a la propiedad path de nuestra configuración del plugin `gatsby-source-filesystem` en el archivo `gatsby-config.js`

Otro ejemplo: Podemos acceder a la metadata que configuramos en el archivo `gatsby-config.js` ejecutando la siguiente consulta en GraphQL:

```graphql
query {
  allSite {
    edges {
      node {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  }
}
```

## Consultas en GraphQL desde React

Desde las vistas en React debemos importar graphql desde gatsby:

```javascript
import { graphql } from "gatsby";
```

Exportar nuestra consulta con el nombre de query:

```javascript
export const query = graphql`
  query NUESTRA_CONSULTA {
    #...
  }
`;
```

Y consumir la información de la propiedad data que obtenemos automáticamente en el componente de nuestra página:

```javascript
export default function NuestroPage({ data }) {
  console.log(data.allSite.edges[0].node.siteMetadata);
  return;
}
```

Estas consultas solo podemos hacerlas desde el componente página de nuestraaplicación, es decir, aquellos archivos dentro de src/pages.

Por ejemplo, en src/pages/index.js

```javascript
// 1. Importamos graphql de gatsby
import { Link, graphql } from "gatsby";

// 2. Exportamos un query de description del la metadata del sitio
export const query = graphql`
  query GET_DESCRIPTION {
    allSite {
      edges {
        node {
          siteMetadata {
            description
          }
        }
      }
    }
  }
`;

// 3. Ese query que exportamos, su resultado lo vamos a recibir como props en le componente IndexPage

const IndexPage = ({ data }) => {
  // 4. Aquí hicimos un console log para ver que trae el data que vendría dentro del query.
  // console.log(data.allSite.edges[0].node.siteMetadata.description)

  // 5. Finalmente lo que necesitamos del query es la description que se la pasamos al componente Jumbo
  return (
    <>
      <Jumbo
        description={data.allSite.edges[0].node.siteMetadata.description}
      />
    </>
  );
};

export default IndexPage;
```

# Usando plugins en Gatsby

## Instalación y configuración de plugins

Vamos a usar el plugin `gatsby-plugin-typography` para manejar las fuentes de nuestro proyecto. Este plugin nos ayuda a integrar la librería Typography.js, por lo que debemos instalar el plugin y la librería base. Esta librería fue creada por Kyle Mathews, uno de los creadores y desarrolladores de Gatsby.

**Instalación**:

> npm install gatsby-plugin-typography react-typography typography

**Configuración**:

En gatsby-config.js

```javascript
module.exports = {
  siteMetadata: {
    /* ... */
  },
  plugins: [
    /* ... */
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    /* ... */
  ],
};
```

Y en src/utils/typography.js

Esto viene del sitio https://kyleamathews.github.io/typography.js/

```javascript
import Typography from "typography";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Lato", "Helvetica Neue", "Arial"],
  bodyFontFamily: ["Open Sans", "Roboto", "Georgia"],
});

export default typography;
```

Con esta configuración asignamos tamaños y fuentes personalizadas diferentes para nuestros elementos. Los estilos cambiarán dependiendo de dónde estén.

## Imágenes como fuente de datos

Exploramos un poco los archivos que tenemos en el proyecto. Digamos en publicURL nos da la ruta que la imagen tendrá en producción luego del build.

```graphql
query {
  allFile {
    edges {
      node {
        id
        relativePath
        size
        publicURL
      }
    }
  }
}
```

## Plugins de transformación

Gatsby nos ofrece plugins de transformación que agregan funcionalidad a nuestro proyecto. Tenemos gatsby-transformer-sharp y gatsby-plugin-sharp.

**gatsby-transformer-sharp**:

Se encarga de crear nuevas versiones de nuestras imágenes con diferentes tamaños, formatos (.webp, .png, entre otros) y calidad.

**gatsby-image**:

Utiliza la información de gatsby-transformer-sharp para cargar las versiones más liviandas de nuestras imágenes (utilizando el tamaño y formato que mejor se adapten al usuario) y luego cambiarlas por las versiones actualizadas de mejor calidad, todo esto con el fin de mejorar el tiempo de carga inicial de nuestra aplicación.

Podemos probar el query

```graphql
{
  allFile {
    edges {
      node {
        childImageSharp {
          id
          fluid(maxWidth: 500) {
            src
            srcWebp
            sizes
            originalImg
            base64
          }
        }
      }
    }
  }
}
```

El Query que vamos a utilizar es:

```graphql
{
  file(relativePath: { eq: "icon.png" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        src
        srcWebp
      }
    }
  }
}
```

Para usarlo solo debemos seguir los siguientes pasos:

1. Importar useStaticQuery y graphql desde gatsby:

```javascript
import { graphql, useStaticQuery } from "gatsby";
```

2. Importar GatsbyImage y getImage desde gatsby-plugin-image:

```javascript
import { GatsbyImage, getImage } from "gatsby-plugin-image";
```

3. Utilizar graphql para crear una consulta en la propiedad query de useStaticQuery y pasarle la imagen al componente GatsbyImage:

```javascript
const data = useStaticQuery(graphql`
  query GET_IMAGE {
    icon: file(relativePath: { eq: "icon.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1000
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`);
const image = getImage(data.icon);
return <GatsbyImage image={image} alt="Icon" />;
```

## Estilizando nuestros componentes con styled-components

Styled Components es un herramienta que nos ayuda a usar lo mejor de CSS en JavaScript y React:

Para usar esta herramienta solo debes seguir los siguientes pasos:

1. Instalar styled-components:

> npm install --save styled-components

2. Importar sylted desde styled-components:

```javascript
import styled from "styled-components";
```

3. Crear un componente estilizado siguiendo la sintaxis de styled components (styled.etiquetaDeHtml):

```javascript
const Button = styled.button`
  /*Estilos CSS para nuestro botón*/
`;
```

4. Podemos configurar las propiedades de CSS usando las props de todos nuestros componentes en React:

```javascript
const Button = styled.button`
  /* Estilos CSS para nuestro botón */

  color: ${(props) => props.color || "black"};
`;
```

5. También podemos escribir los estilos usando variables o funciones de JavaScript

```javascript
const colors = {
  green: "#98ca3f",
  orange: "#f8b7c1",
};

function GetColor(color) {
  return colors[color];
}

const Button = styled.button`
  /* Estilos CSS para nuestro botón */

  color: ${colors.green};
  background-color: ${GetColor("green")};
`;
```

6. También podemos configurar estilos con selectores anidados

```javascript
const Button = styled.button`
  /* Estilos CSS para nuestro botón */

  color: ${(props) => props.color || "black"};

  &:hover {
    /* Estilos CSS para nuestro botón cuando hacemos hover */
  }
`;
```

7. Finalmente, podemos usar nuestros componentes estilizados como cualquier otro componente en React:

```javascript
const IndexPage = props => (
  {/* ... */}

  <Button color="gray">¡Comprar!</Button>

  {/* ... */}
);
```

## Estilos Globales con styled-components

Al estilizar componentes con Styled Components estamos definiendo estilos únicamente de los componentes creados con styled, no al resto de nuestra aplicación (a pesar de que trabajaemos con otras etiquetas HTML iguales a lass que definimos en los componentes estilizados con styled):

```javascript
const StyledButton = styled.button`
  color: red;
`;

const App = () => (
  <>
    <StyledButton>
      El color de este boton es RED
    StyledButton>

    <button>Este botón no tiene estilosbutton>

    <button className="boton-color-violeta">
      Este botón tampoco tiene estilos
    button>

);
```

Sin embarg, Styled Components también nos permite crear estilos globales: Estilos que podemos aplicar a todas las clases o etiquetas HTML de la aplicación.

1. Importar createGlobalStyle de style-components:

```javascript
import { createGlobalStyle } from "styled-components";
```

2. Crea un nuevo componente con los estilos globales de tu aplicación usando createGlobalStyle:

```javascript
export const GlobalStyles = createGlobalStyle`
  button {
    color: green:
  }

  button.boton-color-violeta {
    color: purple;
  }
`;
```

3. Envuelve toda tu aplicación en el componente de estilos globales:

```javascript
const App = () => (
  <>
    <GlobalStyles />
  </>
);
```

4. Puedes usar el componente con estilos globales como parte de tu layout en gatsby-browser.js

```javascript
const GlobalStyles = require("src/styles");

exports.wrapRootElement = ({ element }) => (
  <>
    <GlobalStyles />
    <Layout>element}</Layout>
  </>
);
```

# Stripe checkout

## Introducción a la API de Stripe Checkout

La API de Stripe Checkout nos ayudará a alojar, gestioanr y procesar los pagos de nuestros productos:

1. Crea una cuenta en dashboard.stripe.com/register
2. Elige la opción de "Usar la API de Stripe"
3. Confirma tu correo e inicia sesión
4. Crea tus llaves privadas en la sección de "Consigue tus claves de prueba de API"
5. Guarda tus llaves en el archivo .env.development. Recuerda que no debes publicar este archivo en ninguna parte, nisiquiera en GitHub. Puedes añadirlo a tu lista de archivos ignorados en .gitignore para segurarte de nunca añadirlo a tus commits.
6. Habilita la opción de Checkout desde Aplicaciones de Stripe -> Configuración de checkout -> Habilitado/Deshabilitado
7. Termina la configuración de tu cuenta en dashboard.stripe.com/account

https://stripe.com/docs/payments/checkout

El archivo .env.development tiene las siguientes variables:

```
STRIPE_SK=''
STRIPE_PK=''
SUCCESS_REDIRECT='http://localhost:8000/gracias'
CANCEL_REDIRECT='http://localhost:8000/cancelada'
```

## Agregando productos a nuestra tienda en linea

1. Primero tenemos que agregar productos en el dashboard de stripe. En la parte de Product. Además debemos agregarle la metadata a nuestros productos...

- img: https://i.postimg.cc/xTB1pCnX/hoodie.png
- description: Esta sudadera te mantendrá calentito mientras estudias.
- wear: true

Para usar Stripe desde nuestra aplicación con gatsby necesitamos instalar los siguientes plugins...

> npm install --save gatsby-source-stripe gatsby-plugin-stripe

Creo que gatsby-plugin-stripe no muy existe entonces solo sería

> npm install --save gatsby-source-stripe

Además la líbrería dotenv nos permitirá acceder a nuestras variables de entorno para usar las llaves privadas de stripe

> npm i dotenv

Luego de esto debemos añadir los plugins al archivo gatsby-config.js

```javascript
require("dotnev").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    /* ... */
  },
  plugins: [
    /* ... */
    `gatsby-plugin-stripe`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: [`Price`],
        secretKey: process.env.STRIPE_SK,
      },
    },
    /* ... */
  ],
};
```

De esta forma tendremos disponibles los productos de Stripe desde el servidor de GraphQL en Gatsby:

```graphql
{
  allStripePrice {
    edges {
      node {
        id
        unit_amount
        product {
          id
          name
          metadata {
            description
            img
            wear
          }
        }
      }
    }
  }
}
```

## Productos en React

Creamos un nuevo componente en src/components/Products.js

# Generando páginas programáticamente

## Creando páginas en función de los datos

El método createPages de gatsby-node.js nos ayuda a crear páginas sin necesidad de crear un archivo por cada una de ellas en la carpeta src/pages.

En este caso, vamos a generar una página por cada uno de los productos que guardamos en Stripe:

```javascript
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const productTemplate = path.resolve(`src/templates/Product.js`);
  const result = await graphql(`
    query GET_SKUS {
      allStripeSku {
        edges {
          node {
            id
            price
            product {
              name
              metadata {
                description
                img
                wear
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  result.data.allStripeSku.edges.forEach(({ node }) => {
    createPage({
      path: `${node.id}`,
      component: productTemplate,
    });
  });
};
```

## Manejo de Gatsby Templates

Ahora hay que configurar los Gatsby Templates (Los componentes que renderizamos cuando Gatsby construye las páginas autogeneradas)

## Terminando la Vista de Detalle de los Productos

## StaticQuery vs. useStaticQuery

Diferencias entre consultas a GraphQL desde páginas, con StaticQuery o useStaticQuery:

Las páginas de Gatsby (los archivos de la carpeta src/pages) nos permiten hacer consultas a GraphQL. Debemos exportar la propiedad query con el esquema de nuestra consulta y esto nos permitirá recibir los datos como props en el componente que exportamos en esa misma página.

Por ejemplo:

```javascript
export const query = graphql`
  query GET_DATA {
    # ...
  }
`;

export default ({ data }) => {
  console.log(data);

  return /* ... */;
};
```

Pero esta sintaxis solo funciona en las páginas de Gatsby. Si necesitamos hacer consultas desde algún otro componente de nuestra aplicación podemos usar el componente StaticQuery.

Solo debemos escribir la consulta en la propiedad query para recibir la información desde la propiedad render:

```javascript
<StaticQuery
  query={graqhql`
    query {
      # ...
  `}
  render={(data) => {
    console.log(data);
    return <AnyOtherComponent data={data} />;
  }}
/>
```

También podemos usar el hook useStaticQuery, funciona igual que StaticQuery pero nos permite usar la sintaxis de los hooks:

```javascript
const data = useStaticQuery(
  graphql`
    query {
      # ...
    }
  `
);
```

## Construyendo el Carrito de Compras: useContext

React Context nos ayuda a crear un estado global, una forma de compartir el estado de nuestra aplicación entre todos los componentes, sin importar en qué lugar se encuentren y sin necesidad de pasar y pasar props.

Además, useContext nos permite usar todas las características de React.Context con la sintaxis de los hooks. En este caso, vamos a usar todas estas herramientas para construir nuestro carrito de compras.

1. Crear el context:

```javascript
// context.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (element) => {
    setCart([...cart, element]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

2. Encerrar toda nuestra aplicación (o las partes donde queresmos compartir el estado) en el componente Provider:

```javascript
// gatsby-browser.js

exports.wrapRootElement = ({ element }) => (
  <CartProvider>
    <GlobalStyles />
    <GlobalStyles>{element}</GlobalStyles>
  </CartProvider>
);
```

3. Consumir el Contexto desde cualquier componente:

```javascript
const { cart } = useContext(CartContext);
```

## Construyendo el Carrito de Compras: Vista

## Construyendo el Carrito de Compras: Agregar productos al carrito

## Comprando productos

Vamos a utilizar useEffect para ejecutar Stripe al momento que carga nuestra página en el navegador. Solo debemos ejecutar esta función una vez, así que el segundo argumento de useEffect debe ser un array vacío.

```javascript
// cart
const [stripe, setStripe] = useState();

useEffect(() => {
  setStripe(
    window.Stripe(process.env.STRIPE_PK, { betas: ["checkout_beta_4"] })
  );
}, []);
```

De esta forma podemos configurar nuestro botón de compra para que envíe al usuario al formulario de pago de Stripe:

```javascript
const handleSubmit = asynv e => {
  e.preventDefault();

  const { error } = await stripe.redirectToCheckout({
    items: cart.map(({ .sku, quantity }) => ({ sku, quantity })),
    successUrl: process.env.SUCCESS_REDIRECT,
    canelUrl: process.env.CANCEL_REDIRECT,
  });

  if (error) throw error;
}

/* ... */

<Button onClick={handleSubmit}>Comprar</Button>
```

Esto me parece que ya cambio creería que mejora ver esta documentación

https://stripe.com/docs/checkout/integration-builder?client=react

# Gatsby a producción

## Gatsby build para compilar nuestro proyecto

Vamos a compilar nuestro proyecto de Gatsby para generar un sitio estático que podamos mandar a producción:

Para hacer el build debemos crear el archivo .env.production porque ese utilizará al hacer el build

> npm run build
>
> gatsby build

Recuerda que debes crear un nuevo archivo llamado .env.production para la configuración real de tus productos en Stripe (de otra forma, los usuarios solo podrán hacer compras ficticias)

También debemos añadir la configuración del archivo gatsby-browser.js a gatsby-ssr.js:

```javascript
const React = require("react");
const Layout = require("./src/components/layout").default;
const { GlobalStyles } = require("./src/styles");
const { CartProvider } = require("./src/context");

exports.wrapRootElement = ({ element }) => (
  <CartProvider>
    <GlobalStyles />
    <Layout>{element}</Layout>
  </CartProvider>
);
```

Y es que aquí lo que sucede es que en desarrollo gatsby utiliza gatsby-browser pero para construir el sitio va a utilizar gatsby-ssr entonces básicamente es el mismo contenido en ambos archivos.

Por último vamos a usar el plugin gatsby-plugin-styled-components para que nuestra aplicación tenga sus estilos al compilar el código de React.js:

> npm install gatsby-plugin-styled-components

```javascript
/ gatsby-config.js
plugins: [
  `gatsby-plugin-styled-components`,
  /* ... */
],
```

## Deploy a Netlify

Netlify es un servicio que nos permite hacer deploy de nuestras aplicaciones estáticas de forma muy sencilla y rápida. Solo debemos arrastrar la carpeta public (que Gatsby generó al momento de compilar) y cambiar la url del proyecto para que sea más fácil de recordar.

No olvides publicar tu versión del proyecto en la sección de discuciones utilizando la siguiente convención:

https://platziswag-username.netlify.com

De esta forma hemos terminado el Curso de Desarrollo de Aplicciones con Gatsby JS. No olvides resolver los ejercicios, completar el examen, darle 5 estrellas al profesor y compartir tu proyecto, notas, todas tus dudas y comentarios en la sección de discusiones.

Cuando se corre el build en la carpeta public está lo que generó gatsby y eso lo podemos arrastrar a netlify para que se publique el sitio.

Es necesario cambiar el nombre del dominio para netlify.
