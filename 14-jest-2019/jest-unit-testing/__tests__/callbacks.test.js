import { callbackHell } from "../src/callbacks";

describe("Probando Callbacks", () => {
  test("Callback", (done) => {
    function otherCallback(data) {
      expect(data).toBe("Hola Javascripters");
      done();
    }
    callbackHell(otherCallback);
  });
});
