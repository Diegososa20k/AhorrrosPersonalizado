'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const db = {};

// Conexión a la base de datos
const sequelize = new Sequelize('seguimiento_db', 'postgres', '12345', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres'
});

// Importar manualmente el modelo Usuario
const Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
db.Usuario = Usuario;
const Empanadas = require('./empanadas')(sequelize, Sequelize.DataTypes);
db.Empanadas = Empanadas;
const Trabajo = require('./trabajo')(sequelize, Sequelize.DataTypes);
db.Trabajo = Trabajo;
const Nu = require('./nu')(sequelize, Sequelize.DataTypes);
db.Nu = Nu;
const Extras = require('./extras')(sequelize, Sequelize.DataTypes);
db.Extras = Extras;
const GastoDialog = require('./gastosDialog')(sequelize, Sequelize.DataTypes);
db.GastoDialog = GastoDialog;
const GastosPendientes = require('./gastosPendientes')(sequelize, Sequelize.DataTypes);
db.GastosPendientes = GastosPendientes;
const DineroOtrasPersonas = require('./dinero_otras_personas')(sequelize, Sequelize.DataTypes);
db.DineroOtrasPersonas = DineroOtrasPersonas;



// 🔹 Aquí agregamos las relaciones
db.Empanadas.belongsTo(db.Nu, { foreignKey: 'cajita_id' });
db.Trabajo.belongsTo(db.Nu, { foreignKey: 'cajita_id' });
db.Extras.belongsTo(db.Nu, { foreignKey: 'cajita_id'});
db.DineroOtrasPersonas.belongsTo(db.Nu, { foreignKey: 'cajita_id'});
db.GastoDialog.belongsTo(db.Nu, { foreignKey: 'cajita_id'});
db.Nu.hasMany(db.Empanadas, { foreignKey: 'cajita_id' });
db.Nu.hasMany(db.Trabajo, { foreignKey: 'cajita_id' });
db.Nu.hasMany(db.Extras, { foreignKey: 'cajita_id' });
db.Nu.hasMany(db.DineroOtrasPersonas, { foreignKey: 'cajita_id' });
db.Nu.hasMany(db.GastoDialog, { foreignKey: 'cajita_id' });


db.sequelize = sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

module.exports = db;
