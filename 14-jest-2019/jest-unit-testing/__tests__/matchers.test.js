describe("Comparadores comunes", () => {
  const user = {
    name: "Oscar",
    lastname: "Barajas",
  };

  const user2 = {
    name: "Oscar",
    lastname: "Barajas",
  };

  const user3 = {
    name: "Fredy",
    lastname: "Castellón",
  };

  test("Igualdad de elementos", () => {
    expect(user).toEqual(user2);
  });

  test("Diferencia de elementos", () => {
    expect(user).not.toEqual(user3);
  });
});
