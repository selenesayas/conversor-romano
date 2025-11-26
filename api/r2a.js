export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const roman = (req.query.roman || "").toUpperCase();

  if (!roman || !/^[MDCLXVI]+$/i.test(roman)) {
    return res.status(400).json({ error: "Romano inválido" });
  }

  const map = { M:1000, D:500, C:100, L:50, X:10, V:5, I:1 };
  let total = 0;

  for (let i = 0; i < roman.length; i++) {
    const actual = map[roman[i]];
    const siguiente = map[roman[i + 1]] || 0;

    if (actual < siguiente) total -= actual;
    else total += actual;
  }

  return res.status(200).json({ arabic: total });
}


