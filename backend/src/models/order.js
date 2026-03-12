module.exports = (sequelize, DataTypes) => {

  const order = sequelize.define("order", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    franchise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    total: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    },

    status: {
      type: DataTypes.ENUM("pending","paid","cancelled"),
      defaultValue: "pending"
    }

  }, {
    tableName: "orders",
    timestamps: true
  })

  return order
}