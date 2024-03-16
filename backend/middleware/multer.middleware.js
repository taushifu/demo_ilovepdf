const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `file_${Date.now()}.pdf`); //naming files for easier access
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only PDF files
    if (
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    // limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    fileFilter: fileFilter
});


module.exports = upload;