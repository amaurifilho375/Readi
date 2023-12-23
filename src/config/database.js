//Configure a conexão com o banco de dados usando Sequelize:
/*
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dataBaseRead", "amauri", "Deus", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});
*/

module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "amauri",
  password: "Deus",
  database: "dataBaseRead",
  define: {
    timestamps: true,
    //underscored: true,
  },
};

/*
// Testando a conexão
try {
  sequelize.authenticate();
  console.log("Conexão com o banco de dados estabelecida com sucesso.");
} catch (error) {
  console.error("Erro ao conectar com o banco de dados:", error);
}

module.exports = sequelize;
*/
