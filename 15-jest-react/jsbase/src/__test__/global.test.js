const text = "Hola Mundo";

test("Debe contener un text", () => {
  expect(text).toMatch(/Mundo/);
});

const fruits = ["manzana", "melon", "banana"];
test("Tenemos una banana", () => {
  expect(fruits).toContain("banana");
});

test("Mayor que", () => {
  expect(10).toBeGreaterThan(9);
});

test("Verdadero", () => {
  expect(true).toBeTruthy();
});

const reverseString = (str, callback) => {
  callback(str.split("").reverse().join(""));
};

test("Probar un Callback", () => {
  reverseString("Hola", (str) => {
    expect(str).toBe("aloH");
  });
});

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

test("Probar async/await", async () => {
  const string2 = await reverseString2("Hola");
  expect(string2).toBe("aloH");
});

afterEach(() => {
  console.log("Despues de cada prueba");
});

afterAll(() => {
  console.log("Despues de todas las pruebas");
});

beforeEach(() => {
  console.log("Antes de cada prueba");
});

beforeAll(() => {
  console.log("Antes de todas las pruebas");
});
