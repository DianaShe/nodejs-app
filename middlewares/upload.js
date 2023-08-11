const multer = require("multer");
const path = require("path");
const jimp = require("jimp");
const fse = require('fs-extra')
const { nanoid } = require("nanoid");
const { HttpError } = require("../utils");

const multerStorage = multer.diskStorage({
  destination: async(req, file, cb) => {
    const tempDir = path.join(__dirname, "../", "tmp");
    await fse.ensureDir(tempDir)
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];

    cb(null, `${req.user.id}-${nanoid()}.${extension}`);
  },
  limits: 1 * 1024 * 1024,
});

const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(HttpError(400, "Please, upload images only"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
