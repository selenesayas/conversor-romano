export default function handler(req, res) {
  const { roman } = req.query;

  if (!roman || !/^[IVXLCDMivxlcdm]+$/.test(roman)) {
    return res.status(400).json({ error: "Formato inválido: solo caracteres romanos." });
  }

  const r = roman.toUpperCase();

  // Validación de estructura romana correcta (repeticiones y sustracciones)
  const regexValido = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!regexValido.test(r)) {
    return res.status(400).json({ error: "Formato inválido: estructura romana incorrecta." });
  }

  const mapa = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let i = 0; i < r.length; i++) {
    const actual = mapa[r[i]];
    const siguiente = mapa[r[i + 1]];

    if (siguiente > actual) {
      total += siguiente - actual;
      i++;
    } else {
      total += actual;
    }
  }

  return res.status(200).json({ arabic: total });
}
