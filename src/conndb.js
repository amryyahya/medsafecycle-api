/*
 code buat connect ke database ada di sini harusnya

 ini masih dari array aja
*/

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'medsafe-db',
 'root',
 'randomstring',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

async function getUsers() {
    try {
        await sequelize.authenticate();
        console.log("connected");
        const [results, metadata] = await sequelize.query('SELECT * FROM users')
        console.log(results);

    } catch(err) {
        console.log("can't connect to database");
    }
}

getUsers();


module.exports = {getUsers};