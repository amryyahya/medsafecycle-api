const {
  registerHandler, testHandler, loginHandler, getCompaniesHandler, uploadHandler, getHistoryHandler, getWasteById, deleteWasteById
} = require('./handler');
const {authorization, isLogin} = require('./middleware/auth')
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
    method: 'POST',
    path: '/upload',
    handler: uploadHandler,
    options:{
      payload: {
         parse: true,
         multipart: {
                output: 'stream'
         },
         maxBytes: 1000 * 1000 * 10, 
      },
      pre: [isLogin],
   }
  },
  {
    method: 'GET',
    path: '/history/{size}/{offset}',
    handler: getHistoryHandler,
    options: { pre: [isLogin] },
  },
  {
    method: 'GET',
    path: '/wastes/{waste_id}',
    handler: getWasteById,
    options: { pre: [isLogin] },
  },
  {
    method: 'DELETE',
    path: '/wastes/{waste_id}',
    handler: deleteWasteById,
    options: { pre: [authorization] },
  },
  {
    method: 'GET',
    path: '/',
    handler: testHandler,
  },

  
];
module.exports = routes;