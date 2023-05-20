const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
 'medsafe-db',
 'root',
 'randomstring',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);
const User = sequelize.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_name: DataTypes.STRING,
  user_email: DataTypes.STRING,
  user_password: DataTypes.STRING,
  user_address: DataTypes.STRING,
  user_type: DataTypes.BOOLEAN,
},
{
 freezeTableName: true,
});

sequelize.drop().then(()=>{
  sequelize.sync();
})
module.exports = {sequelize, User};