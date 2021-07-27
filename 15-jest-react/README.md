# Unit Testing con Jest en React

## ¿Qué es un Test? ¿Qué tipos de Test Existen? Jest

Uno como desarrollador debe garantizar que el código que está escribiendo cumple con una expectativa. Esto debemos comprobarlo por medio de una prueba. Una prueba nos permite establecer la forma en que vamos a probar un bloque de código y como vamos a generar la expectativa que necesitamos.

Así garantizamos que la funcionalidad de nuestro desarrollo cumpla con el standard, que pueda ser enviado a producción sin errores y así tengamos la confianza de un buen código.

Regularmente las catalogamos en dos tipos de pruebas, pruebas funcionales y no funcionales.

Dentro de las pruebas funcionales encontramos las pruebas unitarias, en las cuales vamos a probar pequeñas fracciones de código para garantizar que nuestro desarrollo cumpla. Debemos probar cada sección de la página y cada una de las interacciones que tengamos con el usuario.

Jest es una herraminenta muy potente para trabajar con prueba. Jest nos permite trabajar con Babel, Typescript, Node, React, Angular, Vue, MongoDB, etc...

Podemos empezar con Jest sin tanta configuración, probar con snapshots, isolar pruebas, tiene documentación, es potente, facil de usar. Genera un reporte de Code Coverage, es facil de trabajar con MOCKS. Jest es probado y utilizado por la comunidad.

# Introducción a Jest

## Preparación del entorno con Jest

Vamos a configurar nuestro entorno en nuestra terminal

> mkdir jsbase
>
> cd jsbase
>
> git init
>
> npm init
>
> npm install --save-dev jest

Creamos las carpetas src, `__test__`

Creamos los archivos src/index.js `__test__`\global.test.js

Vamos a ver las diferentes formas que tiene Jest para trabajar con strings, arreglos, numero, boleanos, callbacks, promesas, async, await.

Vamos a trabajar sobre una función llamada Test que recibe dos valores principalemnte. Uno es un string (Que describe lo que va a pasar) y el segundo es una función anonima.

global.test.js

```javascript
const text = "Hola Mundo";

test("Debe contener un texto", () => {
  expect(text).toMatch(/Mundo/);
});
```

En el Package.json

```json
"scripts": {
    "test": "jest"
}
```

Y ahora...

> npm run test

## Implementando pruebas para Boolean y Array

**Arreglos**

global.test.js

```javascript
const fruits = ["manzana", "melon", "banana"];

test("Tenemos una banana", () => {
  expect(fruits).toContain("banana");
});
```

**Números**

```javascript
test("Mayor que", () => {
  expect(10).toBeGreaterThan(9);
});
```

**Booleano**

```javascript
test("Verdadero", () => {
  expect(true).toBeTruthy();
});
```

**Callback**

```javascript
const reverseString = (str, callback) => {
  callback(str.split("").reverse().join(""));
};

test("Probar un Callback", () => {
  reverseString("Hola", (str) => {
    expect(str).toBe("aloH");
  });
});
```

## Implementando pruebas a promesas

**Probando Promesas**

```javascript
const reverseString2 = (str) => {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject(Error("Error"));
    }
    resolve(str.split("").reverse().join(""));
  });
};

test("Probar Promise", () => {
  reverseString2("Hola")
    .then((str) => {
      expect(str).toBe("aloH");
    })
    .catch((err) => {
      expect(err.message).toBe("Error");
    });
});
```

**Probando Async y Await**

```javascript
const reverseString2 = (str) => {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject(Error("Error"));
    }
    resolve(str.split("").reverse().join(""));
  });
};

test("Probar async/await", async () => {
  const string2 = await reverseString2("Hola");
  expect(string2).toBe("aloH");
});
```

**Para ejecutar una función antes de las pruebas o antes de cada prueba**

Por ejemplo, tal vez necesito montar una base de datos antes de las pruebas.

```javascript
beforeEach(() => {
  console.log("Antes de cada prueba");
});

beforeAll(() => {
  console.log("Antes de todas las pruebas");
});
```

**Para ejecutar una función despues de las pruebas o despues de cada prueba**

Por ejemplo, tal vez necesito desmontar una base de datos luego de las pruebas.

```javascript
afterEach(() => {
  console.log("Despues de cada prueba");
});

afterAll(() => {
  console.log("Despues de todas las pruebas");
});
```

## Watch y Coverage

Ahora pasamos al index.js

```javascript
const cities = [
  "Ciudad de México",
  "Bogotá",
  "Lima",
  "Buenos Aires",
  "Guadalajara",
];

const randomCity = () => {
  const city = cities[Math.floor(Math.random() * cities.length)];
  return city;
};

const reverseString2 = (str) => {
  return new Promise((resolve, reject) => {
    if (!str) {
      reject(Error("Error"));
    }
    resolve(str.split("").reverse().join(""));
  });
};

module.exports = randomCity;
```

Creo el archivo index.test.js

```javascript
const randomCity = require("../index");

describe("Probar funcionalidades de randomCity", () => {
  test("Probar la funcionalidad", () => {
    expect(typeof randomCity()).toBe("string");
  });

  test("Comprobar que no existe una ciudad", () => {
    expect(randomCity()).not.toMatch(/Cordoba/);
  });
});
```

> npm test
>
> sudo npm install -g jest
>
> `jest src/__test__/index.test.js`

En el package.json puedo agregar este script

```json
"scripts": {
  "test:watch": "jest --watch"
}
```

> npm run test:watch

Ahora para generar los reportes de Coverage corremos

> jest --coverage

Genera una carpeta llamada coverage/Icov-report y un archivo index .html que podemos ver desde nuestro navegador.

# Usando Jest con React

## Preparar proyecto

Copie el proyecto platzi-store-jest

> npm install
>
> npm run start
>
> npm install --save-dev jest enzyme enzyme-adapter-react-16

En el package.json añadimos los scripts de test:

```json
"script": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

Creamos la carpeta `src/__test__` y dentro de esta carpeta creamos un adapter llamado setupTest.js

```javascript
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adater: new Adapter() });
```

Ahora nuevamente el el package.json deberíamos agregar una configuración al final del archivo:

```json
"jest": {
  "setupFilesAfterEnv": [
    "<rootDir>/src/__test__/setupTest.js"
  ]
}
```

Creamos la carpeta `src/__test__/components` y dentro el archivo Footer.test.js

```javascript
// 1. Necesitaremos react proque vamos a probar un componente de react
import React from "react";
// 2. mount de enzyme para poder montar el componente.
import { mount } from "enzyme";
// 3. Necesitamos el componente
import Footer from "../../components/Footer";

// 4. Creamos nuestra suite de pruebas
describe("<Footer />", () => {
  test("Render del componente Footer", () => {
    const footer = mount(<Footer />);
    expect(footer.length).toEqual(1);
  });
});
```

Si corremos el comando

> npm test

Pues de todos modos el test dara un error porque Jest no sabe trabajar con los estilos. Por eso es necesario crear un mock.

## Crear mocks

Los mocks serían funciones que podemos usar para simular acciones que tendría que hacer nuestra aplicación.

Creamos la carpeta `src/__mocks__` dentro creamos un styleMock.js

```javascript
// Este archivo solo va a exportar un modulo vacío para que no haga pues nada...
module.exports = {};
```

Y ahora en el package.json en la configuración de Jest al final del archivo

En la parte de moduleNameMapper puedo configurar los mocks.

```json
"jest": {
  "setupFilesAfterEnv": [
    "<rootDir>/src/__test__/setupTest.js"
  ],
  "moduleNameMapper": {
    "\\.(styl|css)": "<rootDir>/src/__mocks__/styleMock.js"
  }
}
```

Ahora puedo segur con la prueba:

```javascript
describe("<Footer />", () => {
  const footer = mount(<Footer />);

  test("Render del componente Footer", () => {
    expect(footer.length).toEqual(1);
  });

  test("Render del titulo", () => {
    expect(footer.find(".Footer-title").text()).toEqual("Platzi Store");
  });
});
```

Como este proyecto esta utilizando Redux es necesario crear un mock del provider entonces creamos `src/__mocks__/ProviderMock.js`

```javascript
import React from "react";
import { createStore } from "redux";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import initialState from "../initialState";
import reducer from "../reducers";

const store = createStore(reducer, initialState);
const history = createBrowserHistory();

const ProviderMock = (props) => (
  <Provider store={store}>
    <Router history={history}>{props.children}</Router>
  </Provider>
);

export default ProviderMock;
```

## Implementar provider mock

Ya que tenemos nuestro provider mock vamos a implementarlo en una prueba para el componente Header. Para esto creamos `_test__/components/Header.test.js`

```javascript
import React from "react";
// shallow permite traer elementos y probarlos como una unidad, pues no necesitamos toda la estructura y los componentes del DOM para probarlo
import { mount, shallow } from "enzime";
import ProviderMOck from "../../__mocks__/ProviderMock";
import Header from "../../components/Header";

describe("<Header />", () => {
  test("Render del componente Header", () => {
    const header = shallow(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    // Esto sería solo para ver si el header se montó
    expect(header.length).toEqual(1);
  });

  test("Render del Titulo", () => {
    const header = mount(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    expect(header.find(".Header-title").text()).toEqual("Platzi Store");
  });
});
```

> npm run test

Ahora creamos Product.test.js

```javascript
import React from "react";
// Mount para probar con todos los beneficios del DOM y shallow para probar algo puntual
import { mount, shallow } from "enzyme";
import ProviderMock from "../../__mocks__/ProviderMock";
// Este product mock hay que crearlo
import ProductMock from "../../__mocks__/ProductMock";
import Product from "../../components/Product";

describe("<Product />", () => {
  test("Renderl de componente Product", () => {
    const Product = shallow(
      <ProviderMock>
        <Product />
      </ProviderMock>
    );
    expect(product.length).toEqual(1);
  });

  test("Comprobar el boton de comprar", () => {
    // jest.fn es como para crear una función dummy de jest que según entiendo pues puede llevar la cuenta de cuantas veces se ha llamado.
    const handleAddToCart = jest.fn();
    const wrapper = mount(
      <ProviderMock>
        <Product product={ProductMock} handelAddToCart={handleAddToCart} />
      </ProviderMock>
    );
    wrapper.find("button").simulate("click");
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  });
});
```

vamos a necesitar un ProducMock.js

```javascript
const ProductMock = {
  // Aquí copiamos un objeto de product del initial state
};

export default ProductMock;
```

## Snapshot

Creamos un snapshot para comprobar que la estructura que renderizamos siempre sea la misma.

Añadimos en el Test de Footer. Debemos considerar que para utilizar estos snapshots debemos convertir nuestros componentes a objetos json. Esto lo hacemos con react-test-renderer

> npm install --save-dev react-test-renderer

```javascript
import { create } from "react-test-renderer";

describe("Footer Snapshot", () => {
  test("Comprobar la UI del componente Footer", () => {
    // Como footer no esta conectado con redux no necesitamos un provider
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });
});
```

> npm run test

Esto crear una carpeta `__snapshot__` y un archivo Footer.test.js.snap si hacemos un cambio dentro del componente entonces la prueba fallaría ya que no es como el snapshot. Estos tests son necesarios cuando queremos garantizar que nuestra UI no cambie.

En el Header podemos hacer un test de snapshot utilizando el provider.

```javascript
import { create } from "react-test-renderer";

describe("Header Snapshot", () => {
  test("Comprobar la UI del componente Header", () => {
    const header = create(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    expect(header.toJSON()).toMatchSnapshot();
  });
});
```

Ahora si es el caso de que si querramos cambiar el UI entonces deberíamos correr el comando

> jest --updateSnapshot

## Probar Actions

Vamos a probar los actions de nuestro proyecto con Redux

Creamos la carpeta `src/__test__/actions` y el archivo actions.test.js

```javascript
import actions from "../../actions";
import ProductMock from "../../__mocks__/ProductMock";

describe("Actions", () => {
  test("addToCart Action", () => {
    const payload = ProductMock;
    const expected = {
      type: "ADD_TO_CART",
      payload,
    };
    expect(actions.addToCart(payload)).toEqual(expected);
  });
});
```

Hacemos un cambio en la configuración de Jest en el package.json

```json
"jest": {
    "verbose": true,
    "setupFilesAfterEnv": [
      "<rootDir>/src/__test__/setupTest.js"
    ],
    "moduleNameMapper": {
      "\\.(styl|css)": "<rootDir>/src/__mocks__/styleMock.js"
    }
  }
```

## Probar Reducers

Ahora creamos la carpeta `src/__test__/reducers` y dentro un nuevo archivo reducers.test.js

```javascript
import reducer from "../../reducers";
import ProductMock from "../../__mocks__/ProductMock";

describe("Reducers", () => {
  test("Retornar el estado inicial", () => {
    // Debería retornar un objeto vacío porque al enviarle al reducer un string vacío, no va a hacer nada con el estado por lo tanto devuelve el estado tal y como esta.
    expect(reducer({}, "")).toEqual({});
  });

  test("ADD_TO_CART", () => {
    const initialState = { cart: [] };
    const payload = ProductMock;
    const action = {
      type: "ADD_TO_CART",
      payload,
    };
    const expected = { cart: [ProductMock] };
    expect(reducer(initialState, action)).toEqual(expected);
  });
});
```

## Probar peticiones fetch

Creamos una carpeta src/utils y allí creamos un archivo getData.js

```javascript
const getData = (api) => {
  return fetch(api)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

export default getData;
```

Y ahora para probar esta función debería crear la carpeta `src/__test__/utils` y dentro getData.test.js

Para poder trabajar con fetch y hacer peticiones necesitamos un mock, este mock es un poco más complejo por eso nos valdremos de una herramienta

> npm install --save-dev jest-fetch-mock

En el archivo setupTest.js añadimos la configuración que necesita para trabajar nuestro mock.

```javascript
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
// Agregamos esta configuración para poder capturar todas las peticiones fetch y no usar el fetch normal del navegador.
global.fetch = require("jest-fetch-mock");
```

```javascript
import getData from "../../utils/getData";

describe("Fetch API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("Llamar una API y retornar datos", () => {
    fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));
    // google.com es solo porque es necesario mandarle una url a la función, puede ser cualquiera.
    getData("https://google.com").then((response) => {
      expect(response.data).toEqual("12345");
    });

    // Y este expect es para garantizar que la llamada si este haciendose a la url correcta.
    expect(fetch.mock.calls[0][0]).toEqual("https://google.com");
  });
});
```

# Deploy y CI con Travis

## Jest + CI

Vamos a utilizar Travis CI para comprobar que las pruebas se esten cumpliendo antes de enviar nuestro sitio a producción.

Hay que crear una cuenta en Travis CI

Creamos en la raiz del proyecto un archivo `.travis.yml`

```yml
language: node_js
cache:
  directories:
    - ~/.npm
node_js:
  - "12"
git:
  depth: 3
script:
  - yarn test
  - yarn build
deploy:
  provider: pages
  edge: true
  skip-cleanup: true
  keep-history: true
  github-token: $GITHUB_TOKEN
  local-dir: dist/
  target-branch: gh-pages
  commit_message: "Deploy release ${TRAVIS_TAG}"
  on:
    branch: master
```

En GitHub creamos un token:

- En la cuenta --> Setting --> Developer Settings --> Personal Access tokens y aquí creamos un nuevo token con acceso a los repositorio y al read repo hook.

En travis seleccionamos un repositorio, y nos vamos a settings y allí agregamos una variable llamada GITHUB_TOKEN

## Probando el proyecto antes de hacer deploy

> git status
>
> git add .
>
> git commit -m "Travis config"

Esto se envia a la rama en la que estamos trabajando

> git push origin 08-jest-ci

Esta rama le hacemos un merge a master
