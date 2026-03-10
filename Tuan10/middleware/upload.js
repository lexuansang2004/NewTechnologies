const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
const s3 = require("../config/s3");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,

    key: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    }
  })
});

module.exports = upload;