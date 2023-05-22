const jwt = require("jsonwebtoken");
const { User } = require('../model/User');

const config = process.env;

const verifyToken = async (request, h) => {
  const token = request.headers["x-access-token"]
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({
    where: {
      user_id: decoded.id
    }
  })
  return user;
};
const authorization = { method: verifyToken, assign: "user" };

module.exports = { authorization };