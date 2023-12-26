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
  authService.authorize,
  RequestController.buscarSolicitacoes
);

router.delete(
  "/:user_id/delete-request/:request_id",
  authService.authorize,
  RequestController.deleteRequest
);

router.patch(
  "/:user_id/status-update/:request_id",
  authService.authorize,
  RequestController.updateRequestStatus
);

router.get(
  "/:user_id/view-all-request",
  authService.authorize,
  RequestController.viewAllRequests
);

module.exports = router;
