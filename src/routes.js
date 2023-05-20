const {
     testing, getAllCompaniesHandler, register
  } = require('./handler');
  
  const routes = [
    
    {
        method: 'GET',
        path: '/companies',
        // kalo udah auth jadi gini ga sih 'api-key/companies
        handler: register,
    },
    {
      method: 'GET',
      path: '/',
      handler: testing,
  },
    
  ];
  
  module.exports = routes;