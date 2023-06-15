const dotenv = require("dotenv")
dotenv.config()
const {Sequelize, DataTypes} = require("sequelize");
const medsafe_db = new Sequelize(
 process.env.DATABASE_NAME,
 process.env.DATABASE_USER,
 process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql'
  }
);


module.exports = {medsafe_db, DataTypes};