const { medsafe_db, DataTypes } = require("../config/database");

const Waste = medsafe_db.define("waste", {
    waste_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    image_link: DataTypes.STRING,
    waste_type: DataTypes.STRING,
    waste_type_id: DataTypes.INTEGER,
});


Waste.sync(); 
module.exports = { Waste };
