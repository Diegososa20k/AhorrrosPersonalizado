// models/GastoDialog.js
module.exports = (sequelize, DataTypes) => {
  const GastoDialog = sequelize.define('GastoDialog', {
    cantidad: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cajita_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
     concepto:  { 
        type: DataTypes.STRING,
        allowNull: true
    },   

    origen: {  // empanadas | trabajo | extras
        type: DataTypes.STRING,
        allowNull: false
    },
    origen_ahorro: {  // empanadas | trabajo | extras
        type: DataTypes.STRING,
        allowNull: false
    }


  }, 
  {
    tableName: 'gastosDialog',
    timestamps: true, // Sequelize usa createdAt y updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return GastoDialog;
};
