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
