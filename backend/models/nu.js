module.exports = (sequelize, DataTypes) => {
  const Nu = sequelize.define('nu', {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'nu',
    timestamps: false
  });

  return Nu;
};
