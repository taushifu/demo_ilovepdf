const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.middleware');
const fs = require('fs');
const mergePDFs = require('../utilities/merge');
const getFilePaths = require('../utilities/getFilePaths');
const clearDirectory = require('../utilities/clearDirectory');


//ROUTE FOR MERGING PDFs
router.post('/merge', upload.array('files'), async (req, res) => {
    try {
        const uploadedFiles = req.files;

        //If no files are uploaded
        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).send('No files uploaded');
        }

        const uploadsFolderPath = './public/uploads';

        // Get file paths synchronously
        const paths = getFilePaths(uploadsFolderPath);

        // Merge PDF files
        const mergedPdfBytes = await mergePDFs(...paths);

        // Write the merged PDF to a new file
        const mergedPDFPath = './public/results/mergedPDF.pdf'
        fs.writeFileSync(mergedPDFPath, mergedPdfBytes);

        // Set response headers to indicate a downloadable file
        res.setHeader('Content-Disposition', 'attachment; filename="mergedPDF.pdf"');
        res.setHeader('Content-Type', 'application/pdf');

        // Stream the merged PDF file to the client
        const stream = fs.createReadStream(mergedPDFPath);
        stream.pipe(res);

        // Listen for the 'finish' event to delete files after response has been sent
        res.on('finish', () => {
            console.log('PDF files merged successfully');
            // Delete all the files from the server
            // clearDirectory('./public/results');
            // clearDirectory('./public/uploads');
        });

        return res.status(200); // No need to send any additional data in the response body
    } catch (error) {
        // Delete all the files from the server if some internal error occurs
        clearDirectory('./public/results');
        clearDirectory('./public/uploads');

        console.error('Error uploading files:', error);
        return res.status(500).send('Internal server error from app.');
    }
});

module.exports = router;
