const {DataTypes, Sequelize} = require("sequelize");
const Database = require("../database");
const user = require("./user");

const database = new Database();

const db = {
    user: user(database, DataTypes),
    database: database,
}

module.exports = db;