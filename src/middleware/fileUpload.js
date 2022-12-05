const multer = require("multer");
const util = require("util");
const path = require("path");
const MAX_SIZE = 3 * 1024; // 3KB

// Multer config
const storage = multer.diskStorage({
    // limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});


const uploadFiles = multer({storage: storage}).single("image");
const uploadSingleFile = util.promisify(uploadFiles);
module.exports = uploadSingleFile
