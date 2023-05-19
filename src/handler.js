/* eslint-disable no-console */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const {getUsers} = require('./conndb');


const loginHandler = (request, h) => {
    // lagi nyari" caranya
    const response = h.response({
      status: 'success',
      data: {
        salam: "masih bingung"
      },
    });
    response.code(200);
  
    return response;
  };
const testing = (request, h) => {
    
    const response = h.response({
      status: 'success',
      data: {
        salam: "hello world"
      },
    });
    response.code(200);
    return response;
  };
const getAllCompaniesHandler = (request, h) => {
    
    const response = h.response({
      status: 'success',
      data: {
        perusahaan: companies
      },
    });
    response.code(200);
  
    return response;
  };



module.exports = {
  testing,getAllCompaniesHandler
};