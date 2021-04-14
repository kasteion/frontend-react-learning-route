import { getCharacter } from "../src/snapshot";
import rick from "../src/rick.json";

describe("Es hora de las instantaneas", () => {
  test("Snapshot", () => {
    expect(getCharacter(rick)).toMatchSnapshot();
  });

  test("Siempre fallara la instantanea", () => {
    const user = {
      createdAt: new Date(),
      id: Math.floor(Math.random() * 100),
    };
    expect(user).toMatchSnapshot();
  });

  test("Tenemos una excepción para el snapshot", () => {
    const user = {
      id: Math.floor(Math.random() * 100),
      name: "Fredy",
    };
    expect(user).toMatchSnapshot({ id: expect.any(Number) });
  });
});
