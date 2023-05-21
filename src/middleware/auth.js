const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (request, h) => {
  const {
    name, email, password, address, type
  } = request.payload;
  return name + "hahaha"
};
const authorization = { method: verifyToken, assign: "nameh" };

module.exports = {authorization};