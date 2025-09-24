'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');
const DineroOtrasPersonas = db.DineroOtrasPersonas;

// GET todos los registros
  router.get('/', async (req, res) => {
  try {
    const lista = await DineroOtrasPersonas.findAll({ 
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

// POST nuevo registro
router.post('/', async (req, res) => {
  try {
    const nuevo = await DineroOtrasPersonas.create({
        cantidad: req.body.cantidad,
        fecha: req.body.fecha,
        ubicacion: req.body.ubicacion,
        cajita_id: req.body.cajita_id || null,  // 🔹 agregar esto
        concepto: req.body.concepto,
        descripcion: req.body.descripcion
    });
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
