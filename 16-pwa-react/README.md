# Introducción

## ¿Qué es una PWA?

No hay una definición concreta sobre que es una PWA. Lo mejor es entender como es el panorama actual.

**¿Cómo es la web hoy?**

- No funciona muy bien en mobile.
- Más del 50% de nuestros usuarios están en mobile.
- Tenemos "malas" conexiones en los dispositivos móviles, conexiones tipo 3G y LTE no son particularmente confiables. Esto genera que un sitio promedio tarde 14 segundos en cargar en mobile.
- La UX no es solamente el diseño de nuestra app, tienen que ver con que tan rápido funciona nuestra aplicación en el mundo real, con un teléfono que tiene una conexión mala.

Es importante que un sitio funcione rápidamente en dispositivos móviles:

- 50% de los usuarios se van de un sitio que tarda más de 3 segundos en cargar
- Cada segundo de demora nos cuesta un 5-10% e nuestras ventas. (Amazon, Wallmart)

**Historias de Éxito**

pwastats.com
wpostats.com

**¿Que es entonces?**

Es un standard de calidad, es como debería ser la web hoy pensada para móviles. Pensemos en nuestros usuarios primero, pensemos en mobile, pensemos en malas conexiones, pensemos en ambiente que no tienen nada que ver con las pc en que trabajamos.

Vamos a centrarnos en tres cosas

1. Performance: Mobile First, Responsive, con foco en UX.
2. Instalable en Homescreen: Web Manifest, Iconos para App.
3. Dar soporte Offline: Soportar malas conexiones, confiabilidad en todo momento.

**Ventajas**: Mejor experiencia de usuario, Estar en la Home Screen, No hay App Stores.

## Progressive Web App vs. Native App

¿Como ofrecerles la mejor experiencia de usuario a nuestro usuarios moviles?

1. Con una PWA
   - Pueden funcionar en todos nuestros dispositivos
   - Gracias a los Service Workers pueden funcionar Offline
2. Con una App Nativa
   - Mejor calidad y a todas las funcionalidades de Android y IOS
   - Aplicaciones avanzadas y con más performance

Es mucho más sencillo conseguir y convertir usuarios con una PWA que con una App Nativa. Para sitios de medios, noticias y aplicaciones virales puede ser una mejor opción a una App nativa.

- Siempre que podamos es mejor lanzar una PWA para entrar al mercado, especialmente si somos una startup.
- ¿Podemos lanzar una experiencia dramaticamente superior con una App nativa? Si. Necesitamos Tiempo y Recursos pero si.

## El proyecto

**Platzi Recetas**

PWA para Ver Recetas utilizando la API de TheMealDB.

2 Vistas, Una de recetas populares y otra de detalles de cada receta

Create React App
React + React Router

## Google Lighthouse

Es una herramienta oficial de Google que viene con Chrome, con el cual podemos hacer diagnóstico a una Web App. Estos diagn+osticos se centran en Performance y Accesibilidad, pero también tiene una herramienta para diagnosticar si nuestra Web App se considera una PWA o no y que pasos debemos de tomar para que lo sea.

> npm run dev

Lighthouse se puede correr con lo chequecitos de

- Performance
- Progressive Web App

Lighthouse simula un Nexus 5, una conexión de red de mala calidad, y ralentiza el cpu de la pc para simular un poco mejor como funciona un dispositivo móvil real.

Lighthouse no sustituye hacer pruebas con un dispositivo móvil real, siempre realiza pruebas en un dispositivo móvil. Se puede probar en un dispositivo que ronde los USD 150 a USD 200

El diagnostico de Performance nos muestra dos de los conceptos más importantes en performance: First meaningful Paint y First Interactive.

First meaningful Paint o primer pintado significativo, esto señala cuanto tiempo tardo el navegador en renderizar la aplicación de una forma que tenga sentido. Generalmente queremos que este situado entre 1 y 2 segundos.

First interactiv o primera interacción, señala el tiempo cuando ya se cargó React, inicializo la aplicación y que podamos correr comandos dentro de la aplicación.

¿Cómo bajamos estos tiempos?

Para bajar el Time To First Meaningful Paint podemos hacer Server Side Rendering, reducir el tamaño de nuestro HTML y CSS o simplemente teniendo servidores más rápidos.

El Time To Interactive tiene mucho que ver con el framework que estemos utilizando, usualmente queremos que tarde menos de 5 segundos.

## Creando un Web Manifest

Chrome en Android nos permite por defecto una vez que cumplimos todos los requisitos de Lighthouse el Add to Homescreen. Esto es fantastico en terminos de engagement pues convierte mucho mejor que cualquier aplicación.

Chrome 68 - Cambia un poco el comportamiento de Add to Homescreen.

create-react-app nos da un Web Manifest pre armado pero que no esta totalmente bien configurado. Todo lo que tiene que ver con el manifest en cra esta en el index.html y manifest.json de la carpeta public de nuestro proyecto.

Esto es lo que trae el manifest de cra

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": "./index.html",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

Y podemos cambiarlo así:

```json
{
  "short_name": "Recetas",
  "name": "Platzi Recetas",
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "theme_color": "#ffa500",
  "background_color": "#ffffff",
  "related_application": [],
  "prefer_related_applications": false
}
```

Por el momento vamos a trabajar dentro del archivo manifest.json, el el podemos ver varios atributos, los cuales son:

- short_name: Es el nombre que se utiliza en la Homescreen.
- name: Es el nombre de nuestra aplicación.
- icons: Especifica un array de imágenes que servirán como iconos de la aplicación. CAmbiaremos el "favicon.ico" por "icons.png", especificamos el tamaño a 512x512 y el tipo a "image/png"
- start_url: Define el modo de visualización para la aplicación. Standalone significa que la aplicación puede correr por si misma.
- theme_color: Define qué color vamos a usar en la banda de tareas de Android para que combine con nuestra aplicación.
- related_applications: Sirve si queremos que Chrome en el Add to Homescreen recomiende una aplicación del Store.

Para probar nuestro Add to Homescrren debemos tener en cuenta que un requisito fundamental de las PWA es que todo funciones con HTTPS.

Para probar la aplicación lo hizo con ngrok, instalando ngrok y luego ejecutando:

> ngrok http 5000

Y esto nos proporciona un tunel a un servidor https de ngrok a nuestro puerto 5000

Nuestra aplicación por defecto es fullscreen, así que no olvides de brindar un camino al home.

En iOS necesitamos añadir alguna metadata al index.html de nuestro proyecto. Al momento de probar nuestra aplicación en iOS nos daremos cuenta de que el Add to Homescreen en este caso debe ser añadido manualmente por el usuario.

```html
<!-- Esta sería la metadata para agregar en el head de index.html-->
<link rel="apple-touch-icon" href="/icon.png" />
<meta name="apple-mobile-web-app-title" content="Recetas" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
```

## Implementar el Manifest

# Service Workers

## ¿Qué es un Service Worker?

Un service worker es lo que hace posible que las PWA funcionen es una de las features que estuvo construyendo el equipo de Chrome.

Un service worker es un script que nuestro navegador corre detras de escena y por defecto no tiene acceso a ninguna parte del browser, no puede tocar el DOM directamente. Expone una pequeña API con la que podemos comunicarnos (por ejemplo, al recibir notificaciones).

Podemos tener control absoluto a nivel red de nuestra aplicación gracias a los service workers. Por ejemplo podemos controlar el caché, push notifications.

Son la feature más importante en el mundo de las PWA.

## Introducción a Workbox

¿cra viene con un service worker?

Los Service Workers funcionan solo en modo producción y no en modo desarrollo.

> npm run build && npm start

Una recomendación siempre que trabajemos con service worker es ir a Clelar Storage en la tab de application de las DevTools y limpiar la información del sitio. Esto desinstalara todo lo qeu es cache y limpiará los service worker.

El service worker de cra hace algo llamado "SW Precache", lo que hace es precargar y dejar disponibles offline todos los archivos necesarios para correr la aplicación. Una recomendación a la hora de hacer debugging es refrescar el sitio pues un service worker por lo general se inicializa después de la primera carga.

**F5**

NUNCA conviene escribir nuestro propieo service worker especialmente con herramientas de bajo nivel. Para implementar nuestro propio service worker usaremos Workbox, una librería creada por google para crear Service Workers. Un service worker tiene control sobre toda la estructura de red de la aplicación y podemos olvidarnos de limpiar caché entonces la aplicación quedaría cacheada para siempre y es muy dificil de debugear esto.

**Implementando Workbox**

Hay un pequeño detalle al momento de implementar Workbox en nuestro proyecto y es que estamos yendo en contra de los principios de cre y esto solo significa una cosa "eject", esto nos llenaría de archivos que no nos sirven. Nadie quiere hacer eject en una aplicación de cre. Para evitar hacer eject vamos a instalar react-app-rewired y el plugin para webpack de workbox.

> npm add workbox-webpack-plugin reac-app-rewire-workbox react-app-rewired

Creamos el archivo ./config-overrides.js

```javascript
const {
  defaultInjectConfig,
  rewireWorkboxInject,
} = require("react-app-rewire-workbox");
const path = require("path");

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Generating Service Worker");

    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, "src", "service-worker.js"),
    };
    config = rewireWorkboxInject(workboxConfig)(config, env);
  }

  return config;
};
```

Y creamos ./src/service-worker.js

```javascript
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
```

Modificamos los scripts del package.json

```json
"scripts": {
  "dev": "react-app-rewired start",
  "start": "serve ./build -s -p ${PORT:-4000}",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom",
  "eject": "react-app-rewired eject"
}
```

> npm build && npm start

La aplicación funciona en modo offline igual que con el service worker de cra normal. Ese es el comportamiento por default de workbox y hay que configurarlo.

## Implementando Workbox

**Estrategias de Carga**

¿Cómo queremos que carge nuestra aplicación? En la clase anterior dejamos solamente un precache manifest.

> npm run build && npm start

El funcionamiento de un service worker por defecto toma un lista de assets para precargarlos y si la ruta coincide exactamente con un asset entonces lo tomará de cache.

Workbox tiene una característica llamada **registerNavigationRoute** la cual se encarga de hacer el funcionamiento por defecto de un service worker más aparte si encuentra una url que no conoce va a buscar una url, en este caso index.html y que se encargue de lo que va a mostrar.

```javascript
// Lo anterior de Workbox

// App Shell
workbox.routing.registerNavigationRoute("/index.html");
```

**Existen diferentes estrategias de carga**

La primera y fundamental se llama **Network Only**. Esta se encarga de checar si hay conexión a internet, si existe una conexión realiza la peticioón de información, en caso de no haber conexión se rompe la página.

**¿Cuándo usar Network Only?**

Por defecto si no queremos cache o manejamos información en tiempo real.

**Network First** es otra estrategia de carga, se encarga de mandar la petición a internet, si la conexión a internet esta caída entonces tomara la información que tenga almacenada en cache. Es la forma standard de manejar una aplicación modo offline. Esta es la estragia por defecto recomendada.

**¿Cuándo usar Network First?**

Cuando queremos la útlima versión de un asset y tener soporte offline.

```javascript
// Resto del código anterior...

// Todo lo demás usa Network First
workbox.routing.registerRoute(
  /^https?.*/,
  workbox.strategies.networkFirst(),
  "GET"
);
```

Siempre que modifiquemos el Service Worker debemos hacer un build de la aplicación. Y Limpiar el almacenamiento en las DevTools.

## Aplicando Estrategias e Carga

Workbox tiene muchas estrategias de carga muy avanzadas, cada una con sus ventajas y desventajas.

**CacheFirst**

Empiezan a complicar el flujo del service worker. Esta estrategia carga primeor lo que encuentra en cache y si no lo encuentra va a la red.

Esta estrategia puede ser peligrosa y solo es recomendable cuando queremos máxima velocidad y estamos manejando un recurso que nunca cambia, como una imagen o alguna fuente.

Se puede usar así:

```javascript
workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  workbox.strategies.cacheFirst(),
  "GET"
);
```

O se puede usar con opciones para que el cache tenga vencimiento.

```javascript
workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: "cualquier-nombre-de-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
  "GET"
);
```

**Stale While Revalidate**

Esta es una estrategia de carga muy particular y que mejor funciona a la hora de mejorar el rendimiento. Lo que hace es ir a cache y a red al mismo tiempo, toma la versión más rápida que siempre será la de cache y en cunto recibe la de red va a actualizar la versión de cache.

Es recomendable esta estrategia cuando queremos mucha velocidad y estamos manejando un recurso que puede estar levemente desactualizado.

Al momento de escribir nuestras estrategias en Workbox SI IMPORTA el orden en que pongamos las cosas, si queremos una estrategia o regla por defecto debemos poner esa regla hasta el final de todo.

```javascript
// Todo el código anterior...

// La API usa Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  workbox.strategies.staleWhileRevalidate(),
  "GET"
);

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
  "GET"
);

// Esta regla es de la sección anterior pero va al final porque es la estrategia default.
// Las reglas por defecto van al final de todo
// Todo lo demás usa Network First
workbox.routing.registerRoute(
  /^https?.*/,
  workbox.strategies.networkFirst(),
  "GET"
);
```

Finalmente los Service Worker solo funcionan con HTTPS, es necesario que la comunicación este encriptada. Podemos conseguir certificados gratis con Let's Encrypt.

## Google Analytics Offline

Si no podemos hablar con nuestros usuarios y hacer pruebas con nuestros usuarios, uno de los mejores recursos que tenemos es tener buenas métricas y telemetría de nuestra aplicación.

Primero necesitamos instalar google analytics para react

> npm install react-ga

Luego en App.js

```javascript
// 1. Importamos la librearía
import ReactGA from "react-ga";

// 2. Bind a la historia de react router, modificando sutilmente el Router de nuestra aplicación.
// Antes...
//import { BrowserRouter, Route, Link } from "react-router-dom"
// Despues
import { Router, Route, Link } from "react-router-dom";

// 3. Importamos createBrowserHistory de history
import { createBrowserHistory } from "history";

// 4. Inicializamos History
const history = createBrowserHistory();

// 5. Inicializamos ReactGA
// Este es un Id de nuestra aplicación...
// Con esta id hay una persona que esta recibiendo pageviews que no le corresponden
ReactGA.initialize("UA-000000-01");
ReactGA.pageview(window.location.pathname + window.location.search);

// 6. Escuchamos el History
history.listen(function (location) {
  // window.location.pathname es la url en sí
  // window.location.search son las queries
  ReactGA.pageview(window.location.pathname + window.location.search);
});

export default class App extends React.Component {
  render() {
    return (
      { /* Cambiamos BrowserRouter por Router*/ }
      <Router history={history}>
        <div>
          <header>
            <Link to="/">Recetas</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}
```

Ahora esto no funciona offline...

Para que Google Analytics funcione offline hay que cambiar service-worker.js

```javascript
// Resto del código

// Esta linea ya estaba para ubicarnos
workbox.routing.registerNavigationRoute("/index.html");

// Esta linea para que funcione google analytics offline
// Esto permitirá trackear a los usuarios online y offline
workbox.googleAnalytics.initialize();

// Resto del código
```

## Experimentar con Workbox

Para experimentar con las diferentes estrategias de carga que ofrece workbox:

1. Las imágenes deben tener una estrategia Cache Fist. Con vencimiento de una semana.

2. Probar Plugins y Estrategias basandonos en la documentación de workbox.

# Funcionalidades Avanzadas

## Web Share API

Web Share API es una API reciente de Android que nos permite usar el Share nativo del sistema operativo.

Para implementarlo hay que tener presente que solo funcionara si hacemos click a algún link, esto es una medida de precaución para que nadie abuse de la API obligándonos a tener que compartir algo que no queremos. Además, Web Share API por el momento solo funciona en Android así que tenemos que detectar si tenemos la característica para poder usarla.

```javascript
link.on("click", function (e) {
  e.preventDefault();
  if (navigator.share) return navigator.share({ title, text, url });
});
```

> npm run dev

Al componente Recipe.js le agregamos un botón de compartir

```javascript
compartir = () => {
  e.preventDefault();
  if (!navigator.share) {
    alert("Tu browser no soporta la Web Share API");
    return;
  }

  const { recipe } = this.state;
  navigator
    .share({
      title: `${recipe.name}`,
      text: "Receta de Platzi",
      url: document.location.href,
    })
    .then(() => alert("Contenido compartido!"))
    .catch((error) => alert("Hubo un error"));
};

<a onClick={this.compartir}>Compartir</a>;
```

Web Share API solamente funciona con HTTPS. Así que siempre con ngrok se puede probar.

> ngrok http 3000

## Trabajando Offline

Esto no tiene tanto que ver con las PWA sino que más tiene que ver con mejorar la experiencia de usuario dando una respuesta visible que le indique al usuario que no tiene conexión.

La forma de saber si la aplicación esta offline u online es a través de una variable llamada navigator.onLine, algo muy importante a tener en cuenta es que la variable nos va a decir que estamos online siempre y cuando no estemos offline lo cual significa que si el usuario tiene mala conexión a internet igual va a marcar como online.

```javascript
if (navigator.onLIne) {
  // Estamos Online
} else {
  // Estamos Offline
}
```

La forma correcta de checar si el navegador esta online u offline es con dos eventos que se añaden a window, "offline" y "online".

```javascript
window.addEventListener("online", function (e) {
  // Estamos online
});

window.addEventListener("offline", function (e) {});
```

Corremos la aplicación en modo productivo

> npm run build && npm serve

Creamos un nuevo componente en src/component/IfOffline.js

```javascript
import React from "react";

export default class IfOffline extends React.Component {
  constructor(props) {
    super(props);
    this.state = { onLine: navigator ? navigator.onLine : true };
  }

  componentDidMount() {
    if (!window) return;
    window.addEventListener("online", this.goOnline);
    window.addEventListener("offline", this.goOffline);
  }

  componenetWillUnmount() {
    window.removeEventListener("online", this.goOnline);
    window.removeEventListener("offline", this.goOffline);
  }

  goOnline = () => this.setState({ onLine: true });
  goOffline = () => this.setState({ onLine: false });

  render() {
    const { children } = this.props;
    const { onLine } = this.state;
    if (onLine) {
      return null;
    } else {
      return <span> {children} </span>;
    }
  }
}
```

Y ahora en App.js

```javascript
<Link to="/">
  Recetas <IfOffline>Offline</IfOffline>
</Link>
```

## Notificaciones

Una de las funcionalidades más populares del mundo de las PWA son las Notificaciones.

Hay que tener en cuenta que, si el usuario apenas entra a nuestro sitio y le aparece un mensaje para permitir las notificaciones esto está afectando las UX, por lo cual debemos darle un contexto de porque le vamos a enviar notificaciones a nuestro usuario.

Tenemos que pedir permiso primero y tenemos que tener contemplado ese flujo.

```javascript
// Pedimos permiso al usuario
await Notification.requerstPermission();

if (Notification.permission === "granted") {
  //Podemos enviar notificaciones
}
```

Existen tres tipos de permiso para las notificaciones:

- Estado por defecto: no sabemos si podemos enviar notificaciones o no, aquí es donde debemos preguntarle al usuario si quiere recibir las notificaciones.
- Granted: El usuario ha concedido el pemiso.
- Denied: directamente no podemos enviar las notificaciones.

Primero que nada, debemos preguntar si nuestro navegador puede mandar notificaciones. Para ello vamos a checar si hay un objeto notificación en window y un Service Worker en el navegador, esto es así debido a que en Android necesitamos un Service Worker para que las notificaciones funcionene. En iOS no hay soporte para notificaciones.

En App.js

```javascript
// Esta este link comentado
<Link to="/timer" className="timerLink"></Link>
```

Vamos a la página Timer.js para implementar la parte de pedir pemisos...

```javascript
// TODO: Chequear y pedir permisos
if (!("Notification" in window) || !("serviceWorker" in navigation)) {
  return alert("Tu browser no soporta notificaciones");
}

if (Notification.permission === "default") {
  await Notification.requestPermission();
}

if (Notification.permission === "blocked") {
  return alert("Bloqueaste las notificaciones :(");
}

if (Notificacion.permission !== "granted") {
  return;
}
```

Simpre en Timer.js podemos trabajar el método de showNotification

```javascript
showNotification = async () => {
  // Nos conectamos al nuestro service worker para que este pueda enviar notificaciones.
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return alert("No hay urn Service Worker :(");

  registration.showNotification("Listo el timer!", {
    body: "Ding ding ding",
    img: "/icon.png",
  });
};
```

Ahora habría que probar el service worker en modo producción.

> npm run build && npm run serve

Esto es un ejemplo inicial de como funcionan las notificaciones y solo funciona si el browser esta abierto. Si se quieren mostrar notificaciones por ejemplo de un gol en un sitio para seguir un partido. Entonces hay que trabajar con push notifications que requiere un manejo más avanzado del lado del servidor.

## Publicando la app

Publiquemos nuestro proyecto en GitHub...

Antes de publicar nuestro proyecto en GitHub no olvides escribir un buen Readme, asegúrate de incluir un link funcional a la aplicación. Para poner en producción nuestro proyecto podemos usar vercel.

**Protip: Docker**

Estandariza Deployments
