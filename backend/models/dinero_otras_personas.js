module.exports = (sequelize, DataTypes) => {
 const DineroOtrasPersonas = sequelize.define('DineroOtrasPersonas', {
  cantidad: DataTypes.DECIMAL,
  fecha: DataTypes.DATEONLY,
  ubicacion: DataTypes.STRING,
  cajita_id: DataTypes.INTEGER,
  concepto: DataTypes.STRING,
  descripcion: DataTypes.TEXT  // agregado
}, {
  tableName: 'dinero_otras_personas',  // <--- aquí
  timestamps: true
});


  DineroOtrasPersonas.associate = function(models) {
    DineroOtrasPersonas.belongsTo(models.Nu, { foreignKey: 'cajita_id', as: 'nu' });
  };

  return DineroOtrasPersonas;
};
