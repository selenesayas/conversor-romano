function arabigoARomano(num) {
  if (!Number.isInteger(num) || num <= 0) {
    throw new Error("Solo enteros positivos mayores a 0");
  }

  const valores = [
    { val: 1000, rom: 'M' },
    { val: 900, rom: 'CM' },
    { val: 500, rom: 'D' },
    { val: 400, rom: 'CD' },
    { val: 100, rom: 'C' },
    { val: 90, rom: 'XC' },
    { val: 50, rom: 'L' },
    { val: 40, rom: 'XL' },
    { val: 10, rom: 'X' },
    { val: 9, rom: 'IX' },
    { val: 5, rom: 'V' },
    { val: 4, rom: 'IV' },
    { val: 1, rom: 'I' },
  ];

  let resultado = '';
  for (const {val, rom} of valores) {
    while (num >= val) {
      resultado += rom;
      num -= val;
    }
  }

  return resultado;
}

module.exports = arabigoARomano;
