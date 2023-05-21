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
  // console.log(user.user_id);
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
        // test:request.pre.nameh,
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

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>"
}

module.exports = {
  registerHandler, loginHandler, testHandler
};