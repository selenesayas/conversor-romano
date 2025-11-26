export default function handler(req, res) {
  const { n } = req.query;

  // Validación: solo números enteros positivos
  if (!/^\d+$/.test(n)) {
    return res.status(400).json({ error: "Formato inválido: solo números enteros." });
  }

  const num = parseInt(n, 10);

  if (num < 1 || num > 3999) {
    return res.status(400).json({ error: "Número fuera de rango (1-3999)." });
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

  let resultado = "";
  let numero = num;

  for (const item of valores) {
    while (numero >= item.valor) {
      resultado += item.simbolo;
      numero -= item.valor;
    }
  }

  return res.status(200).json({ result: resultado });
}


