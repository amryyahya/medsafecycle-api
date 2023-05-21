const {
  registerHandler, testHandler, loginHandler,
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
    path: '/',
    handler: testHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/',
  //   handler: getCompaniesHandler,
    // options: { pre: [authorization] },


];
module.exports = routes;