# Curso de Next.js

## Construir una web app con React no es fácil

Un curso totalmente práctico en que construiremos una aplicación sobre Next.js ¿Hay 17 tipos de aguacates?

**En un proyecto React hay que tomar muchas decisiones**

- CSS
- Webpack o Rollup
- Babel
- Typescript
- Imágenes

Cuando estamos tomando estas decisiones solo pensamos en el desarollo, pasamos muy poco tiempo optimizando solo para nuestras máquinas y equipo de trabajo. Pero ¿Como vamos a llevar eso a producción? ¿Es óptimo para producción?

Estas decisiones forman parte del Total Cost of Ownership, ¿Cuánto le vale a tu empresa el tiempo que gastas en mantener el framework que tú misma/o creaste? El tiempo no lo deberíamos pasar peleando con el framework, construyendolo, actualizandolo, haciendo que webpack corra

Next.js es el framework creado por vercel que ya a tomado las "mejores" decisiones para nosotros poder desarrollar y tambien para enviar a producción de la forma más optima posible. No quita todas esas decisiones que deberiamos hacer y nos permite enfocarnos en entregar valor.

## Nuestro proyecto y lo que necesitaremos

Vamos a crear una página en NextJS que nos permita renderizar la lista de Aguacates pero que al dar click sobre cada uno de ellos lo podamos ver en mucho más detalle. Es una Lista Detalle, que simula una tienda en internet con muchos productos, en este curso utilizaremos, react, typescript y node.

## Instalando NextJS

Hay dos formas de instalar NextJS y una tiene un poco de magia...

¿Qué requisitos necesesito para trabajar con NextJS

- Node (> 12v, > 10v)
- Git
- Browser
- Google Chrome
- DevTools

¿ Cómo instalamos next js ?

- CLI - npx create-next-app
- Manual

**Manualmente**

> mkdir platzi-nextjs
>
> cd platzy-nextjs
>
> npm init -y
>
> npm install --save next react react-dom

Ahora cambiamos los scripts del package.json

```json
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
}
```

> mkdir pages
>
> npm run dev

Debería darnos un 404 porque no hemos creado páginas...

Esto es todo lo que se requiere para instalar NextJS de forma manual a un proyecto, se puede integrar de forma fácil a un proyecto existente.

# Routing

## Rutas básicas

Todo lo que se conoce como páginas y navegación es conocido como Routing. En NextJS ya tenemos una solución para atacar esto.

Básicamente exites dos formas de hacer Routing en NextJS

- Rutas estáticas

  - /about/
  - /contacto/
  - /home/

- Rutas Dinámicas

  - /user/kasteion

**Nuestra Primer Página**

Creamos pages/index.js

```javascript
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Hola Mundo!</h1>
    </div>
  );
};
```

Este index es una página básica porque no depende de un contenido externo.

Este index siempre será el home para NextJS porque está dentro de pages y se llama index.

Creamos otra página igual pages/about.js

Esta página la encontraremos en http://localhost:3000/about

## Rutas dinámicas

Las páginas dinamicas se crean utilizando una sintaxis con llaves y luego la extensión del archivo.

Crearemos una página /product/cualquier-cosa

Creamos la carpeta pages/product y dentro de product el archivo `[productId].js`

```javascript
import React from "react";
// Aparte de react necesito este hook
import { useRouter } from "next/router";

const ProductItem = () => {
  // Desestructuro productId porque eso viene en router.query.productId
  // Es productId porque así se llama la página.
  const {
    query: { productId },
  } = useRouter();
  return (
    <div>
      <h1>ProductItem {productId}</h1>
    </div>
  );
};

export default ProductItem;
```

## UnderTheHood setup y páginas: optimizaciones ocultas

Hemos agregado dos páginas a nuestro proyecto. Under The Hood lo que hace NextJS cuando compilamos en forma productiva.

El script de build es para hacer un build de producción.

> npm run build

NextJS hace por nosotros code splitting y también aplica una estrategia de hash en los asssets para solucionar el tema de caché.

El script start es un servidor de node que trae next para producción.

> npm run start

Next solo esta cargando lo que necesitamos en las páginas conforme lo vamos utilizando. El código esta dividio en chunks.

## UnderTheHood páginas: pre rendering de páginas

Otra optimización que hace NextJS por nosotros es el pre rendering de las páginas. Esto es Server Side Rendering.

Eso se puede ver en los requests en network viendo lo primero que recibimos es un html con el contenido de la página.

NextJS hace SSR por default y de gratis. Esto es mucho más amigable para los motores de búsqueda y mejor para el SEO.

## Enlazando páginas

Hemos agregado algunas páginas pero estas estan como huerfanas y no se están comunicando unas con otras.

Para comunicarlas vamos a utilizar el componente Link

```javascript
import Link from "next/link";

<Link href="/">Home</Link>;
```

Pero creemos una carpeta llamada components y un archivo llamada Navbar.js

```javascript
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
};

export default Navbar;
```

Si en lugar de link utilizamos un anchor va a suceder navegación en el servidor (El navegador manda a preguntarle al servidor siempre).

Si utilizamos el componente Link estamos haciendo Routing en el cliente y esto es lo que se conoce como Single Page Aplication.

## UnderTheHood enlazando páginas: prefetching automático

NextJS al utilizar el elemento Link hace prefetching de recursos al momento de que el usuario hace un hover sobre el Link. Si vemos en la pestaña network, limpiamos caché y hacemos hover sobre el Link y vemos que Next pre carga el elemento.

# API y Debugging

## ¿Cómo crear API con NextJS?

NextJS también nos facilita la forma de crear APIs y es completamente flexible.

Este es el repositorio del proyecto https://github.com/jonalvarezz/platzi-nextjs

> git fetch --tags

Para hacer una nueva branch con el nombre kasteion-api basandonos en el tag 2-inicio-api

- git checkout -b nombre-branch tag

> git checkout -b kasteion-api 2-inicio-api

Para configurar typescript en el proyecto:

> touch tsconfig.json
>
> npm run dev

Falla porque falta instalar paquetes

> npm install --save-dev typescript @types/react @types/node

Next llena automaticamente tsconfig.json y crea next-env.d.ts para asegurar que los tipos sean seleccionados por el compilador de typescript.

Creamos el archivo **index.d.ts** con los tipos de datos que estamos definiendo para nuestro proyecto.

Creamos una carpeta llamada database y dentro los archivos **data.ts** (nuestra base de datos) y **db.ts** (Un wrapper para ayudarnos con funciones para obtener los datos del archivo data.ts)

El routing para las API funciona igual que para las pages... necesitamos crear la carpeta pages/api y allí ya puedo crear más carpetas y archivos de js o ts

Entonces creamos pages/api/avo/index.ts

Todas las funciones de la api son funciones que reciben request y response como en nodejs

```typescript
const allAvos = async (request: IncomingMessage, response: ServerResponse) => {
  response.end(JSON.stringify({ hello: "world" }));
};

export default allAvos;
```

El archivo quedaría así:

```javascript
import { IncomingMessage, ServerResponse } from "http";
import Database from "../../../database/db";

const allAvos = async (request: IncomingMessage, response: ServerResponse) => {
  const db = new Database();
  const allEntries = await db.getAll();
  const length = allEntries.length;

  response.statusCode = 200;
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify({ data: allEntries, length }));
};

export default allAvos;
```

## Creando y consumiendo nuestra propia API

Creamos un archivo `[id].ts` para poder utilizar el getById.

```javascript
import { NextApiRequest, NextApiResponse } from "next";
import Database from "../../../database/db";

const getById = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { id },
  } = request;
  const db = new Database();
  const entry = await db.getById(id as string);

  response.statusCode = 200;
  response.setHeader("Content-type", "application/json");
  response.end(JSON.stringify({ data: entry }));
};

export default getById;
```

Podemos cambiar en los scripts la parte de dev

```json
"scripts": {
  "dev": "NODE_OPTIONS='--inspect' next'
}
```

Entonces NextJS nos dirá que el debugger esta escuchando en un puerto. Entonces en el chrome podemos escribir en la barra de direcciones about:inspect para poder abrir el DevTools del código corriendo en Node.

El response lo podemos devolver así

```javascript
response.status(200).json(entry);
```

Ahora el Home ya no sería index.js sino que debería ser index.tsx porque es typescript con jsx.

# Extendiendo NextJS

## Extendiendo el Document

Como personalizar y extender NextJS para adecuarlo a nuestras necesidades.

En NextJS existe el document, dentro del document existe el App y dentro del App se encuentra nuestra aplicación ( o lo que exportamos de la carpeta Pages)

Cada uno de los archivos, páginas y eso esta dentro de un document que está dentro de un app. Dependiendo de las necesidades es posible que necesitemos personalizar el Document y el App.

Para extender el document hay que crear un archivo llamado `pages/_document.tsx`

```typescript
// Esto esta copiad de la documentación de next.js buscando custom document.

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  // Aquí podemos hacer tareas del lado del servidor, esto se hará en todas las páginas pero no lo necesitamos pro el momento.
  //static async getInitialProps(ctx) {
  //  const initialProps = await Document.getInitialProps(ctx);
  //  return { ...initialProps };
  //}

  render() {
    // NextJS necesita control desde el html para poder hacer el code splitting, en el Main viene nuestra aplicación.
    return (
      <Html>
        <Head>
          {/* favicon */}
          {/* webfont */}
          {/* stylesheet */}
          {/* scripts de js */}
        </Head>
        <body className="my-body-class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

Al head se le puede agregar favicons, webfonts, stylesheets, scripts de javascript y al body se le puede asignar clases o esa clase de cosas.

**Advertencias sobre extender el Document**

- Ya que el Document se renderiza en servidor, los eventos como onClick no funcionarán.
- Los componentes de React fuera de Main no serán inicializados por el navegador. No añadir lógica de aplicación aquí o CSS personalizado (como styled-jsx). si necesitmaos componentes compartidos en todas las páginas (como un menú o una barra de herramientas).
- `getInitialPropsFunction` de `Document` no se llama durante las transiciones del lado del cliente, ni cuando una página está optimizada estáticamente.

## Extendiendo el App

Dentro de pages creamos un nuevo archivo llamado \_app.tsx y dentro de esto copiamos de la documentación de NextJS buscando custom app.

```typescript
// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  // Aquí se pueden poner Providers, Context/Providers, Custom Themes, data.
  // Hacer un Layout y aplicarlo a todas las páginas, si es común.
  // Para pasar props adicionales.
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
```

Creamos otro componente... components/Layout/Layout.tsx

```typescript
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <footer>This is the footer</footer>
    </div>
  );
};
```

Ahora volvamos a `_app.tsx`

```typescript
import { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

Todos los cambios en app y document de NextJS requieren reinicio del servidor.

## Path alias

Un cambio pequeño pero es para no tener que estar importando cosas desde '../../../../components/Navbar' y así.

Entonces se pueden configurar path alias para typescript y para javascript en typescript se hace en el tsconfig.json

```json
{
  "compilerOption": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["components/*"]
    }
  }
}
```

Ctrl + Shift + p --> Typescript (Reiniciar TS Server)

Y asíu ya puedo importar así:

```typescript
import Navbar from "@components/Navbar/Navbar";
```

## Explorar las soluciones de CSS en NextJS y su flexibilidad

NextJS no nos ofrece una opinión en particular. NextJS nos ayuda un poco dandonos 3 formas de hacerlo sin cambiar nada en su configuración.

1. Global CSS (.css)

- Agregar en el root del proyecto, style.css

- Y luego en App.tsx

```typescript
import "../style.css";
```

2. Module CSS (.module.css)

- Aquí el archivo de css se llama style.module.css, el module .css se aplica para cada componente en especifico.

```css
.container {
  background-color: salmon;
}
```

- Entonces digamos creamos el archivo components/Layout/layout.module.css

- Y se importa en Layout.tsx

```typescript
import styles from ".layout.module.css";

const Layout: React.FC = ({ children }) => {
  return <div className={styles.container}></div>;
};
```

Aquí NextJS le cambia los nombres a las classes de css para que los nombres no colisionen.

3. CSS-in-JS (Styled JSX - Propia de NextJS - Vercel)

- Esto se usa dentro de un componente deusando el tag style

```typescript
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <footer>This is the footer</footer>
      <style jsx>
        {`
          .container {
            background: salmon;
          }
        `}
      </style>
    </div>
  );
};
```

## Finalizando las páginas

Voy a utilizar styled-components

> npm install styled-components
>
> npm install --save-dev babel-plugin-styled-components
>
> touch .babelrc

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ]
  ]
}
```

Instalé los types de styled-components pero me parece que no los necesito.

> npm install @types/styled-components

# Deployment en Vercel

## Utilizando Vercel para hacer Deploy

Puedo hacer el deploy con vercel, vercel detecta que el proyecto esta hecho directamente con NextJS y ya sabe que hacer... podemos conectanos con github, darle una url de github y congrats ya está.

# Data Fetching y Pre-rendering

## Introducción a los pre-render modes

Las opciones que NextJS nos dá para hacer prerendering de nuestras páginas.

Con NextJS, podemos hacer Client Side, Server Side y completamente estáticos.

## UnderTheHood Server Side Renderings: getServerSideProps

Si revisamos la página Home, vemos que utilizamos un useEffect para llamar a la API y cambiar el estado. El useEffect siempre sucede del lado del cliente y es Client Side Rendering.

Para cambiar ese comportamiento utilizamos una función que expone NextJS llamada getServerSideProps

Esto es en el index.tsx

```typescript
import fetch from "isomorphic-unfetch";

export const getServerSideProps = async () => {
  // El server side props deber retornar un objeto con los props y dentro de los props que espera nuestra home.
  const response = await fetch("http://localhost:3000/api/avo");
  const { data: productList }: TAPIAvoResponse = await response.json();

  return {
    props: {
      // Aquí retorno el product List
      productList,
    },
  };
};

// En lugar del useState le pasamos el productList por props al home.
const HomePage = ({ productList }: { productList: TProduct[] }) => {
  // Aquí ya no necesito el ni el useState ni el useEffect
};
```

NextJS funciona de forma diferente en desarrollo y en producción.

Para probar en modo Dev.

> npm run dev

Para darle en modo Producción.

> npm run build
>
> npm run start

## UnderTheHood Static Generation: getStaticProps

Ya tenemos ServerSide ahora con getStaticProps podemos usar Static Site Generation. Esto podemos seguir haciendolo dentro del index.tsx y podemos cambiar el metod getServerProps a getStaticProps.

En el metodo tenemos que generar un objeto con los props que espera la página.

Estos dos métodos getStaticProps y getServerProps solo se pueden utilizar en las páginas y no en los componentes.

```typescript
import fetch from "isomorphic-unfetch";

export const getStaticProps = async () => {
  // El server side props deber retornar un objeto con los props y dentro de los props que espera nuestra home.
  const response = await fetch("http://localhost:3000/api/avo");
  const { data: productList }: TAPIAvoResponse = await response.json();

  return {
    props: {
      // Aquí retorno el product List
      productList,
    },
  };
};

// En lugar del useState le pasamos el productList por props al home.
const HomePage = ({ productList }: { productList: TProduct[] }) => {
  // Aquí ya no necesito el ni el useState ni el useEffect
};
```

> npm run build
>
> npm run start

Esto tiene un gran impacto en el performance. En el SSR se las llamadas al API son bajo demanda. Pero cuando es Estático esa llamada al API sucede en el build... en el momento de generar el sitio.

En un sitio estático, la página se puede quedar desactualizada con respecto a la API.

## UnderTheHood static Dynamic Static Generation: getStaticPaths

Esto es para poder generar de forma static los detalles de nuestros avocados. Estas páginas son dinamicas y están en `pages/product/[id].tsx`

```typescript
import { GetStaticProps } from "next";

// Como vamos a generar una páginas desde una api necesitamos saber que lista de apis vamos a consultar. Así que esta función genera el listado de los paths estaticos.

export const getStaticPaths = async () => {
  const response = await fetch("https://platzi-.../api/avo");
  const { data: productList }: TAPIAvoResponse = await response.json();
  // return {
  //   paths: [
  //     {
  //       id: 1,
  //     },
  //     {
  //       id: 2,
  //     },
  //   ],
  // };
  const paths = productList.map((avo) => ({
    params: { id: avo.id },
  }));

  return {
    paths,
    // incremental static generation
    // Cualquier página que no se especifique en los paths da un 404
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await fetch(`https://platzi-avo.../api/avo/${id}`);
  const product: TProduct = await response.json();

  return {
    props: {
      product,
    },
  };
};

const ProductPage = ({ product }: { product: TProduct }) => {};
```

Ahora sí

> npm run build
>
> npm run start

# Deployment

## Otras formas de hacer deploy de una app NextJS

Como toda aplicación de Node, las aplicaciones con NextJS se pueden correr en un servidor con NodeJS.

Pero también puedo exportar con NextJS. Para esto agregamos un nuevo script al package.json

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start",
  "export": "next export",
  "type-check": "tsc --noEmit"
}
```

Entonces podemos ejecutar

> npm run build
>
> npm run export

Con esto en el build aparte nos genera una carpeta llamada out en donde encontraremos páginas completamente estáticas generadas.

> cd .next/out
>
> npx serve .

Si la página tiene la función getServerSideProps entonces el export dará un error.

# Midiendo Performance

## Mide Performance en NextJS

> npm run dev

El componente que encapsula todas las páginas con que hemos trabajado es App.js

NextJS provee una función que se llama reportWebVital() que solo se puede llamar desde App.js

```typescript
export function reportWebVitals(metric) {
  console.log(metric);
}
```

metric es un objeto con id, label, name, startTime y value. Viene el FCP, TTI, etc.

Entonces lo que podríamos hacer es

```typescript
// Mandarlo a un servidor de metricas o a un servicio que lleve las metricas.
export function reportWebVitals(metric) {
  serverAnalytics.log(metric);
}
```

Esta es una forma básica y que funciona muy bien permitiendonos almacenar medidas con un servicio o servidor propio.

# El futuro de NextJS

## ¿Qué será de NextJS en los próximos años?

NextJS pertenece Vercel, Vercel es una empresa que está revolucionando la forma en que entendemos como funcionan los sitios web, como debemos trabajar como desarrolladores, nos fácilita y hace super óptima la forma de hacer deploy de nuestras aplicaciones.

Vercel y NextJS pintan muy bien para los siguientes años porque es una buena empresa, un buen framework, muy apoyada por el opensource y por la comunidad de javascript.

Está el Incremental Static Site Generation. Cuándo queremos reducir la brecha entre Static Site y Server Side. Es digamos para renderizar estáticos en el servidor solo cuando se entra a la página.

https://static-tweet.vercel.app

Esto se hace colocando el fallback:true en la generación del Static Site.

# Conclusiones

## Continúa con el curso de Next.js: Sitios Estáticos y Jamstack

@johnalvarez y @platzi

# Bonus Next.js 10

## Next.js image

Es la nueva versión de NextJS en su versión 10. Es perfectamente compatible con sus versiones anteriore, especialmente la 9. No hay ningún cambio que hagan que el sitio deje de funcionar.

Es un componente de imagen para mejorar el performance de las mismas. Creado en conjunto con Google y Vercel.

Como actualizar el proyecto a la versión 10...

Con yarn se puede hacer

> yarn upgrade-interactive --latest

Y en npm parece que se puede

> npm install -g npm-check-updates
>
> ncu -u

Se actualiza next, react y react-dom.

> npm run dev

Abrimos la consola de desarrollador y en la pestaña network. Y vemos cuantas imagenes ha descargado nuestro servidor y que peso tienen.

En el componente que crea las imagenes...

```typescript
// Importamos Image, esto es un componente de rect...
import Image from "next/image";

const Card = ({ image }) => {
  return <Image src={image} width={333} height={333} />;
};
```

Si revisamos nuevamente con las DevTools en Network. Entonces resulta que el navegador solo descarga las imagenes que se ven en el viewport. Y además se reduce el tamaño de las imágenes.

Esto incluso funciona muy bien con servicios como cloudinary o akamai. NextJS viene preparado para que le digamos que las mejoras en las imagenes se hagan con tal o cual servidor.

## Link y Proxy

El link funciona como lo utilice en el proyecto... solo se usa el href. Al parecer antes se usaba la propiedad href y una propiedad 'as' donde iba el link nuevamente.

Ahora el proxy se hace creando dentro del root del proyecto un archivo next.config.js

```javascript
module.exports = {
  rewrites: async function () {
    return [{ source: "/avocado/:path*", destination: "/product/:path*" }];
  },
};
```

O también puedo escribirlo así

```javascript
module.exports = {
  async rewrites() {
    return [{ source: "/avocado/:path*", destination: "/product/:path*" }];
  },
};
```

Esto es para redirigir de avocado/id a product/id
