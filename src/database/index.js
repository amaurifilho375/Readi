const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

//const Request = require("../models/Request");
const Request = require("../models/Request");

const User = require("../models/User");

const connection = new Sequelize(dbConfig);

Request.init(connection);
User.init(connection);

Request.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
