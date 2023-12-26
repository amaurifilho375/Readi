const Request = require("../models/Request"); // Importe o modelo do usuário aqui
const User = require("../models/User");

const RequestController = {
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

      const { user_id } = req.params;

      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "user not found" });
      }

      if (!nome_completo || !cpf || !telefone) {
        return res.status(400).json({
          message: "Por favor, preencha todos os campos obrigatórios.",
        });
      }

      const novaSolicitacao = await Request.create({
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
        user_id,
        status: "pendente",
      });

      if (novaSolicitacao) {
        res
          .status(200)
          .json({ message: "Registro criado com sucesso.", novaSolicitacao });
      } else {
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
      const { user_id } = req.params;
      const user = await User.findByPk(user_id, {
        include: { association: "requests" },
      });

      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ocorreu um erro ao buscar as solicitações." });
    }
  },
  async deleteRequest(req, res) {
    try {
      const { user_id, request_id } = req.params;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      let request = "";

      if (user.role === "admin") {
        request = await Request.findByPk(request_id);
      } else {
        request = await Request.findOne({
          where: { id: request_id, user_id },
        });
      }

      if (!request) {
        return res.status(400).json({ error: "you do not have this request" });
      }

      if (
        (request.status === "pendente" || request.status === "negada") &&
        user.role === "client"
      ) {
        await request.destroy();
        return res
          .status(200)
          .json({ message: "Request deleted successfully" });
      } else {
        return res.status(403).json({
          message:
            "You cannot perform this operation because you are not authorized",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting request" });
    }
  },
  async updateRequestStatus(req, res) {
    try {
      const { user_id, request_id } = req.params;
      const { newStatus } = req.body;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const request = await Request.findByPk(request_id);

      if (!request) {
        return res.status(400).json({ error: "Request not found" });
      }

      if (
        (newStatus === "pendente" ||
          newStatus === "negado" ||
          newStatus === "emitida") &&
        user.role === "admin"
      ) {
        request.status = newStatus;
        await request.save();

        return res
          .status(200)
          .json({ message: `Request status updated to ${newStatus}` });
      } else if (
        (newStatus === "pendente" || newStatus === "negada") &&
        user.role === "operator"
      ) {
        request.status = newStatus;
        await request.save();
        return res
          .status(200)
          .json({ message: `Request status updated to ${newStatus}` });
      } else {
        return res.status(403).json({
          message:
            "You cannot perform this operation because you are not authorized or the status provided is invalid",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating request status" });
    }
  },

  async viewAllRequests(req, res) {
    try {
      const { user_id } = req.params;
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      let requests = [];

      if (user.role === "admin") {
        requests = await Request.findAll();
      } else if (user.role === "operator") {
        requests = await Request.findAll({
          include: {
            model: User,
            as: "user",
            where: { role: "client" },
          },
        });
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      }

      res.status(200).json({ requests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching requests" });
    }
  },
};

module.exports = RequestController;
