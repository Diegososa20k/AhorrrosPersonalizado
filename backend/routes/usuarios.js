'use strict';

const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /api/usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await db.Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// GET /api/usuarios/:id - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});


// DELETE /api/usuarios/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  console.log('🛑 DELETE /api/usuarios/' + id);

  try {
    // Verifica que sí existe el modelo
    if (!db.Usuario) {
      console.log('❌ Modelo Usuario no está definido');
      return res.status(500).json({ error: 'Modelo Usuario no disponible' });
    }

    const usuario = await db.Usuario.findByPk(id);

    if (!usuario) {
      console.log(`⚠️ Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    console.log(`✅ Usuario con ID ${id} eliminado correctamente`);
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('💥 Error en ruta DELETE:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

//POST
router.post('/', async (req, res) => {
  console.log('🟢 POST /api/usuarios');
  console.log('📦 Datos recibidos:', req.body);

  try {
    const nuevoUsuario = await db.Usuario.create({
      nombre: req.body.nombre,
      correo: req.body.correo
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario', detalle: error.message });
  }
});


module.exports = router;


//Este metodo delate tambien sirve, pero es mas largo:
/*
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('🗑️ Intentando eliminar usuario con ID:', id); // 👈 Agregado

  try {
    const usuario = await db.Usuario.findByPk(id);
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    console.log('✅ Usuario eliminado');
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('💥 Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});
*/