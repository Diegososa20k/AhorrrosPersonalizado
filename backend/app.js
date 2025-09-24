'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models'); // importante: para inicializar Sequelize
const cors = require('cors'); // para que se pueda tener una buena conexion sin problemas

const usuariosRoutes = require('./routes/usuarios'); // ← importar rutas
const empanadasRoutes = require('./routes/empanadas');
const trabajoRoutes = require('./routes/trabajo');
const nuRoutes = require('./routes/nu');
const extrasRoutes = require('./routes/extras');
const gastosDialogRoutes = require('./routes/gastosDialog');
const gastosPendientesRoutes = require('./routes/gastosPendientes');
const dineroOtrasPersonasRoutes = require('./routes/dinero_otras_personas');





app.use(cors()); //para que se pueda tener una buena conexion, para evitar el cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/usuarios', usuariosRoutes); // ← usar rutas
app.use('/api/empanadas',empanadasRoutes)
app.use('/api/trabajo', trabajoRoutes);
app.use('/api/nu', nuRoutes);
app.use('/api/extras', extrasRoutes);
app.use('/api/gastosDialog', gastosDialogRoutes);
app.use('/api/gastosPendientes', gastosPendientesRoutes);
app.use('/api/dinero_otras_personas', dineroOtrasPersonasRoutes);



// Servidor
const PORT = 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`); 
  });
});
