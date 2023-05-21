const { nanoid } = require('nanoid');
const { User } = require('./model/User');
const jwt = require("jsonwebtoken");


const registerHandler = async (request, h) => {
  const {
    name, email, password, address, type
  } = request.payload;
  const user = await User.create({
    user_name: name,
    user_email: email.toLowerCase(),
    user_password: password,
    user_address: address,
    user_type: type,
  })
  if (user.user_id) {
    const token = jwt.sign(
      { id: user.user_id, email },
      "jwt_key"
    );
    User.update(
      { user_token: token },
      { returning: true, where: { user_id: user.user_id } }
    )
    const response = h.response({
      status: 'success',
      message: 'Anda berhasil registrasi',
      data: {
        token:token,
       
      },
    });

    response.code(201);
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
  const response = h.response({
    status: 'success',
    message: 'Anda berhasil login',
    data: {
      token:user.user_token,
    },
  });

  response.code(201);
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
    return "<h1>anda mengakses api</h1>"+user.user_name;
    
}

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>"+request.headers["x-access-token"]
}

module.exports = {
  registerHandler, loginHandler, testHandler, getCompaniesHandler
};