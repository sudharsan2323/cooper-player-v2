const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.mp3')
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".mp3" && ext !== ".mp4" && ext !== ".wav") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },

});