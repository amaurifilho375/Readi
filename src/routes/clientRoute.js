/*
const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/ClienteController");

const verificarPerfilCliente = require("../middleware/verificarPerfilCliente");

router.post(
  "/solicitar-certidao",
  verificarPerfilCliente,
  ClienteController.solicitarEmissaoCertidao
);
router.get(
  "/buscar-solicitacoes",
  verificarPerfilCliente,
  ClienteController.buscarSolicitacoes
);
router.get(
  "/acessar-menus",
  verificarPerfilCliente,
  ClienteController.acessarMenus
);

module.exports = router;
*/

const express = require("express");
const router = express.Router();

const authService = require("../services/auth-service");
const ClienteController = require("../controllers/ClientController");

router.post(
  "/solicitar-certidao",
  authService.isAdmin,
  ClienteController.solicitarEmissaoCertidao
);

//const verificarPerfilCliente = require("../middleware/verificarPerfilCliente");

/*
router.post(
  "/solicitar-certidao",
  //verificarPerfilCliente,
  ClienteController.solicitarEmissaoCertidao
);
*/
router.get(
  "/buscar-solicitacoes",
  //verificarPerfilCliente,
  ClienteController.buscarSolicitacoes
);
router.get(
  "/acessar-menus",
  //verificarPerfilCliente,
  ClienteController.acessarMenus
);

module.exports = router;
