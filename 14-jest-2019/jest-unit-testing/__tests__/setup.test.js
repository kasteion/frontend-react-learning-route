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
