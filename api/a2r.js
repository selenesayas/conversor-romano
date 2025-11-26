module.exports = (req, res) => {
  const num = parseInt(req.query.num);
  if (isNaN(num) || num < 1 || num > 3999) {
    return res.status(400).json({ error: "Número inválido" });
  }

  const map = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let result = "";
  let n = num;

  for (let [value, letter] of map) {
    while (n >= value) {
      result += letter;
      n -= value;
    }
  }

  res.status(200).json({ romano: result });
};

