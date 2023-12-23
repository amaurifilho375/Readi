const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Certificate = sequelize.define("Certidao", {
  nome_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // ... outros campos conforme a tabela Certidao no banco de dados
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Certificate;
