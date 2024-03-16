const { PDFDocument } = require('pdf-lib');

async function mergePDFs(...pdfBytesArray) {
    try {
        // Create a new PDF document
        const mergedPdfDoc = await PDFDocument.create();

        // Iterate over each PDF bytes array
        for (const pdfBytes of pdfBytesArray) {
            // Load the PDF document
            const pdfDoc = await PDFDocument.load(pdfBytes);

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
        console.log('Error in mergePDFs:', error);
        throw error;
    }
}

module.exports = mergePDFs;
