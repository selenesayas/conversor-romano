const express = require('express');
const path = require('path');
const { arabigoARomano, romanoAArabigo } = require('./index');

const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos para la demo interactiva
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints API
app.get('/a2r/:num', (req, res) => {
  try {
    const numero = parseInt(req.params.num);
    const romano = arabigoARomano(numero);
    res.json({ numero, romano });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/r2a/:romano', (req, res) => {
  try {
    const romano = req.params.romano;
    const numero = romanoAArabigo(romano);
    res.json({ romano, numero });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
