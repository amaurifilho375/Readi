const Client = require("../models/Client"); // Importe o modelo do usuário aqui

const ClienteController = {
  async solicitarEmissaoCertidao(req, res) {
    try {
      console.log("respostas:", req.body);
      const {
        nome_completo,
        cpf,
        telefone,
        data_nascimento,
        cidade,
        estado,
        logradouro,
        numero,
        cep,
        certidao,
        anexo_documento,
      } = req.body;

      // Verificar se todos os campos necessários foram recebidos
      if (!nome_completo || !cpf || !telefone /* outros campos */) {
        return res.status(400).json({
          message: "Por favor, preencha todos os campos obrigatórios.",
        });
      }

      const novaSolicitacao = await Client.create({
        nome_completo,
        cpf,
        telefone,
        data_nascimento,
        cidade,
        estado,
        logradouro,
        numero,
        cep,
        certidao,
        anexo_documento,
        // outros campos...
      });

      // Se a criação foi bem-sucedida, novaSolicitacao conterá o registro criado
      if (novaSolicitacao) {
        // Operação realizada com sucesso
        res
          .status(200)
          .json({ message: "Registro criado com sucesso.", novaSolicitacao });
      } else {
        // Tratar cenário em que não há retorno do objeto criado
        res.status(400).json({ message: "Não foi possível criar o registro." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao processar a solicitação." });
    }
  },

  async buscarSolicitacoes(req, res) {
    try {
      // Lógica para buscar as solicitações do cliente no banco de dados
      const solicitacoes = await Client.findAll(/* condições de busca */);

      res.status(200).json({ solicitacoes });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao buscar as solicitações." });
    }
  },

  async acessarMenus(req, res) {
    try {
      // Esta rota pode ser acessada apenas por usuários CLIENTE
      res.status(200).json({
        menus: ["SOLICITAR EMISSÃO DE CERTIDÃO", "BUSCAR SOLICITAÇÕES"],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ocorreu um erro ao acessar os menus." });
    }
  },
};

module.exports = ClienteController;
