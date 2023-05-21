const {
  registerHandler, testHandler, loginHandler
} = require('./handler');

const routes = [
  
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: testHandler,
  },

];
module.exports = routes;