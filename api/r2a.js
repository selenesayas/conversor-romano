export default function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { roman } = req.query;

  // Validar que exista y tenga solo caracteres romanos válidos
  if (!roman || !/^[IVXLCDMivxlcdm]+$/.test(roman)) {
    return res.status(400).json({ error: "Formato inválido: solo caracteres romanos." });
  }

  const mapa = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const r = roman.toUpperCase();

  let total = 0;
  for (let i = 0; i < r.length; i++) {
    const actual = mapa[r[i]];
    const siguiente = mapa[r[i + 1]];

    // Validar reglas romanas básicas
    if (siguiente && siguiente > actual) {
      const combinacion = r[i] + r[i + 1];
      const validComb = ['IV','IX','XL','XC','CD','CM'];
      if (!validComb.includes(combinacion)) {
        return res.status(400).json({ error: "Sustracción inválida en número romano." });
      }
      total += siguiente - actual;
      i++;
    } else {
      total += actual;
    }
  }

  return res.status(200).json({ arabic: total });
}

