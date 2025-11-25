
const arabigoARomano = require('./api/a2r');
const romanoAArabigo = require('./api/r2a');

module.exports = {
  arabigoARomano,
  romanoAArabigo
};

// Ejemplo de uso directo
if (require.main === module) {
  console.log("Ejemplos de conversión:");
  console.log("1987 ->", arabigoARomano(1987)); // MCMLXXXVII
  console.log("MCMLXXXVII ->", romanoAArabigo("MCMLXXXVII")); // 1987
}
