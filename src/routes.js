const {
     testing, getAllCompaniesHandler
  } = require('./handler');
  
  const routes = [
    
    {
        method: 'GET',
        path: '/companies',
        // kalo udah auth jadi gini ga sih 'api-key/companies
        handler: getAllCompaniesHandler,
    },
    {
      method: 'GET',
      path: '/',
      handler: testing,
  },
    
  ];
  
  module.exports = routes;