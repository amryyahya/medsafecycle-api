const jwt = require("jsonwebtoken");
const { User } = require('./model/User');
const { Waste } = require('./model/Waste');
const {wastesType} = require('./model/WasteType')
const { nanoid } = require('nanoid');
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
    })
    //request api ml
    const waste_type="Infeksius";
    //
    let waste_type_id=0;
    if (waste_type==="Sitoktoksik") waste_type_id=0;
    if (waste_type==="Infeksius") waste_type_id=1;
    if (waste_type==="Patologis") waste_type_id=2;
    if (waste_type==="Farmasi") waste_type_id=3;
    const file_name = nanoid(32);
    const image_link = `https://storage.googleapis.com/medsafe-cycle/${file_name}`;
    const updatedRows = await Waste.update(
      {
        waste_type: waste_type,
        waste_type_id: waste_type_id,
        image_link: image_link,
      },
      {
        where: { waste_id: waste.waste_id },
      }
    );
    const destination = storage.bucket('medsafe-cycle').file(file_name);
    const response = await destination.save(file._data, (err) => {
      if (!err) {
        return { message: "berhasil terupload"};
      } else {
        return { message: err.message }
      }
    });
    response.waste_information=wastesType[waste_type_id];
    return response;

  } catch (error) {
    console.log(error.message);
  }
}

const getHistoryHandler = async (request, h) => {
  try {
    const {
      offset, size
    } = request.params;
    const user_id = request.pre.user_id;
    const data = await Waste.findAndCountAll({
      where: { user_id : user_id},
      order: [['waste_id', 'DESC']],
      limit: parseInt(size),
      offset: parseInt(offset),
      attributes: ['waste_id','image_link','waste_type','createdAt']
    });
    response = data.rows;
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

const testHandler = (request, h) => {
  return "<h1>anda mengakses api</h1>"
}

const getWasteByIdHandler = async (request, h) => {
  try {
    const {
      waste_id
    } = request.params;
    const data = await Waste.findByPk(waste_id,{attributes:['waste_type','image_link','waste_type_id']});
    data.dataValues.waste_information = wastesType[data.dataValues.waste_type_id];
    delete data.dataValues.waste_information.name;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const deleteWasteByIdHandler = async (request, h) => {
  try {
    const user = request.pre.user;
    const { waste_id } = request.params;
    const theWaste = await Waste.findByPk(waste_id);
    if (theWaste.user_id === user.user_id){
      const data = await Waste.destroy({
        where: {
          waste_id: waste_id
        }
      });
      return (data ? 'data berhasil dihapus' : 'terjadi error');
    } else {
      return "not authorized";
    }
  } catch (error) {
    console.log(error.message);
  }
}

const getMyProfileHandler = async (request, h) => {
  try {
    const user_id = request.pre.user.user_id;
    const data = await User.findByPk(user_id,{attributes:['user_name','user_address','user_email']});
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  registerHandler, loginHandler, testHandler, getCompaniesHandler, uploadHandler, getHistoryHandler, getWasteByIdHandler, deleteWasteByIdHandler, getMyProfileHandler
};