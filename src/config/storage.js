const { Storage } = require('@google-cloud/storage')

// Initialize storage
const storage = new Storage({
  keyFilename: `./src/config/medsafe-cycle-6d6cbf8789f8.json`,
})

// const bucket = storage.bucket('medsafe-cycle')

module.exports = { storage };

// Sending the upload request
