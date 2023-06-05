const jwt = require("jsonwebtoken");
const { User } = require('../model/User');

const verifyToken = async (request, h) => {
  try {
    const token = request.headers["x-access-token"]
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const authorization = { method: verifyToken, assign: "user" };

const isTokenExist = async (request, h) => {
  try {
    if(!request.headers["x-access-token"]) {
      return 0;
    }
    const token = request.headers["x-access-token"]
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.id;
  } catch (error) {
    console.log(error);
  }
};
const isLogin = { method: isTokenExist, assign: "user_id" };

module.exports = { authorization, isLogin };