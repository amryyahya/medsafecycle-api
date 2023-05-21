const { medsafe_db, DataTypes } = require("../config/database");

const User = medsafe_db.define("users", {
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
    user_token: DataTypes.STRING
},
    {
        freezeTableName: true,
    });


//User.sync(); buat bikin tabel
module.exports = { User };
