const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("./database");

// Configurações do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
const authRoutes = require("./routes/authRoutes");
const requestRoute = require("./routes/requestRoute");

app.use("/auth", authRoutes);
app.use("/user", requestRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
