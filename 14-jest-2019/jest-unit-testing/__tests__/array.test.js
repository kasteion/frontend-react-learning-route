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

  test("Comprobar que existe un color", () => {
    expect(arrayColors()).toContain("rosa");
  });
});
