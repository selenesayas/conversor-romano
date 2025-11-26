export default function handler(req, res) {
  let { romano } = req.query;

  if (!romano) {
    return res.status(400).json({ error: "Debes enviar un valor romano en ?romano=" });
  }

  romano = romano.toUpperCase();

  const valores = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };

  if (!/^[IVXLCDM]+$/.test(romano)) {
    return res.status(400).json({ error: "Número romano inválido." });
  }

  let total = 0;
  for (let i = 0; i < romano.length; i++) {
    let actual = valores[romano[i]];
    let siguiente = valores[romano[i + 1]];

    if (siguiente && siguiente > actual) {
      total += siguiente - actual;
      i++;
    } else {
      total += actual;
    }
  }

  return res.status(200).json({ numero: total });
}

