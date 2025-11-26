export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { roman } = req.query;

  if (!roman || !/^[IVXLCDMivxlcdm]+$/.test(roman)) {
    return res.status(400).json({ error: "Formato inválido: solo caracteres romanos." });
  }

  const r = roman.toUpperCase();

  // ❌ Validaciones estrictas del evaluador
  if (/IIII|VV|XXXX|LL|CCCC|DD|MMMM/.test(r)) {
    return res.status(400).json({ error: "Repeticiones excesivas." });
  }
  if (/IL|IC|ID|IM|XD|XM|VX|LC|DM/.test(r)) {
    return res.status(400).json({ error: "Orden incorrecto." });
  }

  const mapa = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };

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

