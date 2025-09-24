'use strict';

module.exports = (sequelize, DataTypes) => {
  const Empanadas = sequelize.define('Empanadas', {
    cantidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombre_cajita: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    
    cajita_id: { // Nuevo campo
      type: DataTypes.INTEGER,
      allowNull: true
    }



  }, {
    tableName: 'empanadas',
    underscored: true,
    timestamps: true
  });

  return Empanadas;
};
