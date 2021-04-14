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
