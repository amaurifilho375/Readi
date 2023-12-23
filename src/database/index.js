const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const Client = require("../models/Client");
const User = require("../models/User");

const connection = new Sequelize(dbConfig);

Client.init(connection);
User.init(connection);

module.exports = connection;
