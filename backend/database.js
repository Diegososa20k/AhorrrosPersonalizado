// backend/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('seguimiento_db', 'postgres', '12345', {
  host: 'localhost',
  port: 5433,              // ¡Usas el puerto 5433!
  dialect: 'postgres',
  logging: false,          // Opcional: desactiva los logs SQL en consola
  define: {
    timestamps: false      // Para evitar createdAt y updatedAt automáticos
  }
});

// Verificamos conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión establecida correctamente.'))
  .catch(err => console.error('❌ Error al conectar a la base de datos:', err));

module.exports = sequelize;
