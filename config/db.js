const config = require("./config.json");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const sequelizeConfig = require('./set_config')[env];
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    dialect: "mysql",
  }
);
