const { nanoid } = require('nanoid');
const { User } = require('./model/User');
const jwt = require("jsonwebtoken");

const registerHandler = async (request, h) => {
  const {
    name, email, password, address, type
  } = request.payload;
  try {
    const user = await User.create({
      user_name: name,
      user_email: email.toLowerCase(),
      user_password: password,
      user_address: address,
      user_type: type,
    })
    if (user.user_id) {
      const token = jwt.sign(
        { id: user.user_id },
        process.env.SECRET_KEY
      );
      const response = h.response({
        status: 'success',
        message: 'Anda berhasil registrasi',
        data: {
          token: token,
        },
      });
      response.code(201);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: 'client error',
      message: error.message,
    });
    console.log(error);
    response.code(409);
    return response;
  }

};

const loginHandler = async (request, h) => {
  const {
    email, password
  } = request.payload;
  const user = await User.findOne({
    where: {
      user_email: email
    }
  })
  if (!user) {
    const response = h.response({
      status: 'client error',
      message: 'email tidak ditemukan',
    });
    response.code(401);
    return response;
  }
  if (user.user_password === password) {
    const token = jwt.sign(
      { id: user.user_id },
      process.env.SECRET_KEY
    );
    const response = h.response({
      status: 'success',
      message: 'Anda berhasil login',
      data: {
        token: token,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'client error',
    message: 'password yang anda masukkan salah',
  });
  response.code(401);
  return response;
}

const getCompaniesHandler = async (request, h) => {
  const user = request.pre.user;
  if (!user.user_type) {
    const user = await User.findAll({
      where: {
        user_type: 1
      }
    })
    return user;
  }
  return "<h1>anda mengakses api</h1>" + user.user_name;

}

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>" + request.headers["x-access-token"]
}

module.exports = {
  registerHandler, loginHandler, testHandler, getCompaniesHandler
};