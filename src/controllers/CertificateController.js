const Certificate = require("../models/Certificate");

// Função para criar uma nova solicitação de certidão
async function criarCertidao(certidaoData) {
  try {
    const certificate = await Certificate.create(certidaoData);
    return certificate;
  } catch (error) {
    throw new Error("Erro ao criar solicitação de certidão.");
  }
}

// Função para buscar solicitações de certidão de um usuário específico
async function buscarSolicitacoesUsuario(usuarioId) {
  try {
    const solicitacoes = await Certificate.findAll({
      where: { usuario_id: usuarioId },
    });
    return solicitacoes;
  } catch (error) {
    throw new Error("Erro ao buscar solicitações de certidão.");
  }
}

// ... outras funções para operações com certidões

module.exports = {
  criarCertidao,
  buscarSolicitacoesUsuario /* ... outras funções */,
};
