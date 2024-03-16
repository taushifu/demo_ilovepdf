const fs = require('fs');
const path = require('path');

const clearDirectory = (directoryPath) => {
    // Read all file names in the directory synchronously
    const files = fs.readdirSync(directoryPath);

    // Iterate over each file
    files.forEach((file) => {
        // Create the full file path
        const filePath = path.join(directoryPath, file);

        // Check if it's a file
        const isFile = fs.statSync(filePath).isFile();

        // If it's a file, delete it
        if (isFile) {
            fs.unlinkSync(filePath); // Delete file
        }
    });
}

module.exports = clearDirectory;