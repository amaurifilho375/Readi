"use strict";
const { Model, DataTypes } = require("sequelize");

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_completo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        data_nascimento: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        cidade: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        estado: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        logradouro: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        numero: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cep: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        certidao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        anexo_documento: {
          type: DataTypes.STRING,
          // O campo anexoDocumento pode ser nulo, pois é opcional
        },
      },
      {
        sequelize,
        modelName: "Client", // Corrigido para refletir o nome do modelo
        tableName: "clients",
        timestamps: true,
        // underscored: true,
      }
    );
  }

  static associate(models) {
    // Define as associações, se houver
  }
}

module.exports = Client;
