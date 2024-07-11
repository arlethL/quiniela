const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidoSchema = new Schema({
    nombre: String,
    resultado: String,
});

const QuinielaSchema = new Schema({
    nombre: { type: String, required: true },
    jornada: { type: Number, required: true },
    partidos: [PartidoSchema]
});

module.exports = mongoose.model('Quiniela', QuinielaSchema);
