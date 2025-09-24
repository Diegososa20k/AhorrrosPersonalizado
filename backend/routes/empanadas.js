// routes/empanadas.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Empanadas = db.Empanadas;

// Crear ahorro
router.post('/', async (req, res) => {
  try {
    const nuevo = await Empanadas.create({
        cantidad: req.body.cantidad,
        fecha: req.body.fecha,
        ubicacion: req.body.ubicacion,
        nombre_cajita: req.body.nombreCajita || null,
        cajita_id: req.body.cajita_id || null  // 🔹 agregar esto
    });
    res.json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error guardando ahorro' });
  }
});

// Listar ahorros
  router.get('/', async (req, res) => {
  try {
    const lista = await Empanadas.findAll({ 
      order: [['fecha', 'DESC']],
      include: [
        {
          model: db.Nu,         // El modelo relacionado
          attributes: ['id', 'nombre', 'usuario'] // Campos que quieres traer
        }
      ] 
    });
    res.json(lista);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo ahorros' });
  }
});

module.exports = router;
