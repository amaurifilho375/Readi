const Certificate = require("../models/Certificate");

async function criarCertidao(certidaoData) {
  try {
    const certificate = await Certificate.create(certidaoData);
    return certificate;
  } catch (error) {
    throw new Error("Erro ao criar solicitação de certidão.");
  }
}

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

module.exports = {
  criarCertidao,
  buscarSolicitacoesUsuario,
};
