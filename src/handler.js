const jwt = require("jsonwebtoken");
const { User } = require('./model/User');
const { Waste } = require('./model/Waste');
// const { Op } = require("sequelize");

const { storage } = require('./config/storage')

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
    console.log(error.message);
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
    console.log(error.message);
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
    console.log(error.message);
  }
}

const uploadHandler = async (request, h) => {
  try {
    const { file } = request.payload;
    const waste = await Waste.create({
      user_id: request.pre.user_id,
      waste_type: 7,
    })
    const file_name = waste.waste_id.toString();
    const image_link = `https://storage.googleapis.com/medsafe-cycle/${file_name}`;
    const updatedRows = await Waste.update(
      {
        image_link: image_link,
      },
      {
        where: { waste_id: waste.waste_id },
      }
    );

    const destination = storage.bucket('medsafe-cycle').file(file_name);
    const response = destination.save(file._data, (err) => {
      if (!err) {
        return { message: "berhasil terupload", type: "limbah kimia" };
      } else {
        return { message: err.message }
      }
    });
    return response;

  } catch (error) {
    console.log(error.message);
  }
}

const getHistoryHandler = async (request, h) => {
  try {
    const {
      page, size
    } = request.params;
    const user_id = request.pre.user_id;
    const data = await Waste.findAndCountAll({
      where: { user_id : user_id},
      order: [['waste_id', 'DESC']],
      limit: parseInt(size),
      offset: parseInt(page),
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>"
}

module.exports = {
  registerHandler, loginHandler, testHandler, getCompaniesHandler, uploadHandler, getHistoryHandler
};