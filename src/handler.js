const { nanoid } = require('nanoid');
const { User } = require('./model/User');
const { Conversation } = require('./model/Conversation');
const { Message } = require('./model/Message');
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const registerHandler = async (request, h) => {
  const {
    name, email, password, address, type
  } = request.payload;
  try {
    const user = await User.create({
      user_name: name,
      user_email: email.toLowerCase(),
      user_password: password,
      user_address: address,
      user_type: type,
    })
    if (user.user_id) {
      const token = jwt.sign(
        { id: user.user_id },
        process.env.SECRET_KEY
      );
      const response = h.response({
        status: 'success',
        message: 'Anda berhasil registrasi',
        data: {
          token: token,
        },
      });
      response.code(201);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: 'client error',
      message: error.message,
    });
    console.log(error);
    response.code(409);
    return response;
  }

};

const loginHandler = async (request, h) => {
  try {
    const {
      email, password
    } = request.payload;
    const user = await User.findOne({
      where: {
        user_email: email
      }
    })
    if (!user) {
      const response = h.response({
        status: 'client error',
        message: 'email tidak ditemukan',
      });
      response.code(401);
      return response;
    }
    if (user.user_password === password) {
      const token = jwt.sign(
        { id: user.user_id },
        process.env.SECRET_KEY
      );
      const response = h.response({
        status: 'success',
        message: 'Anda berhasil login',
        data: {
          token: token,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'client error',
      message: 'password yang anda masukkan salah',
    });
    response.code(401);
    return response;
  } catch (error) {
    console.log(error);
  }
 
}

const getCompaniesHandler = async (request, h) => {
try {
  const user = request.pre.user;
  if (!user.user_type) {
    const companies = await User.findAll({
      where: {
        user_type: 1
      }
    })
    var filteredCompanies = companies.map(company => ({ id: company.user_id, name: company.user_name, address: company.user_address }));

    const response = h.response({
      status: 'success',
      message: 'Data perusahaan berhasil didapatkan',
      data: {
        companies: filteredCompanies,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'Anda tidak bisa melihat data ini',
    data: {
      companies: companies,
    },
  });
  response.code(404);
  return response;
} catch (error) {
  console.log(error);
}
}

const addMessageHandler = async (request, h) => {
  try {
    const { message_content, receiverUser_id } = request.payload;
    const senderUser_id = request.pre.user.user_id;
    const conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { [Op.and]:[{firstUser_id: senderUser_id},{secondUser_id: receiverUser_id}] },
          { [Op.and]:[{firstUser_id: receiverUser_id},{secondUser_id: senderUser_id}] }
        ]
      }
    })

    if (!conversation) {
      const firstUser = await User.findByPk(senderUser_id);
      const secondUser = await User.findByPk(receiverUser_id);
      const newConversation = await Conversation.create({
        firstUser_id: senderUser_id,
        firstUser_name: firstUser.user_name,
        secondUser_id: receiverUser_id,
        secondUser_name: secondUser.user_name,
      })
      const message = await Message.create({
        conversation_id: newConversation.conversation_id,
        senderUser_id: newConversation.firstUser_id,
        message_content: message_content
      })
      const response = h.response({
        status: 'success',
        message: 'Pesan terkirim',
      });
      response.code(200);
      return response;
    }
    const message = await Message.create({
      conversation_id: conversation.conversation_id,
      senderUser_id: senderUser_id,
      message_content: message_content,
    })
    const response = h.response({
      status: 'success',
      message: 'Pesan terkirim',
    });
    response.code(200);
    return response;
  } catch (error) {
    console.log(error);
  }

}

const getAllConversationsHandler = async (request, h) => {
  try {
    const user_id = request.pre.user.user_id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{ firstUser_id: user_id }, { secondUser_id: user_id }],             
      }
    });
    const frontendConversations = new Array;
    conversations.forEach(function(conversation){ 
      if (conversation.firstUser_id===user_id) {
        frontendConversations.push({
          conversation_id:conversation.conversation_id,
          companion_name:conversation.secondUser_name
        })
      }
      else  {
        frontendConversations.push({
          conversation_id:conversation.conversation_id,
          companion_name:conversation.firstUser_id
        })
      }
     });

    const response = h.response({
      status: 'success',
      message: 'semua conversation didapatkan',
      data: frontendConversations,
    });
    response.code(200);
    return response;
  } catch (error) {
    console.log(error.message);
  }

}
const getConversationHandler = async (request, h) => {
  try {
    const user_id = request.pre.user.user_id;
    const { conversation_id } = request.params;
    const messages = await Message.findAll({
      where: {
        conversation_id: conversation_id
      }
    })
    const response = h.response({
      status: 'success',
      message: 'semua pesan didapatkan',
      data: messages,
    });
    response.code(200);
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>"
}

module.exports = {
  registerHandler, loginHandler, testHandler, getCompaniesHandler, addMessageHandler, getAllConversationsHandler, getConversationHandler
};