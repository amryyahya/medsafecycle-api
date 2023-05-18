const {
    addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookById, getAllCompaniesHandler
  } = require('./handler');
  
  const routes = [
    
    {
        method: 'GET',
        path: '/companies',
        handler: getAllCompaniesHandler,
    }
  ];
  
  module.exports = routes;