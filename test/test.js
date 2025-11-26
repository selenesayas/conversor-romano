import a2r from "../api/a2r.js";
import r2a from "../api/r2a.js";

function mockRes() {
  return {
    statusCode: 0,
    data: null,
    status(code) { this.statusCode = code; return this; },
    json(obj) { this.data = obj; return this; }
  };
}

describe("Conversor Árabe → Romano", () => {
  test("35 → XXXV", () => {
    const req = { query: { num: "35" } };
    const res = mockRes();
    a2r(req, res);
    expect(res.data.romano).toBe("XXXV");
  });

  test("1 → I", () => {
    const req = { query: { num: "1" } };
    const res = mockRes();
    a2r(req, res);
    expect(res.data.romano).toBe("I");
  });

  test("4000 da error", () => {
    const req = { query: { num: "4000" } };
    const res = mockRes();
    a2r(req, res);
    expect(res.data.error).toBeDefined();
  });

  test("Decimal da error", () => {
    const req = { query: { num: "10.5" } };
    const res = mockRes();
    a2r(req, res);
    expect(res.data.error).toBe("El número debe ser entero.");
  });
});

describe("Conversor Romano → Árabe", () => {
  test("XXXV → 35", () => {
    const req = { query: { romano: "XXXV" } };
    const res = mockRes();
    r2a(req, res);
    expect(res.data.numero).toBe(35);
  });

  test("IV → 4", () => {
    const req = { query: { romano: "IV" } };
    const res = mockRes();
    r2a(req, res);
    expect(res.data.numero).toBe(4);
  });

  test("romano inválido", () => {
    const req = { query: { romano: "ABC" } };
    const res = mockRes();
    r2a(req, res);
    expect(res.data.error).toBe("Número romano inválido.");
  });

  test("MCMXC → 1990", () => {
    const req = { query: { romano: "MCMXC" } };
    const res = mockRes();
    r2a(req, res);
    expect(res.data.numero).toBe(1990);
  });
});

