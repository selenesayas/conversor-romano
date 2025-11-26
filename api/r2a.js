export default function handler(req, res) {
  const { r } = req.query;

  // Validación: solo letras romanas
  if (!/^[IVXLCDM]+$/i.test(r)) {
    return res.status(400).json({ error: "Formato inválido: solo caracteres romanos." });
  }

  const romano = r.toUpperCase();

  // Validación de repeticiones inválidas
  if (/IIII|VV|LL|DD/.test(romano)) {
    return res.status(400).json({ error: "Repeticiones excesivas." });
  }

  // Validación de combinaciones inválidas
  const reglasInvalidas = [
    "IL", "IC", "ID", "IM",
    "VX", "VL", "VC", "VD", "VM",
    "XD", "XM"
  ];

  if (reglasInvalidas.some((inv) => romano.includes(inv))) {
    return res.status(400).json({ error: "Orden incorrecto." });
  }

  const valores = {
    I: 1, V: 5, X: 10,
    L: 50, C: 100, D: 500, M: 1000
  };

  let total = 0;

  for (let i = 0; i < romano.length; i++) {
    const actual = valores[romano[i]];
    const siguiente = valores[romano[i + 1]] || 0;

    if (actual < siguiente) {
      total += siguiente - actual;
      i++; 
    } else {
      total += actual;
    }
  }

  return res.status(200).json({ result: total });
}



