const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("./database");

// Configurações do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clientRoute");
//const operadorRoutes = require("./routes/operadorRoutes");
//const administradorRoutes = require("./routes/administradorRoutes");

app.use("/auth", authRoutes);
app.use("/cliente", clienteRoutes);
//app.use("/operador", operadorRoutes);
//app.use("/administrador", administradorRoutes);

//app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
