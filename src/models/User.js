"use strict";
const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User", // Corrigido para refletir o nome do modelo
        tableName: "users",
        timestamps: true,
        // underscored: true,
      }
    );
  }

  static associate(models) {
    // Define as associações, se houver
  }
}

module.exports = User;
