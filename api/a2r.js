export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // CORS
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const arabic = parseInt(req.query.arabic);

  if (!arabic || arabic < 1 || arabic > 3999) {
    return res.status(400).json({ error: "Número inválido" });
  }

  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  let result = "";
  let num = arabic;

  for (const [value, letter] of map) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }

  return res.status(200).json({ roman: result });
}


