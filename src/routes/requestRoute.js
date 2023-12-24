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
  authService.authorize,
  RequestController.buscarSolicitacoes
);
router.get(
  "/access-menus",
  //verificarPerfilCliente,
  RequestController.acessarMenus
);

router.delete(
  "/:user_id/delete-request/:request_id",
  //verificarPerfilCliente,
  authService.authorize,
  RequestController.deleteRequest
);

router.patch(
  "/:user_id/status-update/:request_id",
  //verificarPerfilCliente,
  authService.authorize,
  RequestController.updateRequestStatus
);

module.exports = router;
