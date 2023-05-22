const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken");


// const person = {
//     name: 'John',
//     id: 30,
//     gender: 'male'
//   };
  

// const token = jwt.sign(
//     { id: person.id },
//     process.env.SECRET_KEY)

//     console.log(token);
const decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0NzQwNDUzfQ.REHVWDVU3vMruS6r9p1AIgFMLjEv2uUUJpmj2XHmSgw", process.env.SECRET_KEY);
console.log(decoded.id);

// try {
//     df
// } catch (error) {
//     console.log("error");
// }