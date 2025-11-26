export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { arabic } = req.query;

  if (!arabic || isNaN(arabic)) {
    return res.status(400).json({ error: "Parámetro 'arabic' inválido" });
  }

  let num = parseInt(arabic);
  if (num <= 0 || num >= 4000) {
    return res.status(400).json({ error: "Número fuera de rango (1-3999)" });
  }

  const valores = [
    { valor: 1000, simbolo: "M" },
    { valor: 900, simbolo: "CM" },
    { valor: 500, simbolo: "D" },
    { valor: 400, simbolo: "CD" },
    { valor: 100, simbolo: "C" },
    { valor: 90, simbolo: "XC" },
    { valor: 50, simbolo: "L" },
    { valor: 40, simbolo: "XL" },
    { valor: 10, simbolo: "X" },
    { valor: 9, simbolo: "IX" },
    { valor: 5, simbolo: "V" },
    { valor: 4, simbolo: "IV" },
    { valor: 1, simbolo: "I" }
  ];

  let romano = "";
  valores.forEach(item => {
    while (num >= item.valor) {
      romano += item.simbolo;
      num -= item.valor;
    }
  });

  res.status(200).json({ roman: romano });
}

