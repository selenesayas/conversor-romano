module.exports = (req, res) => {
  const romano = (req.query.romano || "").toUpperCase();
  const valores = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

  let total = 0;
  let anterior = 0;

  for (let i = romano.length - 1; i >= 0; i--) {
    const valor = valores[romano[i]];
    if (!valor) return res.status(400).json({ error: "Romano inválido" });

    if (valor < anterior) total -= valor;
    else total += valor;

    anterior = valor;
  }

  res.status(200).json({ arabigo: total });
};

