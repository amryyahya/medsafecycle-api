const dotenv = require("dotenv")
dotenv.config()
const {Sequelize, DataTypes} = require("sequelize");
const medsafe_db = new Sequelize(
 process.env.DATABASE_NAME,
 process.env.DATABASE_USER,
 process.env.DATABASE_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);


module.exports = {medsafe_db, DataTypes};