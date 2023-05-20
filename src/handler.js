const { nanoid } = require('nanoid');
const { User } = require('./conndb');


const registerHandler = (request, h) => {
  const {
    name, email, password, address, type
  } = request.payload;
  let success = 0;
  User.create({
    user_name: name,
    user_email: email,
    user_password: password,
    user_address: address,
    user_type: type,
  })
  const response = h.response({
    status: 'success',
    message: 'Anda berhasil registrasi',
  });
  response.code(201);
  return response;
};

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>"
}

module.exports = {
  registerHandler, testHandler
};