const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  cantidad: String,
  costo: String
});

const Pieza = mongoose.model('Pieza', userSchema);

module.exports = Pieza;