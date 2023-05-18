/* eslint-disable no-console */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const books = require('./companies');


const getAllCompaniesHandler = (request, h) => {
    
    const response = h.response({
      status: 'success',
      data: {
        salam: "hello world"
      },
    });
    response.code(200);
  
    return response;
  };



module.exports = {
    getAllCompaniesHandler
};