const { medsafe_db, DataTypes } = require("../config/database");

const User = medsafe_db.define("users", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: DataTypes.STRING,
    user_email: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'email telah digunakan'
        }
    },
    user_password: DataTypes.STRING,
    user_address: DataTypes.STRING,
    user_type: DataTypes.BOOLEAN,
},
    {
        freezeTableName: true,
    });


// User.sync(); 
module.exports = { User };
