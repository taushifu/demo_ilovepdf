const multer = require('multer');

// Configure multer to handle file uploads in memory
const upload = multer({
    // No need to specify storage, as we'll handle files in memory
    fileFilter: function (req, file, cb) {
        // Accept only PDF files
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF files are allowed.'));
        }
    }
});

module.exports = upload;