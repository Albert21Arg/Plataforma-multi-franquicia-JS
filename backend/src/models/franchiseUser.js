module.exports = (sequelize, DataTypes) => {
  const FranchiseUser = sequelize.define("franchiseUser", {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    franchise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM("superadmin", "admin", "employee", "customer"),
      defaultValue: "customer"
    }

  }, {
    tableName: "franchise_users",
    timestamps: true
  })

  return FranchiseUser
}