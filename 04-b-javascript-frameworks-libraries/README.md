# Fundamentos del Desarrollo Web Profesional

## Cuándo necesitas un framework de JavaScript

Todo desarrollador web utiliza Html y CSS para la maquetación y JavaScript para la interacción con el usuario, así como para enviar y traer información con el backend. Conforme nuestros proyectos van avanzando y se vuelven más complejos cada vez escribimos menos Html y CSS y escribimos más y más JavaScript.

Los frameworks de JavaScript agilizan el trabajo de los desarrolladores. Pero cuando pasamos de construir Sitios Web a construir Aplicaciones Web ya es un poco contra intuitivo construir todo con JavaScript puro.

Un tipo de sitios web son:

- Landing Pages: (HTML y CSS)
- Un Blog (Necesita hacer peticiones a un API + JS)

Las aplicaciones web son muy complejas, tienen una cantidad de páginas que parecen infinitas y la información no es estática, sino que cambia según el tiempo o según los usuarios.

## Qué son los componentes

Html versión 1, solo maquetación

Html versión 2, maquetación y estilo en html.
Luego se separa en Html y css.

Html versión 3, guerra de navegadores, html no estandarizado. Se estandariza html.

La guerra de navegadores continua en css y javascript. Por eso JQuery fue tan importante. JavaScript se ha vuelto tan bueno que ya podemos maquetar todo nuestro html con javascript.

Como cada vez escribimos más javascript para maquetar nuestra aplicación... nos damos cuenta que podemos reutilizar código, modularizandolo y colocandolo en funciones.

Un componente solo no nos sirve de mucho, debemos unirlos con otros componentes. Esto se llama composición de componentes.

## Cómo estructurar un componente

SalesButton

- Type: Primary o Secondary
- Size: Small, big, o ultrabig

StudentButton

- Icon: Componente con el ícono que queremos

Dropdown:

- ClickArea: Siempre Visible
- HiddenArea: Lo que aparece y desaparece

## Qué es reactividad

Paradigmas:

- OOP
- Programación funcional
- Descriptivo: Mostrar el como. ?
- Imperativo: Esconder el cómo y solo mostrar el qué ?

**Reactividad**

- Responsive: La aplicación siempre sabe como reaccionar. Resiliente, no importa todo lo malo que pueda suceder siempre sabe como responder y Escalable no importa cuantos usuarios entren a la aplicación siempre responde.
- Message Driven: Arquitectura basada en mensajes. Consiste en programar nuestra aplicación con emisores y receptores de mensajes. Pero los emisores no le entregan los mensajes directamente a los receptores, se entregan asíncronicamente, guardadolos en una queue a los que los emisores deben suscribirse para recibir el mensaje. Internamente para lograr esto es utilizando observers. Muchos frameworks utilizan RXJS para esto.

La arquitectura no es algo ajena a la programación. No es algo solo de los altos cargos, todos debemos entender sobre la arquitectura y no solo dejarnos llevar por la corriente.

**Estado**

El lugar donde vamos a guardar la información reactiva de nuestros componentes. Variables a las que nos suscribimos para recibir un valor cada vez que cambian los elementos. No siempre sabemos cuando va a suceder algo, pero con el estado estamos suscritos y podemos reaccionar cuando el cambio suceda.

**Render**

Es el proceso por el cual nuestro código html pasan a ser información visual en el navegador, en el DOM. Con Javascript también podemos manipular el DOM, pero no solo escribimos el html sino que podemos cambiarlo según las interacciones de los usuarios.

**Estrategias de Render**

- VirtualDOM: Leer y actualizar todo el DOM constantemente es muy costoso. ¿Cómo sabemos que lugares debemos actualizar? Con el VirtualDOM se hace una copia en javascript del DOM para compararlo y saber que actualizar.
- No VirtualDOM: Hay otra corriente que indica que utilizar el VirtualDOM es overhead. Es un paso de más. En lugar de utilizar una copia del DOM, creemos un mini VirtualDOM o no, solo renderizar.

Componente --> Estado --> Render --> Usuario --> Estado --> Render --> Usuario

## Librerías vs. Frameworks

Para cada lenguaje de programación existe un Framework ( o más ).

Un framework es como una receta para preparar una hamburgesa. Tenemos que seguir los pasos para hacer nuestra receta. Un framework son librerias, herramientas y formas de trabajar para construir algo.

Nuestra librearía son los ingredientes que utilizamos en el Framework... y podemos utilizarls en otros lados. Una librería es un fragmento de código que podemos utilizar para muchas cosas.

## Ecosistema de frameworks y librerías JavaScript

**Empaquetadores ó Module Bundlers**

- Webpack: La más popular actualmente, debemos configurar un archivo para especificar como debe empaquetar nuestros archivos. Se puede configurar code splitting. Para construir sitios y aplicaciones web.
- Parcel: Trata de evitar que tengamos que hacer configuración. Solo le damos la aplicación y Parcel hace su magia.
- Rollup: Especializado en mantener bien pequeño el peso de nuestros archivos. Para construir librearías de JavaScript.

**Compiladores (Transpiladores y Subset de JavaScripts)**

- Babel: Nos permite utilizar la sintaxis más moderna de JavaScript. Nos piermite utilizar plugins para trabajar de cierta forma y Babel se encarga de transformarlo a JavaScript que entiendan los compiladores.
- TypeScript: Es un subset de javascript que incluye tipos y programación orientada a objetos.

**Herramientas de UI**

Puede ser JavaScript solo. Pero normalmente utilizamos herramientas como React, Vue, Svelte, Angular.

**CSS y preprocesadores**

Podemos utilizar CSS o utilizar preprocesadores como Sass, Less, Stylus, PostCSS... y también... CSS-in-JS, en el mismo componente tengo el estilo... como con Styled Components y Emotion...

**Routers**

- React Routers
- Vue Router
- Svelte Router
- LitElement Router
- O haces tu propio router

**Frameworks (Todo en Uno)**

- Angular

**Entornos de desarrollo (Todo en Uno)**

Son varias librerías preconfiguradas para trabajar juntas.

- Create React App
- Vue CLI
- Svlete CLI
- Polymer CLI

**Manejo del estado**

- Redux
- XState
- MobX

**Consulta de datos**

- API REST
- GraphQL

# Contexto y funcionamiento de los Frameworks JavaScript

## Qué es React y cómo se construyó

ECMAScript es el standard en el que se basa JavaScript y lo que conocemos como JavaScript es una implementación de ECMAScript.

2004-2005: ECMAScript for XML (Para agregarle soporte nativo de ECMAScript a XML)
2010: Inspirados en ECMAScript for XML, Facebook estaba trabajando en XHP (Como una "mejora" a PHP) para crear componentes personalizados y reutilizables de HTML.
2011: Jordan Welke inspirado en XHP creo el prototipo de ReactJS
2012: React es OpenSource
2014: React Developer Tools
2015: React Native

React busca cumplir con 3 objetivos especificos:

1. Ser Declarativo: Que sea fácil de leer.
2. Basado en componentes: Que utilicemos componentes más pequeños y componer otros más grandes.
3. Multiplataforma: Learn Once, Write Anywhere.

Librearías Oficiales aparte de React... (ReactDOM, React Native, ReactVR)

Hay dos formas de crear componentes con React...

1. Utilizando Clases
   - props
   - State
2. Utilizando funciones
   - hooks (useState, useEffect)

## Qué es un componentes en React y cómo funciona

Los componentes en React son como pequeños bloques de Lego que podemos unir para crear componentes más grandes. Los componentes tienen un ciclo de vida: Montaje, Actualización, Desmontaje.

## Qué es Angular y cómo se construyó

2009: Miško Hevery & Adam Abrons querian crear un herramienta para que las personas que conocieran html pero no conocieran programación pudieran hacer aplicaciones web. Algo como un super html... pero no tuvo éxito. Hevery pasó a google y creo una herramienta llamada Google Feedback, pero se necesitaron 17000 líneas de código en el frontend, aún usando Google Web Toolkit. Hevery creo desde cero con 1500 líneas de código Google Feedback desde cero. Y de allí viene Angular. Angular es patrocinado por Google, aunque no depende de ella.
2012-2014: Angular era muy popular, habían otras herramientas como Backbone pero no tuvieron éxito. Pero entonces empezó a decaer Angular.JS y él equipo de Angular tomo una decisión algo radical. Escribieron Angular desde cero, diseñandolo para escribir aplcaciones gigantes, con componentes. Y Angular no sería compatible con Angular.JS.
2015: Primer preview de Angular
2016: Versión oficial Angular 2, Angular usaba typescript...
2016: Angular 4 y Angular Router 4... todo en la versión 4. Todo el mundo empezó a irse a otros frameworks. Al día de hoy ha recuperado mucho el prestigio que tenía, es un framework muy grande que facilita muchas coasa.

Ahora se lanza una versión nueva de Angular cada 6 meses pero son incrementales y no rompen lo anterior. Angular viene con todo lo necesario incluido... trae un Router, trae Angular forms, trae herramientas para hacer testing, per es muy dificil combinarlo con otras herramientas por lo mismo.

Angular tiene un sistema para crear componentes llamado Engine Module. Los engine modules son contenedores que agrupan componentes y servcios que responden a un mismo fin o servicio.

Los componentes son la lógica e interfaz de usuario. Los componentes tienes dos partes, lógica y UI.

Los servicios son agrupaciones de lógica que podemos utiliza en varios compoentes de nuestra aplicación. Estos servicios los podemos injectar a nuestros componentes utilizando inyección de dependencias, debido a que usamos Typescript.

Angular Ivy es el que renderiza en el DOM. Y en lugar del virtual DOM utiliza un incremental DOM. Al no crear una copia del DOM ahorramos memoria. Angular Ivy es el motor de render de Angular.

## Qué es Vue y cómo se construyó

Vue se define a sí mismo como un framework progresivo, porque no es tan abrumador sino que se puede ir implementando poco a poco. Pero no se le queda corto a ningún proyecto, pues puede seguir creciendo a medida que lo vamos necesitando.

VueJS te va a ofrecer un camino oficial que integra Vue y varias herramientas alrededor del entorno de Vue. Pero no es obligatorio pues Vue si se integra bien con cualquier herramienta que querramos utilizar.

Vue es completamente Reactivo. React no es completamente reactivo. Angular también se puede programar Reactivo pero Vue también es completamente Reactivo.

Vue también utiliza el VirtualDOM, VueJS es muy divertido. VueJS va a dejar que sigamos trabajando como en HTM hasta que poco a poco todo se vuelve JavaScript.

## Qué es Svelte y cómo se construyó

The Guardian, un sitio de noticias creo RactiveJS. Utilizaba el virtual DOM y un Parallel DOM. Rich Harris que había participado en el desarrollo de Ractive creo Svelte.

Svelte no crea intermediarios entre el código que escribimos y el DOM. Svelte utiliza el tiempo de compilación. Svelte no usa el virtual DOM. Svelte es espectacular para desarrollar sitios web pero no es tan fuerte para aplicaciones web donde lo más importante es la interacción con los usuarios. Esta pensado en los sitios de noticias.

No hay mucha documentación de la arquitectura de Svelte.

https://github.com/sveltejs/svelte/issues/1011

Svelte es como un compilador, necesita crear un Abstract Sintax Tree (AST), una representación del código de nuestros componentes como un árbol. Para esta compliación necesita 3 parsers para html, css y javascript y combina los 3 árboles y al renderizar Svelte envuelve todo el código de los componentes en fragments... los fagments son como un nodo imaginario.

# Estilos con CSS, preprocesadores y CSS-in-JSa

## Qué es CSS-in-JS

CSS-in-JS no remplaza las estilos de CSS, CSS-in-JS se convierte al final en CSS normal. CSS-in-JS ayuda al proceso de trabajar con componentes. Con CSS podemos hacer...

1. CSS normal
2. Preprocesadores y postprocesadores de CSS: Para escribir CSs de forma más amigables, con ciclos, mixins, etc. SASS, LESS y Stylos. PostCSS.
3. Componentes y CSS-in-JS: Que el componente tenga el javascript y el CSS. Podemos aprovechar Javascript para programar nuestros estilos.

```css
h2 {
  color: white;
}
```

```javascript
const Title = styled.h2`
  color: white;
`;

<Title>Titulo 1</Title>
<Title>Titulo 2</Title>

const Title = styled.h2`
   color: ${ props =>
      props.error
      ? "red"
      : "white"
   }
`

<Title>Titulo Blanco!</Title>
<Title error>Titulo Rojo!</Title>

const Title = styled.h2`
   color: ${ props =>
      props.theme.mode === "student"
      ? "git"
      : "blue"
   }
`
```

Los estilos globales no son una desventaja de CSS-in-JS.

## Componentes en Angular con CSS

En styles.css estan los estilos generales.

en app.component.css están los estilos del component app.

## Trabajando con Vue Components

## Vue Components con Preprocesadores de CSS

## Trabajando con React con Styled Components

Styled Components ya es CSS-in-JS.

## Estilos dinámicos con Styled Components en React

```javascript
import styled from "styled-components";

export const Title = styled.h2`
  padding-bottom: 10px;
  border-bottom: 1px solid blue;
`;
```

App.js

```javascript
import { Title } from "./components/Title";
import Form from "./components/Form";
import { Theme } from "./components/Theme";

import "./styles.css";

export default function App() {
  return (
    <Theme>
      <Title>Películas</Title>
      <Form />
    </Theme>
  );
}
```

components/Title.js

```javascript
import Styled from "styled-components";

export const Title = Styled.h1`
  padding-bottom: 10px;
  border-bottom: 1px solid ${(p) => p.theme.color2};
`;
```

components/Theme.js

```javascript
import { ThemeProvider } from "styled-components";

const themes = {
  avengers: {
    bg: "#ceceff",
    color: "#335",
    color2: "rgba(5, 5, 100, 0.5)",
  },
  terminator: {
    bg: "#ccffcc",
    color: "#010",
    color2: "rgba(50, 100, 50, 0.5)",
  },
};

export const Theme = (props) => {
  return (
    <ThemeProvider theme={themes["avengers"]}>{props.children}</ThemeProvider>
  );
};
```

components/Form.js

```javascript
import React from "react";
import Styled from "styled-components";

const StyledForm = Styled.form`
  font-family: courier;
  margin: 0 50px 25px;
  padding: 10px 25px 25px;
  text-align: center;
  transform: scale(1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2); 
  }
`;

const StyledButton = Styled.button`
  cursor: pointer;
  padding: 5 10px;
  border: 1px solid transparent;
  transition: 0.15s border-color;

  &:hover {
    border-color: ${(p) => p.theme.color2};
  }

  &[disabled]{
    background: ${(p) => p.theme.color2};
  }
`;

const Form = (props) => {
  return (
    <StyledForm>
      <h2>Avengers</h2>
      <StyledButton type="button">-</StyledButton>0<StyledButton type="button">+</StyledButton>
    </StyledForm>
  );
};

export default Form;
```

## Trabajando en Svelte con Emotion

App.svelte

```
<style>
:global(body){
  --bg: #ffe9c5
  --color: #e54b00;
  --color2: #512613;
  background: var(--bg);
  color: var(--color);
}
</style>
```

style.js

```javascript
import { css } from "@emotion/css";

export const form = css`
  background: var(--bg);
  color: var(--color2);
  border: 1px solid var(--color);
  font-family: courier;
  margin: 0 50px 25px;
  padding: 10px 25px 25px;
  text-align: center;
  transform: scale(1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const button = css`
  background: var(--color);
  border: 1px solid transparent;
  padding: 5px 10px;
  margin: 0 5px;
  transition: border 0.15s;

  &:hover {
    border: 1px solid var(--color);
    cursor: pointer;
  }

  &[disabled] {
    opacity: 0.5;
  }
`;

export const title = css`
  border-bottom: 1px solid var(--color2);
  padding-bottom: 10px;
`;
```

# Cómo escalar sitios o aplicaciones Web

## Tipos de aplicaciones según su router: SPAs vs. SSR

**SSR "Viejo"**

El Backend utilizaba una plantilla de html, le daba los datos específicos a la plantilla y se los da al navegador. Esa forma de SSR es muy rápida al principio. Pues no le da al usuario la forma de interactuar desde el cliente. Cada vez que el usuario quiere interactuar hay que recargar las páginas.

**SPAs y CSR**

El Backend entregaba al navegador un html practicamente vacío con solo una llamada un script y tal vez algunos estilos. La carga inicial es lenta pero luego la aplicación funciona muy rápidamente y las API son fundamentales para que esto funcione. Para trabajar aquí también necestiamos dos componetes, un hash router y un browser router.

Los routers nos ayudan a manejar las rutas de nuestra aplicación. Normalmente de eso se encargaría el servidor... pero para esto lo debemos hacer desde el cliente.

Hash Router es cuando hacemos las rutas con #header, #about, etc.

El Browser Router es cuando si hacemos la rutas /about, /login...

**Progressive SSR**

En lugar de enviar un archivo vacío al navegador podemos enviar una versión de la aplicación en HTML. Mientras el navegador descarga el JavaScript y vuelve a renderizar la aplicación. Para esto necesitamos Node.js.

**Generación de sitios estáticos**

Estos generadores nos permiten utilizar SSR mientras desarrollamos nuestro sitio pero en producción nos generan páginas estáticas que ya tienen cargada la info que normalmente le pediríamos al backend. Es ideal cuando tenemos data que no va a cambiar mucho.

Para ser un excelente Frontend debes conocer un poco de backend. Y de igual forma... para ser un excelente Backend debes conocer algo de Frontend.

## Frameworks sobre frameworks: Next.js

Un framework como Angular trae todas las herramientas para trabajar con Angular...

Un cli como create-react-app trae varias librerías y las configura para que solo tengamos entrar a trabajar.

Next.js es un framework completo que usa react para la capa de vistas pero internamente trae muchas herramientas de next.js ya listas para entrar a trabajar.

Nuxt.js es igual pero para Vue en lugar de React.

## Organización de archivos en el frontend

Porque en el pasado tratamos de hacer las cosas rápido en el futuro introdujimos deuda técnica. Empecemos con una buena organización para no generarla en el futuro.

Debemos hacer la división entre lógica y la interfaz. Separemos una capa de UI y una capa de datos. Es como cuando se dívide entre componentes Contenedores y componentes presentacionales en React.

**File Type First**

Una carpeta para cada tipo de componente

/components

- MenuComponent.js
- Formcomponent.js

/containers

- MenuContainer.js
- FormContainer.js

/routes

- Homeroute.js
- AboutRoute.js

**Feature First**

Una carpeta para cada feature

/Menu

- MenuComponent.js
- FormComponent.js

/Form

- FormUI.js
- FormLogic.js

/Button

- Button.js
- Button.styles.js}

**Apps for apps**

Una carpeta para cada aplicación.

/StudentsPlatform

- /components
- /containers

/BusinessPlatform

- /Form
- /Button

/SalesLanding

- /html
- /css
- /js
