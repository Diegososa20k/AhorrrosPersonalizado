const express = require('express');
const router = express.Router();
const db = require('../models');
const Nu = db.Nu;

router.get('/', async (req, res) => {
    try {
        const lista = await Nu.findAll();
        res.json(lista);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error obteniendo ahorros' });
    }
    });

    // Crear nuevo registro en "nu"
router.post('/', async (req, res) => {
    try {
        const nuevoNu = await Nu.create({
        nombre: req.body.nombre,
        usuario: req.body.usuario
        });
        res.json(nuevoNu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error guardando nu' });
    }
    });


    

module.exports = router;