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
