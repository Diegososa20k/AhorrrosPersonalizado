// models/extra.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Extras = sequelize.define('Extras', {
    
    cantidad: {
      type: DataTypes.DECIMAL(10, 2), // puedes usar INTEGER si siempre serán números enteros
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY, // solo la fecha, sin hora
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cajita_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    concepto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'extras',
    underscored: true,
    timestamps: true
  });

  return Extras;
};
