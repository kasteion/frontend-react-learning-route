# Introducción

## ¿Qué son las pruebas unitarias?

Lo que hacen es tomar todos tus proyectos y dividirlos en pequeñas piezas de código y probarlas pieza por pieza.

Las pruebas unitarias comprueban lo que son casos estándares. O una suposición explicita, no son perfectas pero van a probar lo que nuestro equipo prevee que va a pasar.

**Características**

1. Son Automatizables
2. Tienen total cobertura
3. Son reutilizables
4. Son independientes (No dependen de otra prueba)
5. Rápidas de crear

**Ventajas**

1. Proporcionan un trabajo ágil
2. La calidad del código mejora.
3. Detectar errores más rápido
4. Facilita los cambios y favorece la integración.
5. Proporciona información. Documentamos con pruebas también.
6. Reduce el costo.

**¿Desventajas?**

1. Nosotros somos los que probamos y nosotros las definimos, depende de nosotros que tan buena es la prueba.

## Herramientas para pruebas unitarias

Javascript ha sido uno de los lenguajes con más framework de pruebas pero con menos cultura de pruebas en su comunidad.

Han existido frameworks como Ava, Tape, Enzyme, Jasmine, Mocha y Jest, Cypress.

# Configuración

## ¿Qué es Jest?

Jest es una herramienta para hacer pruebas unitarias con JavaScript. Fue creado por el equipo de desarrollo de Facebook y mantenido por la comunidad open source. Al principio era para crear pruebas unitarias en el contexto de React pero ahora podemos hacerlo en cualquier proyecto creado con JavaScript.

1. Desarrollo Rápido de Pruebas
2. Feedback Instántaneo.
3. Snapshot Testing.
4. Zero configuration testing platform (Instalar, Crear una carpeta test y crear pruebas)
5. Potente librería de Mocking.
6. Funciona con Typescript.

**¿Quién usa Jest?**

- Facebook
- Twitter
- Spotify
- Instagram
- Airbnb

## Instalación y configuración

> mkdir jest-unit-tests
>
> cd jest-tests
>
> git init
>
> npm init -y
>
> npm install --save-dev jest
>
> npm install --save-dev babel-jest @babel/core @babel/preset-env

Creamos un archivo .babelrc

```javascript
{
    "presets": [["@babel/preset-env", { targets: { node: "current"}}]],
}
```

O según la documentación de Jest... creamos babel.config.js

```javascript
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
```

## Creando nuestra primera prueba unitaria

Creamos un archivo llamado maths.js

Y creamos en ella las funciones para sumar, restar, multiplicar, dividir.

Creamos una prueba en la carpeta `__tests__`.

Y Creamos un archivo maths.test.js

```javascript
import { sumar, multiplicar, restar, dividir } from "../src/maths";

describe("Calculos Matemáticos", () => {
  test("Prueba de sumas", () => {
    expect(sumar(1, 1)).toBe(2);
  });

  test("Prueba de sumas", () => {
    expect(sumar(20, 14)).toBe(34);
  });

  test("Prueba de restas", () => {
    expect(restar(34, 10)).toBe(24);
  });

  test("Prueba de restas", () => {
    expect(restar(24, 30)).toBe(-6);
  });

  test("Prueba de multiplicación", () => {
    expect(multiplicar(2, 2)).toBe(4);
  });

  test("Prueba de multiplicación", () => {
    expect(multiplicar(2, -2)).toBe(-4);
  });

  test("Prueba de multiplicación", () => {
    expect(multiplicar(-1, -2)).toBe(2);
  });

  test("Prueba de división", () => {
    expect(dividir(2, 2)).toBe(1);
  });

  test("Prueba de división", () => {
    expect(dividir(100, -2)).toBe(-50);
  });

  test("Prueba de división", () => {
    expect(dividir(-20, -2)).toBe(10);
  });
});
```

Y los tests se pueden correr con

> npm test
>
> npm jest maths.test.js
>
> npm test maths.test.js
>
> npm t
>
> npm t maths.test.js

# Matchers

## Common Matchers / Comparadores Comunes

```javascript
test("Igualdad de elementos", () => {
  expect(user).toEqual(user2);
});

test("Diferencia de elementos", () => {
  expect(user).not.toEqual(user3);
});
```

## Numbers

```javascript
describe("Comparación de números", () => {
  test("Mayor que", () => {
    expect(numbers(2, 2)).toBeGreaterThan(3);
  });

  test("Mayor que o igual", () => {
    expect(numbers(2, 2)).toBeGreaterThanOrEqual(4);
  });

  test("Menor que", () => {
    expect(numbers(2, 2)).toBeLessThan(5);
  });

  test("Menor que o igual", () => {
    expect(numbers(2, 2)).toBeLessThanOrEqual(4);
  });

  test("Numeros flotantes", () => {
    expect(numbers(0.2, 0.2)).toBeCloseTo(0.4);
  });
});
```

## Truthness / Verdadero

Son funciones que retornan verdadero, falso, undefined o nulo. Esto es para cuando nosotros estamos esperando un valor y recibimos algo no esperado, como un undefined.

```javascript
import { isNull, isTrue, isFalse, isUndefined } from "../src/true";

describe("Probar resultados nulos", () => {
  test("Probar si recibimos un nulo", () => {
    expect(isNull()).toBeNull();
  });
});

describe("Probar resultados verdaderos", () => {
  test("Verdadero", () => {
    expect(isTrue()).toBeTruthy();
  });
});

describe("Probar resultados falsos", () => {
  test("Falso", () => {
    expect(isFalse()).toBeFalsy();
  });
});

describe("Probar resultados undefined", () => {
  test("Undefined", () => {
    expect(isUndefined()).toBeUndefined();
  });
});

describe("Probar resultados defined", () => {
  test("Defined", () => {
    expect(isTrue()).toBeDefined();
  });
});
```

## Arrays

```javascript
import { arrayFruits, arrayColors } from "../src/array";

describe("Comprobaremos que existe un elemento", () => {
  test("Contiene una banana", () => {
    expect(arrayFruits()).toContain("banana");
  });

  test("No contiene un platano", () => {
    expect(arrayFruits()).not.toContain("platano");
  });

  test("Comprobar el tamaño de un arreglo", () => {
    expect(arrayFruits()).toHaveLength(6);
  });
});
```

## Coverage

Agregamos un nuevo script a package.json

```javascript
"test:coverage": "jest --coverage"
```

Y corremos

> npm run test:coverage

## Strings

```javascript
describe("Comprobar cadenas de texto", () => {
  const text = "Un bonito texto";

  test("Debe contener el siguiente texto", () => {
    expect(text).toMatch(/bonito/);
  });

  test("No contiene el siguiente texto", () => {
    expect(text).not.toMatch(/es/);
  });

  test("Comprobar la longitud del text", () => {
    expect(text).toHaveLength(15);
  });
});
```

## Monitoreo

Esto es para setear un proceso que siempre este escuchando cambios para correr las pruebas conforme vamos haciendo los cambios. Para esto agregamos un scritp en package.json

```javascript
"test:watch": "jest --watch"
```

## Setup de pruebas

Jest nos proporciona funciones auxiliares para mejorar el manejo de nuestras plataformas, esto significa. Que podremos corres funciones antes, durante o después de nuestras pruebas.

Esto nos permite setear ciertas configuraciones muy particulares que necesitemos antes que corra la prueba y despues de esta.

- afterEach(): Despues de cada prueba
- afterAll(): Despues de todas las pruebas
- beforeEach(): Antes de cada prueba
- beforeAll(): Antes de todas las pruebas

Creamos un archivo setup.test.js

```javascript
// Despues de cada prueba
afterEach(() => console.log("Despues de cada prueba"));
// Despues de todas las pruebas
afterAll(() => console.log("Despues de todas las pruebas"));

// Antes de todas las pruebas
beforeAll(() => console.log("Antes de todas las pruebas"));
// Antes de cada prueba
beforeEach(() => console.log("Antes de cada prueba"));

describe("Preparar antes de ejecutar", () => {
  test("Es verdadero", () => {
    expect(true).toBeTruthy();
  });

  test("Es falso", () => {
    expect(false).toBeFalsy();
  });
});
```

# Testing Asynchronous Code

## Callbacks

Jest nos provee una función que nos permite probar funciones asíncronas como callbacks, promesas, async await, esta es llamada done.

```javascript
import { callbackHell } from "../src/callbacks";

describe("Probando Callbacks", () => {
  test("Callback", (done) => {
    function otherCallback(data) {
      expect(data).toBe("Hola Javascripters");
      done();
    }
    callbackHell(otherCallback);
  });
});
```

## Promesas

Vamos a trabajar con axios para hacer la petición http. Axios nos devuelve una promesa.

> npm install --save axios

```javascript
import { getDataFromApi } from "../src/promise";

describe("Probando promesas", () => {
  const api = "https://rickandmortyapi.com/api/character/";
  test("Realizando una petición a una api", (done) => {
    getDataFromApi(api).then((data) => {
      //console.log(data);
      console.log(data.results.length);
      expect(data.results.length).toBeGreaterThan(0);
      done();
    });
  });
});
```

## Reject y resolve

```javascript
import { getDataFromApi } from "../src/promise";

describe("Probando promesas", () => {
  const api = "https://rickandmortyapi.com/api/character/";
  test("Realizando una petición a una api", (done) => {
    return getDataFromApi(api).then((data) => {
      //console.log(data);
      //console.log(data.results.length);
      expect(data.results.length).toBeGreaterThan(0);
      done();
    });
  });

  test("Resuelve un Hola!", () => {
    return expect(Promise.resolve("Hola!")).resolves.toBe("Hola!");
  });

  test("Rechaza con un error", () => {
    return expect(Promise.reject("Errooor!")).rejects.toBe("Errooor!");
  });
});
```

## Async / Await

## Aplicaciones de testing para Async / Await

```javascript
import { getDataFromApi } from "../src/promise";

describe("Probar Async/Await", () => {
  test("Realizar una petición a una api", async () => {
    const api = "https://rickandmortyapi.com/api/character/";
    const rickUri = "https://rickandmortyapi.com/api/character/1";
    const data = await getDataFromApi(api);
    expect(data.results.length).toBeGreaterThan(0);
    const rick = await getDataFromApi(rickUri);
    expect(rick.name).toMatch(/Rick Sanchez/);
  });

  test("Realizando una petición a un api con error", async () => {
    const apiError = "https://httpstat.us/500";
    const peticion = getDataFromApi(apiError);
    await expect(peticion).rejects.toEqual(
      Error("Request failed with status code 500")
    );
  });

  test("Resuelve un Hola", async () => {
    await expect(Promise.resolve("Hola")).resolves.toBe("Hola");
    await expect(Promise.reject("Error")).rejects.toEqual("Error");
  });
});
```

# Snapshot Testing

## Snapshot Testing

```javascript
import { getCharacter } from "../src/snapshot";
import rick from "../src/rick.json";

describe("Es hora de las instantaneas", () => {
  test("Snapshot", () => {
    expect(getCharacter(rick)).toMatchSnapshot();
  });
});
```

> npm test snapshot.test.js
>
> npm test snapshot.test.js -- -u

## Excepciones Snapshot

Existen datos que no siempre son estáticos, Al contrario. Están constantemente cambiando. Para ello necesitamos hacer ciertas excepciones.

# Implementando Jest en diferentes Frameworks

## Preparar proyecto para trabajar con React JS

> git clone https://github.com/gndx/platzi-react-jest
>
> cd platzi-react-jest
>
> npm install
>
> npm start
>
> npm install --save-dev enzyme enzyme-adapter-react-16

Enzyme y Enzyme-adapter-react-16 son necesarios para montar nuestros componentes internamente sin necesidad de que este montada en un app.

Creamos una carpeta llamada `src\__test__`

Dentro de la carpeta creamos un archivo Hello.test.js

## Preparar proyecto para trabajar con Vue JS

> git clone https://github.com/gndx/platzi-vue-jest
>
> cd platzi-vue-jest
>
> npm install

## Preparar proyecto para trabajar con Express JS

> git clone https://github.com/gndx/platzi-express-jest
>
> cd platzi-express-jest
>
> npm install
>
> node server.js
>
> npm install --save-dev babel-cli babel-preset-env jest supertest

Creamos la carpeta `__test__`

Y creamos app.test.js

```javascript
const request = require("supertest");
const app = require("../app");

describe("Probar nuestro mini servidor de express", () => {
  test("Debe responder al método GET", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
```

> jest

## Beneficios de las Pruebas Unitarias
