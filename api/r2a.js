export default function handler(req, res) {
  // 🔹 CORS necesario para el evaluador
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { roman } = req.query;

  // Validación de caracteres
  if (!roman || !/^[IVXLCDMivxlcdm]+$/.test(roman)) {
    return res.status(400).json({ error: "Formato inválido: solo caracteres romanos." });
  }

  const r = roman.toUpperCase();

  // Reglas de repeticiones inválidas
  if (/IIII|XXXX|CCCC|MMMM/.test(r)) {
    return res.status(400).json({ error: "Número romano inválido: repeticiones excesivas." });
  }

  // Pares inválidos tipo VX, IC, XM, etc.
  if (/IL|IC|ID|IM|VL|VC|VD|VM|XD|XM/.test(r)) {
    return res.status(400).json({ error: "Número romano inválido: orden incorrecto." });
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
