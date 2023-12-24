"use strict";
const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
};

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize = function (req, res, next) {
  console.log("autorizandoo");
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, "SEGREDO_JWT_USER", function (error, decoded) {
      if (error) {
        res.status(401).json({
          message: "Token Inválido",
        });
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = function (req, res, next) {
  console.log("admin");
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Token Inválido",
    });
  } else {
    // jwt.verify(token, global.SALT_KEY, function (error, decoded) {
    jwt.verify(token, "SEGREDO_JWT_USER", function (error, decoded) {
      console.log("valor", decoded.role);
      if (error) {
        res.status(401).json({
          message: "Token Inválido",
        });
      } else {
        if (decoded.role == "admin") {
          console.log("acertoo");
          next();
        } else {
          res.status(403).json({
            message: "Esta funcionalidade é restrita para administradores",
          });
        }
      }
    });
  }
};

exports.isOperator = function (req, res, next) {
  console.log("admin");
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    res.status(401).json({
      message: "Token Inválido",
    });
  } else {
    // jwt.verify(token, global.SALT_KEY, function (error, decoded) {
    jwt.verify(token, "SEGREDO_JWT_USER", function (error, decoded) {
      console.log("valor", decoded.role);
      if (error) {
        res.status(401).json({
          message: "Token Inválido",
        });
      } else {
        if (decoded.role == "operator") {
          console.log("acertoo");
          next();
        } else {
          res.status(403).json({
            message: "Esta funcionalidade é restrita para operadores",
          });
        }
      }
    });
  }
};
