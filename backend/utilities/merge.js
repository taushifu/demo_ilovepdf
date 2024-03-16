const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function mergePDFs(...filePaths) {
    try {
        // Create a new PDF document
        const mergedPdfDoc = await PDFDocument.create();

        // Iterate over each file path
        for (const filePath of filePaths) {
            // Load the PDF document
            const pdfDoc = await PDFDocument.load(fs.readFileSync(filePath));

            // Copy pages from the PDF to the merged PDF
            const pages = await mergedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
            for (const page of pages) {
                mergedPdfDoc.addPage(page);
            }
        }

        // Save the merged PDF to a new file
        const mergedPdfBytes = await mergedPdfDoc.save();

        return mergedPdfBytes;
    } catch (error) {
        console.log('Error in merge.js: ', error);
        throw error;
    }
}

module.exports = mergePDFs;
