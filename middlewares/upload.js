const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const { HttpError } = require("../utils");
const { model } = require("mongoose");
const jimp = require("jimp");

const tempDir = path.join(__dirname, "../", "tmp");

const multerStorage = multer.diskStorage({
  destination: tempDir,
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
