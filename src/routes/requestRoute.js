const express = require("express");
const router = express.Router();

const authService = require("../services/auth-service");
const RequestController = require("../controllers/RequestController");

router.post(
  "/:user_id/request-certificate",
  authService.isAdmin,
  RequestController.solicitarEmissaoCertidao
);

router.get(
  "/:user_id/search-certificate",
  //verificarPerfilCliente,
  RequestController.buscarSolicitacoes
);
router.get(
  "/access-menus",
  //verificarPerfilCliente,
  RequestController.acessarMenus
);

module.exports = router;
