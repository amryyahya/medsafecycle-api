const { medsafe_db, DataTypes } = require("../config/database");

const Conversation = medsafe_db.define("conversation", {
    conversation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstUser_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstUser_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    secondUser_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    secondUser_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});


Conversation.sync();
module.exports = { Conversation };
