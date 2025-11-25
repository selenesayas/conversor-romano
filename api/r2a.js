function romanoAArabigo(romano) {
  if (typeof romano !== 'string' || romano.length === 0) throw new Error("Debe ser string no vacío");

  const mapa = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000};
  let total = 0;
  let prev = 0;

  for (let i = romano.length - 1; i >= 0; i--) {
    const val = mapa[romano[i].toUpperCase()];
    if (!val) throw new Error("Carácter romano inválido");

    if (val < prev) total -= val;
    else total += val;

    prev = val;
  }

  return total;
}

module.exports = romanoAArabigo;

