'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    creado_en: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ahorro: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    fecha: { // 👈 Nuevo campo
      type: DataTypes.DATEONLY, // Solo la fecha (YYYY-MM-DD)
      allowNull: true
    },
  }, {
    tableName: 'usuarios',
    timestamps: false
  });   

  return Usuario;
};
