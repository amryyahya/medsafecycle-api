const jwt = require("jsonwebtoken");
const { User } = require('../model/User');

const config = process.env;

const verifyToken = async (request, h) => {
  const user = await User.findOne({
    where: {
      user_token: request.headers["x-access-token"]
    }
  })
  return user;
};
const authorization = { method: verifyToken, assign: "user" };

module.exports = {authorization};