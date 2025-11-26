export default function handler(req, res) {
  let { num } = req.query;

  if (!num) {
    return res.status(400).json({ error: "Debes enviar un número en ?num=" });
  }

  num = Number(num);

  if (!Number.isInteger(num)) {
    return res.status(400).json({ error: "El número debe ser entero." });
  }

  if (num < 1 || num > 3999) {
    return res.status(400).json({ error: "Debe estar entre 1 y 3999." });
  }

  const valores = [
    { valor: 1000, letra: "M" },
    { valor: 900, letra: "CM" },
    { valor: 500, letra: "D" },
    { valor: 400, letra: "CD" },
    { valor: 100, letra: "C" },
    { valor: 90, letra: "XC" },
    { valor: 50, letra: "L" },
    { valor: 40, letra: "XL" },
    { valor: 10, letra: "X" },
    { valor: 9, letra: "IX" },
    { valor: 5, letra: "V" },
    { valor: 4, letra: "IV" },
    { valor: 1, letra: "I" }
  ];

  let resultado = "";
  valores.forEach(e => {
    while (num >= e.valor) {
      resultado += e.letra;
      num -= e.valor;
    }
  });

  return res.status(200).json({ romano: resultado });
}

