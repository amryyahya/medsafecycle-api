const {
  registerHandler, testHandler, loginHandler, getCompaniesHandler, addMessageHandler, getAllConversationsHandler, getConversationHandler, uploadHandler
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
    method: 'GET',
    path: '/conversations',
    handler: getAllConversationsHandler,
    options: { pre: [authorization] },
  },
  {
    method: 'GET',
    path: '/conversations/{conversation_id}',
    handler: getConversationHandler,
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
    method: 'POST',
    path: '/message',
    handler: addMessageHandler,
    options: { pre: [authorization] },
  },
  {
    method: 'GET',
    path: '/',
    handler: testHandler,
  },
];
module.exports = routes;