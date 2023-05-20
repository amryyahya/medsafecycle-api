/* eslint-disable no-console */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const { medsafe_db } = require('./conndb');


const loginHandler = (request, h) => {
  // lagi nyari" caranya
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

getUsers();

module.exports = {
  testing, getAllCompaniesHandler
};