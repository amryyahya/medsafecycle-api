const { Storage } = require('@google-cloud/storage')

// Initialize storage
const storage = new Storage({
  keyFilename: `./src/config/medsafe-cycle-aa44ca89ec1d.json`,
})

// const bucket = storage.bucket('medsafe-cycle')

module.exports = { storage };

// Sending the upload request
