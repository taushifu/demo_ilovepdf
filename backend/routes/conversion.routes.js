const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer.middleware');
const mergePDFs = require('../utilities/merge');

// ROUTE FOR MERGING PDFs
router.post('/merge', upload.array('files'), async (req, res) => {
    try {
        const uploadedFiles = req.files;

        // If no files are uploaded
        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).send('No files uploaded');
        }

        // Extract the buffer data from the uploaded files
        const fileBuffers = uploadedFiles.map(file => file.buffer);

        // Merge PDF files directly in memory
        const mergedPdfBytes = await mergePDFs(...fileBuffers);

        // Set response headers to indicate a downloadable file
        res.setHeader('Content-Disposition', 'attachment; filename="mergedPDF.pdf"');
        res.setHeader('Content-Type', 'application/pdf');

        // Stream the merged PDF file to the client
        res.end(mergedPdfBytes);

        return res.status(200); // No need to send any additional data in the response body
    } catch (error) {
        console.error('Error merging files:', error);
        return res.status(500).send('Internal server error.');
    }
});

module.exports = router;
