const {
  registerHandler, testHandler
} = require('./handler');

const routes = [
  
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: testHandler,
  },

];
module.exports = routes;