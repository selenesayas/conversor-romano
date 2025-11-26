export default function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { roman } = req.query;

  if (!roman || !/^[IVXLCDMivxlcdm]+$/.test(roman)) {
    return res.status(400).json({ error: "Formato inválido: solo caracteres romanos." });
  }

  const r = roman.toUpperCase();

  // Validación de sustracción y orden incorrecto
  const invalidPatterns = [
    /IL|IC|ID|IM/,      // I no puede restarse de L,C,D,M
    /VX|VL|VC|VD|VM/,   // V no puede restarse
    /XD|XM/,             // X no puede restarse de D o M
    /LC|LD|LM/,          // L no puede restarse
    /DM/,                // D no puede restarse
    /(I{4,}|X{4,}|C{4,}|M{4,}|V{2,}|L{2,}|D{2,})/ // máximos repetidos
  ];

  for (const pat of invalidPatterns) {
    if (pat.test(r)) {
      return res.status(400).json({ error: "Número romano inválido" });
    }
  }

  const mapa = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
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
