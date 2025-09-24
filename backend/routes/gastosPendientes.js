const express = require('express');
const router = express.Router();
const { GastosPendientes } = require('../models');

// Crear gasto
router.post('/', async (req, res) => {
  try {
    const gasto = await GastosPendientes.create(req.body);
    res.json(gasto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar gastos
router.get('/', async (req, res) => {
  const gastos = await GastosPendientes.findAll();
  res.json(gastos);
});

// Actualizar gasto
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount] = await GastosPendientes.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: 'No se encontró el gasto o no se modificó.' });
    }

    // Traer el registro actualizado
    const gastoActualizado = await GastosPendientes.findByPk(req.params.id);
    res.json(gastoActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Eliminar gasto
router.delete('/:id', async (req, res) => {
  try {
    await GastosPendientes.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Gasto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
