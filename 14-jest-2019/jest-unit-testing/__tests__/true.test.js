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
