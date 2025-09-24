// routes/gastosDialog.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const GastoDialog = db.GastoDialog;

// Crear gasto
// Crear gasto
router.post("/", async (req, res) => {
  try {
    const gasto = await GastoDialog.create({
      cantidad: req.body.cantidad,
      fecha: req.body.fecha,
      ubicacion: req.body.ubicacion,
      cajita_id: req.body.cajita_id,
      descripcion: req.body.descripcion,
      concepto: req.body.concepto,
      origen: req.body.origen,           // ya lo tenías
      origen_ahorro: req.body.origen_ahorro // 🔹 agregar esto
    });
    res.json(gasto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando gasto", details: error.message });
  }
});


// GET /api/gastosDialog?origen=empanadas|trabajo|extras
router.get('/', async (req, res) => {
  try {
    const { origen } = req.query;
    const where = origen ? { origen } : {};
    const gastos = await GastoDialog.findAll({
        where,
        include: [
            {
            model: db.Nu,
            attributes: ['id', 'nombre'] // solo lo que necesitas
            }
        ],
        order: [['fecha', 'DESC']]
        });

    res.json(gastos);
  } catch (err) {
    console.error('Error obteniendo gastos:', err);
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
});

module.exports = router;
