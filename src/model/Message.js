const { medsafe_db, DataTypes } = require("../config/database");

const Message = medsafe_db.define("message", {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senderUser_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message_content: DataTypes.STRING,
});

Message.sync(); 
module.exports = { Message };
