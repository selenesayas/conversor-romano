export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { roman } = req.query;

  if (!roman || typeof roman !== "string") {
    return res.status(400).json({ error: "Parámetro 'roman' inválido" });
  }

  const valores = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };

  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
    const letra = roman[i].toUpperCase();
    const valor = valores[letra];

    if (!valor) {
      return res.status(400).json({ error: "Número romano inválido" });
    }

    if (valor < prev) total -= valor;
    else total += valor;

    prev = valor;
  }

  res.status(200).json({ arabic: total });
}


