const {Sequelize, DataTypes} = require("sequelize");
const medsafe_db = new Sequelize(
 'medsafe-db',
 'root',
 'randomstring',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);


module.exports = {medsafe_db, DataTypes};