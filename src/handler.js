const { nanoid } = require('nanoid');
const { User } = require('./conndb');


const loginHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      salam: "masih bingung"
    },
  });
  response.code(200);

  return response;
};
const testing = (request, h) => {

  const response = h.response({
    status: 'success',
    data: {
      salam: "hello world"
    },
  });
  response.code(200);
  return response;
};
const getAllCompaniesHandler = (request, h) => {

  const response = h.response({
    status: 'success',
    data: {
      perusahaan: companies
    },
  });
  response.code(200);

  return response;
};

async function getUsers() {
  try {
    await medsafe_db.authenticate();
    console.log("connected");
    const [results, metadata] = await medsafe_db.query('SELECT * FROM users')
    console.log(results);

  } catch (err) {
    console.log("can't connect to database");
  }
}

const register = (request, h) => {
  User.create({
    user_name: "amry", 
    user_email: "email",
    user_password: "password",
    user_address: "address",
    user_type: 0,
  }).then((data)=>{
    console.log(data.toJSON());
  })
};
// register();
module.exports = {
  testing, getAllCompaniesHandler, register
};