const User = require("../models/User");

// Função para autenticar o usuário
async function autenticarUsuario(email, senha) {
  try {
    const user = await User.findOne({ where: { email, senha } });
    return user;
  } catch (error) {
    throw new Error("Erro ao autenticar o usuário.");
  }
}

module.exports = { autenticarUsuario };
