const jwt = require("jsonwebtoken");
const { User } = require('../model/User');

const config = process.env;

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

module.exports = { authorization };