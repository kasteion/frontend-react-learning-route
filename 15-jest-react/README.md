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
beforeEach(() => {
  console.log("Antes de cada prueba");
});

beforeAll(() => {
  console.log("Antes de todas las pruebas");
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

## Crear mocks

## Implementar provider mock

## Snapshot

## Probar Actions

## Probar Reducers

## Probar peticiones fetch

# Deploy y CI con Travis

## Jest + CI

## Probando el proyecto antes de hacer deploy

## Recapitulación y cierre
