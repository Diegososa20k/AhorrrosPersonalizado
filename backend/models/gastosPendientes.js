module.exports = (sequelize, DataTypes) => {
  const GastosPendientes = sequelize.define('GastosPendientes', {
    nombre: DataTypes.STRING,
    total: DataTypes.FLOAT,
    meses: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    fecha_pago: DataTypes.DATE,
    abono: DataTypes.FLOAT,
    listo: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'gastosPendientes'
  });

  return GastosPendientes;
};
