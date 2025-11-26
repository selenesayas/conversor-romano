export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { arabic } = req.query;

  if (!arabic || !/^\d+$/.test(arabic)) {
    return res.status(400).json({ error: "Formato inválido: solo números enteros." });
  }

  const num = parseInt(arabic, 10);
  if (num < 1 || num > 3999) {
    return res.status(400).json({ error: "Debe ser un número entre 1 y 3999." });
  }

  const valores = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  let resultado = '';
  let restante = num;

  for (const [valor, simbolo] of valores) {
    while (restante >= valor) {
      resultado += simbolo;
      restante -= valor;
    }
  }

  return res.status(200).json({ roman: resultado });
}
