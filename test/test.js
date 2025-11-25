const { arabigoARomano, romanoAArabigo } = require('../index');

describe('Conversión árabe ↔ romano', () => {

  // Casos positivos
  test('1 -> I', () => expect(arabigoARomano(1)).toBe('I'));
  test('4 -> IV', () => expect(arabigoARomano(4)).toBe('IV'));
  test('9 -> IX', () => expect(arabigoARomano(9)).toBe('IX'));
  test('40 -> XL', () => expect(arabigoARomano(40)).toBe('XL'));
  test('58 -> LVIII', () => expect(arabigoARomano(58)).toBe('LVIII'));
  test('1994 -> MCMXCIV', () => expect(arabigoARomano(1994)).toBe('MCMXCIV'));

  test('I -> 1', () => expect(romanoAArabigo('I')).toBe(1));
  test('IV -> 4', () => expect(romanoAArabigo('IV')).toBe(4));
  test('IX -> 9', () => expect(romanoAArabigo('IX')).toBe(9));
  test('XL -> 40', () => expect(romanoAArabigo('XL')).toBe(40));
  test('LVIII -> 58', () => expect(romanoAArabigo('LVIII')).toBe(58));
  test('MCMXCIV -> 1994', () => expect(romanoAArabigo('MCMXCIV')).toBe(1994));

  // Casos borde / errores
  test('Número decimal lanza error', () => expect(() => arabigoARomano(3.5)).toThrow());
  test('Número negativo lanza error', () => expect(() => arabigoARomano(-5)).toThrow());
  test('Número cero lanza error', () => expect(() => arabigoARomano(0)).toThrow());
  test('Romano inválido lanza error', () => expect(() => romanoAArabigo('ABCD')).toThrow());
  test('Romano vacío lanza error', () => expect(() => romanoAArabigo('')).toThrow());
});
