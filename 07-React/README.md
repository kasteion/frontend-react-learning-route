# Introducción a React.js

## ¿Qué es React.js?

Es una librería de JavaScript para construir interfaces de usuario. Biblioteca / Framework porque la línea es muy borrosa.

React es declarativo... no le decimos como hacerlo sino que queremos.

```
<Layout>
    <Header />
    <Blogpost post={data}>
    <Footer />
</Layout>
```

Eso no es html, es JSX.

En React se crean componentes que son como pequeños bloque de lego que vamos juntando para formar la aplicación.

Aprende una vez... escribelo donde sea. Si vas al website, React. Si vas a la aplicación... React también. Lo usan muchísimas compañías en internet y cada vez la lista crece y crece más.

## Pre-requisitos

Necesitamos conocimientos de:

- Desarrollo web online: Esto implica tener familiaridad y fortaleza en el uso de HTML y CSS.
- JavaScript: React es JavaScript. Es importante saber usar JavaScript en el navegador. Es desaeable concoer JQuery y saber sobre promesas, clases y tener conocimientos sobre asincronía.
- Terminal: La línea de comandos es indispensable para instalar herramientas, correr servidores y hacer diversas tareas.

## Herramientas que usaremos

- Navegador: Especialmente Chrome ya que cuenta con óptimas herramientas de desarrollo.
- React Developer Tools: Es una herramienta Open Source creada por Facebook y tiene instalación para Chrome o Firefox. NOs dejará ver el código de React inspeccionando elementos.
- Editor de texto: Puedes usar cualquiera, en este curso sugerimos Visual Studio Code. Tiene muchos plugins útiles para el desarrollo.
- Prettier: Es el plugin que hace que el código se vea bien sin importar cómo esta escrito.

## Create-react-app

create-react-app es la forma de moderna de crear una aplicación de react. Antes de esto había que prepara a mano todo el ambiente para crear una applicación de React.

> npx create-react-app hello-app
>
> npm start

Create React App utiliza Webpack, Babel, ESLint.

# Fundamentos

## Clonar el código de GitHub

## ReactDOM.render

Con JavaScript siempre hemos podido crear elementos en el dom.

```javascript
const element = document.createElement("h1");
element.innerText = "Hello, Platzi Badges!";
const container = document.getElementById("app");
container.appendChild(element);
```

Con react, React hara las veces del createElement y react-dom hara las veces del appendChild.

```javascript
import React from "react";
import ReactDOM from "react-dom";

const element = <h1>Hello, Platzi Badges!</h1>;

ReactDOM.render(element, document.getElementById("app"));
```

## JSX

Se podría utilizar...

```javascript
const jsx = <h1>Hello, Platzi Badges!</h1>;
const title = React.createElement("h1", {}, "Hola!, Soy los children.");
const anchor = React.createElement(
  "a",
  { href: "http://platz.com" },
  "Ir a Platzi"
);
const name = "Fredy";
const jsx2 = <h1>Hello, soy {name}</h1>;
const jsx3 = (
  <div>
    <h1>Título</h1>
    <p>Parrafo</p>
  </div>
);

// Con createElement se podría pero sería así...
const element3 = React.createElement(
  "div",
  {},
  React.createElement("h1", {}, "Título"),
  React.createElement("p", {}, "Parrafo")
);
```

Utilizar JSX es mucho más expresivo y el código es mucho más legible. Pero siempre hay que recordar que React es JavaScript. La diferencia es que con JSX pasa por webpack, babel y create react app antes de llegar al explorador. JSX se convierte en Javascript.

# Creación y diseño de componentes

## ¿Qué es un componente?

Un componente es la unidad básica de desarrollo. Los componentes son como que tuvieramos átomos. Los componentes son bloques de construcción. Legos.

Las aplicaciones hechas en React son como figuras de Lego. Junta varias piezas (los componentes) y puesdes construir un website tan pequeño o tan grande como quieras.

**Componente vrs Elemento**

Un elemento es a un objeto como un componente es a una clase. Si el elemento fuera una casa, el componente serían los planos para hacer la casa.

**Identificación de componentes**

Dos preguntas guías:

- ¿Qué elementos se repiten?
  - Elementos en una lista
  - Elementos que comparten aspecto visual y su funcionalidad.
- ¿Qué elementos cumplen una función muy específica?
  - Sirven para encapsular lógica
  - Permiten juntar muchos comportamientos y aspectos visuales en un solo lugar.

"Identificar componentes es una habilidad escencial esencial para poder desarrollar aplicaciones de React"

## Qué es y cómo funciona un componente en React.js

**Montaje**

Es el primer paso del ciclo de vida de un componente.

**Actualización**

Cuando los componentes se actualizan se ejecuta el render(), esto genera el nuevo dom y react nos manda una configurmación por componentDidUpdate().

**Unmount**

React nos manda un componentWillUnmount() y elimina el código del DOM.

## Nuestro primer componente

Nuestro primer componente es Badge...

```javascript
import React from "react";
import confLogo from "../images/badge-header.svg";

class Badge extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img src={confLogo} alt="Logo de la conferencia" />
        </div>
        <div>
          <img src="https://gravatar.com/avatar?d=identicon" alt="Avatar" />
          <h1>
            Fredy <br /> Castellón
          </h1>
          <div>
            <p>Frontend Engineer</p>
            <p>@kasteion</p>
          </div>
          <div>#Platziconf</div>
        </div>
      </div>
    );
  }
}

export default Badge;
```

## Cómo aplicar estilos

Para los estilos crearemos una carpeta llamada **Styles** y allí vivirán todos los archivos de estilos que tienen que ver con los componentes.

Para usar los estilos es necesario importarlos con import.

React funciona ligeramente diferente y para los atributos de clases no se utiliza class sino className.

Es posible utilizar Bootstrap con React, sólo debe ser instalado con npm install bootstrap y debe ser importando en el index.js

Existen estilos que son usados de manera global o en varios componetnes, así que deben ser importados en el index.js

## Props

Props son como los argumentos de una función. En este caso son los atributos de nuestro componente.

## Nuestra primera página

Creamos una carpeta pages en el src.

## Enlazando eventos

- React dispone de eventos. Cada vez que se recibe información en un input se obtiene un evento onCharge y se maneja con un método de la clase this.handlechange.
- Los elementos button también tienen un evento que es onClick.
- Cuando hay un botón dentro de un formulario, este automáticamente será de tipo submit. Si no queremos que pase así hay dos maneras de evitarlo: especificando que su valor es de tipo button o manejándolo desde el formulario cuando ocurre el evento onSubmit.

```javascript

handleChange(e) {
    console.log({
      name: e.target.name,
      value: e.target.value,
    });
  }

  handleClick(e) {
    console.log("Button was pressed!");
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Form was submitted");
  }
```

## Manejo de estado

Una forma de que los componentes generen su propia información y guardarla para que el componete la use o pasarla a otros componentes a través de props.

Y así quedó BatchForm:

```javascript
class BadgeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      jobTitle: "",
      twitter: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    // console.log({
    //   name: e.target.name,
    //   value: e.target.value,
    // });
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClick(e) {
    console.log("Button was pressed!");
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("Form was submitted");
  }

  render() {
    return (
      <div>
        <h1>New Attendant</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            ></input>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              className="form-control"
              type="text"
              name="lastname"
              onChange={this.handleChange}
              value={this.state.lastname}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input
              className="form-control"
              type="text"
              name="jobTitle"
              onChange={this.handleChange}
              value={this.state.jobTitle}
            ></input>
          </div>
          <div className="form-group">
            <label>Twitter</label>
            <input
              className="form-control"
              type="text"
              name="twitter"
              onChange={this.handleChange}
              value={this.state.twitter}
            ></input>
          </div>
          <button onClick={this.handleClick} className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}
```

## Levantamiento del estado

Ahora el problema es que el estado de BadgeForm tiene que llegar a Badge. Entonces debemos levantar el estado. Cuando queremos levantar estado debemos ponerlo en el lugar más cercano a donde están todos los componentes. En este caso tenemos que lenvantar el estado de BatchForm a BatchNew. Del Form a la página.

## Listas de componentes

# React Router

## Introducción a React Router

Las aplicaciones que se trabajan en React son llamadas **single page apps**. Esto es posible gracias a **React Router** que es una librería Open Source.

**Multi Page Apps**: Cada página implica una petición al servidor. La respuesta usualmente tiene todo el contenido de la página.

**Mingle Page Apps (SPA)**: Aplicaciones que cargan una sola página de HTML y cualquier actualización la hacen re-escribiendo el HMTL que ya tenían.

**React Router**: Nos da las herramientas para poder hacer SPA fácilmente. Usaremos 4 componentes:

- BrowserRouter: Es el componente que debe estar siempre lo más arriba de la aplicación. Todo lo que esté adentro funcionará como una SPA.

```javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        {...}
      </BrowserRouter>
    );
  }
}
```

- Route: Representa una dirección de internet. Cuando hay un match con el path, se hace render del component. El component va a recibir tres props: match, history, location.

```javascript
  <Route path="/" component={Home}>
```

- Switch: Dentro de Switch solamente van elementos de Route. Switch se asegura que solamente un Route se renderice.
- Link: Toma el lugar del elemento anchor, evita que se recarge la página completamente y actualiza la URL.

## División de la aplicación en rutas

Para instalar React Router lo hacemos desde la terminal con

> npm install react-router-dom

- Link internamente tiene un elemento anchor pero va a interceptar el click para navegar de manera interna sin refrescar toda la página.

Creamos un components/App.js

## Mejorando la User Interface con un Layout

Creamos components/Layout.js

- React.Fragment es la herramienta que te ayudará a renderizar varios componentes y/o elementos sin necesidad de colocar un div o cualquier otro elemento de HTML para renderizar sus hijos. Al utilizar esta característica de React podremos renderizar un código más limpio y legible, ya que React.Fragment no se renderiza en el navegador.
- El 404 es la ruta que se renderizará cuando ninguna otra coincida con la dirección ingresada.

Otra forma de hacer que todas tus URLs que no existan sean redirigidas a tu componente de 404 sería de la siguiente forma:

```javascript
import { Redirect, Route } from "react-router-dom";

<Route path="/404" component={MiComponente404} />
<Redirect from="*" to="">
```

Como podemos observar llamamos a nuestro componente 404 y luego utilizamos Redirect, el cual es un componente de React Router para hacer redirecciones; en este caso hacemos que todas las URLs que no correspondan a alguna que hayamos declarado, sean redirigidas a MiComponente404.

# Component Lifecycle

## Introducción del ciclo de vida de un componente

Cuando React renderiza los componentes decimos que entran en escena, cuando su estado cambia o recibe unos props diferentes se actualizan yu cuando cambiamos de página se dice que se desmontan.

**Montaje**

- Representa el momento donde se inserta el código del componente en el DOM.
- se llaman tres métodos: constructor, render, componentDidMount.
- El constructor es un buen lugar para iniciar estado o inicializar valores.

**Actualización**

- Ocurre cuando los props o el estado del componente cambian.
- El componente vuelve a renderizarse, porque algo cambio y su aspecto tal vez es otro. Esto se extiende a sus componentes children.
- Se llaman dos métodos: render, componentDidUpdate.

**Desmontaje**

- El componente sale de escena, se cambia de una págiana a otra y el componente va a dejar de existir.
- Nos da la oportunidad de hacer limpieza de nuestro componente.
- Se llama un método: componentWillUnmount.
- componentWillUnmount es el lugar en que podemos limpiar memoria, porque tal vez estamos trabajando con timeouts o intervalos que debemos cancelar al desmontar el componente.

Estos son los estados básicos del ciclo de vida de los componentes de React.

## Práctica del ciclo de vida

# Llamadas a un API

## Introducción llamadas a un API

Las llamadas a un API siguen un patrón similar siempre que las hacemos, cada llamada consta de tres estados.

Una Promesa:

- Loading: Cuando la petición se envía y estamos esperando. Hay que darle un indicador al usuario para mostrarle que estamos cargando. Ese louder es muy importante tenerlo y mostrarlo.
- Error: Se debe dejar un mensaje para el usuario para arreglar el error o volver a intentarlo. Es muy importante siempre manejarlo. Quedarse con una pantalla en blanco es peor que dar un mensaje.
- Data: Los datos nos pueden llegar de dos formas, o en error o con los datos requeridos. En el caso que nos vaya bien vamos a obtener una información que debemos presentar.
- Data Vacía: Es posible que la respuesta venga con datos vacíos. Es la oportunidad de dar un mensaje de está vacío... que tal si ingresas un dato.
- Con Datos: Es posible que la respuesta venga con datos.

## React.js: Cómo traer datos de un API en React

## Solicitando datos (GET)

## Mejorando la Experiencia de Usuarios durante una petición

## Enviando datos (POST)

> npm install md5

Y creamos el componente Gravatar...

## Manejando los estados de la petición durante el POST

## Actualizando datos (PUT)

## Actualizaciones automáticas

# Mejorando la UI

## Los detalles de un Badge

## UI Component y Container Components

Cuando un componente hace muchas cosas es probable que necesitemos dividirlo en dos. En un componente presentacional y un componente contenedor. En este caso vamos a dividir en dos el componente BadgeDetails porque obtiene datos pero también los presenta.

## Portales

En el body del index.html

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <div id="modal"></div>
</body>
```

Y en el archivo BadgeDetails.js

```javascript
{
  ReactDOM.createPortal(
    <h1>Hola, realmente no estoy aquí</h1>,
    document.getElementById("modal")
  );
}
```

## Modales

Ahora si creamos el componente llamado Modal.js

## Hooks

Las funciones no tienen un estado propio que manejar como ciclos de vida a los que deben suscribirse, mientras tanto las clases cuentan con ello.

React tiene un feature llamado **Hooks** que permite que las funciones también tengan features que solamente tienen las clases.

**Hooks**: Permiten a los componentes funcionales tener características que solo las clases tienen:

- **useState**: Pära manejo de estado.
- **useEffect**: Para sucribir el componente a su ciclo de vida.
- **useReducer**: Ejecutar un efecto basado en una acción.

**Custom Hooks**: Usamos los hooks fundamentales para crear nuevos hooks custom. Esto hooks irán en su propia función y su nombre comenzara con la palabra use. Otras de sus características es que no pueden ser ejecutados condicionalmente (if).

- **useState**: Regreas un arreglo de dos argumentos.

## Search filter

# Conclusión

## Conclusión
