const express = require('express');
const Pieza = require('./pieza');
const db = require ('./db');

const app = express();
app.use(express.json());

// Obtiene a todas las piezas
app.get('/piezas', async (req, res) => {
  try {
    const pieza = await Pieza.find();
    res.json(pieza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtiene una sola pieza
app.get('/piezas/:id', getPieza, (req, res) => {
  res.json(res.pieza);
});

// Crea una nueva pieza
app.post('/piezas', async (req, res) => {
  const pieza = new Pieza({
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    costo: req.body.costo
  });

  try {
    const newPieza = await pieza.save();
    res.status(201).json(newPieza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualiza una pieza
app.patch('/piezas/:id', getPieza, async (req, res) => {
  if (req.body.nombre != null) {
    res.pieza.nombre = req.body.nombre;
  }

  if (req.body.cantidad != null) {
    res.pieza.cantidad = req.body.cantidad;
  }

  if (req.body.costo != null) {
    res.user.costo = req.body.costo;
  }

  try {
    const updatedPieza = await res.pieza.save();
    res.json(updatedPieza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borra una pieza
app.delete('/piezas/:id', getPieza, async (req, res) => {
  try {
    await res.pieza.remove();
    res.json({ message: 'Pieza eliminada del inventario' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Funcion middleware para obtener una pieza
async function getPieza(req, res, next) {
  let pieza;
  try {
    pieza = await Pieza.findById(req.params.id);
    if (pieza == null) {
      return res.status(404).json({ message: 'No puedo encontrar la pieza' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.pieza = pieza;
  next();
}

//inicio del servidor
app.listen(3000, () => console.log('Server started...'));