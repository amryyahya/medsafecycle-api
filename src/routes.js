const {
  registerHandler, testHandler, loginHandler, getCompaniesHandler
} = require('./handler');
const {authorization} = require('./middleware/auth')
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
    path: '/companies',
    handler: getCompaniesHandler,
    options: { pre: [authorization] },
  },
  {
    method: 'GET',
    path: '/',
    handler: testHandler,
  },
];
module.exports = routes;