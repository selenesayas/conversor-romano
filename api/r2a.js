export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const roman = (req.query.roman || "").toUpperCase();

  // ❌ parámetro vacío
  if (!roman) {
    return res.status(400).json({ error: "Falta parámetro" });
  }

  // ❌ caracteres inválidos
  if (!/^[MDCLXVI]+$/i.test(roman)) {
    return res.status(400).json({ error: "Caracter inválido" });
  }

  // ❌ formato incorrecto (regex completa de romanos válidos)
  const validRomanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (!validRomanRegex.test(roman)) {
    return res.status(400).json({ error: "Romano inválido" });
  }

  // Conversión
  const map = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let total = 0;

  for (let i = 0; i < roman.length; i++) {
    const actual = map[roman[i]];
    const next = map[roman[i + 1]] || 0;

    if (actual < next) total -= actual;
    else total += actual;
  }

  return res.status(200).json({ arabic: total });
}


